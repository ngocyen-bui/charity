import axios from "axios";
import { getCookie } from "cookies-next"; 
import axiosClient from "../AxiosClient";

const url = (id)=> {
    return `https://dev-charity.estuary.solutions/_next/data/kEBwHlXdjRVTVjjJzdAb3/gift/${id}.json?slug=${id}`
}
const getListPost = ({filter})=>{
    return axiosClient.get(`posts?${filter}`).then(res => res?.data?.data?.data)
}

const createPost = ({data}) => {
    const token = getCookie('token'); 
    return axiosClient.post(`posts`,data,{
        headers: {
            Authorization: "Bearer " + token
        }
    })
}

const putPost = ({id,data}) => {
    const token = getCookie('token'); 
    return axiosClient.put(`posts/${id}`,data,{
        headers: {
            Authorization: "Bearer " + token
        }
    })
}
const getPost = ({id}) => {
    const token = getCookie('token'); 
    return axiosClient.get(`posts/${id}`,{
        headers: {
            Authorization: "Bearer " + token
        }
    })
}
const getPostJson = ({id}) => { 
    return axios.get(url(id));
}

export {
    createPost,
    getPost,
    getListPost,
    putPost
}