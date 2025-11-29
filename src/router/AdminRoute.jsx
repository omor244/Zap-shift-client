import Forbidden from "../Component/Forbidden/Forbidden";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";


const AdminRoute = ({children}) => {
    const {  loadding } = useAuth()
    const { role, isLoading } = useRole()

     if(loadding || isLoading) {
        return <p>loading...</p>
    }

    if (role !== "admin") {
        return <Forbidden/>
    }
    return  children;
};

export default AdminRoute;