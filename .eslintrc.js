module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier', 'react-compiler'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
    'import/no-unresolved': ['off'],
  },
  settings: {
    'import/resolver': { typescript: {} },
  },
};
