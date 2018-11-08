import React from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { Button, Table, Input, Alert } from 'antd';
import { addArticle } from '../../redux/actions';
import { IRootState, IArticle } from '../../redux/reducers';

const columns = [
  {
    title: 'Номер',
    dataIndex: 'key',
    key: 'key'
  },
  {
    title: 'Наименование',
    dataIndex: 'name',
    key: 'name'
  }
];

interface IProps {
  onAdd: (article: IArticle) => {};
  list: any;
}

interface IState {
  inputText: string;
}

class ArticlesConnected extends React.Component<IProps, IState> {

  public state: Readonly<IState> ={
    inputText: ''
  }

  private handleAdd = () => {
    this.props.onAdd({ name: this.state.inputText, key: shortid() });
    this.setState({ inputText: '' });
  };

  public render() {
    return (
      <div>
        <Input
          width="100px"
          onChange={e => this.setState({ inputText: e.target.value })}
          value={this.state.inputText}
        />
        <Button type="primary" onClick={this.handleAdd}>
          Add
        </Button>
        <Table columns={columns} dataSource={this.props.list} size="small" />
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
    onAdd: (article: IArticle) => addArticle(article)
  }
)(ArticlesConnected);
