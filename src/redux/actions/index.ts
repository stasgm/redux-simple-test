import { ADD_ARTICLE } from "../action-types";
import { IArticle, IBaseAction } from '../reducers'

export const addArticle = (article: IArticle): IBaseAction<IArticle> => ({ type: ADD_ARTICLE, payload: article });
