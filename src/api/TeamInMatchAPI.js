import axios from "axios";
import {url,headers} from "./index"


export function getTeamInMatchByTourId (id) {
    const afterDefaultUrl = `TeamInMatch?tournamentId=${id}`;
    return axios.get(url + afterDefaultUrl);
} 

export function deleteTeamInMatchByTourIdAPI(id){
    const afterDefaultUrl = `TeamInMatch/delete-by-tournament-id?tournamentId=${id}`;
    return axios.delete(url + afterDefaultUrl);
}