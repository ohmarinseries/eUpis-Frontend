/*import axios from "axios";
import {ACTIONS} from "../actions";

export const postCandidate = () => (dispatch) => {
    dispatch({type: ACTIONS.POST_CANDIDATE_START});
    axios({
        method: "POST",
        url: "",
        headers: {},
        body: {},
    })
        .then((res) => {
            dispatch({type: ACTIONS.POST_CANDIDATE_SUCCESS, payload: res.data});
        })
        .catch((err) => {
            dispatch({type: ACTIONS.POST_CANDIDATE_ERROR, payload: err});
        });
}; */
