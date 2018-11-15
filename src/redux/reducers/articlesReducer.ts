import { getType } from 'typesafe-actions';
import { TActions } from '../actions/TActions';
import { articlesActions } from '../actions/articlesActions';
import { IArticles, IArticle } from '../../models/';

const initialState: IArticles = {
  articles: []
};

export const articlesReducer = (state: IArticles = initialState, action: TActions): IArticles => {
  switch (action.type) {
    case getType(articlesActions.addArticle): {
      return {
        ...state,
        articles: [...state.articles, action.payload]
      };
    }
    default:
      return state;
  }
};
