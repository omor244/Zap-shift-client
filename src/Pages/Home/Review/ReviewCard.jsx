import { FaQuoteLeft } from "react-icons/fa";




const ReviewCard = ({ review }) => {
    console.log(review)
    const { review: dis, user_photoURL, userName} = review
    return (
        <div className="card w-[350px] bg-base-100 shadow-md p-6 rounded-xl border border-gray-100">
            {/* Quote Icon */}
            <FaQuoteLeft className="text-3xl text-teal-300" />

            {/* Text */}
            <p className="mt-4 ">
               {dis}
            </p>

            {/* Divider */}
            <div className="border-b border-dashed border-gray-300 my-4"></div>

            {/* User Section */}
            <div className="flex items-center gap-3">
               
                <img className="w-10 h-10 rounded-full " src={user_photoURL} alt="" />
                <div>
                    <h3 className="font-bold text-lg">{ userName}</h3>
                    <p className="text-gray-500 text-sm">Senior Product Designer</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;