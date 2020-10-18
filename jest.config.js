module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  // transform: {
  //   '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  // },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: ['/node_modules/(?!vue-goodshare)'],
}
