import axios from "axios";
import {url , headers} from './index'

export function addFootballPlayer(data)  {
    const afterDefaulURL = 'football-players';
    return axios.post(url+afterDefaulURL,data,headers);
}


export function getAllFootballPlayerAPI(){
    const afterDefaulURL = 'football-players';
    return axios.get(url+afterDefaulURL); 
}


// export function getFootballPlayerById(id) {
//     const afterDefaulURL = `football-players/${id}`;
//     return axios.get(url+afterDefaulURL,data,headers);
// }

export function editFootballPlayerAPI(data){
    const afterDefaulURL = 'football-players'
    return axios.put(url+afterDefaulURL,data,headers);
}