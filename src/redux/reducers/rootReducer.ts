import { combineReducers } from 'redux';
import { IArticle } from '@src/models';
import * as Actions from '../actions';

export interface IBaseAction<T> {
  type: string;
  payload: T;
}

export interface IRootState {
  articles: IArticle[];
  visibiltyFilter: [];
}

/* export const createDefaultState = (): IRootState => ({
  articles: [],
  visibiltyFilter: []
}); */

export const visibiltyReducer = (
  state = [],
  action: IBaseAction<IArticle>
): IRootState => {
  return state;
};

export const articlesReducer = (
  state = [],
  action: IBaseAction<IArticle>
): IRootState => {
  return state
/*   switch (action.type) {
    case Actions.ADD_ARTICLE:
      return {
        ...state,
        articles: [...(state.articles || []), action.payload]
      };
    case Actions.DELETE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter(itm => itm.name !== action.payload.key)
      };
    case Actions.DELETE_ARTICLES:
      return {
        ...state,
        articles: []
      };
    default:
      return state;
  } */
};

export const rootReducer = combineReducers<IRootState>({ articles: articlesReducer, visibiltyFilter: visibiltyReducer });
