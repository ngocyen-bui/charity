import { getCookie } from "cookies-next";
import axiosClient from "../AxiosClient" 


 
const loginAccount = (data) => { 
    return axiosClient.post("sign-in", data);
}

const logoutAccount = () => {
    const token = getCookie('token'); 
    return axiosClient.post(`sign-out`,{},{
        headers: {
            Authorization: "Bearer " + token
        }
    })
}

const getDetailUser = async (id) => {
    const token = getCookie('token'); 
    return await axiosClient.get(`members/${id}`,{
        headers: {
            Authorization: "Bearer " + token
        }
    }) 
}
const updateDetailUser = async ({data}) => {
    const token = getCookie('token'); 
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