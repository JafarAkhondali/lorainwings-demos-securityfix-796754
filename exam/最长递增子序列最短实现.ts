/**
 * 返回最长递增子序列的数组
 * @param arrs
 * @returns
 */
function LIS(arrs) {
  if (arrs.length === 0) return []
  const tails = [0]
  // 存下标
  const trace = [...arrs]
  for (let i = 1; i < arrs.length; i++) {
    if (arrs[i] > arrs[tails[tails.length - 1]]) {
      trace[i] = tails[tails.length - 1]
      tails.push(i)
    } else {
      const index = getFirstGreaterIndex(tails, arrs, i)
      trace[i] = tails[index - 1]
      tails[index] = i
    }
  }
  console.log('trace', trace)

  // 此位置, 最长递增子序列长度是正确的, 但是顺序不一定正确, 因此需要回溯
  let u = tails.length
  let v = tails[u - 1]
  while (u-- > 0) {
    tails[u] = v
    v = trace[v]
  }

  return tails
}

function getFirstGreaterIndex(tails, arrs, i) {
  /* for (let j = 0; j < tails.length; j++) {
    if (tails[j] > target) {
      return j
    }
  } */
  // 改用二分查找优化
  const target = arrs[i]
  let s = 0,
    e = tails.length - 1
  while (s < e) {
    const mid = (s + e) >> 1
    if (target > arrs[tails[mid]]) {
      s = mid + 1
    } else {
      e = mid
    }
  }
  return s
}

const r = LIS([1, 13, 18, 15, 8, 10, 11, 12, 2])
// 因为最后一项是2, 此时最长递增子序列长度是正确的, 但是顺序不正确, 数组不应该是[1, 2, 10, 11, 12], 这个没有保证递增的顺序
// 经过上述增加的回溯逻辑
// 得到最终的结果
console.log('LIS', r)

export {}
