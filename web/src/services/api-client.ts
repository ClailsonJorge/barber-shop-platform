import axios from 'axios'

const api = axios.create({
    baseURL: 'http://172.25.22.53:3333'
})

export default api
