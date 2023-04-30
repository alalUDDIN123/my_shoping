
// import getLoggedUserData from '../../../utils/LoggedUserData'
// import { useDispatch, useSelector } from 'react-redux'
// import { GetSingleOrderAction } from '../../../redux/AppReducer/orders/actions'
//   const LoggedUser = getLoggedUserData()
//   const dispatch = useDispatch()

//  const storeValue= useSelector(store=>store.GetSingleOrderReducer)
//  console.log("storeValue:-",storeValue);

//   // getting complete url from browser
//   const fullUrl = window.location.href;

//   // split the url string by the "/" character
//   const urlParts = fullUrl.split("/");

//   // find the index of the "orderId" and "productId" strings
//   const orderIdIndex = urlParts.indexOf("orderId") + 1;
//   const productIdIndex = urlParts.indexOf("productId") + 1;

//   // extract the orderId and productId from the url
//   const orderId = urlParts[orderIdIndex];
//   const productId = urlParts[productIdIndex];

//   useEffect(() => {
//     const payload = {
//       token: LoggedUser.token,
//       orderId,
//       productId
//     }

//     dispatch(GetSingleOrderAction(payload))
//   }, [LoggedUser.token, orderId, productId, dispatch])