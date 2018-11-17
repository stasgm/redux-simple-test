import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers/';

const middleware = [thunk, logger];
//  Partial<IRootState> =
export const configureStore = (initialState: {}) => {
  const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
  // webpack HMR for reducers
  if ((<any>module).hot) {
    (<any>module).hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }
  return store;
}
