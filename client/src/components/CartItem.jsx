import React from 'react'
import styles from "../styles/cart.module.css"
import { FaTrashAlt } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import { BiMinus } from "react-icons/bi";
// import { useNavigate } from 'react-router-dom';

function CartItem({ _id, image, title, discountPrice }) {
    // const navigate = useNavigate()
    return (
        <>
            <tr key={_id}>
                <td>1</td>
                <td>

                    <img
                        src={image}
                        alt={title}

                    />
                </td>

                <td>
                    <a href={`/product/single/${_id}`} style={{color:"white"}} >
                        {_id}
                    </a>
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
                        color="yellow"

                    />
                </td>
            </tr>
        </>
    )
}

export default CartItem
