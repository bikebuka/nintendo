//query
import call from "../../../core/services/http";
import {toast} from "react-toastify";
import StatementConstants from "./StatementConstants";
import {API_ERROR, API_REQUEST, API_SUCCESS} from "./StatementActionTypes";
//
const notifyError= (msg) => {
    toast.error(msg)
}
//GET STATEMENTS
export const getStatements =  (payload) => async (dispatch) => {
    try {
        dispatch({
            type: API_REQUEST,
            loading: true,
        });
        let res=await call('get',StatementConstants.STATEMENTS(payload))
        if (res.data.status) {
            dispatch({
                type: API_SUCCESS,
                payload: res.data,
                loading: false,
            });
            // notifySuccess(res.data.message)
        }
        else{
            dispatch({
                type: API_ERROR,
                payload: res.data,
                loading: false,

            });
            notifyError(res.data.message)
        }
    } catch (err) {
        dispatch({
            type: API_ERROR,
            error:err.response.data,
            loading: false,
        });
        notifyError(err.data.message)
    }
};