import axios from 'axios'


const api = axios.create({
    baseURL: 'http://172.19.35.119:3333'
})

export default api
