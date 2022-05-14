import axios from "axios";

const URL = "https://afootballleague.ddns.net/api/v1/";
const headers = {
    headers: { "content-type": "multipart/form-data" },
  }


export const getAPI = (afterURL) => {
    const fullURL = URL + afterURL;
    console.log(fullURL)
    try{
        return axios.get(URL + afterURL);
    }catch(err) {
        console.error(err)
    }
}