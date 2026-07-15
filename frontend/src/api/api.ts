import axios from "axios";

const API = axios.create({
  baseURL: "https://edupredict-ai-backend.onrender.com",
});

export default API;