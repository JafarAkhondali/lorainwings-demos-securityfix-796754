const path = require('path')
const { readFile } = require('fs')

setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(function () {
    console.log('promise1')
  })
}, 0)

setTimeout(() => {
  console.log('timer2')
  Promise.resolve().then(function () {
    console.log('promise2')
  })
}, 0)

readFile(path.resolve(__dirname, './imgs/1.png'), (err, data) => {
  if (err) return
  console.log('文件读取完成')
})

setImmediate(() => {
  console.log('进入了setImmediate')
})
