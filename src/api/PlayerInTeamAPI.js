import axios from "axios";
import { url, headers } from "./index";

export function getAllPlayerByTeamIdAPI(id) {
  const afterDefaultURL = `PlayerInTeam?teamId=${id}&pageIndex=1&limit=30`;

  return axios.get(url + afterDefaultURL);
}

export function getAllTeamByPlayerIdAPI(id, status, currentPage, limit) {
  const afterDefaultURL = `PlayerInTeam?footballPlayerId=${id}&status=${status}&orderType=DESC&pageIndex=${currentPage}&limit=${
    limit !== undefined ? limit : 8
  }`;
  return axios.get(url + afterDefaultURL);
}

export function addPlayerInTeamAPI(data) {
  const afterDefaultURL = "PlayerInTeam";
  try {
    return axios.post(url + afterDefaultURL, data);
  } catch (err) {
    console.error(err);
  }
}

export function deletePlayerInTeamAPI(idPlayerInTeam) {
  const afterDefaultURL = `PlayerInTeam/${idPlayerInTeam}`;
  return axios.delete(url + afterDefaultURL);
}

export function upDatePlayerInTeamAPI(idPlayerInTeam, status) {
  const afterDefaultURL = `PlayerInTeam?Id=${idPlayerInTeam}&status=${status}`;
  return axios.put(url + afterDefaultURL);
}

export function checkPlayerInTeamAPI(idTeam, idPlayer) {
  const afterDefaultURL = `PlayerInTeam?teamId=${idTeam}&footballPlayerId=${idPlayer}&pageIndex=1&limit=5`;
  return axios.get(url + afterDefaultURL);
}

export function getPlayerInTeamByIdAPI(id) {
  const afterDefaultURL = `PlayerInTeam/${id}`;
  return axios.get(url + afterDefaultURL);
}

export function getPlayerBusyInTeambyTeamIdAPI(id) {
  const afterDefaultURL = `PlayerInTeam?teamId=${id}&status=true&busy=busy&pageIndex=1&limit=30`;
  return axios.get(url + afterDefaultURL);
}

export function pushStatusPlayerInTeam(id, status) {
  const afterDefaultURL = `PlayerInTeam?Id=${id}&status=${status}`;
  return axios.put(url + afterDefaultURL);
}
