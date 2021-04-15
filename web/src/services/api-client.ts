import axios from 'axios'

const api = axios.create({
    baseURL: 'http://172.26.174.58:3333'
})

export default api
