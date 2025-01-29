import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { HeroType } from "@/types/marketing";

import styles from "./hero.module.scss";
import layout from "@/assets/styles/layout.module.scss";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Props {
    heroes: HeroType[];
    isLoading: boolean;
    error: Error | null;
}

export const Hero = ({ heroes, isLoading, error }: Props) => {
    if (isLoading)
        return (
            <div className={`${styles.loaderWrapper} ${layout.max} hero`}>
                <div className={styles.aspectRatioBox}></div>
            </div>
        );
    if (error)
        return (
            <div className={`${styles.heroWrapper} ${layout.max} hero`}>
                <div className={styles.aspectRatioBox}>
                    <div className={styles.error}>An error occured loading slider :(</div>
                </div>
            </div>
        );

    return (
        <div className={`${styles.heroWrapper} ${layout.max} hero`}>
            <div className={styles.aspectRatioBox}>
                <Swiper
                    spaceBetween={0}
                    centeredSlides={true}
                    autoplay={{
                        delay: 8000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
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
                                    {item.tagline && (
                                        <div className={styles.tagline}>{item.tagline}</div>
                                    )}
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
