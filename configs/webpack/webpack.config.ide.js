import path from 'path';

module.exports = {
  resolve: {
    alias: {
      '@src': path.join(__dirname, '../../src'),
      '@components': path.join(__dirname, '../../src/components'),
      '@reducers': path.join(__dirname, '../../src/redux/reducers'),
      configFile: path.join(__dirname, '../config.json')
    }
  }
};
