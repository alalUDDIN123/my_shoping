import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ExpiredToken from './ExpiredToken';
import { intitialStateForget } from '../../objects/Objects';
import { useDispatch, useSelector } from "react-redux"
import { ResetPassActionObj } from '../../redux/AuthReducer/actions';
import {  FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import DocumentTitle from '../Helmet/Helmet';
import styles from './authentication.module.css';
function ResetPassword(isExpied = true) {

  const [state, setState] = useState(intitialStateForget)
  const [showMessage, SetshowMessage] = useState(intitialStateForget)
  const [isLoading,setIsloading]=useState(true)
  const { token } = useParams();
  const dispatch = useDispatch()
  const {response,isError}=useSelector(store=>store.resetPasswordReducer)
 const Navigate=useNavigate()
  setTimeout(() => {
    setIsloading(false);
  }, 2000);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };


  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  };

  const onChangeHandle = (e) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { password, confirmPassword } = state;
    SetshowMessage(intitialStateForget)

    if (!password || password === "") {
      SetshowMessage((prevState) => ({ ...prevState, password: "Password is required" }))
    } else if (password.length < 6) {
      SetshowMessage((prevState) => ({ ...prevState, password: "Password at least 6 characters long" }));
    } else if (!/[A-Z]/.test(password)) {
      SetshowMessage((prevState) => ({ ...prevState, password: "Password at least one uppercase letter" }));
    }
    else if (!/[a-z]/.test(password)) {
      SetshowMessage((prevState) => ({ ...prevState, password: "Password at least one lowercase letter" }));
    }
    else if (!/\d/.test(password)) {
      SetshowMessage((prevState) => ({ ...prevState, password: "Password at least one digit" }));
    }
    else if (!/[@#%&^()/?!]/.test(password)) {
      SetshowMessage((prevState) => ({ ...prevState, password: "Required one special character" }));
    }
    else if (!confirmPassword || confirmPassword === "") {
      SetshowMessage((prevState) => ({ ...prevState, confirmPassword: "Confirm password is required" }))
    } else if (password !== confirmPassword) {
      SetshowMessage((prevState) => ({ ...prevState, confirmPassword: "Confirm password not match" }))
    } else {

      const payload={
        newPassword:password,
        token
      }
      dispatch(ResetPassActionObj(payload))
    }


  };

  // console.log("response::-",response,"isError::-",isError);

  if (isError && isError) {
    return <ExpiredToken />
  }

  if(response && response.message==="Password reset successful"){
    toast.success(response.message)
    setTimeout(()=>{
      Navigate("/login")
    },2000)
  }

  return (
   <>
   <DocumentTitle pageTitle={"| RESET PASSWORD"} />



   {isLoading ? (
        <p style={{ textAlign: "center", fontSize: "30px" }} >Reset form loading...</p>
      ):(
        <div className={styles.form_wrapper}>
        <div className={styles.form_container}>
          <div className={styles.title_container}>
            <h2>Reset Password</h2>
          </div>
          <div className={`${styles.row} ${styles.clearfix}`}>
            <div>
              <form onSubmit={handleFormSubmit} >
  
                <div className={styles.input_field}>
                  <input type={showPassword ? 'text' : 'password'} 
                  name="password" placeholder="Enter new password"
                  onChange={onChangeHandle}  />
                  <span onClick={handleTogglePassword}>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
  
                {showMessage && <p className={styles._show_indcator} >{showMessage.password}</p>}
  
                <div className={styles.input_field}> 
  
                  <input type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    onChange={onChangeHandle}
                     />
                  <span onClick={handleToggleConfirmPassword}>{showConfirmPassword ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
  
                {showMessage && <p className={styles._show_indcator}>{showMessage.confirmPassword}</p>}
  
                <input className={styles.button} type="submit" value="Submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
      )

}
   
    </>
  );
};

export default ResetPassword;