import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://lubrytics.com:8443/charity-web-api/v1/"
})
axiosClient.interceptors.response.use(function (response) {
    return response
}, function (error) {
    if (error?.response?.status === 401) { 
        // window.location.replace("/")/
    }
    return Promise.reject(error)
})

export default axiosClient