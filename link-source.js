// 插入引用资源到index.html
export default {
  install(Vue, opts) {
    const { css, js } = opts
    const types = (original) =>
      Object.prototype.toString.call(original).slice(8, -1)
    const createElem = (tag, src) => {
      let elem
      if (tag === 'link') {
        elem = document.createElement('link')
        elem.setAttribute('href', src)
        elem.setAttribute('rel', 'stylesheet')
      } else if (tag === 'script') {
        elem = document.createElement('script')
        elem.setAttribute('src', src)
        elem.setAttribute('type', 'text/javascript')
      }
      return elem
    }
    const quoteElem = (tag, srcs) => {
      let childElem
      const targetElem = tag === 'link' ? document.head : document.body
      if (types(srcs) === 'Array') {
        childElem = document.createDocumentFragment()
        srcs.forEach((s) => {
          const el = createElem(tag, s)
          childElem.appendChild(el)
        })
      } else if (types(srcs) === 'String') {
        childElem = createElem(tag, srcs)
      }
      targetElem.appendChild(childElem)
    }

    css && quoteElem('link', css)
    js && quoteElem('script', js)
  }
}
