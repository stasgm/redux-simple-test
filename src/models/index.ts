export interface IArticle {
  key: string;
  name: string;
}

export interface IArticles {
  list: IArticle[];
  filter: string;
}

