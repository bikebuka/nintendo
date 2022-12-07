import DashboardLayout from "../../../shared/layouts/dashboard";
import DashboardApp from "../view/DashboardApp";
import LogoOnlyLayout from "../../../shared/layouts/LogoOnlyLayout";
import {Navigate} from "react-router-dom";

import Page404 from "../../../shared/pages/Page404";
import {ProtectedRoute} from "../../../shared/components/protected";

export const DashboardRoutes =[
    {
        path: '/dashboard',
        element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
        children: [
            { path: 'app', element: <DashboardApp /> },
        ],
    },
    {
        path: '/',
        element: <LogoOnlyLayout />,
        children: [
            { path: '/', element: <Navigate to="/dashboard/app" /> },
            { path: '404', element: <Page404/> },
            { path: '*', element: <Navigate to="/404" /> },
        ],
    },
];