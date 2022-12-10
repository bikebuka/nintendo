import {combineReducers} from "redux";
import AuthReducer from "../../packages/Auth/store/AuthReducer";
import ProductReducer from "../../packages/Product/store/ProductReducer";
export default combineReducers({
    AuthReducer,
    ProductReducer
})
