import React from "react";
import { FiEdit } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";

function ProductTableItem({ ind, image, _id, startIndex }) {
  // handle edit

  const editProduct = (id) => {
    alert(`Edit product ${id}`);
  };

  // handle delete product

  const deleteProduct = (id) => {
    alert(`Delete product ${id}`);
  };

  return (
    <>
      <tr key={startIndex + ind}>
        <td>{startIndex + ind + 1}</td>
        <td>
          <img src={image} alt={_id} />
        </td>
        <td>{_id}</td>
        <td onClick={() => editProduct(_id)}>
          <FiEdit />
        </td>
        <td onClick={() => deleteProduct(_id)}>
          <FaTrashAlt />
        </td>
      </tr>
    </>
  );
}

export default ProductTableItem;
