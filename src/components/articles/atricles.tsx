import React from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { Button, Table, Input, Modal, message } from 'antd';

import { articlesActions } from '@src/redux/actions/articlesActions';
import { IRootState, IArticle } from '@src/models';
import { ModalEdit } from './ModalEdit';
import { firestoreApi } from './api';

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
  onSave: (article: IArticle[]) => void;
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
  };

  private handleSaveData = () => {
    this.props.onSave(this.props.articles);
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
  hasErrored: state.articles.hasErrored
});

export const Articles = connect(
  mapStateToProps,
  {
    onAdd: (article: IArticle) => articlesActions.addArticle(article),
    onEdit: (article: IArticle) => articlesActions.editArticle(article),
    onDelete: (article: IArticle) => articlesActions.deleteArticle(article),
    onDeleteAll: () => articlesActions.deleteArticles(),
    onLoad: () => fetchData(),
    onSave: (articles: IArticle[]) => saveData(articles)
  }
)(ArticlesConnected);

const fetchData = () => {
  return async (dispatch: any) => {
    dispatch(articlesActions.loadArticles.request());
    try {
      const res = await firestoreApi.load();
      dispatch(articlesActions.loadArticles.success(res));
    } catch (err) {
      dispatch(articlesActions.loadArticles.failure(err));
      dispatch(message.error('Ошибка загрузки данных'));
    }
  };
};

const saveData = (list: IArticle[]) => {
  return async (dispatch: any) => {
    dispatch(articlesActions.saveArticles.request());
    try {
      await firestoreApi.deleteAll();
      await firestoreApi.save(list);
      dispatch(articlesActions.saveArticles.success());
    } catch (err) {
      dispatch(articlesActions.saveArticles.failure(err));
      dispatch(message.error('Ошибка сохранения данных'));
    }
  };
};