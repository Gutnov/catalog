import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'semi': [
        'error',
        'never'
      ],
      'vue/multi-word-component-names': 'off',
      'indent': ['error', 2],
      'vue/html-indent': ['error', 2, {
        'attribute': 1,
        'baseIndent': 1,
        'closeBracket': 0,
        'alignAttributesVertically': true
      }],
      'comma-dangle': ['error', 'never'],
      'quotes': ['error', 'single'],
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          'registeredComponentsOnly': false,
          'ignores': []
        }
      ],
      'object-curly-spacing': ['error', 'always']
    },
    languageOptions: {
      globals: {
        defineNuxtComponent: 'readonly',
        useState: 'readonly',
        useFetch: 'readonly',
        useAsyncData: 'readonly',
        ref: 'readonly',
        computed: 'readonly',
        watch: 'readonly',
        reactive: 'readonly',
        useNuxtApp: 'readonly',
        $fetch: 'readonly',
        'useRouter': 'readonly',
        useRoute: 'readonly'
      }
    }
  }
]