import { useState } from "react";

const useModal = () => {
  const [isModalActive, setIsModalActive] = useState(false);

  const showModal = () => setIsModalActive(true);
  const closeModal = () => setIsModalActive(false);

  return { isModalActive, showModal, closeModal };
};

export default useModal;
