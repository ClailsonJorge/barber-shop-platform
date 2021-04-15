import axios from 'axios'

const api = axios.create({
    baseURL: 'http://172.23.199.234:3333'
})

export default api
