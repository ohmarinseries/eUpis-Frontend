import axios from "axios";
import url from "../api-urls";


const instance = axios.create({
    baseURL:url
})


export default instance;