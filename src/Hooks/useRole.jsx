import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const { user } = useAuth();
    const axiossecure = useAxiosSecure();
 console.log(user.email)
    const { data, isLoading } = useQuery({
        queryKey: ["user-role", user?.email],
        enabled: !!user?.email, // prevent running before user exists
        queryFn: async () => {
            const res = await axiossecure.get(`/users/${user?.email}/role`);
     
            return res.data; // { role: "admin" } or whatever
        },
    }); 


    return { role: data?.role, isLoading };
};

export default useRole;
