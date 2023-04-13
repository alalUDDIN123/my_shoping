import React, { useEffect, useState } from 'react'
import styles from "../../styles/products.module.css"
import stylesPagin from "../../styles/Pagination.module.css"
import { useMediaQuery } from 'react-responsive'
import stylesTablet from "../../styles/products.tablet.module.css"

import { brandOption, categoryOption, ratingOption } from '../../Constant/ProductsFiltersOption'
import Loader from '../../components/Loader'
import ProductCard from '../../components/ProductC'
import TabletProductCard from '../../components/TabletProductCard'
import DocumentTitle from '../../components/Helmet'



function ProductsPage() {
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
      <DocumentTitle pageTitle="Products" />
      <Dekstop>
        <main className={styles._main_div} >

          {/* filters container */}
          <div className={styles._filters}>

            <div className={styles._category_div} >
              <label className={styles._label_text}>Select Category</label>
              {categoryOption.map((cate, index) => (
                <div key={index}>
                  <input type="checkbox"
                    name="category"
                    value={cate}
                  />
                  <label >{cate}</label>
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
                products.length === 0 ? (
                  <h1>products not available</h1>
                ) : (
                  products.map((el) => (
                    <ProductCard key={el._id} {...el} />
                  ))
                )
              )}


            </div>
            {/* {products.length > 0 && <div className={stylesPagin.pagination}>
              <span onClick={() => selectPageHandler(page - 1)} className={page > 1 ? "" : stylesPagin.pagination__disable}>◀</span>

              {[...Array(totalPages)].map((_, i) => {
                return <span key={i} className={page === i + 1 ? stylesPagin.pagination__selected : ""} onClick={() => selectPageHandler(i + 1)}>{i + 1}</span>
              })}

              <span onClick={() => selectPageHandler(page + 1)} className={page < totalPages ? "" : stylesPagin.pagination__disable}>▶</span>
            </div>
            } */}

          </div>

        </main>
      </Dekstop >



      {/* Tablet*/}

      <Tablet>
        <main className={stylesTablet._tablet_main_div} >

          {/* filters container */}
          <div className={stylesTablet._tablet_filters}>

            <div className={stylesTablet._tablet_category_div} >
              <label className={stylesTablet._tablet__label_text}>Select Category</label>
              <select  >
                <option value="" disabled selected>-Select Category-</option>
                {categoryOption.map((categ, index) => (
                  <option key={index} value={categ}>
                    {categ}
                  </option>
                ))}
              </select>


            </div>
            <hr />

            <div className={stylesTablet._tablet_brand_div} >
              <label className={stylesTablet._tablet_label_text}>Select Brand</label>
              <select >
                <option value="" disabled selected >-Select brand-</option>
                {brandOption.map((brand, index) => (
                  <option key={index} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            <hr />

            <div className={stylesTablet._tablet_price_div}>
              <label className={`${stylesTablet._tablet_label_text} ${stylesTablet._label_text_price}`} >Enter price range</label>
              <div>
                <label htmlFor=""> Min price</label>
                <input type="number" />

              </div>
              <div>
                <label htmlFor="">Max price</label>
                <input type="number" />
              </div>

              <button className={stylesTablet._tablet_apply_button}>Apply</button>

            </div>
            <hr />

            <div className={stylesTablet._tablet_rating_div} >
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
          <div className={stylesTablet._tablet_products_container}>
            <div className={stylesTablet._tablet_products}>
              {loading ? (
                <Loader />
              ) : (
                products.length === 0 ? (
                  <h1>products not available</h1>
                ) : (
                  products.map((el) => (
                    <TabletProductCard key={el._id} {...el} />
                  ))
                )
              )}


            </div>
            {products.length > 0 && <div className={stylesTablet._tablet_pagination}>
              <span onClick={() => selectPageHandler(page - 1)} className={page > 1 ? "" : stylesTablet._tablet_pagination__disable}>◀</span>

              {[...Array(totalPages)].map((_, i) => {
                return <span key={i} className={page === i + 1 ? stylesTablet._tablet_pagination__selected : ""} onClick={() => selectPageHandler(i + 1)}>{i + 1}</span>
              })}

              <span onClick={() => selectPageHandler(page + 1)} className={page < totalPages ? "" : stylesTablet._tablet_pagination__disable}>▶</span>
            </div>}

          </div>

        </main>
      </Tablet >



      {/* Mobile */}

      <Mobile>

        <div className={stylesTablet._mobile_products_container}>
          <div className={stylesTablet._mobile_products}>
            {loading ? (
              <Loader />
            ) : (
              products.length === 0 ? (
                <h1>products not available</h1>
              ) : (
                products.map((el) => (
                  <TabletProductCard key={el._id} {...el} />
                ))
              )
            )}


          </div>
          {products.length > 0 && <div className={stylesTablet._mobile_pagination}>
            <span onClick={() => selectPageHandler(page - 1)} className={page > 1 ? "" : stylesTablet._mobile_pagination__disable}>◀</span>

            {[...Array(totalPages)].map((_, i) => {
              return <span key={i} className={page === i + 1 ? stylesTablet._mobile_pagination__selected : ""} onClick={() => selectPageHandler(i + 1)}>{i + 1}</span>
            })}

            <span onClick={() => selectPageHandler(page + 1)} className={page < totalPages ? "" : stylesTablet._mobile_pagination__disable}>▶</span>
          </div>}

        </div>


      </Mobile >
    </>
  )
}

export default ProductsPage
