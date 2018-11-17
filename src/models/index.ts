export interface IArticle {
  key: string;
  name: string;
}

export interface IArticles {
  list: IArticle[];
  filter: string;
  hasErrored: boolean;
  isLoading: boolean;
}

export interface IBaseAction<T> {
  type: string;
  payload: T;
}

export interface IRootState {
  articles: IArticles;
}

