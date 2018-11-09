import * as Actions from '../action-types';
import { IArticle, IBaseAction } from '../reducers';

export const addArticle = (article: IArticle): IBaseAction<IArticle> => ({
  type: Actions.ADD_ARTICLE,
  payload: article
});
export const deleteArticles = (article: IArticle): IBaseAction<IArticle> => ({
  type: Actions.DELETE_ARTICLES,
  payload: article
});
