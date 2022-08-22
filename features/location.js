import { getCookie } from "cookies-next";
import axiosClient from "./AxiosClient";

const getLocation = async ({filter}) => {
    return await axiosClient.get(`locations${filter}`) 
}
export {
    getLocation
}