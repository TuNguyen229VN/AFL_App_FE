import axios from "axios";
import {url,headers} from "./index"


export function getTeamInTournamentByTourIdAPI(id,status,currentPage,teamid){
    const afterDefaultAPI = `team-in-tournaments?tournament-id=${id}&team-id=${teamid}&status=${status}&page-offset=${currentPage}&limit=8`;
    return axios.get(url + afterDefaultAPI);
}

export function addTeamInTournamentAPI(data){
    const afterDefaultAPI = `team-in-tournaments`;
    return axios.post(url+afterDefaultAPI,data);
}

export function updateStatusTeamInTournament(data){
    const afterDefaultAPI = `team-in-tournaments`;
    return axios.put(url+afterDefaultAPI,data);
}