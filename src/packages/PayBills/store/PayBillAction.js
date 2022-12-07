import call from "../../../core/services/http";
import {toast} from "react-toastify";
import PayBillConstants from "./PayBillConstants";
import {API_ERROR, API_REQUEST, API_SUCCESS} from "./PayBillActionTypes";
//
const notifyError= (msg) => {
    toast.error(msg)
}
const notifySuccess= (msg) => {
    toast.success(msg)
}
//
export const lipaBill =  (payload) => async (dispatch) => {
    try {
        dispatch({
            type: API_REQUEST,
            submitting: true,
        });
        let res=await call('post',PayBillConstants.PAY_BILL,payload)
        if (res.data.status) {
            dispatch({
                type: API_SUCCESS,
                payload: res.data,
                submitting: false,
            });
            notifySuccess(res.data.message)
        }
        else{
            dispatch({
                type: API_ERROR,
                payload: res.data,
                submitting: false,
            });
            console.log(res.data)
            notifyError(res.data.message)
        }
    } catch (err) {
        dispatch({
            type: API_ERROR,
            error:err?.response?.data,
            submitting: false,
        });
        notifyError(err.response.data.message || 'Unable to complete payment')
    }
};
//query
export const queryPaybill =  (payload) => async (dispatch) => {
    try {
        dispatch({
            type: API_REQUEST,
            loading: true,
            isBeneficiary: false,
            querying:true,
            submitting: true

        });
        let res=await call('get',PayBillConstants.QUERY_BENEFICIARY(payload))
        if (res.data.status) {
            dispatch({
                type: API_SUCCESS,
                payload: res.data,
                loading: false,
                isBeneficiary: true,
                querying:false,
                resultFound: true,
                submitting: false

            });
        }
        else{
            dispatch({
                type: API_ERROR,
                payload: res.data,
                loading: false,
                isBeneficiary: false,
                querying:false,
                submitting: false
            });
            notifyError(res.data.message)
        }
    } catch (err) {
        dispatch({
            type: API_ERROR,
            error:err.response.data,
            loading: false,
            isBeneficiary: false,
            querying:false,
            submitting: false
        });
        notifyError(err.data.message)
    }
};