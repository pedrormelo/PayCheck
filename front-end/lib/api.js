// front-end/lib/api.js
import axios from "axios"

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3003",
    withCredentials: true,
})

export default api
