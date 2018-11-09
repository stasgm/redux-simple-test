import { Configuration, EnvironmentPlugin, HotModuleReplacementPlugin, NamedModulesPlugin } from 'webpack';
import merge from 'webpack-merge';
import { CheckerPlugin } from 'awesome-typescript-loader';
import { devServer } from './webpackDevServer.config';
// import ErrorOverlayPlugin from 'error-overlay-webpack-plugin';

import { getRootRelativePath } from './utils';
import { getWebpackConfigBase, cssLoader, cssModulesLoader } from './webpackConfigBase';
import path from 'path';

const OUTPUT_FILENAME = 'scripts/[name].bundle.js';
const OUTPUT_CHUNK_FILENAME = 'scripts/[name].chunk.js';
const STYLES_PATH = getRootRelativePath('src/styles');

const config: Configuration = merge(getWebpackConfigBase(OUTPUT_FILENAME, OUTPUT_CHUNK_FILENAME), {
  devtool: 'cheap-module-source-map',
  mode: 'development',
  devServer,
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: getRootRelativePath('src'),
        use: [
          {
            loader: 'awesome-typescript-loader', // 'ts-loader',
            options: {
              useCache: true,
              useBabel: true,
              babelOptions: {
                babelrc: false,
                plugins: ['react-hot-loader/babel', '@babel/plugin-syntax-dynamic-import']
              },
              babelCore: '@babel/core',
              forceIsolatedModules: true, // todo
              transpileOnly: false
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      // styles
      {
        test: /\.css$/,
        include: STYLES_PATH,
        use: ['style-loader', cssLoader]
      },
      // sass/css
      {
        test: /\.css$/,
        include: getRootRelativePath('src'),
        exclude: STYLES_PATH,
        use: ['style-loader', cssModulesLoader]
      }
    ]
  },
  plugins: [
    // new ErrorOverlayPlugin(),
    // TODO
    new CheckerPlugin(),
    // new ForkTsCheckerWebpackPlugin({
    //   checkSyntacticErrors: true, // HappyPack
    // }),
    new EnvironmentPlugin({
      NODE_ENV: 'development'
    }),
    new HotModuleReplacementPlugin(), // TODO test hot: true
    // prints more readable module names in the browser console on HMR updates
    new NamedModulesPlugin()
  ],
  context: path.resolve(__dirname, '../../') // to auto find tsconfig.json
});

// tslint:disable-next-line no-default-export
export default config;
