import React, { Props } from 'react';
import {Articles} from '../articles/'
import './main.scss';

/* export interface IProps {}

export interface IMainState {} */



export class App extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="main-container">
        Test
        <Articles />
      </div>
    );
  }
}
