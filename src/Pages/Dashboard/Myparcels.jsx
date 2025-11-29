import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaMagnifyingGlass, FaTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import { Link } from "react-router";



const Myparcels = () => {

    const { user } = useAuth()
    const axiossecure = useAxiosSecure()

    const { data = [], refetch } = useQuery({
        queryKey: ['my-parcels'],
        queryFn: async () => {
            const res = await axiossecure.get(`/parcels?email=${user.email}`)
            return res.data
        }
    })
 
    console.log(data)

    const handeldelete = id => {
        console.log(id)

      
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiossecure.delete(`/parcels/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                })

               
            }
        })
    }

    const handelpayment = async (parcel) => {

        const paymentdata = {
            cost: parcel.cost,
            id: parcel._id,
            senderemail: parcel.senderemail,
            parcelName: parcel.parcelName,
            trackingId: parcel.trackingId
        }

        const res = await axiossecure.post('/payment-checkout-session', paymentdata)
         console.log(res.data)
        window.location.assign(res.data.url)

    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Payment Status</th>
                            <th>TrackingId</th>
                            <th>Delivery Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                        {
                            data.map((parcel, idx) => <tr key={parcel._id}>
                                <th>{ idx + 1 }</th>
                                <td>{parcel.parcelName}</td>
                                <td>{ parcel.cost}</td>
                                <td>{parcel?.payment_status == 'paid' ? <span className="text-green-400">Paid</span> :
                                    
                                    <button onClick={() => handelpayment(parcel)} className="btn btn-primary btn-sm text-black">Pay</button>}
                                
                                </td>
                                <td>

                                    <Link to={`/parceltrack/${parcel.trakingId}`}>{parcel.trakingId}</Link>
                                </td>
                                <td>{parcel.DeliveryStatus}</td>
                                <td>
                                    <button className="btn btn-square hover:bg-primary"><FaMagnifyingGlass /> </button>
                                    <button className="btn btn-square hover:bg-primary mx-2"><FiEdit /> </button>
                                    <button onClick={() => handeldelete(parcel._id)} className="btn btn-square hover:bg-primary"><FaTrashCan /> </button>
                                </td>
                            </tr>)
                        }
                      
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Myparcels;