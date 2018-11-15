import { ActionType, createAction } from 'typesafe-actions';
import { IArticles, IArticle} from '@src/models';

export const articlesActions = {
  addArticle:  createAction('ADD_ARTICLE', resolve => {
    return (article: IArticle) => resolve(article);
  })

/*   export const ADD_ARTICLE = "ADD_ARTICLE";
  export const DELETE_ARTICLES = "DELETE_ARTICLES";
  export const DELETE_ARTICLE = "DELETE_ARTICLE";
  export const LOAD_ARTICLES= "LOAD_ARTICLES";
 */
}

export type TArticlesActions = ActionType<typeof articlesActions>
