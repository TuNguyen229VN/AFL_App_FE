import axios from "axios";
import {url , headers} from './index'

export function addPlayerInTeamAPI(data) {
    const afterDefaultURL = "PlayerInTeam";
    try{
        return axios.post(url+afterDefaultURL,data)
    }catch(err){
        console.error(err)
    }
}