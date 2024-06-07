import React, { CSSProperties, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useAnimation } from '..';
type ModalRoot = Element | DocumentFragment;

export type UseModalAnimations = {
  overlayAnimation?: {
    showClassName?: string;
    hideClassName?: string;
  };
  modalAnimation?: {
    showClassName?: string;
    hideClassName?: string;
  };
};

interface UseModalProps extends UseModalAnimations {
  modalRoot?: ModalRoot;
  overlayClose?: boolean;
}

interface ModalProps {
  overlayClassName?: string;
  modalClassName?: string;
  style?: CSSProperties;
  children: ReactNode;
}

const DefaultModal = ({ children, modalRoot }: { children: ReactNode; modalRoot?: ModalRoot }) => {
  return createPortal(children, modalRoot || document.body);
};

export default function useModal(modalProps?: UseModalProps) {
  const overlayClose = modalProps?.overlayClose || true;
  const ModalAnimation = useAnimation({
    mountClassName: modalProps?.modalAnimation?.showClassName,
    unmountClassName: modalProps?.modalAnimation?.hideClassName,
  });
  const OverlayAnimation = useAnimation({
    mountClassName: modalProps?.overlayAnimation?.showClassName,
    unmountClassName: modalProps?.overlayAnimation?.hideClassName,
  });

  const show = () => {
    OverlayAnimation.show();
    ModalAnimation.show();
  };

  const hide = () => {
    OverlayAnimation.hide();
    ModalAnimation.hide();
  };

  const Modal = ({ children, overlayClassName, modalClassName, style }: ModalProps) => (
    <DefaultModal modalRoot={modalProps?.modalRoot}>
      <OverlayAnimation.AnimationWrapper className={overlayClassName} onClick={overlayClose && hide}>
        <ModalAnimation.AnimationWrapper className={modalClassName} style={style} onClick={(e) => e.stopPropagation()}>
          {children}
        </ModalAnimation.AnimationWrapper>
      </OverlayAnimation.AnimationWrapper>
    </DefaultModal>
  );

  return { Modal, show, hide, isShow: OverlayAnimation.isShow };
}
