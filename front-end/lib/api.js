// front-end/lib/api.js
import axios from "axios"

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://10.87.20.9:3003",
    withCredentials: true,
})

export default api
