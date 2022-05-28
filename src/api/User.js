import axios from "axios";
import {url,headers} from "./index"

export function getUserByIdAPI (id) {
    const afterDefaultURL = `users/${id}?search-type=Id`;
    return axios.get(url+afterDefaultURL)
}