import { Link,  NavLink } from "react-router";
import Logo from "../../../Component/Logo/Logo";
import useAuth from "../../../Hooks/useAuth";

const Navber = () => {

    const { user, logOut } = useAuth()

    const links = <>
        <li><NavLink to={'/services'}>Services</NavLink></li>
        <li><NavLink to={'/about'}>About Us </NavLink></li>
        <li><NavLink to={'/send-parcel'}>Send Parcel</NavLink></li>
        <li><NavLink to={'/coverage'}>Coverage</NavLink></li>
        <li><NavLink to={'/rider'}>Be a rider</NavLink></li>

        {
            user && <>
                <li><NavLink to={'dashboard/myparcels'}>My Parcels</NavLink></li>
                
            
            </>
        }
    </>

    const handellogout = () => {

        logOut()
            .then()
            .catch(err => {
            console.log(err) 
        })
    }
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                       
                    </ul>
                </div>
                <Link to={'/'} className="btn btn-ghost text-xl">
                    <Logo></Logo>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                   {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <Link onClick={handellogout} className="btn">Log Out</Link> : <Link to={'/login'} className="btn">Login</Link>
                }

                <Link to={'/rider'} className="btn btn-primary text-black">Be a rider</Link>
            </div>
        </div>
    );
};

export default Navber;