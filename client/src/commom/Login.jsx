import React,{useState} from 'react';
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import {Link} from 'react-router-dom'
import styles from '../styles/authentication.module.css';


const Login = () => {

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.form_wrapper}>
      <div className={styles.form_container}>
        <div className={styles.title_container}>
          <h2>Signin Form</h2>
        </div>
        <div className={`${styles.row} ${styles.clearfix}`}>
          <div>
            <form>
              
              <div className={styles.input_field}>
                <span><FaEnvelope /></span>
                <input type="email" name="email" placeholder="Email" required />
              </div>
              <div className={styles.input_field}>
                {/* <span><FaLock /></span> */}
                <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" required />
                <span onClick={handleTogglePassword}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
              </div>
              <input className={styles.button} type="submit" value="Login" />
              <p>Forget Password ?<Link to="/forgetPassword">Click Here</Link> </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
