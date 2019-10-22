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
        path.resolve(__dirname, stylePaths.variables),
        path.resolve(__dirname, stylePaths.mixins)
      ]
    }
  }
}
