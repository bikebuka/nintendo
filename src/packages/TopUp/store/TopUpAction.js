import call from "../../../core/services/http";
import {toast} from "react-toastify";
import {API_ERROR, API_REQUEST, API_SUCCESS} from "./TopUpActionTypes";
import TopUpConstants from "./TopUpConstants";
//
const notifyError= (msg) => {
    toast.error(msg)
}
const notifySuccess= (msg) => {
    toast.success(msg)
}
//
export const topUpConfirmation =  (payload) => async (dispatch) => {
    try {
        dispatch({
            type: API_REQUEST,
            loading: true,
            verifyingOTP: true,
            submitting: true,
        });
        let res=await call('post',TopUpConstants.CONFIRM_TOPUP,payload)
        if (res.data.status) {
            dispatch({
                type: API_SUCCESS,
                payload: res.data,
                loading: false,
                verifyingOTP: true,
                submitting: false,
                verified: true,
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
//top up
export const topUpMyAccount =  (payload) => async (dispatch) => {
    try {
        dispatch({
            type: API_REQUEST,
            loading: true,
            submitting: true,
            hasSentOTP: false,
        });
        let res=await call('post',TopUpConstants.TOP_UP,payload)
        if (res.data.status) {
            dispatch({
                type: API_SUCCESS,
                payload: res.data,
                loading: false,
                submitting: false,
                hasSentOTP: true,
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
        let res=await call('get',TopUpConstants.QUERY_BENEFICIARY(payload))
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