import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "sonner";


const PaymentHistory = () => {
  const axiossecure = useAxiosSecure()
    const { user } = useAuth()
    const {data: payment = [] } = useQuery({
        queryKey: ['payment', user.email],
        queryFn: async () => {
            const res = await axiossecure.get(`/payments?email=${user.email}`)

            return res.data
        }
    })

    const handeldelete = () => {

        toast.error('successfully deleted')
    }
    return (
        <div>
            <h2 className="text-5xl">PaymentHistory: {payment.length}</h2>
            
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Transaction Id</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            payment.map((pay, idx) =>
                                <tr>
                                    <th>{ idx + 1 }</th>
                                <td>Cy Ganderton</td>
                                    <td>{ pay.amount}</td>
                                    <td>{ pay.transactionId}</td>
                                    <td>
                                        <button onClick={handeldelete} className="btn btn-primary text-black">Delete</button>
                                    </td>
                            </tr> )
                        }
                       
                      
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;