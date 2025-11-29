import { use } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard";


const Review = ({ ReviewPromice }) => {
    const Review = use(ReviewPromice)
    console.log(Review)
    return (
        <div className="my-12"> 


            <div>
                <Swiper
                    loop={true}
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={3}
                        coverflowEffect={{
                            rotate: 30,
                            stretch: "50%",
                            depth: 200,
                            modifier: 1,
                            scale: 0.75,
                            slideShadows: true,
                    }}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                        pagination={true}
                        modules={[EffectCoverflow, Pagination, Autoplay]}
                        className="mySwiper"
                    >
                        {
                            Review.map(review => <SwiperSlide key={review.id}>
                                <ReviewCard review={review}></ReviewCard>
                            </SwiperSlide>)
                    }
                     
                    </Swiper>
           
            </div>
            
        </div>
    );
};

export default Review;