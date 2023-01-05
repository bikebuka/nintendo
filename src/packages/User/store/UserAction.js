import { toast } from "react-toastify";
import call from "../../../core/services/http";
import { 
    USER_API_FAILED,
    USER_API_REQUEST, 
    USER_API_SUCCESS,

    EDIT_USER_API_FAILED,
    EDIT_USER_API_REQUEST, 
    EDIT_USER_API_SUCCESS,




} from "./UserActionTypes";
 

import UserConstants from "./UserConstants";
//
const notifyError = msg => {
    toast.error(msg)
}

const notifySuccess= msg => {
    toast.success(msg)
}
/**
 * GET Users
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export const getUsers = (payload) => async (dispatch) => {
    try {
        dispatch({
            type: USER_API_REQUEST,
            loading: true,
        });
        const res = await call("get", UserConstants.USERS);
        if (res.data.status) {
            dispatch({
                type: USER_API_SUCCESS,
                payload: res.data,
                loading: false,
                message: res.data.message,
            });
        } else {
            dispatch({
                type: USER_API_FAILED,
                payload: res.data,
                loading: false
            });
            notifyError(res.data.message)
        }
    } catch (err) {
        dispatch({
            type: USER_API_FAILED,
            error: err.response.data,
            loading: false
        });
        notifyError(err.response.data.message)
    }
}
   
 
 

 

// EDDIT USER
export const edit_user = (edit_user_id) => async (dispatch) => {
    try {
        dispatch({
            type: EDIT_USER_API_REQUEST,
            loading: true,
        });
        const res = await call("get", UserConstants.PREVIEW(edit_user_id));
        if (res.data.status) {
            dispatch({
                type: EDIT_USER_API_SUCCESS,
                payload: res.data,
                loading: false,
                message: res.data.message,
            });
 
        } else {
            dispatch({
                type: EDIT_USER_API_FAILED,
                payload: res.data,
                loading: false
            });
            notifyError(res.data.message)
        }
    } catch (err) {
        dispatch({
            type: EDIT_USER_API_FAILED,
            error: err.response.data,
            loading: false
        });
        notifyError(err.response.data.message)
    }
}

 