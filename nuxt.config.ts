// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        '@/assets/style.scss'
    ],
    modules: [
        '@nuxtjs/tailwindcss'
    ],
    vite: {
        server: {
            proxy: {
                '/api': {
                    target: 'http://localhost:4000/',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                  },
            }
        }
    }
})
