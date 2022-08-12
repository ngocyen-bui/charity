import axios from "axios";

const linkImage = (id) => { 
    return ("https://lubrytics.com:8443/charity-mediafile/file/"+ id);
}

const upload = (file)=>{
    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" }, 
    };
    fmData.append("file", file); 
    
    try {
        return axios.post(
            "https://lubrytics.com:8443/charity-mediafile/file",
            fmData,
            config
          ).then( response => response.data);
    } catch (error) {
        
    }
}

export {
    linkImage,
    upload
}