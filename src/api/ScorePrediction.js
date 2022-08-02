import axios from "axios";
import {url,headers} from "./index"

export function putStatusScorePrediction(idMatch){
    const afterDefaultUrl = `ScorePrediction/Status?matchId=${idMatch}`;
    return axios.put(url + afterDefaultUrl);
}