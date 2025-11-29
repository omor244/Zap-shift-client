import { MdBlock } from "react-icons/md";
import { Link } from "react-router";


const Forbidden = () => {
    return (
        <div>
            <div className="h-screen flex flex-col items-center justify-center bg-base-200 px-4">

                <MdBlock className="text-error" size={100} />

                <h1 className="text-6xl font-bold mt-4">403</h1>

                <p className="text-2xl font-semibold mt-2 text-gray-700">
                    Access Forbidden
                </p>

                <p className="mt-2 text-gray-500 max-w-md">
                    You do not have the required permissions to view this page.
                </p>

                <div className="mt-6">
                    <Link to="/" className="btn btn-primary">
                        Go Back Home
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Forbidden;