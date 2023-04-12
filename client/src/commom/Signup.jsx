import React,{useState} from 'react';
import { FaUser, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { BiUserCircle } from 'react-icons/bi';
import styles from '../styles/authentication.module.css';


const Signup = () => {

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.form_wrapper}>
      <div className={styles.form_container}>
        <div className={styles.title_container}>
          <h2>Signup Form</h2>
        </div>
        <div className={`${styles.row} ${styles.clearfix}`}>
          <div>
            <form>
              <div className={`${styles.row} ${styles.clearfix}`}>
                <div className={styles.col_half}>
                  <div className={styles.input_field}>
                    <span><FaUser /></span>
                    <input type="text" name="name" placeholder="First Name" />
                  </div>
                </div>
                <div className={styles.col_half}>
                  <div className={styles.input_field}>
                    <span><FaUser /></span>
                    <input type="text" name="name" placeholder="Last Name" required />
                  </div>
                </div>
              </div>
              <div className={styles.input_field}>
                <span><FaEnvelope /></span>
                <input type="email" name="email" placeholder="Email" required />
              </div>
              <div className={styles.input_field}>
                {/* <span><FaLock /></span> */}
                <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" required />
                <span onClick={handleTogglePassword}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
              </div>
              <div className={styles.input_field}>
                <span><BiUserCircle /></span>
                <input type="url" name="avator" placeholder="Paste your photo link" required />
              </div>


              <input className={styles.button} type="submit" value="Register" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
