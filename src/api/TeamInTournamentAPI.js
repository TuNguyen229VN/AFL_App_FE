import axios from "axios";
import {url,headers} from "./index"


export function getTeamInTournamentByTourIdAPI(id){
    const afterDefaultAPI = ``;
    return axios.get(url + afterDefaultAPI);
}

export function addTeamInTournamentAPI(data){
    const afterDefaultAPI = `team-in-tournaments`;
    return axios.post(url+afterDefaultAPI,data);
}