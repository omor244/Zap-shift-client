import { createBrowserRouter } from "react-router";
import RootLayout from "../LayOut/RootLayout";
import Home from "../Pages/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import About from "../Pages/About/About";
import AuthLayOut from "../AuthLayOut/AuthLayOut";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivetRoute from "./PrivetRoute";
import Rider from "../Component/Rider/Rider";
import SendPersel from "../Pages/SendPersel/SendPersel";
import Myparcels from "../Pages/Dashboard/Myparcels";
import Dashboard from "../LayOut/Dashboard";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancell from "../Pages/Dashboard/Payment/PaymentCancell";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import ApproveRider from "../Pages/Dashboard/ApproveRider/ApproveRider";
import UserManagement from "../Pages/Dashboard/UserManagement/userManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../Pages/Dashboard/AssignRiders/AssignRiders";
import AssignDelivery from "../Pages/Dashboard/AssignDelivery";
import RiderRouter from "./RiderRouter";
import DelivayCompleted from "../Pages/Dashboard/DelivayCompleted";
import ParcelTrack from "../Pages/ParcelTrack/ParcelTrack";
import DashboardHome from "../Pages/DashboardHome/DashboardHome";


const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        hydrateFallbackElement: <p>loadding...</p>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: '/coverage',
                element: <Coverage />,
                loader: () => fetch('/public/servesCenter.json.json')

            },

            {
                path: '/rider',
                element: <PrivetRoute>
                    <Rider></Rider>
                </PrivetRoute>,
                loader: () => fetch('/public/servesCenter.json.json')
            },
            {
                path: '/send-parcel',
                element: <PrivetRoute>
                    <SendPersel></SendPersel>
                </PrivetRoute>,
                loader: () => fetch('/public/servesCenter.json.json')
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: 'parceltrack/:trackingId',
                element: <ParcelTrack></ParcelTrack>
            }
        ]

    },
    {
        path: '/',
        element: <AuthLayOut />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                Component: Register
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivetRoute><Dashboard /></PrivetRoute>,

        children: [
            {
                index: true, 
                element: <DashboardHome></DashboardHome>
            },
            {
                path: 'myparcels',
                element: <Myparcels></Myparcels>
            },
            {
                path: 'payment/:id',
                element: <Payment></Payment>
            },
            {
                path: 'approve-rider',
                element: <AdminRoute> <ApproveRider></ApproveRider> </AdminRoute>
            },
            {
                path: 'payment-history',
                element: <PaymentHistory />
            },
            {
                path: 'payment/success',
                element: <PaymentSuccess></PaymentSuccess>
            },
            {
                path: 'payment/cancelled',
                element: <PaymentCancell></PaymentCancell>
            },
            {
                path: 'Assign-rider',

                element: <AdminRoute><AssignRiders /></AdminRoute>
            },
            {
                path: 'user-management',

                element: <AdminRoute><UserManagement /></AdminRoute>
            },

            // rider related api

            {
                path: 'assign-delivery',
                element: <RiderRouter><AssignDelivery></AssignDelivery></RiderRouter>
            },
            {
                path: 'completed-delivery',
                element: <RiderRouter><DelivayCompleted></DelivayCompleted></RiderRouter>
            }
        ]
    }
]);

export default router