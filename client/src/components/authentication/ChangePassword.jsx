import React, { useState } from 'react';
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';

import styles from './authentication.module.css';
import DocumentTitle from '../Helmet/Helmet';
import { isValidEmail } from '../../Validation/signupValidation';
import { changePasswordInitialState } from '../../objects/Objects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { ChangePasswordAction } from '../../redux/AuthReducer/actions';



const ChangePassword = () => {
  const [state, setState] = useState(changePasswordInitialState);
  const [showMessage, setShowMessage] = useState(changePasswordInitialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formLoading, SetFormLoading] = useState(true)
  const { isLoading, isError, response } = useSelector(store => store.ChangePasswordReducer)
  const dispatch = useDispatch()
  setTimeout(() => {
    SetFormLoading(false)
  }, 2000)
  // const {isLoading}

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  };



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));

    // Validate the input and show any error messages
    if (name === "email") {
      if (!value) {
        setShowMessage((prevState) => ({
          ...prevState,
          email: "Email is required",
        }));
      } else if (!isValidEmail(value)) {
        setShowMessage((prevState) => ({
          ...prevState,
          email: "Please provide a valid email address",
        }));
      } else {
        setShowMessage((prevState) => ({
          ...prevState,
          email: "",
        }));
      }
    } else if (name === "currentPassword" || name === "newPassword") {
      if (!value) {
        setShowMessage((prevState) => ({
          ...prevState,
          [name]: "Password is required",
        }));
      } else if (value.length < 6) {
        setShowMessage((prevState) => ({
          ...prevState,
          [name]: "Password must be at least 6 characters long",
        }));
      } else if (!/[A-Z]/.test(value)) {
        setShowMessage((prevState) => ({
          ...prevState,
          [name]: "Password must contain at least one uppercase letter",
        }));
      } else if (!/[a-z]/.test(value)) {
        setShowMessage((prevState) => ({
          ...prevState,
          [name]: "Password must contain at least one lowercase letter",
        }));
      } else if (!/\d/.test(value)) {
        setShowMessage((prevState) => ({
          ...prevState,
          [name]: "Password must contain at least one digit",
        }));
      } else if (!/[@#%&^()/?!]/.test(value)) {
        setShowMessage((prevState) => ({
          ...prevState,
          [name]: "Password must contain at least one special character",
        }));
      } else {
        setShowMessage((prevState) => ({
          ...prevState,
          [name]: "",
        }));
      }
    }
  };



  // handling form submit

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const payload = {
      email: state.email,
      password: state.currentPassword,
      newPassword: state.newPassword
    }
  
    dispatch(ChangePasswordAction(payload))
  }
  
  if (isError) {
    if (isError === "User not found") {
      toast.error(isError)
    } else if (isError === "Invalid old password") {
      toast.error(isError)
    } else {
      toast.error("Something went wrong")
    }
  
  }
  
  if (response) {
    if (response === "Password updated successfully") {
      toast.success(response)
    }
  }
  

  return (
    <>
      <DocumentTitle pageTitle={"| CHANGE PASSWORD"} />
      <ToastContainer />
      {formLoading ? (
        <p style={{ textAlign: "center", fontSize: "30px" }} >Change password form loading...</p>
      ) : (
        <div className={styles.form_wrapper}>
          <div className={styles.form_container}>
            <div className={styles.title_container}>
              <h2>Change Password</h2>
            </div>
            <div className={`${styles.row} ${styles.clearfix}`}>
              <div>
                <form onSubmit={handleFormSubmit} >

                  <div className={styles.input_field}>
                    <span><FaEnvelope /></span>
                    <input type="email"
                      name="email" placeholder="Email"
                      onChange={handleInputChange}
                      value={state.email} />
                  </div>

                  {showMessage && <p className={styles._show_indcator} >{showMessage.email}</p>}

                  <div className={styles.input_field}>
                    <input type={showPassword ? 'text' : 'password'}
                      name="currentPassword" placeholder="Current password" onChange={handleInputChange}
                      value={state.currentPassword} />
                    <span onClick={handleTogglePassword}>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                  </div>


                  {showMessage && <p className={styles._show_indcator} >{showMessage.currentPassword}</p>}


                  <div className={styles.input_field}>
                    <input type={showConfirmPassword ? 'text' : 'password'}
                      name="newPassword"
                      placeholder="New password"
                      onChange={handleInputChange}
                      value={state.newPassword} />
                    <span onClick={handleToggleConfirmPassword}>{showConfirmPassword ? <FaEye /> : <FaEyeSlash />}</span>
                  </div>


                  {showMessage && <p className={styles._show_indcator} >{showMessage.newPassword}</p>}

                  <input className={styles.button} type="submit" value={isLoading ? "Fetching..." : "Submit"} />

                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangePassword;
