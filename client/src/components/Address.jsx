import React, { useState } from 'react'
import { AiOutlineArrowRight } from "react-icons/ai"
import styles from "../styles/address.module.css"
import {useDispatch} from "react-redux"
import { deliveryAddressActionObj } from '../redux/AppReducer/actions'
import { DeliverinitialState } from '../objects/Objects'


function Address({ handleNext }) {

    const [state, setState] = useState(DeliverinitialState)
    const [errors, setErrors] = useState({})
    const dispatch=useDispatch()
 
    
    const handleAddress = async (e) => {
      e.preventDefault();
      const errors = {};
      if (!state.address1.trim()) {
          errors.address1 = "Address 1 is required";
      }
      if (!state.country.trim()) {
          errors.country = "Country is required";
      }
      if (!state.state.trim()) {
          errors.state = "State is required";
      }
      if (!state.city.trim()) {
          errors.city = "City is required";
      }
      if (!state.postalCode) {
          errors.postalCode = "Postal code is required";
      } else if (state.postalCode.toString().length < 7) {
          errors.postalCode = "Postal code can not be less than 7 digits";
      }

      if (Object.keys(errors).length > 0) {
          setErrors(errors);
      } else {
          setErrors({});
         

          const { address1, address2, country, state: formState, city, postalCode } = state;

          const payload = {
              addressLine1: address1,
              addressLine2: address2,
              state: formState,
              country,
              city,
              postalCode
          };

          let data = await dispatch(deliveryAddressActionObj(payload));

          if (data === undefined) {
              alert("Something went wrong")
          }

          if (data && data.hint === "deSuces") {
              alert("Address Added")
              handleNext();
          }


      }
  };

    



    return (
        <>
            <form className={styles.__checkout__address_form} onSubmit={handleAddress} >
                <div>
                    <label htmlFor="address1">Address 1</label>
                    <input type="text"
                        placeholder='Enter address1'
                        value={state.address1}
                        onChange={(e) => setState({ ...state, address1: e.target.value })} />
                    {errors.address1 && <p className={styles.__checkout__error_message}>{errors.address1}</p>}
                </div>
                <div>
                    <label htmlFor="address2">Address 2</label>
                    <input type="text" placeholder='Enter address2' value={state.address2} onChange={(e) => setState({ ...state, address2: e.target.value })} />
                </div>

                <div>
                    <label htmlFor="country">Country</label>
                    <input type="text" placeholder='Enter country' value={state.country} onChange={(e) => setState({ ...state, country: e.target.value })} />
                    {errors.country && <p className={styles.__checkout__error_message}>{errors.country}</p>}
                </div>
                <div>
                    <label htmlFor="state">State</label>
                    <input type="text" placeholder='Enter state' value={state.state} onChange={(e) => setState({ ...state, state: e.target.value })} />
                    {errors.state && <p className={styles.__checkout__error_message}>{errors.state}</p>}
                </div>

                <div>
                    <label htmlFor="city">City</label>
                    <input type="text" placeholder='Enter city' value={state.city} onChange={(e) => setState({ ...state, city: e.target.value })} />
                    {errors.city && <p className={styles.__checkout__error_message}>{errors.city}</p>}
                </div>


                <div>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input type="number" placeholder='Enter postal code'
                        value={state.postalCode}
                        onChange={(e) => setState({ ...state, postalCode: Number(e.target.value) })} />
                    {errors.postalCode && <p className={styles.__checkout__error_message}>{errors.postalCode}</p>}

                </div>

                <button type='submit' value="Submit">Next <AiOutlineArrowRight /></button>

            </form>


        </>
    )
}

export default Address
