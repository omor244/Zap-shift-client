import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocalLogin from "../SocalLogin/SocalLogin";


const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const location = useLocation()
    const Navigate = useNavigate()



    console.log(location)
    
    const { siginInUser } = useAuth()
    
    const handellogin = (data) => {
        console.log(data)

        siginInUser(data.email, data.password)
            .then(res => {
                console.log(res.user)
                Navigate(location.state ? location?.state : '/')
            })
            .then(err => {
            console.log(err)
        })
    }

    
    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">

            <h2 className="text-2xl text-center">Welcome Back</h2>
            <p className="text-center">Please Login</p>
            <form onSubmit={handleSubmit(handellogin)} className="card-body">
                <fieldset className="fieldset">

                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                    {
                        errors.email?.type ==='required' && <p className="text-red-500">Email is required </p>
                    }
                    
                    {/* password */}
                    <label className="label">Password</label>                  
                    <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
                    {
                        errors.password?.type==="minLength" && <p className="text-red-500 text-lg">Password must be 6 characters or longer</p>
                    }
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>

                <p>New to zap shift <Link state={location?.state} className="text-blue-600 underline text-center" to={'/register'}>register</Link></p>
            </form>
            <SocalLogin></SocalLogin>
        </div>
    );
};

export default Login;