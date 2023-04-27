import React from 'react'
import styles from "./cart.module.css"
import { FaTrashAlt } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import { BiMinus } from "react-icons/bi";
import { useDispatch } from 'react-redux';
import {
    DecCartQuantytiAction,
    IncCartQuantytiAction,
    removerSingleCartAction
} from '../../redux/AppReducer/cart/actions';

// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import getLoggedUserData from '../../utils/LoggedUserData';

function CartItem({ _id, image, title, quantity, discountPrice, ind, handleComponetChange }) {
    // const navigate = useNavigate()
    const dispatch = useDispatch()
    const loggedUser = getLoggedUserData()


    const handleCartRemove = async (id) => {
        let confirm = window.confirm("Are you sure want to remove this product from the cart")

        if (confirm) {
            const payload = {
                productId: id,
                token: loggedUser.token
            }

            try {
                let res = await dispatch(removerSingleCartAction(payload))

                if (res === undefined) {
                    throw new Error("Something went wrong")
                } else if (res && res.msg === "Product removed from the cart") {
                    toast.success("Product removed from the cart success")
                    setTimeout(() => {
                        handleComponetChange()
                    }, 2500)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }

    }

    const incrementQty = async (id) => {
        const payload = {
            productId: id,
            token: loggedUser.token
        }

        try {
            let res = await dispatch(IncCartQuantytiAction(payload))

            // console.log("response::-", res);
            if (res === undefined) {
                throw new Error("Something went wrong")
            } else if (res.err === `Not enough quantity available for product ${id}`) {
                toast.error("Sorry! The requested quantity is not available for this product.")
              
            }
           else if (res && res.hint === "incQty") {

                toast.success("Product Quantity Incremented Success")
                setTimeout(() => {
                    handleComponetChange()
                }, 2500)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }



    const decQty = async (id) => {
        const payload = {
            productId: id,
            token: loggedUser.token
        }

        try {
            let res = await dispatch(DecCartQuantytiAction(payload))

            if (res === undefined) {
                throw new Error("Something went wrong")
            } else if (res && res.hint === "decQty") {
                toast.success("Product Quantity Decremented Success")
                setTimeout(() => {
                    handleComponetChange()
                }, 2500)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
         
            <tr key={_id}>
                <td>{ind + 1}</td>
                <td>

                    <img
                        src={image}
                        alt={title}

                    />
                </td>

                <td>

                    {_id}

                </td>

                <td>₹ {discountPrice}</td>
                <td>
                    <div className={styles._cart_inc_dec_qty}>
                        < GrAdd onClick={() => incrementQty(_id)} style={{ cursor: "pointer" }} />
                        <p className={styles._cart_quantity_} >
                            {quantity}
                        </p>
                        {quantity <= 1 ? "" : <BiMinus onClick={() => decQty(_id)} style={{ cursor: "pointer" }} />}

                    </div>
                </td>
                <td>₹ {discountPrice * quantity}</td>
                <td className={styles._cart_remove_item}>
                    <FaTrashAlt
                        size={19}
                        color="red"
                        onClick={() => handleCartRemove(_id)}
                    />
                </td>
            </tr>
        </>
    )
}

export default CartItem
