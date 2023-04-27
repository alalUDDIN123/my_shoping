import React, { useEffect, useRef } from "react";
import styles from "./filterModal.module.css";

const FilterModal = ({ onClose }) => {
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content} ref={modalRef}>
        Hello world
        <button onClick={onClose}>Close Modal</button>
      </div>
    </div>
  );
};

export default FilterModal;
