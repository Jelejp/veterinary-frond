import React from 'react'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from 'react-slick'
import "../CarruselBanner.css"

const CarruselBanner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true
    }

    const imgs = [
        "src/assets/carrusel1.jpg",
        "src/assets/carrusel2.jpeg",
        "src/assets/carrusel3.jpg",
        "src/assets/carrusel4.jpg",
        "src/assets/carrusel5.png"
    ]
    return (
        <div>
            <div className="carousel-container">
                <Slider {...settings}>
                    {imgs.map((img, index) => (
                        <div key={index} className="carousel-slide">
                            <img src={img} alt={`Slide ${index + 1}`} className="carousel-image" />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default CarruselBanner
