import axios from "axios";


const URL = "https://eupis.herokuapp.com";


const instance = axios.create({
    baseURL:URL
})


export default instance;