import axios from "axios";
import {url,headers} from "./index"

export default function postNotifacation(data){
    const afterDefaultUrl = `notifications`;
    return axios.post(url + afterDefaultUrl , data);
}