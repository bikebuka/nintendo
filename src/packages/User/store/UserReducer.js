import {
    USER_API_FAILED,
    USER_API_REQUEST,
    USER_API_SUCCESS,
    
} from "./UserActionTypes";

let initialState = {
    loading: false,
    users: [],
    error: {},
    message: "",
    pagination: {},
};
//
export default function UserReducer(state = initialState, action) {
    const { type, loading, payload, error, processing,charges } = action;
    switch (type) {
        //users
        case USER_API_REQUEST:
            return {
                loading,
                processing,
            }
        case USER_API_SUCCESS:
            return {
                loading,
                users: payload.data.data,
                pagination:payload.data
            }
        case USER_API_FAILED:
            return {
                loading,
                error,
                processing
            }
        
       
        default:
            return state
    }
}