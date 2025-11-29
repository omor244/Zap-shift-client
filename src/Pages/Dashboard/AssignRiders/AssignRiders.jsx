import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';


const AssignRiders = () => {
    const axiossecure = useAxiosSecure()
    const assignmodalref = useRef()
    const [selectedparcel, setselectedparcel] = useState(null)
    const { refetch, data: parcels = [] } = useQuery({
        queryKey: ['parcels', 'pending-pickup'],
        queryFn: async () => {
            const res = await axiossecure.get('/parcels?DeliveryStatus=pending-pickup')
            return res.data
        }
    })





    const { data: riders = [], } = useQuery({
        queryKey: ['riders', selectedparcel?.senderdistrict, 'available'],
        enabled: !!selectedparcel,
        queryFn: async () => {
            const res = await axiossecure.get(`/riders?status=approved&district=${selectedparcel?.senderdistrict}&workStatus=available`)
            console.log('data', res)
            return res.data
        }
    })

    console.log(riders)


    const handelassignmodalref = parcel => {

        setselectedparcel(parcel)
        assignmodalref.current.showModal()
    }


    const handelassignrider = (rider) => {
        const riderinfo = {
            riderId: rider._id,
            Name: rider.parcelName,
            Email: rider.email,
            parcelId: selectedparcel?._id,
            trackingId: selectedparcel.trackingId

        }
        axiossecure.patch(`/parcels/${selectedparcel._id}`, riderinfo)
            .then(res => {
                refetch()
                console.log(res.data)
                assignmodalref.current.close()
            })
    }
    return (
        <div>
            <h2 className="text-5xl">Assign Riders {parcels.length}</h2>

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
                                <td>
                                    <button onClick={() => handelassignmodalref(parcel)} className='btn btn-primary text-black'>Find Rider</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>

            <dialog ref={assignmodalref} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Tiders {riders.length}</h3>

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
                                    riders.map((rider, idx) =>
                                        <tr key={rider._id}>
                                            <th>{idx + 1}</th>
                                            <td>{rider.parcelName}</td>
                                            <td>{rider.email}</td>
                                            <td>
                                                <button onClick={() => handelassignrider(rider)} className="btn btn-primary text-black"> Assign</button>
                                            </td>
                                        </tr>)
                                }

                            </tbody>
                        </table>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AssignRiders;