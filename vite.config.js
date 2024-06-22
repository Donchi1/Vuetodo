import vue from '@vitejs/plugin-vue'

export default {
  plugins: [
     vue()
  ],
  optimizeDeps: {
    exclude: ["oh-vue-icons/icons"]
  }
}