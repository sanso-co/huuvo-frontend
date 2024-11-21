import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { HeroType } from "@/types/marketing";

import styles from "./hero.module.scss";
import layout from "@/assets/styles/layout.module.scss";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Props {
    heroes: HeroType[];
}

export const Hero = ({ heroes }: Props) => {
    return (
        <div className={`${styles.heroWrapper} ${layout.max}`}>
            <div className={styles.aspectRatioBox}>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 8000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    className={styles.heroSwiper}
                >
                    {(heroes || []).map((item) => (
                        <SwiperSlide key={item.order}>
                            <div className={styles.slideContainer}>
                                <Link to={item.url} className={styles.slideContent}>
                                    <div className={styles.tag}>
                                        <div
                                            className={styles.dot}
                                            style={{ backgroundColor: item?.tag?.color }}
                                        ></div>
                                        <span>{item?.tag?.label}</span>
                                    </div>
                                    <h3>{item.title}</h3>
                                </Link>
                                <div className={styles.slideOverlay}></div>
                                <img src={item.img || ""} alt={item.title} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};
