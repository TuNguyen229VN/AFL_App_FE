import axios from "axios";
import {url,headers} from "./index"


export function getTeamInTournamentByTourIdAPI(id,status,currentPage,teamid){
    const afterDefaultURL = `team-in-tournaments?tournament-id=${id}&team-id=${teamid}&status=${status}&page-offset=${currentPage}&limit=8`;
    return axios.get(url + afterDefaultURL);
}

export function getTeamPaticaipateInTourByTourIDAPI(id){
    const afterDefaultURL = `team-in-tournaments?tournament-id=${id}&status=Tham%20gia&page-offset=1&limit=10`;
    return axios.get(url + afterDefaultURL);
}

export function addTeamInTournamentAPI(data){
    const afterDefaultURL = `team-in-tournaments`;
    return axios.post(url+afterDefaultURL,data);
}

export function updateStatusTeamInTournament(data){
    console.log(data)
    const afterDefaultURL = `team-in-tournaments`;
    return axios.put(url+afterDefaultURL,data);
}

export function deleteRegisterTeamAPI(id){
    const afterDefaultURL = `team-in-tournaments/${id}`;
    return axios.delete(url+afterDefaultURL);
}

export function updateTeamInScheduleAPI(data){
    const afterDefaultURL = `TeamInMatch/update-team-in-match-to-tournament`;
    return axios.put(url+afterDefaultURL,data);
}