import { getCookie } from "cookies-next";
import axiosClient from "./AxiosClient";

const getLocation = async ({filter}) => {
    const token = getCookie('token'); 
    return await axiosClient.get(`locations${filter}`,{
        headers: {
            Authorization: "Bearer " + token
        }
    }) 
}
export {
    getLocation
}