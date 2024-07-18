// 用于创建一个分片
export function createChunk(file, index, chunkSize) {
  const hash = `${Math.random().toString(36).substr(2, 9)}`.replace(
    /((?=^\d+)\d+)|((?=\.)\.)/gi,
    ''
  )
  const start = index * chunkSize
  const endSize = start + chunkSize
  const end = endSize >= file.size ? file.size : endSize
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file.slice(start, end))
    const chunk = file.slice(start, end)
    reader.onload = (e) => {
      resolve({ start, end, index, chunk, hash, buffer: e.target.result })
    }
  })
}
