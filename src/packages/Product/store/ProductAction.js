import {
    API_ERROR,
    API_REQUEST,
    API_SUCCESS
} from "./ProductActionTypes";
import ProductConstants from "./ProductConstants";
import {getData} from "../../../core/services/http/fetch/fetch";
//
export const getProducts =  () => async (dispatch) => {
    try {
        dispatch({
            type: API_REQUEST,
            loading: true
        });
        let res=await getData(ProductConstants.PRODUCTS)
        console.log(res);
        if (res.status) {
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