const obj = { a: 0 }
obj['1'] = 0
// LHS 比 RHS 优先级高, 先执行++obj.a
obj[++obj.a] = obj.a++ // 0
const values = Object.values(obj)
obj[values[1]] = obj.a
console.log(obj)

// 属性顺序先数字, 其他属性按照添加顺苏
/* {
  1: 1,
  2: 2,
  a: 2
} */
