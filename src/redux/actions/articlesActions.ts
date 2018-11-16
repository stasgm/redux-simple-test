import { ActionType, createAction } from 'typesafe-actions';
import { IArticle } from '@src/models';

export const articlesActions = {
  addArticle:  createAction('ADD_ARTICLE', resolve => {
    return (article: IArticle) => resolve(article);
  }),
  deleteArticle:  createAction('DELETE_ARTICLE', resolve => {
    return (article: IArticle) => resolve(article);
  }),
  deleteArticles:  createAction('DELETE_ARTICLES', resolve => {
    return () => resolve();
  }),



/*   export const ADD_ARTICLE = "ADD_ARTICLE";
  export const DELETE_ARTICLES = "DELETE_ARTICLES";
  export const DELETE_ARTICLE = "DELETE_ARTICLE";
  export const LOAD_ARTICLES= "LOAD_ARTICLES";
 */
}

export type TArticlesActions = ActionType<typeof articlesActions>
