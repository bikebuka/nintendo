import {useRoutes} from 'react-router-dom';
import {DashboardRoutes} from "../packages/Dashboard/routes/DashboardRoutes";
import {AuthRoutes} from "../packages/Auth/routes/AuthRoutes";
import {TopUpRoutes} from "../packages/TopUp/routes/TopUpRoutes";
import {WithdrawMoneyRoutes} from "../packages/WithdrawMoney/routes/WithdrawMoneyRoutes";
import {PayBillRoutes} from "../packages/PayBills/routes/PayBillRoutes";
import {TransferMoneyRoutes} from "../packages/TransferMoney/routes/TransferMoneyRoutes";
import {SendMoneyRoutes} from "../packages/SendMoney/routes/SendMoneyRoutes";
import {StatementRoutes} from "../packages/Statements/routes/StatementRoutes";
// ----------------------------------------------------------------------


let systemRoutes=[];
//dashboard routes
systemRoutes.push(...DashboardRoutes)
//auth routes
systemRoutes.push(...AuthRoutes)
//top-up
systemRoutes.push(...TopUpRoutes);
//withdraw
systemRoutes.push(...WithdrawMoneyRoutes)
//paybills
systemRoutes.push(...PayBillRoutes)
//transfer
systemRoutes.push(...TransferMoneyRoutes)
//send money
systemRoutes.push(...SendMoneyRoutes)
//statements
systemRoutes.push(...StatementRoutes)
//
export default function Router() {
  
  return useRoutes(systemRoutes);
}
