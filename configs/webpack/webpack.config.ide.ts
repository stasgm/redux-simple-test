import { getRootRelativePath } from './utils';

export const aliasPath = {
  app: getRootRelativePath('src/'),
  '@src': getRootRelativePath('src/'),
  '@components': getRootRelativePath('src/components'),
  '@model': getRootRelativePath('src/model'),
  '@redux': getRootRelativePath('src/redux'),
  '@configs': getRootRelativePath('configs'),
  configFile: getRootRelativePath('configs/config.json')
};
