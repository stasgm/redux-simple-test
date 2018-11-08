import { Configuration, NoEmitOnErrorsPlugin, RuleSetLoader } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import config from '../config.json';
import pkg from '../../package.json';
import { getRootRelativePath } from './utils';

function getWebpackConfigBase(outputFilename: string, outputChunkFilename: string): Configuration {
  return {
    entry: {
      app: [
        // TODO 'react-hot-loader/patch',
        getRootRelativePath('src/index.tsx')
      ]
    },
    output: {
      path: getRootRelativePath(config.webpack.buildPath),
      publicPath: '',
      filename: outputFilename,
      chunkFilename: outputChunkFilename
    },
    plugins: [
      new HtmlWebpackPlugin({
        favicon: getRootRelativePath('src/assets/favicon.png'),
        inject: false,
        minify: { collapseWhitespace: true, removeComments: true },
        template: getRootRelativePath('src/index.ejs'),
        title: 'WEB SCRAPE',
        // template params
        appMountNodeId: config.webpack.appMountNodeId,
        description: pkg.description,
        mobile: true
      }),
      new NoEmitOnErrorsPlugin()
    ],
    resolve: {
      alias: {
        app: getRootRelativePath('src/'),
        '@common': getRootRelativePath('src/common'),
        '@components': getRootRelativePath('src/components'),
        '@containers':  getRootRelativePath('src/containers'),
        '@actions':  getRootRelativePath('src/actions'),
        '@reducers':  getRootRelativePath('src/reducers'),
        '@src': getRootRelativePath('src'),
        configFile: getRootRelativePath('configs/config.json')
      },
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json']
    }
  };
}

const cssLoader: RuleSetLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true
  }
};

const cssModulesLoader: RuleSetLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    sourceMap: true,
    importLoaders: 1,
    localIdentName: '[name]__[local]__[hash:base64:5]'
  }
};

export { getWebpackConfigBase, cssLoader, cssModulesLoader };
