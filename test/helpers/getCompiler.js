import path from 'path';

import webpack from 'webpack';
import { createFsFromVolume, Volume } from 'memfs';

export default (fixture, loaderOptions = {}, config = {}) => {
  const fullConfig = {
    mode: 'development',
    devtool: config.devtool || false,
    context: path.resolve(__dirname, '../fixtures'),
    entry: path.resolve(__dirname, '../fixtures', fixture),
    output: {
      path: path.resolve(__dirname, '../outputs'),
      filename: '[name].bundle.js',
      chunkFilename: '[name].chunk.js',
      publicPath: '/webpack/public/path/',
    },
    module: {
      rules: [
        {
          test: /\.js$/i,
          use: [
            {
              loader: path.resolve(__dirname, '../../src'),
              options: loaderOptions || {},
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            'css-loader',
            {
              loader: path.resolve(__dirname, '../../src'),
              options: loaderOptions || {},
            },
          ],
        },
      ],
    },
    optimization: {
      minimize: false,
    },
    plugins: [],
    ...config,
  };

  const compiler = webpack(fullConfig);

  if (!config.outputFileSystem) {
    const outputFileSystem = createFsFromVolume(new Volume());
    // Todo remove when we drop webpack@4 support
    outputFileSystem.join = path.join.bind(path);

    compiler.outputFileSystem = outputFileSystem;
  }

  return compiler;
};
