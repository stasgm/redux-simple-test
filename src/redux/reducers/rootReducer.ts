import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';

import * as Actions from '../actions/articlesActions';
import { articlesReducer } from './articlesReducer';
import { IArticles, IArticle } from '../../models/';

export interface IBaseAction<T> {
  type: string;
  payload: T;
}

export interface IRootState {
  articles: IArticles;
}

/* export const createDefaultState = (): IRootState => ({
  articles: [],
  visibiltyFilter: []
}); */

/* export const visibiltyReducer = (
  state = [],
  action: IBaseAction<IArticle>
): IRootState => {
  return state;
};
 */

export const rootReducer = combineReducers<IRootState>({
  articles: articlesReducer
});
