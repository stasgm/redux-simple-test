import React from 'react';
import { Modal } from 'antd';

interface IProps {
  visible: boolean;
  recordValue: string;
  modalText: string;
  onOk: () => void;
  onCancel: () => void;
}

export const ModalEdit: React.SFC<IProps> =props => {
    return (
      <div>
        <Modal
          title="Edit dialog"
          visible={props.visible}
          onOk={() => props.onOk}
          onCancel={() => props.onCancel}
        >
          <p>{props.modalText}</p>
          {props.children}
        </Modal>
      </div>
    );

}
