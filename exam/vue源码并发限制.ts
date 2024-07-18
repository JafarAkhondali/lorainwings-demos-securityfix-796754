type TIteratorFn = () => (...args: unknown[]) => unknown

/**
 * vue源码并发限制
 **/
const runParallelLimit = async (sources: TIteratorFn[], limit: number) => {
  const ret: Promise<unknown>[] = []
  const executing: Promise<unknown>[] = []
  for (const fn of sources) {
    const p = Promise.resolve().then(() => fn())
    ret.push(p)

    if (limit <= sources.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1))
      executing.push(e)
      if (executing.length >= limit) {
        await Promise.race(executing)
      }
    }
    return Promise.all(ret)
  }
}
