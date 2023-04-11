import { useState, useRef, useEffect } from "react";
import styles from "../styles/reviewAdd.module.css";
import useOnClickOutsideModal from './useOnClickOutsideModal';

function AddReviewModal({ onCloseModal }) {
    const [rating, setRating] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);

    const handleSubmitReview = () => { };

    useOnClickOutsideModal(modalRef, onCloseModal, isOpen);

    useEffect(() => {
        setIsOpen(true);
    }, []);

    return (
        <div className={styles._main_single_add_review_modal} ref={modalRef}>
            <div className={styles._main_single_add_review_modal_close} onClick={onCloseModal}>
                &times;
            </div>
            <textarea placeholder="Enter your review"></textarea>
            <div className={styles._main_single_add_review_rating}>
                {[...Array(5)].map((_, index) => (
                    <span key={index} onClick={() => setRating(index + 1)}>
                        {rating >= index + 1 ? "★" : "☆"}
                    </span>
                ))}
            </div>
            <button onClick={handleSubmitReview}>Submit</button>
        </div>
    );
}

export default AddReviewModal;
