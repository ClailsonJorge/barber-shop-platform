import axios from 'axios'

const api = axios.create({
    baseURL: 'http://172.26.173.68:3333'
})

export default api
