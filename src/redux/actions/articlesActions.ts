import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { IArticle } from '@src/models';

export const articlesActions = {
  addArticle: createAction('ADD_ARTICLE', resolve => {
    return (article: IArticle) => resolve(article);
  }),
  editArticle: createAction('EDIT_ARTICLE', resolve => {
    return (article: IArticle) => resolve(article);
  }),
  deleteArticle: createAction('DELETE_ARTICLE', resolve => {
    return (article: IArticle) => resolve(article);
  }),
  deleteArticles: createAction('DELETE_ARTICLES', resolve => {
    return () => resolve();
  }),
  loadArticles: createAsyncAction('REQUEST_LOAD_ARTICLES', 'REQUEST_LOAD_SUCCEEDED', 'REQUEST_LOAD_FAILED')<
    void,
    IArticle[],
    Error
  >(),
  saveArticles: createAsyncAction('REQUEST_SAVE_ARTICLES', 'REQUEST_SAVE_SUCCEEDED', 'REQUEST_SAVE_FAILED')<
    void,
    IArticle[],
    Error
  >()
};

export type TArticlesActions = ActionType<typeof articlesActions>;
