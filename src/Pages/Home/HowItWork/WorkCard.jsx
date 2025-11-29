import { CiDeliveryTruck } from "react-icons/ci";



const WorkCard = ({ work }) => {

    const { title, subtitle} = work
    return (
        <div className="hover-3d bg-white/70 p-6 rounded-2xl">
            <div className="space-y-3">
                <h3 className="text-4xl font-bold"><CiDeliveryTruck></CiDeliveryTruck></h3>
                <p className="text-2xl font-bold ">{title}</p>
                <p className="font-medium">{subtitle }</p>
              </div>
        </div>
    );
};

export default WorkCard;