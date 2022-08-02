import axios from "axios";
import {url,headers} from "./index"


export function postTournamentResult(id){
    const afterDefaultURL = `tournament-results?matchId=${id}`;
    return axios.post(url + afterDefaultURL);
}