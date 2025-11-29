import { Link } from 'react-router';
import logo from '../../assets/logo.png'

const Logo = () => {
    return (
        <Link to={'/'} className='flex items-end '>
            <img src={logo} alt="" />
            <h3 className="text-3xl -ms-2 font-bold">zapShift</h3>
        </Link>
    );
};

export default Logo;