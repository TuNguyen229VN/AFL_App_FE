import axios from "axios";
import { url, headers } from "./index";

const afterURLDefault = `systems/send-mail-register-recruit`;

const data = {
  tournamentId: 0,
  footballPlayerId: 0,
  teamId: 0,
  type: "Register",
  status: true,
};

export function TeamRegisterAPI(playerId, teamId) {
  return axios.post(url + afterURLDefault, {
    ...data,
    type: "Recruit",
    status: false,
    footballPlayerId: playerId,
    teamId: teamId,
  });
}

export function TeamAcceptAPI(playerId, teamId) {
  return axios.post(url + afterURLDefault, {
    ...data,
    type: "Recruit",
    status: true,
    footballPlayerId: playerId,
    teamId: teamId,
  });
}

export function PlayerRegisterAPI(playerId, teamId) {
  return axios.post(url + afterURLDefault, {
    ...data,
    type: "Register",
    status: false,
    footballPlayerId: playerId,
    teamId: teamId,
  });
}

export function PlayerAcceptAPI(playerId, teamId) {
  return axios.post(url + afterURLDefault, {
    ...data,
    type: "Register",
    status: true,
    footballPlayerId: playerId,
    teamId: teamId,
  });
}

export function NotiFootballInTournamentAPI(tourId, playerId, teamId) {
  return axios.post(url + afterURLDefault, {
    ...data,
    tournamentId: tourId,
    footballPlayerId: playerId,
    teamId: teamId,
  });
}
