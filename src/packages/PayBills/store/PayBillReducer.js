import {API_ERROR, API_REQUEST, API_SUCCESS} from "./PayBillActionTypes";

const initialState = {
    loading: false,
    submitting: false,
    error: {},
    status: false,
    sidebarShow: 'responsive',
    paybill: {},
    querying: false,
    resultFound: false,
    isBeneficiary: false,
    message:""
};
export default function PayBillReducer(state=initialState, action) {
    const { type, payload, submitting, loading, error,rest,querying,resultFound,isBeneficiary} = action;
    switch (type) {
        case 'set':
            return { ...state, ...rest }
        case API_REQUEST:
            return {
                loading,
                querying,
                submitting
            }
        case API_SUCCESS:
            return {
                ...state,
                loading,
                querying,
                submitting,
                paybill:payload.paybill_details,
                message: payload.message,
                resultFound,
                isBeneficiary
            }
        case API_ERROR:
            return {
                error,
                loading,
                querying,
                submitting
            }
        default:
            return state
    }
}
