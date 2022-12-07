import DashboardLayout from "../../../shared/layouts/dashboard";
import {ProtectedRoute} from "../../../shared/components/protected";
import SendMoney from "../view/SendMoney";

export const SendMoneyRoutes =[
    {
        path: '/merchant/dashboard',
        element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
        children: [
            { path: 'send-money', element: <SendMoney /> },
        ],
    },
];