/* ACTIONS */
export const ADD_ARTICLE = "ADD_ARTICLE";
export const DELETE_ARTICLES = "DELETE_ARTICLES";
export const DELETE_ARTICLE = "DELETE_ARTICLE";
export const LOAD_ARTICLES= "LOAD_ARTICLES";

import { IBaseAction } from '../reducers';
import { IArticle } from '@src/models';

/* ACTION CREATORS */

export const addArticle = (article: IArticle): IBaseAction<IArticle> => ({
  type: ADD_ARTICLE,
  payload: article
});

export const deleteArticles = (): IBaseAction<{}> => ({
  type: DELETE_ARTICLES,
  payload: {}
});

export const deleteArticle = (key: string): IBaseAction<{key: string}> => ({
  type: DELETE_ARTICLES,
  payload: {key}
});

export const loadArticles = (articles: IArticle[]): IBaseAction<IArticle[]> => ({
  type: LOAD_ARTICLES,
  payload: articles
});
