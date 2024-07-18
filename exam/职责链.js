class Chain {
  constructor(fn) {
    this.fn = fn
    this.successor = null
  }

  setNextSuccessor(successor) {
    return (this.successor = successor)
  }

  // 异步情况下自己通知下一个节点
  next() {
    return (
      this.successor &&
      this.successor.passRequest.apply(this.successor, arguments)
    )
  }

  async passRequest() {
    const res = await this.fn.apply(this, arguments)

    if (res === 'nextSuccessor') {
      return (
        this.successor &&
        this.successor.passRequest.apply(this.successor, arguments)
      )
    }

    return res
  }
}

// 生成自己的链实例
const fn1 = new Chain(function () {
  console.log(1)
  return 'nextSuccessor'
})

const fn2 = new Chain(async function () {
  console.log(2)
  setTimeout(() => {
    this.next()
  }, 1000)
})

const fn3 = new Chain(function () {
  console.log(3)
  return 'mission success!'
})

fn1.setNextSuccessor(fn2).setNextSuccessor(fn3)

fn1.passRequest()
