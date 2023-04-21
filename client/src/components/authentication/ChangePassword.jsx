import React,{useState} from 'react';
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';

import styles from './authentication.module.css';
import DocumentTitle from '../Helmet/Helmet';



const ChangePassword = () => {

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <DocumentTitle pageTitle={"| CHANGE PASSWORD"} />
      <div className={styles.form_wrapper}>
      <div className={styles.form_container}>
        <div className={styles.title_container}>
          <h2>Change Password</h2>
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
                <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Current password" required />
                <span onClick={handleTogglePassword}>{showPassword ? <FaEye /> :  <FaEyeSlash />}</span>
              </div>
              <div className={styles.input_field}>
                {/* <span><FaLock /></span> */}
                <input type={showPassword ? 'text' : 'password'} name="password" placeholder="New password" required />
                <span onClick={handleTogglePassword}>{showPassword ? <FaEye /> :  <FaEyeSlash />}</span>
              </div>
              <input className={styles.button} type="submit" value="Submit" />
             
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ChangePassword;
