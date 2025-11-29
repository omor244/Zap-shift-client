import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerimg1 from '../../../assets/banner/banner1.png'
import bannerimg2 from '../../../assets/banner/banner2.png'
import bannerimg3 from '../../../assets/banner/banner3.png'
const Banner = () => {
    return (
        <Carousel
           
            autoPlay
            infiniteLoop
            showStatus={false}
            showThumbs={false}
        >
            <div>
                <img src={bannerimg1} />
                
            </div>
            <div>
                <img src={bannerimg2} />
                
            </div>
            <div>
                <img src={bannerimg3} />
                
            </div>
        </Carousel>
    );
};

export default Banner;