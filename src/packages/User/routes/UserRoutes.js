import DashboardLayout from "../../../shared/layouts/dashboard";
import LogoOnlyLayout from "../../../shared/layouts/LogoOnlyLayout";
import {Navigate} from "react-router-dom";
import Users from "../view/Users";
import UserCard from "../components/UserCard";

// import Page404 from "../../../shared/pages/Page404";
// import {ProtectedRoute} from "../../../shared/components/protected";


export const UserRoutes =[
    {
        path: '/admin/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path:"/admin/dashboard/users",
                element: <Users/>
            },
            {
                path:"/admin/dashboard/user/card",
                element: <UserCard/>
            },
           
            
        ]
    },
];