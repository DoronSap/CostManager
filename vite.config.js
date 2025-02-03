import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@fontsource/league-script'],
      output: {
        globals: {
          '@fontsource/league-script': 'LeagueScriptFont'
        }
      }
    }
  }
})
