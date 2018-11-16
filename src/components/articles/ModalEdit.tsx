import React from 'react';
import { Modal, Input } from 'antd';

import { IArticle } from '@src/models'

interface IProps {
  visible: boolean;
  recordValue: IArticle | null;
  modalText: string;
  onOk: () => void;
  onCancel: () => void;
}

export const ModalEdit: React.SFC<IProps> = props => {
    return (
      <div>
        <Modal
          title="Edit dialog"
          visible={props.visible}
          onOk={props.onOk}
          onCancel={props.onCancel}
        >
          <p>{props.modalText}</p>
          {props.children}
        </Modal>
      </div>
    );

}
