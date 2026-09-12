import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// base はGitHub Pages（/<repo>/ 配下）で配信する場合に使う。
// ルート配信（Vercel / Netlify など）では VITE_BASE を指定しない。
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'VITE_')
  return {
    plugins: [react()],
    base: env.VITE_BASE || '/',
  }
})
