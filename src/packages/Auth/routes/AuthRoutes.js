import Login from "../view/Login";
import ForgotPassword from "../components/ForgotPassword";

export const AuthRoutes =[
    {
        path:"/auth/login",
        element: <Login/>
    },
    {
        path:"/auth/forgot-password",
        element: <ForgotPassword/>
    },
];