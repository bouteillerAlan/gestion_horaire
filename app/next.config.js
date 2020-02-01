const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withLess = require('@zeit/next-less');

module.exports = withSass(withCSS(withLess({
  // cssModules: true,
  lessLoaderOptions: {
    javascriptEnabled: true
  }
})));
