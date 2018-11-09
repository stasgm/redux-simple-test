import React from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { Button, Table, Input, message, AutoComplete } from 'antd';
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

const textInput = React.createRef<Input>();

class ArticlesConnected extends React.Component<IProps, IState> {
  public state: Readonly<IState> = {
    inputText: '',
    isInputError: false
  };

  private handleAdd = () => {
    if (this.state.inputText.length === 0) {
      message.error(`Don't try to hack the system!`);

      if (textInput.current) textInput.current.focus();

      this.setState({ isInputError: true });
    } else {
      message.success('Nice work, good boy!');

      if (textInput.current) textInput.current.focus();

      this.props.onAdd({ name: this.state.inputText, key: shortid() });
      this.setState({ inputText: '' });
    }
  };

  private handleDeleteAll = () => {
    this.props.onDeleteAll({ key: '0', name: '' });
    this.setState({ isInputError: false });
    if (textInput.current) textInput.current.focus();
  };

  public render() {
    return (
      <div className="content">
        <div className="inputBox">
          <Input
            style={{ borderColor: this.state.isInputError ? 'red' : '' }}
            onChange={e => this.setState({ inputText: e.target.value, isInputError: false })}
            value={this.state.inputText}
            placeholder="Enter something good"
            ref={textInput}
            autoFocus={true}
          />
          <div className="buttons">
            <Button onClick={this.handleAdd}>Add</Button>
            <Button onClick={this.handleDeleteAll}>Delete all</Button>
          </div>
        </div>
        <Table className="table" columns={columns} bordered={true} size="small" dataSource={this.props.list} />
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
