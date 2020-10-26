import React from 'react';
import { Modal } from 'react-bootstrap';

type PopupProps = {
  show: boolean;
  onHide?;
};

export const Popup: React.FC<PopupProps> = ({ children, ...props }) => {
  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>{children}</Modal.Title>
      </Modal.Header>
    </Modal>
  );
};
