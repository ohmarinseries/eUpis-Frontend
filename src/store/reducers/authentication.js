/*import {ACTIONS} from "../actions";

const initialState = {
    data: [],
    error: null,
    loading: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SIGN_IN_START:
            return {
                ...initialState,
                loading: true,
            };
        case ACTIONS.SIGN_IN_SUCCESS:
            return {
                ...initialState,
                loading: false,
                data: action.payload,
            };
        case ACTIONS.SIGN_IN_ERROR:
            return {
                ...initialState,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default authReducer; */