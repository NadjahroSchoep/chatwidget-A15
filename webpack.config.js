  const path = require('path');
  const { ModuleFederationPlugin } = require('webpack').container;
  const HtmlWebpackPlugin = require("html-webpack-plugin");

  module.exports = {
    entry: './apps/chatwidget/src/main.ts',
    devServer: {
      disableHostCheck: true
    },
    output: {
      filename: '[name].js',
      // chunkFilename: '[id].js', 
      path: path.join(__dirname, 'dist'),
      publicPath: '/chat/',
      clean: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        '@chatwidget/api': path.resolve(__dirname, 'libs/api/src/index.ts'),
        '@chatwidget/auth': path.resolve(__dirname, 'libs/auth/src/index.ts'),
        '@chatwidget/chat': path.resolve(__dirname, 'libs/chat/src/index.ts'),
      },
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'chatwidget',
        filename: 'remote.js',
        exposes: {
          './main': './apps/chatwidget/src/main.ts',
          './api': './libs/api/src/index.ts',
          './auth': './libs/auth/src/index.ts',
          './chat': './libs/chat/src/index.ts',
        },
        
      }),
      new HtmlWebpackPlugin({
        template: "./apps/chatwidget/src/index.html",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.ts$/, // Compile TypeScript files
          loader: 'ts-loader',
        }, 
      ],
    },
  };