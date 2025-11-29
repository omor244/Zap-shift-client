import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const PaymentSuccess = () => {

    const [searchparams] = useSearchParams()
    const sesstionid = searchparams.get('session_id') 
    const [paymentinfo, setpamentinfo] = useState({})
    const axiossecure = useAxiosSecure()
    console.log(sesstionid)
    
    useEffect(() => {

        if (sesstionid) {
            axiossecure.patch(`/payment-success?session_id=${sesstionid}`)
                .then(res => {
                    console.log(res.data)
                    setpamentinfo({
                        trakingId: res.data.trakingId,
                      
                        transactionId: res.data.transactionId
                    })
                    
            })
        }
    },[sesstionid, axiossecure])
    return (
        <div>
            <h2 className="text-2xl">Payment Successful </h2>
            <p>Your transaction: { paymentinfo?.transactionId}</p>
            <p>Your parcel tracking : { paymentinfo?.trakingId}</p>
        </div>
    );
};

export default PaymentSuccess;