import {API_ERROR, API_REQUEST, API_SUCCESS} from "./TopUpActionTypes";

const initialState = {
    loading: false,
    error: {},
    status: false,
    sidebarShow: 'responsive',
    profile: {},
    hasSentOTP: false,
    submitting: false,
    verifyingOTP: false,
    checkout_request_id:"",
    verified: false,
};
export default function TopUpReducer(state=initialState, action) {
    const { type, payload,submitting,verifyingOTP, verified,loading, error,rest,hasSentOTP} = action;
    switch (type) {
        case 'set':
            return { ...state, ...rest }
        case API_REQUEST:
            return {
                loading,
                hasSentOTP,
                submitting,
                verifyingOTP
            }
        case API_SUCCESS:
            return {
                ...state,
                loading,
                submitting,
                profile:payload,
                checkout_request_id: payload.checkout_request_id,
                hasSentOTP,
                verified,
                verifyingOTP
            }
        case API_ERROR:
            return {
                error,
                loading,
                hasSentOTP,
                submitting,
                verifyingOTP
            }
        default:
            return state
    }
}
