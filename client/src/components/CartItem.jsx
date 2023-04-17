import React from 'react'
import styles from "../styles/cart.module.css"
import { FaTrashAlt } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import { BiMinus } from "react-icons/bi";
// import { useNavigate } from 'react-router-dom';

function CartItem({ _id, image, title, discountPrice ,ind}) {
    // const navigate = useNavigate()
    return (
        <>
            <tr key={_id}>
                <td>{ind+1}</td>
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
                        < GrAdd />
                        <p className={styles._cart_quantity_} >
                            2
                        </p>
                        <BiMinus />
                    </div>
                </td>
                <td>₹ {discountPrice}</td>
                <td className={styles._cart_remove_item}>
                    <FaTrashAlt
                        size={19}
                        color="red"

                    />
                </td>
            </tr>
        </>
    )
}

export default CartItem
