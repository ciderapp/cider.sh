import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import prettier from 'eslint-plugin-prettier/recommended'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'node_modules', '*.d.ts'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  prettier,
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        HTMLInputElement: 'readonly',
        KeyboardEvent: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        console: 'readonly',
        navigator: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        IntersectionObserver: 'readonly',
        ResizeObserver: 'readonly',
        MutationObserver: 'readonly',
        CustomEvent: 'readonly',
        Event: 'readonly',
        MouseEvent: 'readonly',
        HTMLElement: 'readonly',
      },
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
      'vue/multi-word-component-names': 'off',
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/html-self-closing': [
        'error',
        { html: { void: 'always', normal: 'always', component: 'always' } },
      ],
      'vue/no-v-html': 'off',
      'vue/no-unused-vars': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
)
