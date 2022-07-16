import axios from "axios";
import {url,headers} from "./index"

export function getMatchDetailByMatchIdAPI(id){
    const afterDefaultURL = `MatchDetail/MatchId?matchId=${id}`;
    return axios.get(url + afterDefaultURL);
}

export function saveRecordInMatchDetail(data,room){
    const afterDefaultURL = `MatchDetail?room=${room}`;
    return axios.post(url+afterDefaultURL,data,{headers:{
        "Content-Type": "application/json"
    }});
}

export function updateRecordInMatchDetail(data){
    const afterDefaultURL = `MatchDetail`;
    return axios.put(url+afterDefaultURL,data);
}