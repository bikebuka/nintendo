import DashboardLayout from "../../../shared/layouts/dashboard";
import LogoOnlyLayout from "../../../shared/layouts/LogoOnlyLayout";
import {Navigate} from "react-router-dom";
import Customer from "../view/Customer";
import CustomerCard from "../components/CustomerCard";

// import Page404 from "../../../shared/pages/Page404";
// import {ProtectedRoute} from "../../../shared/components/protected";


export const UserRoutes =[
    {
        path: '/admin/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path:"/admin/dashboard/customers",
                element: <Customer/>
            },
            {
                path:"/admin/dashboard/user/card",
                element: <CustomerCard/>
            },
           
            
        ]
    },
];