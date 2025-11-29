import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Handler } from "leaflet";



const Payment = () => {
    const { id } = useParams()
    const axiossecure = useAxiosSecure()

    const {data: parcel =[] } = useQuery({
        queryKey: ['parcels', id],
        queryFn: async () => {

            const res = await axiossecure.get(`/parcels/${id}`)
            return res.data
            
        }
    })
    
    const handelpayment =async () => {
        
        const paymentdata = {
            cost: parcel.cost,
            id: parcel._id,
            senderemail: parcel.senderemail,
            parcelName: parcel.parcelName
        }

        const res = await axiossecure.post(`/create-checkout-session`, paymentdata)
        console.log(res.data)
        window.location.href = res.data.url
    }
     
    return (
        <div>
            <h3>Please pay  ${parcel.cost} for {parcel.parcelName}</h3>
            <button onClick={handelpayment} className="btn btn-primary text-black">Pay</button>
        </div>
    );
};

export default Payment;