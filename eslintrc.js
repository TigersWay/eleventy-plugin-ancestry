module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018
  },
  rules: {
    'linebreak-style': ['error', 'unix'],
    indent: ['error', 2],
    semi: ['error', 'always'],
    'no-console': 'off',
  }
};
