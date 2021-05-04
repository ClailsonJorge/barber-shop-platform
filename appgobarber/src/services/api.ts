import axios from 'axios'


const api = axios.create({
    baseURL: 'http://172.19.45.159:3333'
})

export default api
