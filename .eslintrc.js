module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:react/recommended',
    'plugin:jest/recommended',
    // 'plugin:react/jsx-runtime'
  ],
  overrides: [
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react',
    'only-warn',
  ],
  rules: {
    // 'warn': 'warn',
    'no-console': ['warn', { allow: ['warn'] }],
    eqeqeq: 'off',
    curly: 'warn',
    'max-len': 'off',
    semi: ['warn', 'always'],
    quotes: [
      'warn',
      'single',
      {
        avoidEscape: true,
      }],
    'no-useless-escape': 1,
    'linebreak-style': ['warn', 'unix'],
    indent: ['warn', 2, { SwitchCase: 1 }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
    'react/jsx-boolean-value': ['warn', 'never', { always: [] }],

    // Validate closing bracket location in JSX
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md
    'react/jsx-closing-bracket-location': ['warn', 'line-aligned'],

    // Validate closing tag location in JSX
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-closing-tag-location.md
    'react/jsx-closing-tag-location': 'warn',

    // Enforce or disallow spaces inside of curly braces in JSX attributes
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md
    'react/jsx-curly-spacing': ['warn',
      {
        // allowMultiline: true,
        when: 'never',
        children: true,
      }],

    'react/jsx-no-bind': ['warn', {
      ignoreRefs: true,
      allowArrowFunctions: true,
      allowFunctions: false,
      allowBind: false,
      ignoreDOMComponents: true,
    }],
    'react/jsx-wrap-multilines': ['warn', {
      declaration: 'parens-new-line',
      assignment: 'parens-new-line',
      return: 'parens-new-line',
      arrow: 'parens-new-line',
      condition: 'parens-new-line',
      logical: 'parens-new-line',
      prop: 'parens-new-line',
    }],
  },
};
