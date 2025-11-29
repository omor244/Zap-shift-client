import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { MdAdminPanelSettings, MdRemoveModerator } from 'react-icons/md';
import { toast } from 'sonner';
import { useState } from 'react';


const UserManagement = () => {
    const [searchText, setsearchText] = useState("")
    const axiossecure = useAxiosSecure()
         console.log(searchText)
    const { data: users = [],refetch } = useQuery({
        queryKey: ['users', searchText],
        queryFn: async () => {
            
            const res = await axiossecure.get(`/users?search=${searchText}`)

            return res.data
        }
    })
  


    const handelmakeAdmin = user => {
        
        const roleinfo = { role: 'admin' }
         
        axiossecure.patch(`/users/${user._id}/role`, roleinfo)
            .then(res => {
                console.log('after updateing ', res.data)

                if (res.data.modifiedCount) {
                    refetch()
                    toast.success(`${user.displayName} has been Admin`)
                }
        })
    }
    const handelremoveAdmin = user => {
        
        const roleinfo = { role: 'user' }
         
        axiossecure.patch(`/users/${user._id}/role`, roleinfo)
            .then(res => {
              

                if (res.data.modifiedCount) {
                    refetch()
                    toast.success(`${user.displayName} has been user`)
                }
        })
    }
    
    return (
        <div>
            <h1 className='text-4xl'>Manage Users {users.length}</h1>
             
            <label className="input">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input onChange={(e) => setsearchText(e.target.value)} type="search" required placeholder="Search" />
            </label>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, idx) => <tr key={idx}>
                                <th>
                                    { idx + 1 }
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user.photoURL }
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">  {user.displayName}</div>
                                            <div className="text-sm opacity-50">United States</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user.email }
                                </td>
                                <td>
                                    {user.role }
                                </td>
                                <td>
                                    {
                                        user.role === "admin" ?  <button onClick={() => handelremoveAdmin(user)} className="btn btn-error flex items-center gap-2">
                                        <MdRemoveModerator size={20} />
                                        Remove Admin
                                    </button> :
                                    <button onClick={() => handelmakeAdmin(user)} className="btn btn-success flex items-center gap-2">
                                        <MdAdminPanelSettings size={20} />
                                        Make Admin
                                    </button>
                                   }

                                </td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">details</button>
                                </th>
                            </tr>)
                        }
                       
                       
                    </tbody>
                
                  
                </table>
            </div>
        </div> 
    );
};

export default UserManagement;