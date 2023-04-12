import React from 'react';
import { FaEnvelope } from 'react-icons/fa';

import styles from '../styles/authentication.module.css';


const ForgetPassword = () => {



  return (
    <div className={styles.form_wrapper}>
      <div className={styles.form_container}>
        <div className={styles.title_container}>
          <h2>Forget Password</h2>
        </div>
        <div className={`${styles.row} ${styles.clearfix}`}>
          <div>
            <form>

              <div className={styles.input_field}>
                <span><FaEnvelope /></span>
                <input type="email" name="email" placeholder="Email" required />
              </div>


              <input className={styles.button} type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

