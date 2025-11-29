import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const Rider = () => {

    const { register, handleSubmit, watch, control, formState: { errors } } = useForm()
    const { user } = useAuth()
    const cervesecenter = useLoaderData()
    const rigionDuplicate = cervesecenter.map(c => c.region)

    const region = [...new Set(rigionDuplicate)]

    const riderRegion = watch('regions')
    const receiverRegion = useWatch({ control, name: 'receiverRegions' })
    const axiossecure = useAxiosSecure()

    
    const DistrictByRegion = region => {
        console.log(region)
        const regionDistrict = cervesecenter.filter(c => c.region === region)

        const district = regionDistrict.map(d => d.district)

        return district


    }



    const handelriderapplication = (data) => {
        console.log(data)

        axiossecure.post('/riders', data)
            .then(res => {

                if (res.data.insertedId) {
                    Swal.fire({
                        position: 'top-end',
                        title: 'your application has been submited ',
                        icon: 'success',
                        timer: 2000,

                    })
                }
            })
    }
    return (
        <div>
            <h2 className="text-4xl font-bold">Be A Rider</h2>

            <form onSubmit={handleSubmit(handelriderapplication)} className="mt-12 p-6">

                {/* parcel info  */}



                {/* parcel information  */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
                    <fieldset className="fieldset  ">

                        <label className="label">Parcel Name </label>
                        <input type="text" {...register('parcelName',)} className="input w-full" placeholder="Parcel Name" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Weight (kg) </label>
                        <input type="text" {...register('parcelWeight',)} className="input w-full" placeholder="Parcel Weight" />
                    </fieldset>
                </div>

                {/* tow col  */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* sender  */}
                    <fieldset className="fieldset ">
                        <h2 className="text-2xl font-semibold">Rider  Details</h2>
                        <label className="label mt-4">Sender Name</label>
                        <input type="text" defaultValue={user.displayName} {...register('senderName',)} className="input w-full" placeholder="SenderName" />

                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend "> Region</legend>
                            <select {...register('regions')} defaultValue="Pick a Region" className="select ">
                                <option disabled={true}>Pick a Region</option>

                                {
                                    region.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                            {/* <span className="label">Optional</span> */}
                        </fieldset>

                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend "> District</legend>
                            <select {...register('district')} defaultValue="Pick a District" className="select ">
                                <option disabled={true}>Pick a District</option>
                                {/* 811 013 3894 */}

                                {
                                    DistrictByRegion(riderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>

                        </fieldset>

                        {/* sender email  */}
                        <label className="label mt-4"> Email </label>
                        <input type="email" defaultValue={user.email} {...register('email',)} className="input w-full" placeholder="Email " />
                        {/* address */}
                        <label className="label mt-4">Your Address</label>
                        <input type="text" {...register('Address',)} className="input w-full" placeholder=" Address" />

                    </fieldset>

                    {/* receiver */}
                    <fieldset className="fieldset ">
                        <h2 className="text-2xl font-semibold">More Details</h2>
                        <label className="label mt-4">Driving  License </label>
                        <input type="text" {...register('license',)} className="input w-full" placeholder="Driving  License" />
                        {/* receiver email  */}
                        <label className="label mt-4">NID</label>
                        <input type="text" {...register('nid',)} className="input w-full" placeholder="NID " />

                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend ">Receiver Region</legend>


                        </fieldset>

                        {/* address */}
                        <label className="label mt-4">BIKE</label>
                        <input type="text" {...register('bike',)} className="input w-full" placeholder="BIKE" />

                    </fieldset>

                </div>
                <input className="btn btn-primary text-black" type="submit" value="Apply as a Rider" />
            </form>
        </div>
    );
};

export default Rider;