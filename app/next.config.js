require('dotenv').config();
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withLess = require('@zeit/next-less');

module.exports = withSass(withCSS(withLess({
  // cssModules: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  env: {
    API_URL: process.env.REACT_APP_API_URL || 'http://127.0.0.1:3001',
  },
})));
