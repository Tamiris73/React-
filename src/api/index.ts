import axios from "axios";

const api = axios.create({
  baseURL: "apicefet.herokuapp.com"
})

export default api;
