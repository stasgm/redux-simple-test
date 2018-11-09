import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store/configureStore';
import { App } from '@src/components';

import './styles/index.scss';
import config from '../configs/config.json';

const store = configureStore({});

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>, document.getElementById(config.webpack.appMountNodeId) as HTMLElement,
);
