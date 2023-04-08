import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "../styles/home.module.css";
import { useMediaQuery } from "react-responsive";

const images = [
  { id: 1, src: "https://rukminim1.flixcart.com/image/416/416/xif0q/television/b/c/7/-original-imaggz6zd5rchpuq.jpeg?q=70" },
  { id: 2, src: "https://rukminim1.flixcart.com/image/416/416/xif0q/television/y/n/l/-original-imagkbyeqf5zxt6e.jpeg?q=70" },
  { id: 3, src: "https://rukminim1.flixcart.com/image/416/416/k0tw13k0/television/h/a/m/thomson-32tm3290-original-imafkjazamdewz2x.jpeg?q=70" },
];

const CarouselComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 });
    return isDesktop ? children : null;
  };
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    return isTablet ? children : null;
  };
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
  };

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const totalSlides = images.length;
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % totalSlides;
      setCurrentSlide(nextSlide);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <>

      {/* default */}

      <Desktop>
        <Carousel
          autoPlay
          showArrows={false}
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          interval={3000}
          transitionTime={1000}
          selectedItem={currentSlide}
          onChange={handleSlideChange}
          className={styles.carousel}
        >
          {images.map((image) => (
            <div key={image.id} style={{ height: "50vh" }}>
              <img src={image.src} alt={`slideimage ${image.id}`} style={{ height: "100%" }} />
            </div>
          ))}
        </Carousel>
      </Desktop>


      {/* Tablet */}
      <Tablet>
        <Carousel
          autoPlay
          showArrows={false}
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          interval={3000}
          transitionTime={1000}
          selectedItem={currentSlide}
          onChange={handleSlideChange}
          className={styles.carousel}
        >
          {images.map((image) => (
            <div key={image.id} style={{ height: "40vh" }}>
              <img src={image.src} alt={`slideimage ${image.id}`} style={{ height: "100%" }} />
            </div>
          ))}
        </Carousel>
      </Tablet>

      {/* mobile */}

      <Mobile>
        <Carousel
          autoPlay
          showArrows={false}
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          interval={3000}
          transitionTime={1000}
          selectedItem={currentSlide}
          onChange={handleSlideChange}
          className={styles.carousel}
        >
          {images.map((image) => (
            <div key={image.id} style={{ height: "30vh" }}>
              <img src={image.src} alt={`slideimage ${image.id}`} style={{ height: "100%" }} />
            </div>
          ))}
        </Carousel>

      </Mobile>
    </>
  );
};

export default CarouselComponent;
