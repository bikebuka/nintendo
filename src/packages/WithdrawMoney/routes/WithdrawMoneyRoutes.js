import DashboardLayout from "../../../shared/layouts/dashboard";
import {ProtectedRoute} from "../../../shared/components/protected";
import WithdrawMoney from "../view/WithdrawMoney";
//
export const WithdrawMoneyRoutes =[
    {
        path: '/merchant/dashboard',
        element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
        children: [
            { path: 'withdraw-money', element: <WithdrawMoney /> },
        ],
    },
];