import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.vue'],
      exclude: ['src/**/*.test.ts'],
      insertTypesEntry: true,
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['vue', '@mote-ui/icons'],
      output: [
        {
          format: 'es',
          exports: 'named',
          preserveModules: true,
          preserveModulesRoot: fileURLToPath(new URL('./src', import.meta.url)),
          entryFileNames: '[name].js',
        },
        {
          format: 'cjs',
          exports: 'named',
          preserveModules: true,
          preserveModulesRoot: fileURLToPath(new URL('./src', import.meta.url)),
          entryFileNames: '[name].cjs',
        },
      ],
    },
    sourcemap: true,
  },
})
