import React, { useEffect, useState } from "react";
import styles from "../styles/navbar.module.css";
import axios from "axios";

const SearchInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [product, setProduct] = useState([]);
  const [filterData, setFilterData] = useState([]);

  //   making filter function
  const filter = (str) => {
    let filteredData =
      str === ""
        ? []
        : product.filter((item) => {
            return item.title.toLowerCase().includes(str);
          });

    setFilterData(filteredData);
  };

  console.log(filterData, "filterdataa");

  //   handeling serach
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    let query = event.target.value.toLowerCase();
    filter(query);
  };

  //handeling single product
  const handleProduct = (id) => {
    console.log(id);
  };

  //handeling all products
  const handleAllProduct = () => {
    console.log(inputValue);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products/get")
      .then((res) => {
        const productData = res.data.products;
        setProduct(productData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className={styles.inputSearch}>
        <input
          placeholder="Search products.."
          type="text"
          name="search"
          autocomplete="off"
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
