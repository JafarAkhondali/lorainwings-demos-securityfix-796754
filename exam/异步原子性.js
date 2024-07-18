/**
 *
 * 依次顺序执行一系列任务
 * 所有任务全部完成过后可以得到每个任务的执行结果
 * 每个任务具有原子性, 不可中断, 只能在两个任务之间中断
 * @param  {...any} tasks 任务列表 每个任务无参 异步
 * @returns
 */
function processTasks(...tasks) {
  let isRunning = false
  let runningIndex = 0
  const result = []
  let asyncResult = null
  return {
    // start是一个async函数, 用他来返回最终结果
    // 如果不使用promise来接管他的结果, 那么中断也就返回了结果
    async start() {
      return new Promise(async (resolve, reject) => {
        if (asyncResult) return asyncResult.then(resolve, reject)
        if (isRunning) return
        isRunning = true
        while (runningIndex < tasks.length) {
          try {
            result.push(await tasks[runningIndex]())
          } catch (err) {
            isRunning = false
            reject(err)
            asyncResult = Promise.reject(err)
            return
          }
          runningIndex++
          // 最后一个异步任务中断已经毫无意义
          if (!isRunning && runningIndex < tasks.length) return
        }
        isRunning = false
        resolve(result)
        asyncResult = Promise.resolve(result)
      })
    },
    pause() {
      isRunning = false
    }
  }
}

const serialTasks = Array(10)
  .fill(0)
  .map(
    (_, i) => () =>
      new Promise((resolve) =>
        setTimeout(() => {
          console.log('[--->]任务执行序列号:', i)
          resolve(i)
        }, 1000)
      )
  )

const { start, pause } = processTasks(...serialTasks)
