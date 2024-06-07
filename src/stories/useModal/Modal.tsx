import useModal from '@/useModal/useModal';
import React from 'react';
import { ModalContainer, Overlay, hideStyle, overlayHide, overlayShow, showStyle } from './Modal.css';

export default function Modal() {
  const { Modal, show, isShow, hide } = useModal({
    modalAnimation: {
      showClassName: showStyle,
      hideClassName: hideStyle,
    },
    overlayAnimation: {
      showClassName: overlayShow,
      hideClassName: overlayHide,
    },
  });

  const handleClick = () => {
    if (isShow) hide();
    show();
  };

  return (
    <div>
      <button onClick={handleClick}>{isShow ? 'hide' : 'show'}</button>
      <Modal overlayClassName={Overlay} modalClassName={ModalContainer}>
        <div>모달!</div>
        <button
          style={{
            fontSize: 10,
          }}
          onClick={hide}
        >
          닫기
        </button>
      </Modal>
    </div>
  );
}
