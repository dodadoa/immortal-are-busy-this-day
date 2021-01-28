exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /force-graph/,
            use: loaders.null(),
          },
          {
            test: /react-force-graph-2d/,
            use: loaders.null(),
          },
          {
            test: /react-force-graph-3d/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
