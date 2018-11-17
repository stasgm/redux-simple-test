import { combineReducers } from 'redux';
import { articlesReducer } from './articlesReducer';
import { IRootState } from '@src/models/';

export const rootReducer = combineReducers<IRootState>({
  articles: articlesReducer
});
