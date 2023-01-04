import {
    CUSTOMER_API_FAILED,
    CUSTOMER_API_REQUEST,
    CUSTOMER_API_SUCCESS,
    
} from "./CustomerActionTypes";

let initialState = {
    loading: false,
    customers: [],
    error: {},
    message: "",
    pagination: {},
};
//
export default function CustomerReducer(state = initialState, action) {
    const { type, loading, payload, error, processing } = action;
    switch (type) {
        //users
        case CUSTOMER_API_REQUEST:
            return {
                loading,
                processing,
            }
        case CUSTOMER_API_SUCCESS:
            return {
                loading,
                users: payload.data.data,
                pagination:payload.data
            }
        case CUSTOMER_API_FAILED:
            return {
                loading,
                error,
                processing
            }
        
       
        default:
            return state
    }
}