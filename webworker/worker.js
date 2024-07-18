import { createChunk } from './helps.js'

self.onmessage = async function (e) {
  const { file, startIndex, endIndex, chunkSize } = e.data
  const tasks = []
  for (let i = startIndex; i < endIndex; i++) {
    tasks.push(createChunk(file, i, chunkSize))
  }
  const chunks = await Promise.all(tasks)
  self.postMessage(chunks)
}
