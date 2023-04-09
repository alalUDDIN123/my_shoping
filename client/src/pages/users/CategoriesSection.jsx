import React from 'react'
import { useMediaQuery } from 'react-responsive';
import styles from "../../styles/home.module.css"
import { Link, useNavigate } from 'react-router-dom';

const images = [
    {
        id: 1,
        category: "electronics",
        src:
            "https://rukminim1.flixcart.com/image/416/416/xif0q/television/b/c/7/-original-imaggz6zd5rchpuq.jpeg?q=70"
    },
    {
        id: 2,
        category: "accessories",
        src:
            "https://rukminim1.flixcart.com/image/416/416/xif0q/television/y/n/l/-original-imagkbyeqf5zxt6e.jpeg?q=70"
    },
    {
        id: 3,
        category: "clothing",
        src:
            "https://rukminim1.flixcart.com/image/416/416/k0tw13k0/television/h/a/m/thomson-32tm3290-original-imafkjazamdewz2x.jpeg?q=70"
    },
];

function CategoriesSection() {
    const navigate = useNavigate()
    const Dekstaop = ({ children }) => {
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
            {/* Dekstop */}

            <Dekstaop>
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

            </Dekstaop>

            {/* tablet */}

            <Tablet>
                <div className={styles._tablet_category}>
                    {images.map(el => (

                        <div key={el.id} className={styles._tablet_cate_img} onClick={()=>navigate(`/products/${el.category}`)}>
                            <img src={el.src} alt={`slideimage ${el.id}`} />
                            <h3 className={styles._tablet_title}>{el.category}</h3>
                        </div>

                    ))}
                </div>
            </Tablet>


            {/* mobile */}

            <Mobile>
                <div className={styles._mobile_category}>
                    {images.map(el => (
                        <div key={el.id} className={styles._mobile_cate_div} onClick={()=>navigate(`/products/${el.category}`)}>
                            <img src={el.src} alt={`slideimage ${el.id}`} />
                            <h3 className={styles._mobile_title} >{el.category}</h3>
                        </div>
                    ))}
                </div>
            </Mobile>
        </>
    )
}

export default CategoriesSection
