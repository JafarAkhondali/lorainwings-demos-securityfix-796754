import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // https 选项需要开启
    https: true,
  },
  plugins: [react(), mkcert()],
})