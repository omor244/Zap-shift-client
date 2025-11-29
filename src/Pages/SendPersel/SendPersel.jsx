import { useForm, useWatch } from "react-hook-form";
import { Navigate, useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";


const SendPersel = () => {

    const { register, handleSubmit, watch, control,  } = useForm()
    const cervesecenter = useLoaderData()
    const navigate = useNavigate()
    const {user}= useAuth()
    const rigionDuplicate = cervesecenter.map(c => c.region)

    const region = [...new Set(rigionDuplicate)]

    const senderRegion = watch('senderRegions')
    const receiverRegion = useWatch({ control, name: 'receiverRegions' })
    const axiossecure = useAxiosSecure()
    const DistrictByRegion = region => {

        const regionDistrict = cervesecenter.filter(c => c.region === region)

        const district = regionDistrict.map(d => d.district)

        return district


    }

    const handlesendParcel = data => {
        console.log(data)
        const isdocument = data.parcelType === 'document'

        const issamedictrict = data.senderdistrict === data.receiverDistrict
        const parcelWeight = parseFloat(data.parcelWeight)
        let cost = 0

        if (isdocument) {

            cost = issamedictrict ? 60 : 80;
        }
        else {
            if (parcelWeight < 3) {
                cost = issamedictrict ? 110 : 150;
            }
            else {
                const mincharge = issamedictrict ? 110 : 150
                const extraweight = parcelWeight - 3
                const extracharge = issamedictrict ? extraweight * 40 : extraweight * 40 + 40;
                cost = mincharge + extracharge

            }
        }

        console.log('total costing ', cost)

       
        data.cost = cost


        Swal.fire({
            title: "Are you agree with the cost?",
            text: `You have to pay ${cost} `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm and continue payment"
        }).then((result) => {
            if (result.isConfirmed) {

                axiossecure.post('/parcels', data)
                    
                    .then(res => {
                        console.log(res.data)
                        

                        if (res.data.insertedId) {
                            navigate('/dashboard/myparcels')
                            Swal.fire({
                                position: 'top-end',
                                title: 'Parcel has been created',
                                icon: 'success',
                                timer: 2500,
                            
                            })
                    }
                })

            }
        });

    }
    return (
        <div>
            <h2 className="text-5xl font-bold">Add Parcel</h2>
            <form onSubmit={handleSubmit(handlesendParcel)} className="mt-12 p-6">

                {/* parcel info  */}

                <div>
                    <label className="label">
                        <input type="radio" {...register('parcelType',)} value="document" className="radio text-green-500" defaultChecked />
                        Document
                    </label>
                    <label className="label ml-4">
                        <input type="radio" {...register('parcelType',)} value="non-document" className="radio text-green-500" defaultChecked />
                        Non-Document
                    </label>
                </div>

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
                        <h2 className="text-2xl font-semibold">Sender Details</h2>
                        <label className="label mt-4">Sender Name</label>
                        <input type="text" defaultValue={user.displayName} {...register('senderName',)} className="input w-full" placeholder="SenderName" />

                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend ">Sender Region</legend>
                            <select {...register('senderRegions')} defaultValue="Pick a Region" className="select ">
                                <option disabled={true}>Pick a Region</option>

                                {
                                    region.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                            {/* <span className="label">Optional</span> */}
                        </fieldset>

                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend ">Sender District</legend>
                            <select {...register('senderdistrict')} defaultValue="Pick a District" className="select ">
                                <option disabled={true}>Pick a District</option>
                                {/* 811 013 3894 */}

                                {
                                    DistrictByRegion(senderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>

                        </fieldset>

                        {/* sender email  */}
                        <label className="label mt-4">Sender  Email </label>
                        <input type="email" defaultValue={user.email} {...register('senderemail',)} className="input w-full" placeholder="Sender Email " />
                        {/* address */}
                        <label className="label mt-4">Sender Address</label>
                        <input type="text" {...register('senderAddress',)} className="input w-full" placeholder="Sender Address" />

                    </fieldset>

                    {/* receiver */}
                    <fieldset className="fieldset ">
                        <h2 className="text-2xl font-semibold">Receiver Details</h2>
                        <label className="label mt-4">Receiver  Name </label>
                        <input type="text" {...register('receiverName',)} className="input w-full" placeholder="Receiver Name" />
                        {/* receiver email  */}
                        <label className="label mt-4">Receiver  Email </label>
                        <input type="email" {...register('receiveremail',)} className="input w-full" placeholder="Receiver Email " />

                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend ">Receiver Region</legend>
                            <select {...register('receiverRegions')} defaultValue="Pick a Region" className="select ">
                                <option disabled={true}>Pick a Region</option>

                                {
                                    region.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>

                        </fieldset>
                        {/* receiver district */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend ">Receiver District</legend>
                            <select {...register('receiverDistrict')} defaultValue="Pick a District" className="select ">
                                <option disabled={true}>Pick a District</option>

                                {
                                    DistrictByRegion(receiverRegion).map((d, i) => <option key={i} value={d}>{d}</option>)
                                }
                            </select>

                        </fieldset>

                        {/* address */}
                        <label className="label mt-4">Receiver  Address</label>
                        <input type="text" {...register('receiverAddress',)} className="input w-full" placeholder="Receiver  Address" />

                    </fieldset>

                </div>
                <input className="btn btn-primary text-black" type="submit" value="Send Parcel" />
            </form>
        </div>
    );
};

export default SendPersel;