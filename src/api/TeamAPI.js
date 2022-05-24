import axios from "axios";
import {url,headers} from "./index"


export function getTeamByIdAPI(id){
    const afterDefaultAPI = `teams/${id}`;
    return axios.get(url + afterDefaultAPI);
}