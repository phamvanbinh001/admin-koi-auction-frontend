import React from 'react';
import { Modal } from 'antd';

const ConfirmPopup = ({ open, onConfirm, onCancel, title, content }) => {
  return (
    <Modal title={title} open={open} onOk={onConfirm} onCancel={onCancel} okText="Confirm" cancelText="Cancel">
      <p>{content}</p>
    </Modal>
  );
};

export default ConfirmPopup;
