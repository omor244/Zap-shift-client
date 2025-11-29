import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "sonner";

const AssignDelivery = () => {
    const { user } = useAuth()
    const axiossecure = useAxiosSecure()
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user.email, 'driver-assigned'],
        // riderEmail, 
        queryFn: async () => {
            const res = await axiossecure.get(`/parcels/rider?riderEmail=${user.email}&DeliveryStatus=driver-assigned`)

            return res.data
        }
  
    
    })

    console.log('parcels', parcels)

    const handelaccept = (parcel, status) => {


        const updatedinfo = {
            DeliveryStatus: status,
            riderId: parcel.riderId,
            trackingId:  parcel.trackingId
        }
        
        axiossecure.patch(`/parcels/${parcel._id}/status`, updatedinfo)
            .then(res => {
              refetch()
                console.log(res.data)

                toast.success('successfully accepted')
        })
    }
    return (
        <div>
            <h2 className="text-4xl font-bold">Rider Parcels {parcels.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, idx) => <tr key={idx}>
                                <th>{idx + 1}</th>
                                <td>{parcel.parcelName }</td>
                                <td>
                                    {parcel.DeliveryStatus === "driver-assigned" ? <>
                                        <button onClick={() => handelaccept(parcel, 'rider_arriving')} className="text-black btn btn-primary ">Accept</button>
                                        <button className="text-black btn btn-warning ml-2 ">Reject</button>
                                    </>: <span>accepted</span>}
                                </td>
                                <td>
                                    <button onClick={() => handelaccept(parcel, 'parcel_pic_up')} className="text-black btn btn-primary ">Mark As Pickup</button>
                                    <button onClick={() => handelaccept(parcel, 'parcel_delived')} className="text-black btn btn-primary mr-2 ">Mark As Delived</button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignDelivery;