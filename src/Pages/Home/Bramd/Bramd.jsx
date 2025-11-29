import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import amson from '../../../assets/brands/amazon.png'
import amson_vic from '../../../assets/brands/amazon_vector.png'
import casio from '../../../assets/brands/casio.png'
import moonstar from '../../../assets/brands/moonstar.png'
import randstad from '../../../assets/brands/randstad.png'
import star from '../../../assets/brands/star.png'
import start_people from '../../../assets/brands/start_people.png'
import { Autoplay } from 'swiper/modules';

 
const data = [amson, amson_vic, casio, moonstar, randstad, star, start_people, ]
const Bramd = () => {
    return (
        <Swiper
            slidesPerView={3}
            loop={true}
            centeredSlides={true}
            spaceBetween={30}
            grabCursor={true}
            autoplay={{ delay: 1500, disableOnInteraction: false }}
            modules={[Autoplay]}
        >
            {
                data.map((logo, idx )=> <SwiperSlide key={idx}><img src={logo } alt="" /></SwiperSlide> )
            }
           
            
       </Swiper>
    );
};

export default Bramd;