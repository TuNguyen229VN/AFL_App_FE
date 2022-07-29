import axios from "axios";
import { url, headers } from "./index";

export function getTeamInMatchByTourId(id) {
  const afterDefaultUrl = `TeamInMatch?tournamentId=${id}`;
  return axios.get(url + afterDefaultUrl);
}

export function deleteTeamInMatchByTourIdAPI(id) {
  const afterDefaultUrl = `TeamInMatch/delete-by-tournament-id?tournamentId=${id}`;
  return axios.delete(url + afterDefaultUrl);
}

export function getTeamInMatchByMatchIdAPI(id) {
  const afterDefaultUrl = `TeamInMatch/matchId?matchId=${id}`;
  return axios.get(url + afterDefaultUrl);
}

export function updateTeamInMatch(data){
 const afterDefaultUrl = `TeamInMatch`;
 return axios.put(url + afterDefaultUrl , data);
}

export function updateNextTeamInRoundAPI(data){
  const afterDefaultUrl = `TeamInMatch/update-next-team-in-match`;
  return axios.put(url + afterDefaultUrl , data);
}