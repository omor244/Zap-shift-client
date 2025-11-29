import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaEye, FaTrashAlt, FaUserCheck, FaUserCircle } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";


const ApproveRider = () => {
    const axiossecure = useAxiosSecure()
    const {data: riders = [], refetch } = useQuery({
        queryKey: ['rider', "pending"],
        queryFn: async () => {
            const res = await axiossecure.get('/riders')
            
            return res.data
        }
    })

    console.log(riders)

    const handelupdatestatus = (rider, status) => {
 

        const updateddata = { status: status, email: rider.email }

        axiossecure.patch(`/riders/${rider._id}`, updateddata)
            .then(res => {
                console.log(res.data)
                refetch()
                if (res.data.modifiedCount) {

                    Swal.fire({
                        position: 'top-end',
                        title: `Rider status is set to ${status}`,
                        icon: 'success',
                        timer: 2000,
                    })

                 

                }
            })
    }

    const handelapproveal = rider => {
       

        handelupdatestatus(rider, 'approved' )

       
    }

    const handelrejected = rider => {
        handelupdatestatus(rider, 'rejected')
    }
    return (
        <div>
            <h2 className="text-4xl">Approve Riders: {riders.length}</h2>
            
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                          
                            <th>Application Status</th>
                            <th>Work Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            riders.map((rider, idx) => <tr>
                                <th>{idx + 1}</th>
                                <td>{rider.senderName}</td>
                                <td>{rider.email}</td>
                                <td>{
                                    <p className={` ${rider.status === 'approved'? 'badge text-green-500 badge-ghost': 'text-rose-600'}`}>{rider.status}</p>
                                }</td>
                                <td>{rider.workStatus}</td>

                                <td>
                                    <button  className="btn"> 
                                        <FaEye/>
                                    </button>
                                    <button onClick={() => handelapproveal(rider)} className="btn">
                                        <FaUserCheck/>
                                    </button>
                                    <button onClick={() => handelrejected(rider)} className="btn">
                                        <IoPersonRemoveSharp/>

                                    </button>
                                    <button className="btn">
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>)
                      }
                      
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveRider;