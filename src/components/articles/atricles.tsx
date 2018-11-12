import React from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { Button, Table, Input, message, Modal } from 'antd';
import { firestore } from 'firebase';
import MediaQuery from 'react-responsive';
import { addArticle, deleteArticles, loadArticles } from '../../redux/actions';
import { IRootState, IArticle } from '../../redux/reducers';
import { firebaseDB } from '../../firestore/firestore';

import './styles.scss';

interface IData {
  key: string;
  name: string;
}

interface IProps {
  onAdd: (article: IArticle) => void;
  onDeleteAll: (article: IArticle) => void;
  onLoad: (articles: IArticle[]) => void;
  list: IArticle[];
}

interface IState {
  inputText: string;
  isInputError: boolean;
  data: IData[];
}

const textInput = React.createRef<Input>();

class ArticlesConnected extends React.Component<IProps, IState> {
  public state: Readonly<IState> = {
    inputText: '',
    isInputError: false,
    data: []
  };

  private columns = [
    /*   {
        title: 'Номер',
        dataIndex: 'key',
        key: 'key',
        width: '25%'
      }, */
    {
      title: 'Наименование',
      dataIndex: 'name',
      key: 'name',
      render: (text: any, record: IData) => (
        <div style={{ display: 'flex' }}>
          <div className="record-text" style={{ width: '100%', alignSelf: 'center' }}>
            {record.name}
          </div>
          <div
            className="record-edit-container"
            style={{ display: 'flex', justifyContent: 'flex-end', width: '100px' }}
          >
            <Button.Group>
              <Button icon="edit" />
              <Button icon="delete" onClick={() => this.handleClickDelete(record.key)} />
            </Button.Group>
          </div>
        </div>
      )
    }
  ];

  private handleAdd = () => {
    if (this.state.inputText.length === 0) {
      // message.error(`Don't try to hack the system!`, 0.5);
      if (textInput.current) textInput.current.focus();
      this.setState({ isInputError: true });
    } else {
      // message.success('Nice work, good boy!', 0.5);
      if (textInput.current) textInput.current.focus();
      this.props.onAdd({ name: this.state.inputText, key: shortid() });
      this.setState({ inputText: '' });
    }
  };

  private handleClickDelete = (key: string) => {
    Modal.confirm({
      title: 'Confirmation',
      content: 'Do you want to delete these items?',
      onOk() {
        console.log(`deleted ${key}`);
      }
    });
  };

  private handleDeleteAll = () => {
    this.props.onDeleteAll({ key: '0', name: '' });
    this.setState({ isInputError: false });
    if (textInput.current) textInput.current.focus();
  };

  private handleEdit = (key: string) => {
    console.log('edit', key);
  };

  private handleGetData = () => {
    this.setState({ data: [] });
    this.props.onDeleteAll({ key: '', name: '' });

    const db = firebaseDB.firestore();
    db.settings({ timestampsInSnapshots: true });
    db.collection('list').onSnapshot((snapshot: firestore.QuerySnapshot) => {
      snapshot.docs.map((docSnapshot: firestore.QueryDocumentSnapshot) => {
        const { key, name } = docSnapshot.data();

        this.setState({ ...this.state, data: [...this.state.data, { key, name }] });

        this.props.onAdd({ key, name });
      });
    });

    // this.props.onLoad(this.state.data);
  };

  private handleSaveData = () => {
    const db = firebaseDB.firestore();
    db.settings({ timestampsInSnapshots: true });

    this.props.list.forEach((i: IArticle) => {
      db.collection('list').add({
        key: i.key,
        name: i.name
      });
    });
  };

  private buttons = (
    <>
      <Button onClick={this.handleAdd}>Add</Button>
      <Button onClick={this.handleDeleteAll}>Delete all</Button>
      <Button onClick={this.handleGetData}>Load</Button>
      <Button onClick={this.handleSaveData}>Save</Button>
    </>
  );

  private desktopView = () => (
    <>
      <div className="input-container desktop">
        <div className="input-box-container">
          <Input
            style={{ borderColor: this.state.isInputError ? 'red' : '' }}
            onChange={e => this.setState({ inputText: e.target.value, isInputError: false })}
            value={this.state.inputText}
            placeholder="Enter something good"
            ref={textInput}
            autoFocus={true}
          />
        </div>
        <div className="button-container">{this.buttons}</div>
      </div>
      <Table className="table nl" columns={this.columns} bordered={true} dataSource={this.props.list} />
    </>
  );

  private mobileView = () => (
    <>
      <div className="input-container mobile">
        <div className="input-box">
          <Input
            style={{ borderColor: this.state.isInputError ? 'red' : '' }}
            onChange={e => this.setState({ inputText: e.target.value, isInputError: false })}
            value={this.state.inputText}
            placeholder="Enter something"
            ref={textInput}
            autoFocus={true}
          />
        </div>
        <div className="button-container">{this.buttons}</div>
      </div>
      <Table className="table xs" columns={this.columns} size="small" bordered={true} dataSource={this.props.list} />
    </>
  );

  public render() {
    return (
      <div className="main-container">
        <div className="input-container">
          <div className="input-box-container">
            <Input
              style={{ borderColor: this.state.isInputError ? 'red' : '' }}
              onChange={e => this.setState({ inputText: e.target.value, isInputError: false })}
              value={this.state.inputText}
              placeholder="Enter something good"
              ref={textInput}
              autoFocus={true}
            />
          </div>
          <div className="button-container">{this.buttons}</div>
        </div>
        <Table className="table nl" columns={this.columns} bordered={true} dataSource={this.props.list} />
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
    onLoad: (articles: IArticle[]) => loadArticles(articles),
    onDeleteAll: (article: IArticle) => deleteArticles(article)
  }
)(ArticlesConnected);
