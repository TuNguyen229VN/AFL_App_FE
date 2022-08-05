import axios from "axios";
import { url, headers } from "./index";

export function getReportByReasonAPI(reason) {
  const afterDefaultURL = `reports?reason=${reason}&page-offset=1&limit=5`;
  console.log(afterDefaultURL);
  return axios.get(url + afterDefaultURL);
}

export function deleteReport(id) {
  const afterDefaultURL = `reports/${id}`;
  return axios.delete(url + afterDefaultURL);
}

export function createReport(data) {
  const afterDefaultURL = "reports";
  return axios.post(url + afterDefaultURL, data);
}
