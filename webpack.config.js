const path = require('path');

// module.exports = {
//   mode: 'development',
//   devtool: 'inline-source-map',
//   entry: {
//     main: './apps/chatwidget/src/main.ts',
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
//   resolve: {
//     extensions: ['.ts', '.tsx', '.js'],
//     alias: {
//       '@chatwidget/api': path.resolve(__dirname, 'libs/api/src/index.ts'),
//       '@chatwidget/auth': path.resolve(__dirname, 'libs/auth/src/index.ts'),
//       '@chatwidget/chat': path.resolve(__dirname, 'libs/chat/src/index.ts'),
//     },
//   },
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         loader: 'ts-loader',
//       },
//     ],
//   },
// };

module.exports = {
  entry: './apps/chatwidget/src/main.ts', // Replace with your project's entry point
  optimization: {
    splitChunks: false, // Disable code splitting
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@chatwidget/api': path.resolve(__dirname, 'libs/api/src/index.ts'),
      '@chatwidget/auth': path.resolve(__dirname, 'libs/auth/src/index.ts'),
      '@chatwidget/chat': path.resolve(__dirname, 'libs/chat/src/index.ts'),
    }, // Configure file extensions for resolving modules
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Compile TypeScript files
        loader: 'ts-loader',
      },
    ],
  },
};