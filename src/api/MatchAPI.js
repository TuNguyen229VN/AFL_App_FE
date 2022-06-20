import axios from "axios";
import {url,headers} from "./index"

export function createSchedule(id){
    const afterDefaultURL = `matchs/schedule?tournament-id=${id}`;
    return axios.post(url+afterDefaultURL);
}

export function updateDateInMatchAPI(data){
    const afterDefaultURL = `matchs`;
    return axios.put(url+afterDefaultURL,data);
}

export function deleteMatchByTourIdAPI(id){
    const afterDefaultURL = `matchs/delete-match-by-tournament-id?tournamentId=${id}`;
    return axios.delete(url+afterDefaultURL);
}