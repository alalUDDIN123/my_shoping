import React from "react";
import styles from "../../styles/home.module.css";
import { Link } from "react-router-dom";
import { MdOutlineElectricalServices } from "react-icons/md";
import { BsLaptop } from "react-icons/bs";
import { GiClothes } from "react-icons/gi";

const categories = [
  {
    id: 1,
    category: "electronics",
    icon: <MdOutlineElectricalServices />,
  },
  {
    id: 2,
    category: "accessories",
    icon: <BsLaptop />,
  },
  {
    id: 3,
    category: "clothing",
    icon: <GiClothes />,
  },
];

function CategoriesSection() {
  // const navigate = useNavigate()
  // const Dekstaop = ({ children }) => {
  //     const isDekstop = useMediaQuery({ minWidth: 992 })

  //     return isDekstop ? children : null
  // }

  // const Tablet = ({ children }) => {
  //     const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })

  //     return isTablet ? children : null
  // }

  // const Mobile = ({ children }) => {
  //     const isMobile = useMediaQuery({ maxWidth: 767 })
  //     return isMobile ? children : null
  // }

  return (
    <>
      <div className={styles.home_categories}>
        {categories?.map((item) => (
          <Link
            key={item.id}
            to={`/products/${item.category}`}
            className={styles.home_link_categories}
          >
            <div>{item.icon}</div>
            <div>{item.category}</div>
          </Link>
        ))}
      </div>
      {/* Dekstop */}

      {/* <Dekstaop>
                <div className={styles._category}>
                    {images.map(el => (
                        <div key={el.id} className={styles._cate_img} >
                            <Link to={`/products/category=${el.category}`}>
                                <img src={el.src} alt={`slideimage ${el.id}`} />
                                <h3 className={styles._title}>{el.category}</h3>
                            </Link>
                        </div>
                    ))}
                </div>

            </Dekstaop> */}

      {/* tablet */}

      {/* <Tablet>
                <div className={styles._tablet_category}>
                    {images.map(el => (
                        <div key={el.id} className={styles._tablet_cate_img} onClick={()=>navigate(`/products/${el.category}`)}>
                            <img src={el.src} alt={`slideimage ${el.id}`} />
                            <h3 className={styles._tablet_title}>{el.category}</h3>
                        </div>
                    ))}
                </div>
            </Tablet> */}

      {/* mobile */}

      {/* <Mobile>
                <div className={styles._mobile_category}>
                    {images.map(el => (
                        <div key={el.id} className={styles._mobile_cate_div} onClick={()=>navigate(`/products/${el.category}`)}>
                            <img src={el.src} alt={`slideimage ${el.id}`} />
                            <h3 className={styles._mobile_title} >{el.category}</h3>
                        </div>
                    ))}
                </div>
            </Mobile> */}
    </>
  );
}

export default CategoriesSection;
