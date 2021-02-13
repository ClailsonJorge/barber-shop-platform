import axios from 'axios'

const api = axios.create({
    baseURL: 'http://172.23.128.73:3333'
})

export default api
