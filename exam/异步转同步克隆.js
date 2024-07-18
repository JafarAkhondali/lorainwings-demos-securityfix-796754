function structCopy(obj) {
  return new Promise((resolve) => {
    const { port1, port2 } = new MessageChannel()
    port1.postMessage(obj)
    port2.onmessage = (e) => resolve(e.data)
  })
}

const deepCopy = () => {
  const obj = {
    a: 1,
    b: 2,
    d: new Date()
  }
  const res = structCopy(obj)
  console.log('copy res', res)
}

function runMessageChannelSync(fn) {
  const originAsyncFn = structCopy
  const cache = []
  let i = 0

  structCopy = (...args) => {
    if (cache[i]) {
      // 最终执行完成, 还原原来的fetch
      structCopy = originAsyncFn
      if (cache[i].status === 'fulfilled') return cache[i].data
      else if (cache[i].status === 'rejected') return cache[i].err
    }
    const result = {
      status: 'pending',
      data: null,
      err: null
    }
    cache[i++] = result
    const r = originAsyncFn(...args).then(
      (succ) => {
        result.data = succ
        result.status = 'fulfilled'
      },
      (fail) => {
        result.err = fail
        result.status = 'rejected'
      }
    )
    throw r
  }

  try {
    fn()
  } catch (e) {
    if (e instanceof Promise) {
      const reRun = () => {
        i = 0
        fn()
      }
      e.then(reRun, reRun)
    }
  }
}

// test

runMessageChannelSync(deepCopy)
