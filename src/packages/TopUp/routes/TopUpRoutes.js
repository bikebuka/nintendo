import DashboardLayout from "../../../shared/layouts/dashboard";
import {ProtectedRoute} from "../../../shared/components/protected";
import TopUp from "../view/TopUp";

export const TopUpRoutes =[
    {
        path: '/merchant/dashboard',
        element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
        children: [
            { path: 'recharge', element: <TopUp /> },
        ],
    },
];