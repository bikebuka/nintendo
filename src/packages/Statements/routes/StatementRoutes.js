import DashboardLayout from "../../../shared/layouts/dashboard";
import {ProtectedRoute} from "../../../shared/components/protected";
import Statements from "../view/Statements";
//
export const StatementRoutes =[
    {
        path: '/merchant/dashboard',
        element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
        children: [
            { path: 'account-statements', element: <Statements /> },
        ],
    },
];