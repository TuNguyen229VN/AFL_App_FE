import axios from "axios";

const URL = "https://afootballleague.ddns.net/api/v1/";


export const getAPI = (afterURL) => {
  const fullURL = URL + afterURL;
  console.log(fullURL);
  try {
    return axios.get(URL + afterURL);
  } catch (err) {
    console.error(err);
  }
};

export const postAPI = (afterURL, data, status) => {
  const fullURL = URL + afterURL;
  console.log(fullURL);
  try {
    if (status) return axios.post(URL + afterURL, data, headers);
    return axios.post(URL + afterURL, data);
  } catch (err) {
    console.error(err);
  }
};
export const putAPI = (afterURL, data, status) => {
  const fullURL = URL + afterURL;
  console.log(fullURL);
  try {
    if (status) return axios.put(URL + afterURL, data, headers);
    return axios.put(URL + afterURL, data);
  } catch (err) {
    console.error(err);
  }
};


export const url = "https://afootballleague.ddns.net/api/v1/";
export const headers = {
  headers: { "content-type": "multipart/form-data" },
};
// const axiosInstance = axios.create({
//   baseURL:"",

// })