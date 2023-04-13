const signupInitial = {
    isLoading: false,
    isError: false,
    data: []
}

const loginInitial = {
    isLoading: false,
    isError: false,
    isAuth: false
}


const signupIntialState = {
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    avator: "",
    mobile: ""
  }

  const loginInitialState={
    email:"",
    password:""
  }
const initialMessages = {
    name: "",
    email: "",
    password: "",
    mobile: "",
    role: "",
    emailExits: "",
    success: "",
    invalid:""
};


export {
    signupInitial,
    loginInitial,
    signupIntialState,
    loginInitialState,
    initialMessages,
   
}