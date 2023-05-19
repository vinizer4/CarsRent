import React from "react";
import Slider from "react-slick";
import './category-item.styles.scss'

export const CategoryCarousel = ({categories}: any) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="category-slide" >
        <Slider {...settings}>
            {categories.map((category: any, index: any) => (

                    <div key={index}>
                    <img className={'img'} src={category.imageUrl} alt={category.title}/>
                    <h3 className="category-title">{category.title}</h3>
                    </div>
            ))}
        </Slider>
        </div>
    );
};


export default CategoryCarousel;
