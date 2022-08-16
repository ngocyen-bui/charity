import axios from "axios";
import { deleteCookie } from "cookies-next";
import Router from "next/router";

const axiosClient = axios.create({
    baseURL: "https://lubrytics.com:8443/charity-web-api/v1/"
})
axiosClient.interceptors.response.use(function (response) {
    return response
}, function (error) {
    if (error?.response?.status === 401) { 
        alert('Tài khoản của bạn đã hết hiệu lực. Vui lòng đăng nhập lại.')
        deleteCookie('auth')
        deleteCookie('token')
        Router.push('/user/login') 
    }
    return Promise.reject(error)
})

export default axiosClient