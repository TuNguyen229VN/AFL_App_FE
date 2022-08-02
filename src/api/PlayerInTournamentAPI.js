import axios from "axios";
import {url,headers} from "./index"

export function addPlayerInTournamentAPI(data){
    const afterDefaultURL = 'PlayerInTournament';
    return axios.post(url+afterDefaultURL,data);
}

export function getAllPlayerInTournamentByTeamInTournamentIdAPI(id){
    const afterDefaultURL = `PlayerInTournament?team-in-tournament-id=${id}&page-offset=1&limit=30`
    return axios.get(url + afterDefaultURL);
}

export function deletePlayerInTournamentById(id,tourId, teamInTourId){
    let afterDefaultURL = null;
    if(tourId > 0){
         afterDefaultURL = `PlayerInTournament?id=${id}&tourId=${tourId}&teamIntourId=${teamInTourId}`;
    }else{
         afterDefaultURL = `PlayerInTournament?id=${id}`;
    }
    
    return axios.delete(url + afterDefaultURL)
}
