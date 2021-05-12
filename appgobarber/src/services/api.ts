import axios from 'axios'

const api = axios.create({
    baseURL: 'http://172.24.179.206:3333'
})

export default api
