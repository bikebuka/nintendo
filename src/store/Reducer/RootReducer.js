import {combineReducers} from "redux";
import DashboardReducer from "../../packages/Dashboard/store/DashboardReducer"
import AuthReducer from "../../packages/Auth/store/AuthReducer";
import sendMoneyReducer from "../../packages/SendMoney/store/SendMoneyReducer";
import statementReducer from "../../packages/Statements/store/StatementReducer";
import PayBillReducer from "../../packages/PayBills/store/PayBillReducer";
import TopUpReducer from "../../packages/TopUp/store/TopUpReducer";
export default combineReducers({
    AuthReducer,
    DashboardReducer,
    sendMoneyReducer,
    statementReducer,
    PayBillReducer,
    TopUpReducer
})
