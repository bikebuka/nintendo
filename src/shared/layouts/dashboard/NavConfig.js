// component
import Iconify from '../../components/Iconify';
import {DashboardLinks} from "../../../packages/Dashboard/routes/DashboardLinks";
import {TopUpLinks} from "../../../packages/TopUp/routes/TopUpLinks";
import {SendMoneyLinks} from "../../../packages/SendMoney/routes/SendMoneyLinks";
import {TransferMoneyLinks} from "../../../packages/TransferMoney/routes/TransferMoneyLinks";
import {WithdrawMoneyLinks} from "../../../packages/WithdrawMoney/routes/WithdrawMoneyLinks";
import {PayBillLinks} from "../../../packages/PayBills/routes/PayBillLinks";
import {StatementLinks} from "../../../packages/Statements/routes/StatementLinks";

// ----------------------------------------------------------------------

const navConfig = [];
//dashboard links
navConfig.push(...DashboardLinks)
//top up
// navConfig.push(...TopUpLinks)
//send money
// navConfig.push(...SendMoneyLinks)
//transfer money
// navConfig.push(...TransferMoneyLinks)
//withdraw money
// navConfig.push(...WithdrawMoneyLinks)
//pay bills
// navConfig.push(...PayBillLinks)
//account statements
// navConfig.push(...StatementLinks)
export default navConfig;
