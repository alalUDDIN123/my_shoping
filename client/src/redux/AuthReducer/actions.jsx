import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_FAILUE,
    LOGIN_REQUEST_SUCESS,

    SIGNUP_REQUEST,
    SIGNUP_REQUEST_FAILUE,
    SIGNUP_REQUEST_SUCESS
} from "../../Constant/actionTypes";



const url = 'http://localhost:8080/api/users/register'

const SignupActionObj = (payload) => async (dispatch) => {
    // console.log("payload::-",payload);
    dispatch({ type: SIGNUP_REQUEST });
    try {
        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const responseData = await res.json();

        // console.log("responseData:-", responseData)
        // console.log("res::-res",res)

        if (res.ok) {
            dispatch({ type: SIGNUP_REQUEST_SUCESS, payload: responseData });
        } else {
            dispatch({ type: SIGNUP_REQUEST_FAILUE, payload: responseData.error });
            // console.log("responseData.error:-",responseData.error)

        }
        return responseData;
    } catch (error) {
        console.log(error);
    }
};



const SigninActionObj = (payload) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const res = await fetch("http://localhost:8080/api/users/login", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const responseData = await res.json();

        // console.log("responseData:-", responseData)
        // console.log("res::-res",res)

        if (res.ok) {
            dispatch({ type: LOGIN_REQUEST_SUCESS, payload: responseData });
        } else {
            dispatch({ type: LOGIN_REQUEST_FAILUE, payload: responseData.error });
            // console.log("responseData.error:-",responseData.error)

        }
        return responseData;
    } catch (error) {
        console.log(error);
    }
}

export {
    SignupActionObj,
    SigninActionObj

}

