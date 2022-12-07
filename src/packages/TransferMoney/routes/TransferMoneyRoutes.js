import DashboardLayout from "../../../shared/layouts/dashboard";
import {ProtectedRoute} from "../../../shared/components/protected";
import TransferMoney from "../view/TransferMoney";
//
export const TransferMoneyRoutes =[
    {
        path: '/merchant/dashboard',
        element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
        children: [
            { path: 'transfer-money', element: <TransferMoney /> },
        ],
    },
];