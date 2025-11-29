
import Banner from './Banner/Banner';
import Bramd from './Bramd/Bramd';
import HowItWork from './HowItWork/HowItWork';
import OurServeses from './OurServeses/OurServeses';
import Review from './Review/Review';

const ReviewPromice = fetch('/reviews.json').then(res => res.json())

const Home = () => {



    return (
        <div className='space-y-12 bg-base-300 mb-12'>
            <Banner></Banner>

            <HowItWork></HowItWork>
            <OurServeses></OurServeses>
            <Bramd></Bramd>
            <Review ReviewPromice={ReviewPromice}  ></Review>
            
        </div>
    );
};

export default Home;