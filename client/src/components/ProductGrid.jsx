import React from 'react';

const ProductGrid = ({ image , name}) => {
  return (
    <>
      <div>
        <img src={image} alt={ name}  />
      </div>
    </>
  );
};

export default ProductGrid;
