// import { useState, useRef, useEffect } from "react";
// import styles from "../styles/reviewAdd.module.css";
// import useOnClickOutsideModal from "./useOnClickOutsideModal";

// function AddReviewModal({ onCloseModal }) {
//   const [rating, setRating] = useState(0);
//   const [isOpen, setIsOpen] = useState(false);
//   const modalRef = useRef(null);

//   const handleSubmitReview = () => {};

//   useOnClickOutsideModal(modalRef, onCloseModal, isOpen);

//   useEffect(() => {
//     setIsOpen(true);
//   }, []);

//   return (
//     <>
//       <div className={styles._main_single_add_review_modal_main_top_container}>
//         <div className={styles._main_single_add_review_modal} ref={modalRef}>
//           <div
//             className={styles._main_single_add_review_modal_close}
//             onClick={onCloseModal}
//           >
//             &times;
//           </div>
//           <textarea placeholder="Enter your review"></textarea>
//           <div className={styles._main_single_add_review_rating}>
//             {[...Array(5)].map((_, index) => (
//               <span key={index} onClick={() => setRating(index + 1)}>
//                 {rating >= index + 1 ? "★" : "☆"}
//               </span>
//             ))}
//           </div>
//           <button onClick={handleSubmitReview}>Submit</button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AddReviewModal;
import { useState, useRef, useEffect } from "react";
import styles from "../styles/reviewAdd.module.css";
import useOnClickOutsideModal from "./useOnClickOutsideModal";
import { useParams } from "react-router-dom";
import getLoggedUserData from "../utils/LoggedUserData";
import { useDispatch } from "react-redux";
import { addReviewAction } from "../redux/AppReducer/actions";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function AddReviewModal({ onCloseModal, onComponentChanges }) {
  // console.log("  onComponentChanges:-", onComponentChanges);
  const CheckLogin = getLoggedUserData()
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const modalRef = useRef(null);
  const { id } = useParams()
  const dispatch = useDispatch()

  const handleSubmitReview = async () => {
    if (comment.trim() === "" || rating === 0) {
      alert("Please enter both rating and review comment");
      return;
    }

    const payload = {
      rating: rating,
      comment: comment,
      productId: id,
      token: CheckLogin.token
    };

    setIsLoading(true);
    setError(null);

    try {
      let res = await dispatch(addReviewAction(payload));
      // console.log("component response:-", res)
      onComponentChanges()
      if (res && res.message === "Review Added") {
        toast.success(res.message)
      } else if (res.message === "Review updated") {
        toast.success(res.message)
      }
    } catch (error) {
      setError(error.message || "Something went wrong");
    }

    setIsLoading(false);
    onCloseModal();
  };

  useOnClickOutsideModal(modalRef, onCloseModal, isOpen);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  if (isLoading) {
    return (
      <div className={styles._main_single_add_review_modal_main_top_container}>
        <div className={styles._main_single_add_review_modal} ref={modalRef}>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles._main_single_add_review_modal_main_top_container}>
        <div className={styles._main_single_add_review_modal} ref={modalRef}>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <>

      <ToastContainer />
      <div className={styles._main_single_add_review_modal_main_top_container}>
        <div className={styles._main_single_add_review_modal} ref={modalRef}>
          <div
            className={styles._main_single_add_review_modal_close}
            onClick={onCloseModal}
          >
            &times;
          </div>
          <textarea
            placeholder="Enter your review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <div className={styles._main_single_add_review_rating}>
            {[...Array(5)].map((_, index) => (
              <span key={index} onClick={() => setRating(index + 1)}>
                {rating >= index + 1 ? "★" : "☆"}
              </span>
            ))}
          </div>
          <button onClick={handleSubmitReview}>Submit</button>
        </div>
      </div>
    </>
  );
}

export default AddReviewModal;
