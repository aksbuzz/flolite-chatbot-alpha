import { useState } from 'react';

export function useDisclosure() {
  const [isOpen, setIsOpen] = useState(false);

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }

  function toggle() {
    setIsOpen(prev => !prev);
  }

  return {
    isOpen,
    open: onOpen,
    close: onClose,
    toggle,
  };
}
