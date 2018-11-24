import React, { Props } from 'react';
import { Articles } from '../articles/';
import './main.scss';

export const App = () => {
  return (
    <div className="main-container">
      <Articles />
    </div>
  );
};
