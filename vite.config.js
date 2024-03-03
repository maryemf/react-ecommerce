import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
})

// export default defineConfig(({ command }) => {
//   console.log('command', command)
//   const config = {
//     plugins: [react()],
//     base: '/',
//   }

//   if (command !== 'serve') {
//     config.base = '/react-ecommerce/'
//   }
//   console.log(config.base);

//   return config
// })