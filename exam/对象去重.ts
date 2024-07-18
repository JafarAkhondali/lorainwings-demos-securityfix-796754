const arr = [
  { a: 1, b: 2 },
  { b: 2, a: 1 },
  { a: 1, b: 2, c: { a: 1, b: 2 } },
  { b: 2, a: 1, c: { a: 2, b: 1 } },
  { b: 2, a: 1, c: { a: 2, b: 1 } }
]

// Reflect.apply 等同于 Object.prototype.apply.call(fn, obj, args)
const isObject = (o: unknown): o is Record<string, any> =>
  Reflect.apply(Object.prototype.toString, o, []) === '[object Object]'

const equal = (o1: unknown, o2: unknown): boolean => {
  if (!isObject(o1) || !isObject(o2)) return Object.is(o1, o2)
  if (o1 === o2) return true

  const o1Keys = Object.keys(o1)
  const o2Keys = Object.keys(o2)
  if (o1Keys.length !== o2Keys.length) return false

  for (const key of o1Keys) {
    if (!o2Keys.includes(key)) return false
    if (!equal(o1[key], o2[key])) return false
  }
  return true
}

const unique = (arr: unknown[]) => {
  const res = [...arr]
  for (let i = 0; i < res.length; i++) {
    for (let j = i + 1; j < res.length; j++) {
      if (equal(res[i], res[j])) {
        res.splice(j, 1)
        // 因为删除了一个元素，所以要减一
        j--
      }
    }
  }
  return res
}

console.log(unique(arr))

export {}
