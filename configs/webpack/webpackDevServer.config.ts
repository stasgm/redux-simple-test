import path from 'path';
import { getRootRelativePath } from './utils';

const sourcePath = getRootRelativePath('src');

export const devServer = {
  contentBase: sourcePath,
  host: 'localhost',
  port: 3000,
  historyApiFallback: true,
  hot: true,
  inline: true,
  open: true,
  stats: {
    assets: false,
    children: false,
    colors: true,
    modules: false
  }
};
