let path = require('path')

// Add mixins and variables paths to use as global
const stylePaths = {
  variables: 'src/styles/styl/abstract/variables.styl',
  mixins: 'src/styles/styl/abstract/mixins.styl'
}

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: [
        'D:\\projects\\music-web-app\\client\\src\\styles\\styl\\abstract\\variables.styl',
        'D:\\projects\\music-web-app\\client\\src\\styles\\styl\\abstract\\mixins.styl'
      ]
    },
    i18n: {
      locale: 'en',
      fallbackLocale: 'tr',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
