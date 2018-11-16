import React from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { Button, Table, Input, message, Modal } from 'antd';
// import { firestore } from 'firebase';

import { articlesActions } from '@src/redux/actions/articlesActions';
import { IRootState } from '@src/redux/reducers';
import { IArticle, IArticles } from '@src/models';
import { firebaseDB } from '@src/firestore/firestore';
import { ModalEdit } from './ModalEdit';

import './styles.scss';

interface IModal {
  visible: boolean;
  recordValue: string;
  modalText: string;
}

interface IProps {
  onAdd: (article: IArticle) => void;
  onDelete: (article: IArticle) => void;
  onDeleteAll: () => void;
  articles: IArticle[];
}

interface IState {
  inputText: string;
  isInputError: boolean;
  // data: IData[];
  modal: IModal;
}

const textInput = React.createRef<Input>();

class ArticlesConnected extends React.Component<IProps, IState> {
  public state: Readonly<IState> = {
    inputText: '',
    isInputError: false,
    // data: [],
    modal: {
      visible: false,
      modalText: '',
      recordValue: ''
    }
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
      render: (text: any, record: IArticle) => (
        <div style={{ display: 'flex' }}>
          <div className="record-text" style={{ width: '100%', alignSelf: 'center' }}>
            {record.name}
          </div>
          <div
            className="record-edit-container"
            style={{ display: 'flex', justifyContent: 'flex-end', width: '100px' }}
          >
            <Button.Group>
              <Button icon="edit" onClick={() => this.handleEdit(record)} />
              <Button icon="delete" onClick={() => this.handleClickDelete(this.props.onDelete, record)} />
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

  private handleClickDelete = (deleteArticle: (record: IArticle) => void, record: IArticle) => {
    Modal.confirm({
      title: 'Confirmation',
      content: `Удалить '${record.name}''?`,
      onOk() {
        deleteArticle(record);
      }
    });
  };

  private handleDeleteAll = () => {
    this.props.onDeleteAll();
    this.setState({ isInputError: false });
    if (textInput.current) textInput.current.focus();
  };

  private handleModalOk = () => {
    console.log('cancel');
    this.handleModalCancel();
  };

  private handleModalCancel = () => {
    this.setState({ ...this.state, modal: { ...this.state.modal, visible: false } });
  };

  private handleEditModal = (record: string) => {
    this.setState({ ...this.state, modal: { ...this.state.modal, recordValue: record } });
  };

  private handleEdit = (record: IArticle) => {
    this.setState({ modal: { visible: true, recordValue: record.name, modalText: 'Редактирование записи' } });
  };

  private handleGetData = () => {
    // this.setState({ IArticle: [] });
    // this.props.onDeleteAll();
    /*     const db = firebaseDB.firestore();
    db.settings({ timestampsInSnapshots: true });
    db.collection('list').onSnapshot((snapshot: firestore.QuerySnapshot) => {
      snapshot.docs.map((docSnapshot: firestore.QueryDocumentSnapshot) => {
        const { key, name } = docSnapshot.data();

        this.setState({ ...this.state, data: [...this.state.data, { key, name }] });

        this.props.onAdd({ key, name });
      });
    });
 */
    // this.props.onLoad(this.state.data);
  };

  private handleSaveData = () => {
    const db = firebaseDB.firestore();
    db.settings({ timestampsInSnapshots: true });

    this.props.articles.forEach((i: IArticle) => {
      db.collection('list').add({
        key: i.key,
        name: i.name
      });
    });
  };

  public render() {
    return (
      <div className="content-container">
        <div className="input-container">
          <div className="input-box-container">
            <Input
              style={{ borderColor: this.state.isInputError ? 'red' : '' }}
              onChange={e => this.setState({ inputText: e.target.value, isInputError: false })}
              value={this.state.inputText}
              placeholder="Enter something good"
              ref={textInput}
              autoFocus={true}
              onKeyUp={event => {
                if (event.key === 'Enter') {
                  this.handleAdd();
                }
              }}
            />
          </div>
          <div className="button-container">
            <Button onClick={this.handleAdd}>Add</Button>
            <Button onClick={this.handleDeleteAll}>Delete all</Button>
            <Button onClick={this.handleGetData}>Load</Button>
            <Button onClick={this.handleSaveData}>Save</Button>
          </div>
        </div>
        <Table className="table" columns={this.columns} size="small" bordered={true} dataSource={this.props.articles} />
        <ModalEdit {...this.state.modal} onOk={this.handleModalOk} onCancel={this.handleModalCancel}>
          <Input value={this.state.modal.recordValue} onChange={e => this.handleEditModal(e.currentTarget.value)} />
        </ModalEdit>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  articles: state.articles.list
});

export const Articles = connect(
  mapStateToProps,
  {
    onAdd: (article: IArticle) => articlesActions.addArticle(article),
    onDelete: (article: IArticle) => articlesActions.deleteArticle(article),
    onDeleteAll: () => articlesActions.deleteArticles()
  }
)(ArticlesConnected);
