import axios from "axios";

const API = axios.create({
  baseURL: "https://edupredict-ai-cfl6.onrender.com",
});

export default API;