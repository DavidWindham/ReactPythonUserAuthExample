module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 13,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    'react/react-in-jsx-scope': 'off',
    'require-jsdoc': 'off',
    "react/prop-types": "off",
  },
};
