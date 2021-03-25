import axios from "axios";

const api = axios.create({
  baseURL: "https://apicefet.herokuapp.com"
})

export default api;
