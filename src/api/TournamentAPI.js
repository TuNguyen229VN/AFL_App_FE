import axios from "axios";
import { url, headers } from "./index";

export function getTournamentById(id) {
  const afterDefaultUrl = `tournaments/${id}`;
  return axios.get(url + afterDefaultUrl);
}

export function updateTournamentInfoAPI(data) {
  const afterDefaultUrl = "tournaments";
  return axios.put(url + afterDefaultUrl, data, headers);
}
