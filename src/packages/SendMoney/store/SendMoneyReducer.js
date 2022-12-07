import {API_ERROR, API_REQUEST, API_SUCCESS} from "./SendMoneyActionTypes";

const initialState = {
    loading: false,
    error: {},
    status: false,
    sidebarShow: 'responsive',
    message: "",
    isBeneficiary: false,
    processPayment: false,
    submitting: false,
};
export default function sendMoneyReducer(state=initialState, action) {
    const { type, payload, loading,isBeneficiary,processPayment,submitting, error,rest} = action;
    switch (type) {
        case 'set':
            return { ...state, ...rest }
        case API_REQUEST:
            return {
                loading,
                submitting,
                isBeneficiary,
            }
        case API_SUCCESS:
            return {
                ...state,
                loading,
                submitting,
                message: payload.message,
                isBeneficiary,
                processPayment
            }
        case API_ERROR:
            return {
                error,
                loading,
                submitting,
                message: payload?.message,
                isBeneficiary
            }
        default:
            return state
    }
}
