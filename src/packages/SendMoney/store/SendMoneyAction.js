import {API_ERROR, API_REQUEST, API_SUCCESS} from "./SendMoneyActionTypes";
import call from "../../../core/services/http";
import SendMoneyConstants from "./SendMoneyConstants";
import {toast} from "react-toastify";
//
const notifyError= (msg) => {
    toast.error(msg)
}
const notifySuccess= (msg) => {
    toast.success(msg)
}
//
export const sendMoneyConfirmation =  (payload) => async (dispatch) => {
    try {
        dispatch({
            type: API_REQUEST,
            loading: true,
            isBeneficiary: true,
            submitting: true,
        });
        let res=await call('post',SendMoneyConstants.CONFIRM_SEND_MONEY,payload)
        if (res.data.status) {
            dispatch({
                type: API_SUCCESS,
                payload: res.data,
                loading: false,
                isBeneficiary: true,
                processPayment: true,
                submitting: false,
            });
            notifySuccess(res.data.message)
        }
        else{
            dispatch({
                type: API_ERROR,
                payload: res,
                loading: false,
                isBeneficiary: true,
                submitting: false,
            });
            notifyError(res.data.message)
        }
    } catch (err) {
        dispatch({
            type: API_ERROR,
            error:err.response.data,
            loading: false,
            submitting: false,
        });
        notifyError(err.response.data.message)
    }
};
//
export const sendMoney =  (payload) => async (dispatch) => {
    try {
        dispatch({
            type: API_REQUEST,
            loading: true,
            submitting: true,
        });
        let res=await call('post',SendMoneyConstants.SEND_MONEY,payload)
        if (res.data.status) {
            dispatch({
                type: API_SUCCESS,
                payload: res.data,
                loading: false,
                isBeneficiary: false,
                submitting: false,
            });
            notifySuccess(res.data.message)
        }
        else{
            dispatch({
                type: API_ERROR,
                payload: res,
                loading: false,
                submitting: false,
            });
            notifyError(res.data.message)
        }
    } catch (err) {
        dispatch({
            type: API_ERROR,
            error:err.response.data,
            loading: false,
            submitting: false,
        });
        notifyError(err.data.message)
    }
};
//query
export const queryBeneficiary =  (payload) => async (dispatch) => {
    try {
        dispatch({
            type: API_REQUEST,
            loading: true,
            isBeneficiary: false,
        });
        let res=await call('get',SendMoneyConstants.QUERY_BENEFICIARY(payload))
        if (res.data.status) {
            dispatch({
                type: API_SUCCESS,
                payload: res.data,
                loading: false,
                isBeneficiary: true,
            });
            // notifySuccess(res.data.message)
        }
        else{
            dispatch({
                type: API_ERROR,
                payload: res.data,
                loading: false,
                isBeneficiary: false,

            });
            notifyError(res.data.message)
        }
    } catch (err) {
        dispatch({
            type: API_ERROR,
            error:err.response.data,
            loading: false,
            isBeneficiary: false,
        });
        notifyError(err.data.message)
    }
};