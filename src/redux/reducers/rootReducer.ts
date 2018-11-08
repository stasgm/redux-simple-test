import { ADD_ARTICLE } from '../action-types';

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
    case ADD_ARTICLE:
      const newState: IRootState = {
        ...state,
        articles: [...state.articles || [], action.payload]
      };
      return newState;
    default:
      return state;
  }
};
