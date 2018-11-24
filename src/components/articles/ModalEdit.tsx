import React, { ReactChildren } from 'react';
import { Modal, Input } from 'antd';

import { IArticle } from '@src/models'

interface IProps {
  visible: boolean;
  recordValue: IArticle | null;
  modalText: string;
  onOk: () => void;
  onCancel: () => void;
}

export const ModalEdit = (props: IProps, children: ReactChildren) => {
    return (
      <div>
        <Modal
          title="Edit dialog"
          visible={props.visible}
          onOk={props.onOk}
          onCancel={props.onCancel}
        >
          <p>{props.modalText}</p>
          {children}
        </Modal>
      </div>
    );

}
