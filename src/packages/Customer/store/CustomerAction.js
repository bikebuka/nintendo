import { toast } from "react-toastify";
import call from "../../../core/services/http";
import { 
    CUSTOMER_API_FAILED,
    CUSTOMER_API_REQUEST, 
    CUSTOMER_API_SUCCESS,

    EDIT_CUSTOMER_API_FAILED,
    EDIT_CUSTOMER_API_REQUEST, 
    EDIT_CUSTOMER_API_SUCCESS,




} from "./CustomerActionTypes";
 

import CustomerConstants from "./CustomerConstants";
//
const notifyError = msg => {
    toast.error(msg)
}

const notifySuccess= msg => {
    toast.success(msg)
}
/**
 * GET CUSTOMER
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export const getCustomers = (payload) => async (dispatch) => {
    try {
        dispatch({
            type: CUSTOMER_API_REQUEST,
            loading: true,
        });
        const res = await call("get", CustomerConstants.CUSTOMER);
        if (res.data.status) {
            dispatch({
                type: CUSTOMER_API_SUCCESS,
                payload: res.data,
                loading: false,
                message: res.data.message,
            });
        } else {
            dispatch({
                type: CUSTOMER_API_FAILED,
                payload: res.data,
                loading: false
            });
            notifyError(res.data.message)
        }
    } catch (err) {
        dispatch({
            type: CUSTOMER_API_FAILED,
            error: err.response.data,
            loading: false
        });
        notifyError(err.response.data.message)
    }
}
   
 
 

 

// EDDIT CUSTOMER
export const edit_user = (edit_CUSTOMER_id) => async (dispatch) => {
    try {
        dispatch({
            type: EDIT_CUSTOMER_API_REQUEST,
            loading: true,
        });
        const res = await call("get", CustomerConstants.PREVIEW(edit_customer_id));
        if (res.data.status) {
            dispatch({
                type: EDIT_CUSTOMER_API_SUCCESS,
                payload: res.data,
                loading: false,
                message: res.data.message,
            });
 
        } else {
            dispatch({
                type: EDIT_CUSTOMER_API_FAILED,
                payload: res.data,
                loading: false
            });
            notifyError(res.data.message)
        }
    } catch (err) {
        dispatch({
            type: EDIT_CUSTOMER_API_FAILED,
            error: err.response.data,
            loading: false
        });
        notifyError(err.response.data.message)
    }
}

 