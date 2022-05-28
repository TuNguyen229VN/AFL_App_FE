import axios from "axios";
import {url,headers} from "./index"

export function createSchedule (id){
    const afterDefaultURL = `matchs/schedule?tournament-id=${id}`;
    return axios.post(url+afterDefaultURL);
}