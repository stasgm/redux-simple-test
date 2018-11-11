import React, { Props } from 'react';
import {Articles} from '../articles/'
import './main.scss';

export class App extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="main-container">
        Simple react-redux-typescript CRUD example
        <Articles />
      </div>
    );
  }
}
