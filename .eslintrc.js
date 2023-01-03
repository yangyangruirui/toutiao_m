module.exports = {
    root: true,

    env: {
        node: true
    },

    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],

    parserOptions: {
        parser: 'babel-eslint'
    },

    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        'no-multiple-empty-lines': 0,
        'space-before-function-paren': 0,
        indent: 4
    },

    'extends': [
      'plugin:vue/essential',
      '@vue/standard'
    ]
}