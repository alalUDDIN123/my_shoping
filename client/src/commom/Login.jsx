import React, { useEffect,  useState } from 'react';
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';

import styles from '../styles/authentication.module.css';
import { useDispatch } from 'react-redux';

import ErrorShowModal from '../components/ErrorShowModal';
import { handleValidation } from '../Validation/signupValidation';

import DocumentTitle from '../components/Helmet';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { initialMessages, loginInitialState } from '../objects/Objects';
import { SigninActionObj } from '../redux/AuthReducer/actions';

const sendData = {
  title: "Login Failed",
  buttonText: "Try Again",
}


const Login = () => {
  const [state, setState] = useState(loginInitialState)
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const commingFrom = location.state?.from || "/"
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [showModal, setShowModal] = useState(true);
  const [showMessage, setShowMessage] = useState(initialMessages);
  const [emailSave, SetEmailSave] = useState("")
  const dispatch = useDispatch()
  const isFormValid = () => {
    const formValid = !showMessage.email && !showMessage.password;
    return formValid;
  };

  const Passhanlde = (name) => {
    handleValidation(name, state, showMessage, setShowMessage)
  }

  useEffect(() => {
    if (showMessage && showMessage.success) {
      toast.success(showMessage.success)
      setShowMessage({ ...showMessage, success: "" });
      setTimeout(() => {
        navigate(commingFrom, { replace: true });
      }, 2500)
    }
  }, [showMessage, navigate,commingFrom]);


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await dispatch(SigninActionObj(state));

      if (res === undefined) {
        throw new Error("Something went wrong")
      }
      SetEmailSave(state.email);
      setShowMessage(initialMessages);

      if (res && res.messssage === "Login Successful") {
        setShowMessage({ success: "Login successful" });
        setState(loginInitialState);
      } else if (res.hint === "wrong") {
        setShowMessage({ ...initialMessages, invalid: "Wrong Passwprd" })
        setState(loginInitialState);
      } else if (res.hint === "paenot") {
        SetEmailSave({ emailExits: `This email : ${state.email} is not found` });
        setState(loginInitialState);
      }
    } catch (err) {
      toast.error(err.message);
      setState(loginInitialState);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.location.reload()
  };

  if (emailSave && emailSave.emailExits) {
    return (
      <ErrorShowModal
        {...sendData}
        content={`${emailSave.emailExits}`}
        onClose={handleCloseModal}
        show={showModal}
      />
    );
  }


  if (showMessage && showMessage.invalid) {
    toast.error(showMessage.invalid)
    setShowMessage({ ...showMessage, invalid: "" })
    // navigation("/login")
  }


  return (
    <>
      <ToastContainer />
      <DocumentTitle pageTitle="| LOGIN" />
      {isLoading ? (
        <p style={{ textAlign: "center", fontSize: "30px" }} >Signin form loading...</p>
      ) : (
        <div className={styles.form_wrapper}>
          <div className={styles.form_container}>
            <div className={styles.title_container}>
              <h2>Signin Form</h2>
            </div>
            <div className={`${styles.row} ${styles.clearfix}`}>
              <div>
                <form onSubmit={handleFormSubmit}>

                  <div className={styles.input_field}>
                    <span><FaEnvelope /></span>
                    <input type="email" name="email"
                      placeholder="Email"
                      onBlur={() => Passhanlde("email")}
                      value={state.email}
                      onChange={(e) => setState({ ...state, email: e.target.value })}
                      required />
                  </div>
                  {showMessage && <p className={styles._show_indcator}>{showMessage.email}</p>}
                  <div className={styles.input_field}>
                    {/* <span><FaLock /></span> */}
                    <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password"
                      value={state.password}
                      onBlur={() => Passhanlde("password")}
                      onChange={(e) => setState({ ...state, password: e.target.value })}
                      required />
                    <span onClick={handleTogglePassword}>{showPassword ? <FaEye /> :  <FaEyeSlash />}</span>
                  </div>
                  {showMessage && <p className={styles._show_indcator}>{showMessage.password}</p>}
                  <input className={styles.button}
                    value="Login"
                    type="submit"
                    disabled={!isFormValid()}
                    style={{ cursor: !isFormValid() ? "not-allowed" : "pointer" }} />
                </form>
              </div>
            </div>
          </div>

          <p>Forget Password ? <span onClick={()=>navigate("/forgetPassword")} className={styles.__forgot__password__link} >Click here 👉</span> </p>
        </div>
      )}

    </>
  );
};

export default Login;
