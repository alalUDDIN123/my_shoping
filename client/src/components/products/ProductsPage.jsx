import React, { useEffect, useState } from "react";
import styles from "./products.module.css";
import { useMediaQuery } from "react-responsive";
import stylesTablet from "./products.tablet.module.css";
import { useDispatch, useSelector } from "react-redux";
// import { brandOption,categoryOption ,ratingOption} from "../../Constant/ProductsFiltersOption";
import Loader from "../loader/Loader";
import ProductCard from "./ProductCard";
import TabletProductCard from "./TabletProductCard";
import DocumentTitle from "../Helmet/Helmet";
import { getProductsData } from "../../redux/AppReducer/products/actions";
import InputCheckbox from "./InputCheckbox";
import { GoSettings } from "react-icons/go";
import { FiChevronDown } from "react-icons/fi";
import FilterModal from "../../modals/FilterModal";
import {
  brandOptionAv,
  categoryOptionAv,
  priceRanges,
  ratingOption,
} from "../../Constant/ProductsFiltersOption";

function ProductsPage() {
  const Dekstop = ({ children }) => {
    const isDekstop = useMediaQuery({ minWidth: 992 });
    return isDekstop ? children : null;
  };
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    return isTablet ? children : null;
  };
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
  };

  // various filter section
  const [categoryOption, setCategoryOption] = useState(categoryOptionAv);
  // various branding secion
  const [brandOption, setBrandOption] = useState(brandOptionAv);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [minPrice, maxPrice] = selectedPriceRange.split("-");
  const [rating, setRating] = useState("");
  // const [page, setPage] = useState(1);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // const [rating, setRating] = useState("")
  // const [page, setPage] = useState(1);

  const { products, isLoading } = useSelector(
    (store) => store.getProductReducer
  );
  const dispatch = useDispatch();

  // this is Cateogory
  function handleCategoryChange(event, i) {
    const { value, checked } = event.target;
    const newSelectedCategories = [...selectedCategories];
    const newCheckboxex = [...categoryOption];
    newCheckboxex[i].checked = checked;
    setCategoryOption(newCheckboxex);
    const index = newSelectedCategories.indexOf(value);

    if (index > -1) {
      newSelectedCategories.splice(index, 1);
    } else {
      newSelectedCategories.push(value);
    }

    setSelectedCategories(newSelectedCategories);
  }

  // this is brand
  function handleBrandChange(event, i) {
    const { value, checked } = event.target;
    const newSelectedBrands = [...selectedBrands];
    const newBrand = [...brandOption];
    newBrand[i].checked = checked;
    setBrandOption(newBrand);
    const index = newSelectedBrands.indexOf(value);

    if (index > -1) {
      newSelectedBrands.splice(index, 1);
    } else {
      newSelectedBrands.push(value);
    }

    setSelectedBrands(newSelectedBrands);
  }

  // handling price

  useEffect(() => {
    dispatch(
      getProductsData({
        category: selectedCategories,
        brand: selectedBrands,
        minPrice: minPrice,
        maxPrice: maxPrice,
        ratings: rating,
      })
    );
  }, [
    selectedCategories,
    selectedBrands,
    dispatch,
    minPrice,
    maxPrice,
    rating,
  ]);

  // console.log("minPrice::-",minPrice,'maxprice:-',maxPrice);
  // console.log("rating:-", rating);
  // console.log("parsms:-", param);

  return (
    <>
      <Dekstop>
        <DocumentTitle pageTitle="| PRODUCTS" />
        <main className={styles._main_div}>
          {/* filters container */}
          <div className={styles._filters}>
            <div className={styles._category_div}>
              <label className={styles._label_text}>Select Category</label>
              {categoryOption.map((item, index) => (
                <div key={index}>
                  <InputCheckbox
                    category="category"
                    id={`category-${index}`}
                    value={item.cate}
                    checking={item.checked}
                    onChangeHanlde={(event) =>
                      handleCategoryChange(event, index)
                    }
                    index={index}
                  />
                </div>
              ))}
            </div>
            <hr />

            <div className={styles._brand_div}>
              <label className={styles._label_text}>Select Brand</label>
              {brandOption.map((item, index) => (
                <div key={index}>
                  <InputCheckbox
                    category="brand"
                    id={`brand-${index}`}
                    value={item.brand}
                    checking={item.checked}
                    onChangeHanlde={(event) => handleBrandChange(event, index)}
                    index={index}
                  />
                </div>
              ))}
            </div>
            <hr />

            <div className={styles._price_div}>
              <label
                className={`${styles._label_text} ${styles._label_text_price}`}
              >
                Choose price range
              </label>
              <select
                value={selectedPriceRange}
                className={styles.__select__priceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
              >
                <option value="" disabled>
                  -- Select price range --
                </option>
                {priceRanges.slice(1).map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
            <hr />

            <div className={styles._rating_div}>
              <label>Choose rating</label>
              <select onChange={(e) => setRating(Number(e.target.value))}>
                <option value="" disabled>
                  Ratings
                </option>
                {ratingOption.map((rate, index) => (
                  <option key={index} value={rate}>
                    {rate}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* products container */}
          <div className={styles._products_container}>
            <div className={styles._products}>
              {isLoading ? (
                <Loader />
              ) : products === undefined || products.length === 0 ? (
                <h1 style={{ textAlign: "center", marginLeft: "10%" }}>
                  Products not available
                </h1>
              ) : (
                products &&
                products?.map((el) => <ProductCard key={el._id} {...el} />)
              )}
            </div>
          </div>
        </main>
      </Dekstop>

      {/* Tablet*/}

      <Tablet>
        <DocumentTitle pageTitle="| PRODUCTS" />
        <main className={stylesTablet._tablet_main_div}>
          {/* filters container */}
          <div className={stylesTablet._tablet_filters}>
            <div className={stylesTablet._tablet_category_div}>
              <label className={stylesTablet._tablet__label_text}>
                Select Category
              </label>
              <select>
                <option value="" disabled selected>
                  -Select Category-
                </option>
                {categoryOption.map((item, index) => (
                  <option key={index} value={item.cate}>
                    {item.cate}
                  </option>
                ))}
              </select>
            </div>
            <hr />

            <div className={stylesTablet._tablet_brand_div}>
              <label className={stylesTablet._tablet_label_text}>
                Select Brand
              </label>
              <select>
                <option value="" disabled selected>
                  -Select brand-
                </option>
                {brandOption.map((item, index) => (
                  <option key={index} value={item.brand}>
                    {item.brand}
                  </option>
                ))}
              </select>
            </div>
            <hr />

            <div className={stylesTablet._tablet_price_div}>
              <label
                className={`${stylesTablet._tablet_label_text} ${stylesTablet._label_text_price}`}
              >
                Enter price range
              </label>
              <div>
                <label htmlFor=""> Min price</label>
                <input type="number" />
              </div>
              <div>
                <label htmlFor="">Max price</label>
                <input type="number" />
              </div>

              <button className={stylesTablet._tablet_apply_button}>
                Apply
              </button>
            </div>
            <hr />

            <div className={stylesTablet._tablet_rating_div}>
              <label>Choose rating</label>
              <select>
                <option value="" disabled>
                  Ratings
                </option>
                {ratingOption.map((rate, index) => (
                  <option key={index} value={rate}>
                    {rate}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* products container */}
          <div className={stylesTablet._tablet_products_container}>
            <div className={stylesTablet._tablet_products}>
              {isLoading ? (
                <Loader />
              ) : products === undefined || products.length === 0 ? (
                <h1>Products not available</h1>
              ) : (
                products &&
                products?.map((el) => (
                  <TabletProductCard key={el._id} {...el} />
                ))
              )}
            </div>
          </div>
        </main>
      </Tablet>

      {/* Mobile */}

      <Mobile>
        <DocumentTitle pageTitle="| PRODUCTS" />
        <div className={stylesTablet._mobile_products_container}>
          <div className={stylesTablet._sroting_filtering_}>
            <div onClick={handleOpenModal}>
              <FiChevronDown />
              Sort by
            </div>
            <div>
              <GoSettings /> Filter
            </div>
          </div>
          <div className={stylesTablet._mobile_products}>
            {isLoading ? (
              <Loader />
            ) : products === undefined || products.length === 0 ? (
              <h1>Products not available</h1>
            ) : (
              products &&
              products?.map((el) => <TabletProductCard key={el._id} {...el} />)
            )}
          </div>
        </div>

        {isModalOpen && <FilterModal onClose={handleCloseModal} />}
      </Mobile>
    </>
  );
}

export default ProductsPage;
