import axios from "axios";

const API = axios.create({
  baseURL: "https://edupredict-ai-1-ui9r.onrender.com",
});

export default API;