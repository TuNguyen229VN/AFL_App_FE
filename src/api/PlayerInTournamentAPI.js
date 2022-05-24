import axios from "axios";
import {url,headers} from "./index"

export function addPlayerInTournamentAPI(data){
    const afterDefaultURL = 'PlayerInTournament';
    return axios.post(url+afterDefaultURL,data);
}