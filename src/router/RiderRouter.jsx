import Forbidden from "../Component/Forbidden/Forbidden";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";


const RiderRouter = ({ children}) => {
    const { loadding } = useAuth()
    const { role, isLoading } = useRole()

    if (loadding || isLoading) {
        return <p>loading...</p>
    }

    if (role !== "rider") {
        return <Forbidden />
    }
    return children;
};

export default RiderRouter;