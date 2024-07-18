import React, { useEffect, useRef, useState } from 'react'
import { Card, Spin } from 'antd'
import css from '../../../index.less'

/* 
iframe 总结:
1. iframe数据天然可以跨域, 可以获取到iframe的页面并显示
2. iframe跨域后无法使用JS来对iframe中的DOM进行遍历操作, 同域就使用API: ifr.contentDocument/ifr.contentWindow
3. iframe自适应最好的方式是采用postMessage进行通信
4. iframe的内部的CSS是一个独立的沙箱, iframe外层无法通过CSS修改内部的样式, 但是JS可以操作
5. ifrmae会阻塞整个页面的onload事件, 共用页面的http连接池
6. iframe宽度大于页面的时候, 加载完成后会自动滚动到底部, 可以使用fixed定位防止影响整体页面的滚动条
*/

// 优点: 本版本实现了后台预加载新Iframe, 解决了使用过程中的网络等待
// 缺点: 因本次需求Iframe是JSP代码, 需要整页刷新才能更新数据; 故提前加载不满足业务场景, 无法带出修改的数据
const FrameTab = (props) => {
  const { title, path, host, storeName, readOnly } = props
  const [spining, setSpining] = useState(true)
  const [load, setLoad] = useState({ main: true, lazy: false })
  const [width, setWidth] = useState(0)
  const ctRefs = useRef(null)
  const mainRefs = useRef(null)
  const lazyRefs = useRef(null)

  const detectWindow = () => {
    document.documentElement.scrollTop = 0
    requestAnimationFrame(() => {
      const w = window.getComputedStyle(ctRefs.current).width
      setWidth(w)
    })
  }

  const detectLoaded = () => {
    let count = 0
    const overtime = 4
    const refs = readOnly ? lazyRefs : mainRefs
    const doc = refs.current.contentDocument
    const detect = () => {
      const row = doc.querySelector(
        '.mainSheetPanel .sheetGrid tbody tr:last-child'
      )
      if (row?.childNodes || count === overtime) {
        setSpining(false)
        return
      }
      count += 1
      setTimeout(detect, 1000)
    }
    detect()
  }

  const detectLazyLoad = () => {
    const main = { main: true, lazy: false }
    const lazy = { main: false, lazy: true }
    const a = { main: true, lazy: true }
    const t = readOnly ? lazy : main
    if (spining) setLoad(t)
    else setLoad(a)
  }

  useEffect(() => {
    detectWindow()
    setSpining(true)
  }, [path])

  useEffect(detectLazyLoad, [spining])

  useEffect(() => {
    window.addEventListener('resize', detectWindow)
    return () => window.removeEventListener('resize', detectWindow)
  })

  return (
    <div className={css.iframeContainer}>
      <Card>
        <div ref={ctRefs}>
          <Spin spinning={spining} size="large">
            {host && (
              <>
                {load.main && (
                  <iframe
                    ref={mainRefs}
                    src={`/tm1webmeet/UrlApi.jsp?Username=Y_NY2hvdWsjIzEyMw==&Password=.&AdminHost=${host}&OnlyRead=false&TM1Server=LFC5_TM#Action=Open&Type=WebSheet&Workbook=Applications/${path}&Title_门店=${storeName}`}
                    title={title}
                    width={width}
                    scrolling="yes"
                    className={readOnly ? 'iframeLazy' : ''}
                    onLoad={detectLoaded}
                  />
                )}
                {load.lazy && (
                  <iframe
                    ref={lazyRefs}
                    src={`/tm1webmeet/UrlApi.jsp?Username=Y_NY2hvdWsjIzEyMw==&Password=.&AdminHost=${host}&OnlyRead=true&TM1Server=LFC5_TM#Action=Open&Type=WebSheet&Workbook=Applications/${path}&Title_门店=${storeName}`}
                    title={title}
                    width={width}
                    scrolling="yes"
                    className={readOnly ? '' : 'iframeLazy'}
                    onLoad={detectLoaded}
                  />
                )}
              </>
            )}
          </Spin>
        </div>
      </Card>
    </div>
  )
}

export default FrameTab
