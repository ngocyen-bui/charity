import { getCookie } from "../../../utils";
import axiosClient from "../AxiosClient" 

const token = getCookie(typeof document !== "undefined" ? document.cookie : "", "token") || undefined; 

const loginAccount = (data) => { 
    return axiosClient.post("sign-in", data);
}

const logoutAccount = () => {
    return axiosClient.post(`sign-out`,{},{
        headers: {
            Authorization: "Bearer " + token
        }
    })
}

const getDetailUser = async (id) => {
    return await axiosClient.get(`members/${id}`,{
        headers: {
            Authorization: "Bearer " + token
        }
    }) 
}
const updateDetailUser = async ({data}) => {
    return await axiosClient.put(`members`,data,{
        headers: {
            Authorization: "Bearer " + token
        }
    }) 
}

export {
    loginAccount,
    logoutAccount,
    getDetailUser,
    updateDetailUser
}