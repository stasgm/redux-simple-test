import { getType } from 'typesafe-actions';
import { TActions } from '../actions/TActions';
import { articlesActions } from '../actions/articlesActions';
import { IArticles, IArticle } from '../../models/';

const initialState: IArticles = {
  list: [],
  filter: ''
};

export const articlesReducer = (state: IArticles = initialState, action: TActions): IArticles => {
  switch (action.type) {
    case getType(articlesActions.addArticle): {
      return {
        ...state,
        list: [action.payload, ...state.list]
      };
    }
    case getType(articlesActions.editArticle): {
      return {
        ...state,
        list: state.list.map(itm => (itm.key === action.payload.key ? action.payload : itm))
      };
    }
    case getType(articlesActions.deleteArticle): {
      return {
        ...state,
        list: state.list.filter((itm: IArticle) => itm.key !== action.payload.key)
      };
    }
    case getType(articlesActions.deleteArticles): {
      return {
        ...state,
        list: []
      };
    }
    default:
      return state;
  }
};
