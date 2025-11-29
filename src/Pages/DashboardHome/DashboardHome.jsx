import Rider from "../../Component/Rider/Rider";
import useRole from "../../Hooks/useRole";
import AdminDashboard from "./AdminDashboard";
import RiderDashboard from "./RiderDashboard";
import UserDashboard from "./UserDashboard";


const DashboardHome = () => {

    const { role, isLoading } = useRole()
    console.log(role)
    if (isLoading) {
        return <p>loadding....</p>
    }
    if (role === 'admin') {
        return <AdminDashboard></AdminDashboard>
    }
    else if (role === "rider") {
        return <RiderDashboard></RiderDashboard>
    }
    else {
        return <UserDashboard></UserDashboard>
    }
   
};

export default DashboardHome;