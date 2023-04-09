import React from 'react'
import styles from "../../styles/products.module.css"
import { useMediaQuery } from 'react-responsive'
import { productsData } from './ProductsData'

import { brandOption, categoryOption, ratingOption } from '../../Constant/ProductsFiltersOption'
import Loader from '../../components/Loader'
import ProductCard from '../../components/ProductC'
// import ProductCard from '../../components/ProductCard'


function ProductsPage({ loading = false }) {


  const Dekstop = ({ children }) => {
    const isDekstop = useMediaQuery({ minWidth: 992 })
    return isDekstop ? children : null
  }
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
  }


  return (
    <>
      <Dekstop>
        <main className={styles._main_div} >

          {/* filters container */}
          <div className={styles._filters}>

            <div className={styles._category_div} >
              <label className={styles._label_text}>Select Category</label>
              {categoryOption.map((cate, index) => (
                <div key={index}>
                  <input type="checkbox" id={`category-${index}`} name="category" value={cate} />
                  <label htmlFor={`category-${index}`}>{cate}</label>
                </div>
              ))}


            </div>
            <hr />

            <div className={styles._brand_div} >
              <label className={styles._label_text}>Select Brand</label>
              {brandOption.map((brand, index) => (
                <div key={index}>
                  <input type="checkbox" id={`category-${index}`} name="category" value={brand} />
                  <label htmlFor={`category-${index}`}>{brand}</label>
                </div>
              ))}

            </div>
              <hr />

            <div className={styles._price_div}>
              <label className={`${styles._label_text} ${styles._label_text_price}`} >Enter price range</label>
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

            <div className={styles._rating_div} >
              <label >Choose rating</label>
              <select >
                <option value="" disabled>Ratings</option>
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
              {loading ? (
                <Loader />
              ) : (
                productsData.length === 0 ? (
                  <h1>products not available</h1>
                ) : (
                  productsData.map((el) => (
                    <ProductCard key={el.id} {...el} />
                  ))
                )
              )}
            </div>


          </div>

        </main>
      </Dekstop >



      {/* Tablet*/}

      <Tablet Tablet >

        <main>

          {/* filters container */}
          <div>

          </div>


          {/* products container */}
          <div>

          </div>
        </main>
      </Tablet >



      {/* Mobile */}

      <Mobile Mobile >
        <main>

          {/* filters container */}
          <div>

          </div>


          {/* products container */}
          <div>

          </div>
        </main>
      </Mobile >
    </>
  )
}

export default ProductsPage
