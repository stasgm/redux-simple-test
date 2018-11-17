import React from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { Button, Table, Input, message, Modal, Spin, Alert } from 'antd';
// import { firestore } from 'firebase';

import { articlesActions } from '@src/redux/actions/articlesActions';
import { IRootState, IArticle } from '@src/models';
import { firebaseDB } from '@src/firestore/firestore';
import { ModalEdit } from './ModalEdit';

import './styles.scss';

interface IModal {
  visible: boolean;
  recordValue: IArticle | null;
  modalText: string;
}

interface IProps {
  onAdd: (article: IArticle) => void;
  onEdit: (article: IArticle) => void;
  onDelete: (article: IArticle) => void;
  onDeleteAll: () => void;
  onLoad: () => void;
  articles: IArticle[];
  isLoading: boolean;
  hasErrored: boolean;
}

interface IState {
  inputText: string;
  isInputError: boolean;
  modal: IModal;
}

const textInput = React.createRef<Input>();

/* const error = () => {
  message.error('Ошибка загрузки');
}; */

class ArticlesConnected extends React.Component<IProps, IState> {
  public state: Readonly<IState> = {
    inputText: '',
    isInputError: false,
    modal: {
      visible: false,
      modalText: '',
      recordValue: null
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
      title: 'Подтверждение',
      content: `Удалить запись '${record.name}''?`,
      onOk() {
        deleteArticle(record);
      }
    });
  };

  private handleClickDeleteAll = (deleteArticles: () => void) => {
    Modal.confirm({
      title: 'Подтверждение',
      content: 'Удалить все записи?',
      onOk() {
        deleteArticles();
      }
    });
  };

  private handleDeleteAll = () => {
    this.handleClickDeleteAll(this.props.onDeleteAll);
    this.setState({ isInputError: false });
    if (textInput.current) textInput.current.focus();
  };

  private handleEditModalOk = () => {
    if (this.state.modal.recordValue) {
      this.props.onEdit(this.state.modal.recordValue);
    }
    this.handleEditModalCancel();
  };

  private handleEditModalCancel = () => {
    this.setState({ ...this.state, modal: { ...this.state.modal, visible: false } });
  };

  private handleEditModal = (record: IArticle) => {
    this.setState({ ...this.state, modal: { ...this.state.modal, recordValue: record } });
  };

  private handleEdit = (record: IArticle) => {
    this.setState({ modal: { visible: true, recordValue: record, modalText: 'Редактирование записи' } });
  };

  private handleGetData = () => {
    this.props.onLoad();
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
        <Table
          className="table"
          columns={this.columns}
          size="small"
          bordered={true}
          dataSource={this.props.articles}
          loading={this.props.isLoading}
        />
        <ModalEdit {...this.state.modal} onOk={() => this.handleEditModalOk()} onCancel={this.handleEditModalCancel}>
          <Input
            value={this.state.modal.recordValue ? this.state.modal.recordValue.name : ''}
            onChange={e =>
              this.handleEditModal({
                name: e.currentTarget.value,
                key: this.state.modal.recordValue ? this.state.modal.recordValue.key : ''
              })
            }
          />
        </ModalEdit>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  articles: state.articles.list,
  isLoading: state.articles.isLoading,
  hasErrored: state.articles.hasErrored,
});

export const Articles = connect(
  mapStateToProps,
  {
      onAdd: (article: IArticle) => articlesActions.addArticle(article),
      onEdit: (article: IArticle) => articlesActions.editArticle(article),
      onDelete: (article: IArticle) => articlesActions.deleteArticle(article),
      onDeleteAll: () => articlesActions.deleteArticles(),
      onLoad: () => fetchData()
  }
)(ArticlesConnected);

const fetchData = () => {
  return (dispatch: any) => {
    dispatch(articlesActions.loadArticles.request());
    return setTimeout(()=> {
      dispatch(message.error('Ошибка загрузки'));
      dispatch(articlesActions.loadArticles.failure(Error('Ошибка загрузки')));
      // dispatch(articlesActions.loadArticles.success([{key: 'zero', name: 'test'}]));
    }, 1000)
  }
}
