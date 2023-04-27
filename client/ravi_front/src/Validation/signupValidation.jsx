
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|mil|info|biz)$/i;
    return emailRegex.test(email);
}
const handleValidation = (name, state, showMessage, setShowMessage) => {
    switch (name) {
       case "name":
          if (!state.firstname) {
             setShowMessage({ ...showMessage, name: "Please provide name" });
          } else {
             setShowMessage({ ...showMessage, name: "" });
          }
          break;
       case "email":
          if (!state.email) {
             setShowMessage({ ...showMessage, email: "Please provide email" });
          } else if (!isValidEmail(state.email)) {
             setShowMessage({ ...showMessage, email: "Please provide a valid email address" });
          } else {
             setShowMessage({ ...showMessage, email: "" });
          }
          break;
       case "password":
          if (!state.password) {
             setShowMessage((prevState) => ({ ...prevState, password: "Password is required" }));
          } else if (state.password.length < 6) {
             setShowMessage((prevState) => ({ ...prevState, password: "Password at least 6 characters long" }));
          } else if (!/[A-Z]/.test(state.password)) {
             setShowMessage((prevState) => ({ ...prevState, password: "Password at least one uppercase letter" }));
          }
          else if (!/[a-z]/.test(state.password)) {
             setShowMessage((prevState) => ({ ...prevState, password: "Password at least one lowercase letter" }));
          }
          else if (!/\d/.test(state.password)) {
             setShowMessage((prevState) => ({ ...prevState, password: "Password at least one digit" }));
          }
          else if (!/[@#%&^()/?!]/.test(state.password)) {
             setShowMessage((prevState) => ({ ...prevState, password: "Required one special character"}));
          }
          else {
             setShowMessage({ ...showMessage, password: "" });
          }
          break;
       case "mobile":
          if (!state.mobile) {
             setShowMessage((prevState) => ({ ...prevState, mobile: "Mobile number is required" }));
          } else if (state.mobile.toString().length < 10 || state.mobile.toString().length > 10) {
             setShowMessage((prevState) => ({ ...prevState, mobile: "Mobile number must be exactly 10 digits" }));
          } else {
             setShowMessage({ ...showMessage, mobile: "" })
          }
          break;
       default:
          break;
    }
 };
 

export{
    isValidEmail,
    handleValidation
}