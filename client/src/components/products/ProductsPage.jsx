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

const ratingOption = [5, 4, 3, 2, 4.5, 3.5, 2.5];
const categoryOptionAv = [
  { cate: "Electronics", checked: false },
  { cate: "accessories", checked: false },
  { cate: "clothing", checked: false },
];
const brandOptionAv = [
  { brand: "Apple", checked: false },
  { brand: "ideaPad", checked: false },
  { brand: "aldo", checked: false },
  { brand: "supcase", checked: false },
  { brand: "gopgan", checked: false },
  { brand: "adidas", checked: false },
];

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
  const [selectedBrands, setSelectedBrands] = useState([]);

  // const [minPrice, setMinPrice] = useState("");
  // const [maxPrice, setMaxPrice] = useState("");
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




// setting value in the url with key


const setFiltersInUrl = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);


  if (selectedBrands.length > 0) {
    urlSearchParams.set("brand", selectedBrands.join(","));
  } else {
    urlSearchParams.delete("brand");
  }

  if (selectedCategories.length > 0) {
    urlSearchParams.set("category", selectedCategories.join(","));
  } else {
    urlSearchParams.delete("category");
  }

  const url = `${window.location.pathname}?${urlSearchParams.toString()}`;
  window.history.pushState({}, "", url);
};



setFiltersInUrl()



function getFiltersFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  const brands = urlParams.get('brand');
 

  return ({
   
    category: category,
    brands: brands,
   
  });

}


let value= getFiltersFromURL()
console.log("filters value from URL::-",value);












  useEffect(() => {
    dispatch(getProductsData());
  }, [dispatch]);

  console.log(selectedCategories);
  console.log(selectedBrands)

  return (
    <>
      <DocumentTitle pageTitle="| PRODUCTS" />
      <Dekstop>
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

              <button className={styles._apply_button}>Apply</button>
            </div>
            <hr />

            <div className={styles._rating_div}>
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
          <div className={styles._products_container}>
            <div className={styles._products}>
              {isLoading ? (
                <Loader />
              ) : products.length === 0 ? (
                <h1>products not available</h1>
              ) : (
                products && products?.map((el) => <ProductCard key={el._id} {...el} />)
              )}
            </div>
         
          </div>
        </main>
      </Dekstop>

      {/* Tablet*/}

      <Tablet>
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
                {categoryOption.map((categ, index) => (
                  <option key={index} value={categ}>
                    {categ}
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
                {brandOption.map((brand, index) => (
                  <option key={index} value={brand}>
                    {brand}
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
              ) : products.length === 0 ? (
                <h1>products not available</h1>
              ) : (
                products && products?.map((el) => <TabletProductCard key={el._id} {...el} />)
              )}
            </div>
            
          </div>
        </main>
      </Tablet>

      {/* Mobile */}

      <Mobile>
        <div className={stylesTablet._mobile_products_container}>
          <div className={stylesTablet._mobile_products}>
            {isLoading ? (
              <Loader />
            ) : products.length === 0 ? (
              <h1>products not available</h1>
            ) : (
              products && products?.map((el) => <TabletProductCard key={el._id} {...el} />)
            )}
          </div>
        
        </div>
      </Mobile>
    </>
  );
}

export default ProductsPage;
