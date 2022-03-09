import axios from "axios";
import {ACTIONS} from "../actions";
/*
const signIn = (navigation) => (dispatch) => {
    dispatch({type: ACTIONS.SIGN_IN_START});
    axios({
        method: "GET",
        url: "",
        headers: {},
    })
        .then((res) => {
            dispatch({type: ACTIONS.SIGN_IN_SUCCESS, payload: res.data});
            navigation.push('/dashboard');
        })
        .catch((err) => {
            dispatch({type: ACTIONS.SIGN_IN_ERROR, payload: err});
        });
};

const signUp = () => (dispatch) => {
    dispatch({type: ACTIONS.SIGN_UP_START});
    axios({
        method: "POST",
        url: "",
        headers: {},
        body: {},
    })
        .then((res) => {
            dispatch({type: ACTIONS.SIGN_UP_SUCCESS, payload: res.data});
        })
        .catch((err) => {
            dispatch({type: ACTIONS.SIGN_UP_ERROR, payload: err});
        });
};

const signOut = (navigation) => (dispatch) => {
    navigation.push('/')
    dispatch({type: ACTIONS.SIGN_OUT, payload: null});
};

export {signUp, signIn, signOut} */