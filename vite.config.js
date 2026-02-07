import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

// trigger refresh 

export default defineConfig({
  plugins: [react()],
  base: '/ChengZhiXiang-Capstone/ChengZhiXiang-Capstone-App/',
})
