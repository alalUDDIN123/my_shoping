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


const getProductIntial={
    isLoading:false,
    products:[],
    isError:false
}


const getProductDetailsInitial={
    isLoading:false,
    product:{},
    isError:false
}

const addReviewInitial={
    isLoading:false,
    addReview:{},
    isError:false  
}

const addReviewInitiaState={
    name:"",
    rating:"",
    comment:""
}
export {
    signupInitial,
    loginInitial,
    signupIntialState,
    loginInitialState,
    initialMessages,
    getProductIntial,
    getProductDetailsInitial,
    addReviewInitial,
    addReviewInitiaState
   
}