import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { rootReducer, IRootState } from '../reducers/';

const middleware = [thunk, logger];

export const configureStore = (initialState: Partial<IRootState> = {}) => {
  return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
}
