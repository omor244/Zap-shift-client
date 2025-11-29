import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";


const axiossecure = axios.create({
    baseURL: 'https://zap-shift-project.vercel.app/'
})
const useAxiosSecure = () => {
    const { user, logOut } = useAuth()
    const navigate = useNavigate()
   
    useEffect(() => {

        const reqinterseptor = axiossecure.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`

            return config
        
        })
        
        const resinterseptor = axiossecure.interceptors.response.use((response) => {

            return response
        }, (err) => {
            console.log(err)

            const statuscode = err.status

            if (statuscode === 401 || statuscode === 403) {
                logOut()
                    .then(res => {
                    navigate('/login')
                })
            }
            return Promise.reject(err)
        })
        
        
        
        return () => {

            axiossecure.interceptors.request.eject(reqinterseptor)
            axiossecure.interceptors.response.eject(resinterseptor)
        }
    },[user])
    
    return axiossecure
};

export default useAxiosSecure;