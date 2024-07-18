type TNext = (next?: TNext) => Promise<unknown>

class OnionModel {
  private isRunning: boolean = false // 防止调用多次run
  private tasks: Array<(next: TNext) => unknown> = []
  private index = 0

  // 注意此处使用箭头函数，保证this指向正确
  next = async () => {
    this.index++
    await this.runOneTask()
  }

  addTask(task) {
    this.tasks.push(task)
  }

  // 开启任务
  run() {
    if (this.isRunning || !this.tasks.length) return
    this.isRunning = true
    this.runOneTask()
  }

  // 重置状态
  reset() {
    this.index = 0
    this.tasks = []
    this.isRunning = false
  }

  // 运行一个
  async runOneTask() {
    if (this.index >= this.tasks.length) {
      this.reset()
      return
    }
    const task = this.tasks[this.index]
    let j = this.index
    await task(this.next)
    if (j === this.index) await this.next()
  }
}

// 测试代码
const t = new OnionModel()

t.addTask(async (next) => {
  console.log(1, 'start')
  await next()
  console.log(1, 'end')
})

t.addTask(async () => {
  console.log(2)
})

t.addTask(async () => {
  console.log(3)
})

t.run()

// 要求输出结果 1 start 2 3 1 end
