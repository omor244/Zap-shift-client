import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocalLogin from "../SocalLogin/SocalLogin";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const Register = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm()
    const location = useLocation()
    const Navigate = useNavigate()
    const axiossecure = useAxiosSecure()


    const { registeruser, updateprofileuser } = useAuth()

    // const handelonsubmite = (data) => {


    //     console.log(data.photo[0])

    //     const image = data.photo[0]

    //     registeruser(data.email, data.password)
    //         .then(() => {
               
    //             const formdata = new FormData()
    //             formdata.append('image', image)
    //             const imageapiUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image}`
    //             axios.post(imageapiUrl, formdata)
    //                 .then(res => {

                       
    //                     const photourl = res.data.data.url
    //                     updateprofileuser(userProfile)
                        
    //                     const userinfo = {
    //                         email: data.email,
    //                         displayName: data.name,
    //                         photoURL: photourl,
    //                         role: 'user',
                            
    //                     }
    //                     axiossecure.post('/users', userinfo)
    //                         .then(res => {
                            
    //                             if (res.insertedId) {
    //                                 console.log('user crated in database ')
    //                             }
    //                     })

    //                     const userProfile = {
    //                         displayName: data.name,
    //                         photoURL: photourl,

    //                     }

    //                         .then(res => {
    //                             Navigate(location.state ? location?.state : '/')
    //                             console.log('after update', res)
    //                         })
    //                         .catch(err => {
    //                             console.log(err)
    //                         })
    //                 })
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }
    const handelonsubmite = async (data) => {
        try {
            // Step-1 create auth user
            await registeruser(data.email, data.password);

            // Step-2 upload image
            const formdata = new FormData();
            formdata.append("image", data.photo[0]);
            const imageapiUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image}`;

            const uploadRes = await axios.post(imageapiUrl, formdata);
            const photourl = uploadRes.data.data.url;

            // Step-3 update firebase profile
            await updateprofileuser({
                displayName: data.name,
                photoURL: photourl,
            });

            // Step-4 save user to database
            const userinfo = {
                email: data.email,
                displayName: data.name,
                photoURL: photourl,
                role: "user",
                createdAt: new Date(),
            };

            const saveRes = await axiossecure.post("/users", userinfo);

            if (saveRes.data.insertedId) {
                console.log("User saved to database");
            }

            // Step-5 navigate user fast
            Navigate(location.state ? location.state : "/");
        } catch (err) {
            console.log(err);
        }
    };

    
    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h2 className="text-2xl text-center">Welcome To Zap Shift</h2>
            <p className="text-center"> create an account </p>
            <form className="card-body" onSubmit={handleSubmit(handelonsubmite)}>
                <fieldset className="fieldset">

                    <label className="label">Photo</label>
                    <input type="file" {...register('photo', { required: true })} className="file-input" placeholder="Your photo" />
                    {errors.photo?.type === 'required' && <p className="text-red-500"> Photo is required </p>}


                    <label className="label">Name</label>
                    <input type="text" {...register('name', { required: true })} className="input" placeholder="Your Name" />
                    {errors.name?.type === 'required' && <p className="text-red-500"> Name is required </p>}


                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                    {errors.email?.type === 'required' && <p className="text-red-500"> Email is required </p>}

                    {/* password  */}
                    <label className="label">Password</label>
                    <input type="password" className="input" {...register('password', {
                        required: true,
                        minLength: 6,
                        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{7,}[!@#$%^&*()\-_=+{}[\]|;:'\",.<>/?]$/
                    })} placeholder="Password" />

                    {
                        errors.password?.type === "required" && <p className="text-red-500">password is required</p>
                    }
                    {
                        errors.password?.type === "minLength" && <p className="text-red-500">password must be 6 characters</p>
                    }
                    {
                        errors.password?.type === "pattern" && <p className="text-red-500">Password must contain at least one uppercase letter, one lowercase letter, one number, and end with a special character.</p>
                    }


                    <button className="btn btn-neutral mt-4">Register</button>
                </fieldset>
                <p>Already have an Account <Link className="text-blue-600 underline text-center" to={'/login'}>Login</Link></p>
            </form>
            <SocalLogin></SocalLogin>
        </div>
    );
};

export default Register;