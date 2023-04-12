import React,{ useState} from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import styles from '../styles/authentication.module.css';



const ResetPassword = () => {

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
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
                {/* <span><FaLock /></span> */}
                <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Enter password" required />
                <span onClick={handleTogglePassword}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
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

