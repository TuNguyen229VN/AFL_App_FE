import axios from "axios";

const URL = "https://afootballleague.ddns.net/api/v1/";
const headers = {
  headers: { "content-type": "multipart/form-data" },
};

export function getTournamentById (id)  {
    const afterDefaultUrl = `tournaments/${id}`
    return axios.get(URL + afterDefaultUrl);
}