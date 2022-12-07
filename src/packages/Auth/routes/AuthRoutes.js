import Login from "../view/Login";
import ForgotPassword from "../components/ForgotPassword";
import Register from "../components/Register";

export const AuthRoutes =[
    {
        path:"/auth/login",
        element: <Login/>
    },
    {
        path:"/auth/register",
        element: <Register/>
    },
    {
        path:"/auth/forgot-password",
        element: <ForgotPassword/>
    },
];