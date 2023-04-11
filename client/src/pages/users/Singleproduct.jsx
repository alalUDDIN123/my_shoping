import React, { useEffect, useState } from 'react'

import styles from "../../styles/details.module.css"
import { product } from './SingleObjetData'
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import { TiShoppingCart } from "react-icons/ti"
import { ReviewModal } from '../../components/CompleteReview';
import ProductCard from "../../components/ProductC"
import AddReviewModal from '../../components/AddReviewModal';
function Singleproduct() {
  const [recommendedProd, setRecommendPro] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
 
  const handleAddReviewClick = () => {
    setShowAddReviewModal(true);
  };

  const handleAllReviws=()=>{
    alert("Modal will be show")
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`https://dummyjson.com/products?limit=10`)
      const data = await res.json()
      if (data && data.products) {
        setRecommendPro(data.products)
      }

    }
    fetchProducts()
  }, [])

  return (
    <>
      <div className={styles._main_single_container}>

        {/* images  */}
        <div className={styles._main_single_images}>

          {/* column images div */}

          <div className={styles._main_single_column}>
            {product && product.images.map((image, index) => (
              <img key={index} src={image} alt={`Product ${index + 1}`} />
            ))}
          </div>


          {/* single image */}

          <div className={styles._main_single_img} >
            <img src={product.image} alt={`product-${product.title}`} style={{ borderRadius: "5px" }} />

            <div className={styles._main_single_buttons}>
              <button className={styles.buyButton} >Buy Now <TiShoppingCart style={{ paddingLeft: "10px", fontSize: "30px" }} /></button>
              <button className={styles.cartButton}>Add to Cart <FaShoppingCart style={{ paddingLeft: "10px", fontSize: "30px" }} /></button>
            </div>
          </div>

        </div>


        {/* details about the product */}
        <div className={styles._main_single_details}>
          <h2>{product && product.title}</h2>

          <div className={styles._main_single_reviews}>
            <button>
              {product && <span style={{ fontSize: "17px" }}>{product.ratings} </span>}
              <FaStar style={{ paddingLeft: '5px', fontSize: '20px' }} />
            </button>
            <p>{product && product.reviews.length} Reviews</p>
          </div>

          <div className={styles._main_single_price}>
            <p className={styles.discountPrice}>₹ {product && product.discountPrice}</p>
            <p className={styles.originalPrice}>₹ {product && product.originalPrice}</p>
          </div>

          <div className={styles._main_single_stock_cate_bran}>
            <p> <span>Availability  </span> :   {product && product.Stock > 0 ? `In Stock (${product.Stock})` : "Out of Stock"}</p>
            <p> <span>Category  </span> :   {product && product.category}</p>
            <p> <span>Brand  </span> :   {product && product.brand}</p>
          </div>

          <div className={styles._main_single_description} >
            <span >Description : </span>
            <p>
              {product && product.description}
            </p>
          </div>

          <hr />


          <div className={styles._main_single_reviews_container}>
            {product && product.reviews.length === 0 ? (
              <h1 className={styles._main_single_no_reviews}>No Reviews</h1>
            ) : (
              <>
                {product.reviews.slice(0, 2).map((rev) => (
                  <div key={rev.id} className={styles._main_single_reviewer}>
                    <div className={styles._main_single_rating_name}>
                      <button className={styles._main_single_buttons_reviwes_given} >
                        {product && (
                          <span style={{ fontSize: "17px" }}>{rev.rating} </span>
                        )}
                        <FaStar
                          style={{ paddingLeft: "5px", fontSize: "20px" }}
                        />
                      </button>
                      <p className={styles._main_single_rater_name}>{rev.name}</p>
                    </div>
                    <div className={styles._main_single_comment}>
                      <p className={styles._main_single_com}>
                        {rev.comment.length > 300
                          ? `${rev.comment.substring(0, 300)}.`
                          : rev.comment
                        }
                        {rev.comment.length > 300 && (
                          <button onClick={() => setModalVisible(true)} 
                          className={styles._main_single_see_more} onClose={()=>setModalVisible(false)} >
                            See more
                          </button>
                        )}
                      </p>


                    </div>
                  </div>
                ))}


              </>
            )}
          </div>

          {modalVisible && (
            <ReviewModal
              content={product.reviews.find((rev) => rev.comment.length > 300).comment}
              onClose={() => setModalVisible(false)}
            />
          )}

          <div className={styles._main_single_add_review}>
            {product.reviews.length > 2 && <button className={styles._main_single_add_review_see_all} onClick={handleAllReviws} >SEE ALL REVIEWS</button>}
            <button className={styles._main_single_add_review_btn} onClick={handleAddReviewClick}>ADD REVIEW</button>
            {showAddReviewModal && (
              <AddReviewModal onCloseModal={() => setShowAddReviewModal(false)} />
            )}
          </div>

        </div>
      </div>

      {/* recommaned */}
      <div className={styles._main_single_recommendations}>
        <h3>Recommended Products</h3>
        {recommendedProd.length === 0 ? <h1>Recommended Product Not Available</h1> :
          <div className={styles._main_single_recommend_products}>
            {recommendedProd.map((el) => (
              <ProductCard key={el.id} {...el} />
            ))}
          </div>
        }
      </div>

    </>
  )
}

export default Singleproduct
