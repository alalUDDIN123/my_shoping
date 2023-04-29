// // from redux store not coming anything


// // action creator

// const GetOrderAction = (payload) => async (dispatch) => {
//     dispatch({ type: GET_ORDERS_REQUEST });
//     try {
//         let res = await fetch(`${BASE_URL}/api/order/get`, {
//             headers: {
//                 "Content-Type": "application/json",
//                 token: payload.token ?? LoggedUser.token ?? "",
//             },
//         });

//         const response = await res.json();

//         console.log("action response:-",response[0]); 

//         if (response && response[0]._id) {
//             dispatch({
//                 type: GET_ORDERS_REQUEST_SUCCESS,
//                 payload: response,
//             });
//         }

//         return response;
//     } catch (error) {
//         dispatch({
//             type: GET_ORDERS_REQUEST_FAILUE,
//         });
//     }
// };


// // reducer

// case GET_ORDERS_REQUEST_SUCCESS:
//         console.log("reducer payload:",payload);
//         return {
//           ...state,
//           isLoading: false,
//           orders: payload,
//           isError: ""
//         };

// // component

// const dispatch = useDispatch()
// const LoggedUser = getLoggedUserData()
// const storeData = useSelector(store => store.OrdersReducer)


//  useEffect(() => {
//   dispatch(GetOrderAction({ token: LoggedUser.token }));

// }, [dispatch]);

// console.log("store data:",storeData);