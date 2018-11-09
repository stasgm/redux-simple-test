import * as Actions from '../action-types';

export interface IBaseAction<T> {
  type: string;
  payload: T;
}

export interface IArticle {
  key: string;
  name: string;
}

export interface IRootState {
  articles: IArticle[];
}

export const createDefaultState = (): IRootState => ({
  articles: []
});

export const rootReducer = (state = createDefaultState(), action: IBaseAction<IArticle>): IRootState => {
  switch (action.type) {
    case Actions.ADD_ARTICLE:
    return {
        ...state,
        articles: [...state.articles || [], action.payload]
      };
    case Actions.DELETE_ARTICLES:
    return {
        ...state,
        articles: []
      };
    default:
      return state;
  }
};
