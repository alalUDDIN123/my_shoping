import React, { useState } from 'react'
import { GrLinkPrevious } from "react-icons/gr"
import styles from "../styles/payment.module.css"
import { AiOutlineArrowRight } from 'react-icons/ai';
function Payments({ handlePrev, handleNext }) {


    const paymentOptions = [
        { id: 1, label: 'Credit Card' },
        { id: 2, label: 'UPI' },
        { id: 3, label: 'Netbanking' },
    ];

    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        // console.log("selectedOption::-", selectedOption);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };


    return (
        <>
            <div className={styles.paymentOptions}>
                <div>
                    <h2>Select a payment option:</h2>
                    <div className={styles.optionsContainer}>
                        {paymentOptions.map((option) => (
                            <label key={option.id} className={styles.optionLabel}>
                                <input
                                    type="radio"
                                    name="payment"
                                    value={option.label}
                                    className={styles.optionInput}
                                    checked={selectedOption === option.label}
                                    onChange={handleOptionChange}
                                />
                                <span className={styles.optionText}>{option.label}</span>
                            </label>
                        ))}
                    </div>

                    {selectedOption === "Credit Card" && (
                        <form onSubmit={handleSubmit} className={styles.__checkout__credit__card__form} >
                            <label>
                                Card Number:
                                <input type="number" name="cardNumber" />
                            </label>
                            <label>
                                Expiration Date:
                                <input type="date" name="expirationDate" />
                            </label>
                            <label>
                                CVV:
                                <input type="number" name="cvv" />
                            </label>

                            <div className={styles.__checkout__buttons} >


                            </div>

                        </form>
                    )}
                    {selectedOption === "UPI" && (
                        <form onSubmit={handleSubmit} className={styles.__checkout__Upi} >
                            <label>
                                UPI ID:
                                <input type="text" name="upiId" />
                            </label>
                            <div className={styles.__checkout__buttons} >

                            </div>
                        </form>
                    )}

                    {selectedOption === "Netbanking" && (
                        <h1 className={styles.__checkout__unavailable}>Sorry! This feature is not available</h1>
                    )}

                    <div className={styles.__checkout__buttons} >
                        <button onClick={handlePrev} className={styles.__checkout__previous} > <GrLinkPrevious />Prev</button>
                        <button type='submit' value="Submit" onClick={handleNext} >Next <AiOutlineArrowRight /></button>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Payments
