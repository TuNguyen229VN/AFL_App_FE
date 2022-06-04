import axios from "axios";
import { url, headers } from "./index";

export function addFootballPlayer(data) {
  const afterDefaulURL = "football-players";
  return axios.post(url + afterDefaulURL, data, headers);
}

export function getAllFootballPlayerAPI(dataSearch, currentPage) {
  const afterDefaulURL = `football-players?${dataSearch}&status=true&order-by=Id&order-type=DESC&page-offset=${currentPage}&limit=8`;
  return axios.get(url + afterDefaulURL);
}

// export function getFootballPlayerById(id) {
//     const afterDefaulURL = `football-players/${id}`;
//     return axios.get(url+afterDefaulURL,data,headers);
// }

export function getFootballPlayerById(id){
  const afterDefaultURL = `football-players/${id}`;
  return axios.get(url + afterDefaultURL);
}

export function editFootballPlayerAPI(data) {
  const afterDefaulURL = "football-players";
  return axios.put(url + afterDefaulURL, data, headers);
}
