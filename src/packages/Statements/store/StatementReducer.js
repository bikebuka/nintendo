import {API_ERROR, API_REQUEST, API_SUCCESS} from "./StatementActionTypes";

const initialState = {
    loading: false,
    error: {},
    statements: [],
    pagination:{}
};
export default function statementReducer(state=initialState, action) {
    const { type, payload, loading, error} = action;
    switch (type) {
        case API_REQUEST:
            return {
                loading
            }
        case API_SUCCESS:
            return {
                ...state,
                loading,
                statements:payload.data,
                pagination:payload
            }
        case API_ERROR:
            return {
                error,
                loading
            }
        default:
            return state
    }
}
