import useModal from './useModal';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

const SHOW_CLASSNAME = 'show';
const HIDE_CLASSNAME = 'hide';

describe('useModal 기능 테스트', () => {
  it('modal을 열면 portal을 통해 element 내부에 렌더링 할 수 있다.', async () => {
    const Test = () => {
      const { Modal, show, hide } = useModal();
      return (
        <div>
          <button role="show" onClick={show}>
            SHOW
          </button>
          <button role="hide" onClick={hide}>
            SHOW
          </button>
          <Modal>
            <div role="test"></div>
          </Modal>
        </div>
      );
    };
    render(<Test />);
    fireEvent.click(await screen.findByRole('show'));
    expect(await screen.findByRole('test')).toBeTruthy();
  });

  it('overlayClose가 true인 경우, overlay를 눌러 modal을 닫을 수 있다.', async () => {
    const Test = () => {
      const { Modal, show, hide } = useModal();
      return (
        <div>
          <button role="show" onClick={show}>
            SHOW
          </button>
          <button role="hide" onClick={hide}>
            SHOW
          </button>
          <Modal>
            <div role="test"></div>
            <button role="modal-hide" onClick={hide}>
              SHOW
            </button>
          </Modal>
        </div>
      );
    };
    render(<Test />);
    fireEvent.click(await screen.findByRole('show'));
    expect(await screen.findByRole('test')).toBeTruthy();
    fireEvent.click(await screen.findByRole('hide'));
    await expect(screen.findByRole('test')).rejects.toThrow();

    fireEvent.click(await screen.findByRole('show'));
    expect(await screen.findByRole('test')).toBeTruthy();
    fireEvent.click(await screen.findByRole('modal-hide'));
    await expect(screen.findByRole('test')).rejects.toThrow();

    fireEvent.click(await screen.findByRole('show'));
    const modalInner = await screen.findByRole('test');
    fireEvent.click(modalInner!.parentElement!.parentElement!);
    await expect(screen.findByRole('test')).rejects.toThrow();
  });

  it('overlayClose가 false인 경우, overlay를 누르면 modal이 닫히지 않는다.', async () => {
    const Test = () => {
      const { Modal, show, hide } = useModal({ overlayClose: false });
      return (
        <div>
          <button role="show" onClick={show}>
            SHOW
          </button>
          <button role="hide" onClick={hide}>
            SHOW
          </button>
          <Modal>
            <div role="test"></div>
            <button role="modal-hide" onClick={hide}>
              SHOW
            </button>
          </Modal>
        </div>
      );
    };
    render(<Test />);

    fireEvent.click(await screen.findByRole('show'));
    expect(await screen.findByRole('test')).toBeTruthy();
    const modalInner = await screen.findByRole('test');
    fireEvent.click(modalInner!.parentElement!.parentElement!);
    await expect(screen.findByRole('test')).toBeTruthy();
  });

  it('지정한 element에 modal을 렌더링할 수 있다.', async () => {
    const testRoot = document.createElement('div');
    testRoot.id = 'test-root';
    document.body.appendChild(testRoot);

    const Test = () => {
      const { Modal, show, hide } = useModal({
        modalRoot: testRoot,
      });
      return (
        <div>
          <button role="show" onClick={show}>
            SHOW
          </button>
          <button role="hide" onClick={hide}>
            SHOW
          </button>
          <Modal>
            <div role="test" id="test"></div>
          </Modal>
        </div>
      );
    };
    render(<Test />);
    fireEvent.click(await screen.findByRole('show'));
    expect(testRoot.querySelector('#test')).toBeTruthy();
  });

  it('modal에 animation이 적용된 경우, className을 열고 닫을 때 변경할 수 있다.', async () => {
    const Test = () => {
      const { Modal, show, hide } = useModal({
        modalAnimation: {
          showClassName: SHOW_CLASSNAME,
          hideClassName: HIDE_CLASSNAME,
        },
      });
      return (
        <div>
          <button role="show" onClick={show}>
            SHOW
          </button>
          <button role="hide" onClick={hide}>
            SHOW
          </button>
          <Modal>
            <div role="test"></div>
          </Modal>
        </div>
      );
    };
    render(<Test />);
    fireEvent.click(await screen.findByRole('show'));
    const modalInner = await screen.findByRole('test');
    expect(modalInner.parentElement?.className).toContain(SHOW_CLASSNAME);
  });
});
