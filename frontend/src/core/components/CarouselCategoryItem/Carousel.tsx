import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// import required modules
import { Pagination } from "swiper";

import React, {useState} from "react";
import "./category-item.styles.scss";
import {CategoriaInterface} from "../../interface/CategoryInterface";

type props = {
    categories: CategoriaInterface[];
    handleCategoryClick: (categoryId: number) => void;
}
export const CategoryCarousel = ({ categories, handleCategoryClick }: props) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleClick = (index: any, categoryId: number) => {
        setActiveIndex(index);
        handleCategoryClick(categoryId);

        // Remove o estado de ativo após um curto período de tempo
        setTimeout(() => setActiveIndex(null), 300);
    };
    return (
        <div>
            <Swiper
                style={{
                    height: "fit-content",
                    paddingBottom: "5rem",
                    paddingTop: "1rem",
                }}
                spaceBetween={15}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
                breakpoints={{
                    // when window width is >= 640px
                    640: {
                        width: 640,
                        slidesPerView: 1,
                    },
                    // when window width is >= 768px
                    768: {
                        width: 768,
                        slidesPerView: 2,
                    },
                    1024: {
                        width: 1024,
                        slidesPerView: 2,
                    },
                }}
            >
                {categories.map((category: any, index: any) => (
                    <SwiperSlide
                        key={index}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <div
                            className={`category-item ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => handleClick(index, category.id)}
                        >
                            <img
                                className="img"
                                src={category.imageUrl}
                                alt={category.title}
                                style={{
                                    height: "10rem",
                                    width: "17rem",
                                    objectFit: "cover",
                                    outline: "none",
                                    border: "none",
                                }}
                            />
                        </div>
                        <h2 className="category-title">{category.qualification}</h2>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CategoryCarousel;
