import {combineReducers} from "redux";
import AuthReducer from "../../packages/Auth/store/AuthReducer";
import ProductReducer from "../../packages/Product/store/ProductReducer";
import UserReducer from "../../packages/User/store/UserReducer";
import CustomerReducer from "../../packages/Customer/store/CustomerReducer";
export default combineReducers({
    AuthReducer,
    ProductReducer,
    UserReducer,
    CustomerReducer

})
