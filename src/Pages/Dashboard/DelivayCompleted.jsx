import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const DelivayCompleted = () => {

    const { user } = useAuth()
    const axiossecure = useAxiosSecure()
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user.email, 'driver-assigned'],
        // riderEmail, 
        queryFn: async () => {
            const res = await axiossecure.get(`/parcels/rider?riderEmail=${user.email}&DeliveryStatus=parcel_delived`)

            return res.data
        }


    })


    const calculatepayout = parcel => {
      
        console.log(parcel)

        if (parcel.senderdistrict === parcel.receiverDistrict) {
            
            return parcel.cost * 0.8
        }
        else {
           return parcel.cost * 0.6
        }
    }
    return (
        <div>
            <h2 className="text-5xl">completed-delivery {parcels.length} </h2>
            

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>CreatedAt</th>
                            <th>District</th>
                            <th>PayOut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            parcels.map((parcel, idx) => <tr key={idx}>
                                <th>{idx + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.cost}</td>
                                <td>{parcel.createdAt}</td>
                                <td>{parcel.senderdistrict}</td>
                                <td>{calculatepayout(parcel)}</td>
                                <td>
                                    <button  className='btn btn-primary text-black'>Cash Out</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DelivayCompleted;