import axios from "axios";
import {url , headers} from './index'

export function addFootballPlayer(data)  {
    const afterDefaulURL = 'football-players';
    return axios.post(url+afterDefaulURL,data,headers);
}