// module.exports = {
//   presets: ['@vue/cli-plugin-babel/preset'],
// }
module.exports = {
  // presets: ['@vue/app'],
  presets: ['@vue/cli-plugin-babel/preset'],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
      ],
      plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime'],
    },
  },
}
