/*
  前端位运算汇总:

  & ，与 两个位都为 1 时，结果才为 1
  | ，或 两个位都为 0 时，结果才为 0
  ^ ，异或 两个位相同为 0 ，相异为 1
  ～，按位取反 所有 0 变 1，1 变 0
  <<，左移 各二进位全部左移若干位，高位丢弃，低位补 0
  >>，右移 各二进位全部右移若干位，对无符号数，高位补 0 ，有符号数，各编译器处理方法不一样，有的补符号位，有的补 0
*/

const READ = 1 << 0 // 0b1 -> 0001
const WRITE = 1 << 1 // 0b10 -> 0010
const UPDATE = 1 << 2 // 0b100 -> 0100
const DELETE = 1 << 3 // 0b1000 -> 1000

/* 用法一 使用位运算组合权限, 或运算=>有一个1就为真 */
// 1.可读可写
const ALLOW_READ_WRITE = READ | WRITE // 0b11 0011
// 2.可读可写可更新
const ALLOW_READ_WRITE_UPDATE = READ | WRITE | UPDATE // 0b111-> 0111
// 3.可读可写可更新可删除
const ALLOW_READ_WRITE_UPDATE_DELETE = READ | WRITE | UPDATE | DELETE // 0b111->1 1111

/* 用法二 使用位运算判断是否具备某权限, 与运算=>两个都是1才为真 */
// 1.判断是否具备读权限
const ALLOW_READ = (READ & ALLOW_READ_WRITE_UPDATE_DELETE) === READ // 0b1 -> 0001
// 2.判断是否具备写权限
const ALLOW_WRITE = (WRITE & ALLOW_READ_WRITE_UPDATE_DELETE) === WRITE // 0b10 -> 0010
// 3.判断是否具备更新权限
const ALLOW_UPDATE = (UPDATE & ALLOW_READ_WRITE_UPDATE_DELETE) === UPDATE // 0b100 -> 0100
// 4.判断是否具备删除权限
const ALLOW_DELETE = (DELETE & ALLOW_READ_WRITE_UPDATE_DELETE) === DELETE // 0b1000 -> 1000

/* 用法三 使用位运算来删除某个权限, 异或运算=>相异为真, ~为按位取反 */
// 1.删除读权限
const REMOVE_READ = ALLOW_READ_WRITE_UPDATE_DELETE ^ READ // 0b1110 -> 1110
const REMOTE_READ_2 = ALLOW_READ_WRITE_UPDATE_DELETE & ~READ // 0b1110 -> 1110
// 2.删除写权限
const REMOVE_WRITE = ALLOW_READ_WRITE_UPDATE_DELETE ^ WRITE // 0b1101 -> 1101
const REMOTE_WRITE_2 = ALLOW_READ_WRITE_UPDATE_DELETE & ~WRITE // 0b1101 -> 1101
// 3.删除更新权限
const REMOVE_UPDATE = ALLOW_READ_WRITE_UPDATE_DELETE ^ UPDATE // 0b1011 -> 1011
const REMOTE_UPDATE_2 = ALLOW_READ_WRITE_UPDATE_DELETE & ~UPDATE // 0b1011 -> 1011
// 4.删除删除权限
const REMOVE_DELETE = ALLOW_READ_WRITE_UPDATE_DELETE ^ DELETE // 0b0111 -> 0111
const REMOTE_DELETE_2 = ALLOW_READ_WRITE_UPDATE_DELETE & ~DELETE // 0b0111 -> 0111

/* 位运算的运用 */
// 1.判断奇偶
const isOdd = (num) => (num & 1) === 1
const isEven = (num) => (num & 1) === 0
// 2.交换两个数
const swap = (a, b) => {
  a = a ^ b
  b = a ^ b
  a = a ^ b
  return [a, b]
}
// 3.取绝对值
const abs = (num) => {
  const mask = num >> 31
  return (num ^ mask) - mask
}
// 4.取平均值
const average = (a, b) => (a & b) + ((a ^ b) >> 1)
// 5.检测是否是2的幂
const isPowerOf2 = (num) => (num & (num - 1)) === 0
// 6.取最大值
const max = (a, b) => (a + b + Math.abs(a - b)) >> 1
// 7.取最小值
const min = (a, b) => (a + b - Math.abs(a - b)) >> 1
// 8.判断符号是否相同
const isSameSign = (a, b) => (a ^ b) >= 0
// 9.判断是否是负数
const isNegative = (num) => num >> 31 === -1
// 10.判断是否是正数
const isPositive = (num) => num >> 31 === 0
// 11.取相反数
const negNum = (num) => ~num + 1
// 12.取倒数
const reciprocal = (num) => 1 / num
// 13.判断是否是素数
const isPrime = (num) => {
  if (num < 2) return false
  const sqrt = Math.sqrt(num)
  for (let i = 2; i <= sqrt; i++) {
    if (num % i === 0) return false
  }
  return true
}
// 14.判断是否是6的幂
const isPowerOf6 = (num) =>
  (num & (num - 1)) === 0 &&
  (num & 0x55555555) !== 0 &&
  (num & 0xaaaaaaaa) !== 0

// 15.使用位运算实现parseInt
const useBinaryParseInt = (num) => ~~num

// 16. 位运算判断indexOf
const existTarget = (str, target) => Boolean(~str.indexOf(target))

// 17. 位运算乘以2
const multiplyBy2 = (num) => num << 1

// 18. 位运算除以2
const divideBy2 = (num) => num >> 1

// 19. 清零最低位的1
const clearLowestBit = (num) => num & (num - 1)
const clearLowestBit2 = (num) => num & ~(num & (num - 1))
const clearLowestBit3 = (num) => num & (num ^ (num - 1))
const clearLowestBit4 = (num) => num & -num
