/**
 * 给fetch添加超时功能
 * 使用函数柯里化的方式，先传入超时时间，再传入fetch的参数
 */
import fetch from 'node-fetch'

interface FetchOptions {
  signal?: string
}

const fetchTimeout = (timeout: number = 10000) => {
  return (url: string, options: FetchOptions) => {
    return new Promise((resolve, reject) => {
      const controller = new AbortController()
      const { signal } = controller
      fetch(url, { ...options, signal }).then(resolve, reject)

      setTimeout(() => {
        reject(new Error('fetch timeout'))
        controller.abort()
      }, timeout)
    })
  }
}

export {}
