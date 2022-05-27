import axios from "axios";
import {url,headers} from "./index"

export function getUserByIdAPI (id) {
    const afterDefaultURL = `users/${23}?search-type=Id`;
    return axios.get(url+afterDefaultURL)
}