import {
    API_ERROR,
    API_REQUEST,
    API_SUCCESS
} from "./ProductActionTypes";
import call from "../../../core/services/http";
import ProductConstants from "./ProductConstants";
//
export const getProducts =  () => async (dispatch) => {
    try {
        dispatch({
            type: API_REQUEST,
            loading: true
        });
        let res=await call('get',ProductConstants.PRODUCTS)
        if (res.data.status) {
            dispatch({
                type: API_SUCCESS,
                payload: res.data,
                loading: false
            });
        }
        else{
            dispatch({
                type: API_ERROR,
                payload: res,
                loading: false
            });
        }
    } catch (err) {
        dispatch({
            type: API_ERROR,
            error: err?.response.data,
            loading: false
        });
    }
};