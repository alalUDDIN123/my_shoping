import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import styles from './authentication.module.css';



const ResetPassword = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };


  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!setShowConfirmPassword)
  };


  return (
    <div className={styles.form_wrapper}>
      <div className={styles.form_container}>
        <div className={styles.title_container}>
          <h2>Reset Password</h2>
        </div>
        <div className={`${styles.row} ${styles.clearfix}`}>
          <div>
            <form>

              <div className={styles.input_field}>

                <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Enter password" required />
                <span onClick={handleTogglePassword}>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
              </div>

              <div className={styles.input_field}> 

                <input type={showConfirmPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Confirm password"
                  required />
                <span onClick={handleToggleConfirmPassword}>{showConfirmPassword? <FaEye /> : <FaEyeSlash />}</span>
              </div>

              <input className={styles.button} type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;