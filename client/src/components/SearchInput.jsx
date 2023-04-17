import React, { useEffect, useState } from "react";
import styles from "../styles/navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../redux/AppReducer/actions";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

const SearchInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [filterData, setFilterData] = useState([]);

  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.getProductReducer);
  const navigate = useNavigate();

  //   making filter function
  const filter = (str) => {
    let filteredData =
      str === ""
        ? []
        : products.filter((item) => {
            return item.title.toLowerCase().includes(str);
          });

    setFilterData(filteredData);
  };

  //   handeling serach
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    let query = event.target.value.toLowerCase();
    filter(query);
  };

  //handeling single product
  const handleProduct = (id) => {
    navigate(`/product/single/${id}`);
  };

  //handeling all products
  const handleAllProduct = () => {
    console.log(inputValue);
  };

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <div>
      <div className={styles.inputSearch}>
        <input
          placeholder="Search products.."
          type="text"
          name="search"
          autoComplete="off"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      {filterData.length > 0 && (
        <div className={styles.searchResponse}>
          <div className={styles.scroll_feature}>
            {filterData?.map((el) => (
              <div
                key={el._id}
                className={styles.searched_product}
                onClick={() => handleProduct(el._id)}
              >
                <div>{el.title}</div>
                <div>
                  <img src={el.image} alt="product" />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.seeAll} onClick={handleAllProduct}>
            See All..
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
