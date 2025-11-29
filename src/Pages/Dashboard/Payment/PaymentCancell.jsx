import { Link } from "react-router";


const PaymentCancell = () => {
    return (
        <div>
            <h2 className="text-2xl font-medium">Payment is cancel, please try again </h2>
            <Link to={'/dashboard/myparcels'} className="btn text-black btn-primary">Try Again</Link>
        </div>
    );
};

export default PaymentCancell;