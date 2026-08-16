import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

export default [
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      'docs/.vitepress/dist/**',
      'docs/.vitepress/dist-verify/**',
      'docs/.vitepress/cache/**',
      'docs/.vitepress/.temp/**',
      'docs/.vitepress/*.timestamp-*.mjs',
      'grill-me/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
]
