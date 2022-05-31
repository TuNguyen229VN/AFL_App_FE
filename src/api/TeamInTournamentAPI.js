import axios from "axios";
import {url,headers} from "./index"


export function getTeamInTournamentByTourIdAPI(id,status,currentPage,teamid){
    const afterDefaultURL = `team-in-tournaments?tournament-id=${id}&team-id=${teamid}&status=${status}&page-offset=${currentPage}&limit=8`;
    return axios.get(url + afterDefaultURL);
}

export function addTeamInTournamentAPI(data){
    const afterDefaultURL = `team-in-tournaments`;
    return axios.post(url+afterDefaultURL,data);
}

export function updateStatusTeamInTournament(data){
    const afterDefaultURL = `team-in-tournaments`;
    return axios.put(url+afterDefaultURL,data);
}

export function deleteRegisterTeamAPI(id){
    const afterDefaultURL = `team-in-tournaments/${id}`;
    return axios.delete(url+afterDefaultURL);
}