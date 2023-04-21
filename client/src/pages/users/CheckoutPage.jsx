import React, { useEffect, useState } from "react";
import styles from "../../styles/checkout.module.css";
import { FaCheckCircle } from "react-icons/fa";
import DocumentTitle from "../../components/Helmet";
import Address from "../../components/Address";
import Payments from "../../components/Payments";
import Confirm from "../../components/Confirm";
import { useDispatch, useSelector } from "react-redux";
import { getCartData } from "../../redux/AppReducer/actions";
function CheckoutPage() {

  const [currentStep, setCurrentStep] = useState(1);
  const dispatch=useDispatch()
  const { response } = useSelector((store) => store.getCartDataReducer);
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };


  useEffect(() => {
    dispatch(getCartData());
  }, [dispatch]);
    
// console.log("response from cart route::-",response);

  return (
    <>
      <DocumentTitle pageTitle={"| CHECKOUT"} />

      <div className={styles.__checkout__main_body} >
        <h1 style={{ textAlign: "center" }}>Checkout</h1>
        <section className={styles.__checkout__container}>
          <div className={styles.__checkout__main_form}>
            <div className={styles.__checkout__stepper__indicate}>
              <p
                className={
                  currentStep === 1 ? styles.__checkout__step_active : ""
                }
              >
                {currentStep === 2 || currentStep === 3 ? (
                  <FaCheckCircle style={{ fontSize: "25px" }} />
                ) : (
                  <span>1</span>
                )}
                Address
              </p>
              <p
                className={
                  currentStep === 2 ? styles.__checkout__step_active : ""
                }
              >
                {currentStep === 3 ? (
                  <FaCheckCircle style={{ fontSize: "25px" }} />
                ) : (
                  <span>2</span>
                )}
                Payment
              </p>
              <p
                className={
                  currentStep === 3 ? styles.__checkout__step_active : ""
                }
              >
                <span>3</span> Confirm
              </p>
            </div>

            <div className={styles.__checkout__input_fields}>
              {currentStep === 1 && <Address handleNext={handleNext} />}
              {currentStep === 2 && (
                <Payments handleNext={handleNext} handlePrev={handlePrev} />
              )}
              {currentStep === 3 && <Confirm />}
            </div>
          </div>
          <div className={styles.__checkout__order_details}>
            <h3>Orders</h3>
            <p>
               Items : <span>{response && response?.totalProducts}</span>
            </p>
            <p>
              Items price : <span>₹ {response && response?.totalPrice}</span>

            </p>
            <p>
              Shipping price : <span>₹ 40</span>
            </p>
            <p>
              Tax : <span>₹ 5</span>
            </p>
            <p>
             Payable Amt : <span>₹ {response && response?.totalPrice+40+5}</span>
            </p>
          </div>
        </section>
      </div>


    </>
  );
}



export default CheckoutPage;
