import useDisclosure from '../../useDisclosure/useDisclosure';
import React from 'react';

export default function UseDisclosureExample() {
  const modal = useDisclosure(false);

  const handleOpenModal = () => {
    modal.open();
  };
  const handleCloseModal = () => {
    modal.close();
  };

  return (
    <label className="switch">
      <button onClick={handleOpenModal}>open</button>
      <dialog open={modal.isOpen}>
        Hello World
        <button onClick={handleCloseModal}>close</button>
      </dialog>
    </label>
  );
}
