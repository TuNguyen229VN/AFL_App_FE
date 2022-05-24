import axios from "axios";
import {url,headers} from "./index"


export function getTeamInMatchByTourId (id) {
    const afterDefaultUrl = `TeamInMatch?tournamentId=${id}`;
    return axios.get(url + afterDefaultUrl);
} 