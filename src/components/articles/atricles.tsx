import React from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { Button, Table, Input, Alert } from 'antd';
import { addArticle, deleteArticles } from '../../redux/actions';
import { IRootState, IArticle } from '../../redux/reducers';

import './styles.scss';

const columns = [
  {
    title: 'Номер',
    dataIndex: 'key',
    key: 'key'
  },
  {
    title: 'Наименование',
    dataIndex: 'name',
    key: 'name',
    width: '50%'
  }
];

interface IProps {
  onAdd: (article: IArticle) => void;
  onDeleteAll: (article: IArticle) => void;
  list: any;
}

interface IState {
  inputText: string;
  isInputError: boolean;
}

class ArticlesConnected extends React.Component<IProps, IState> {
  public state: Readonly<IState> = {
    inputText: '',
    isInputError: false
  };

  private handleAdd = () => {
    if (this.state.inputText.length === 0) {
      this.setState({ isInputError: true });
    } else {
      this.props.onAdd({ name: this.state.inputText, key: shortid() });
      this.setState({ inputText: '' });
    }
  };

  public render() {
    return (
      <div style={{ margin: '10px 10px 10px 10px'}}>
        <div className="inputBox">
          <Input
            style={{ width: 'auto', borderColor: this.state.isInputError ? 'red': ''}}
            onChange={e => this.setState({ inputText: e.target.value, isInputError: false })}
            value={this.state.inputText}
            placeholder="Enter something good"
          />
          <Button onClick={this.handleAdd} style={{ marginLeft: '10px' }}>
            Add
          </Button>
          <Button onClick={() => this.props.onDeleteAll({key: '0', name: ''})} style={{ marginLeft: '10px' }}>
            Delete all
          </Button>
        </div>
        <Table columns={columns} bordered={true} size="small" dataSource={this.props.list} style={{ marginTop: '10px'}}/>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  list: state.articles
});

export const Articles = connect(
  mapStateToProps,
  {
    onAdd: (article: IArticle) => addArticle(article),
    onDeleteAll: (article: IArticle) => deleteArticles(article)
  }
)(ArticlesConnected);
