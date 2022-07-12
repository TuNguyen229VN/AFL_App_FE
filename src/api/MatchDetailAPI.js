import axios from "axios";
import {url,headers} from "./index"

export function getMatchDetailByMatchIdAPI(id){
    const afterDefaultURL = `MatchDetail/MatchId?matchId=${id}`;
    return axios.get(url + afterDefaultURL);
}

export function saveRecordInMatchDetail(data){
    const afterDefaultURL = `MatchDetail`;
    return axios.post(url+afterDefaultURL,data);
}

export function updateRecordInMatchDetail(data){
    const afterDefaultURL = `MatchDetail`;
    return axios.put(url+afterDefaultURL,data);
}

export function deleteMatchDetailByTypeAPI(matchId,type){
    const afterDefaultURL = `MatchDetail/delete-type?matchId=${matchId}&type=${type}`;
    return axios.delete(url+afterDefaultURL);
}