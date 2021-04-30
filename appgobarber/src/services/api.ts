import axios from 'axios'


const api = axios.create({
    baseURL: 'http://172.21.218.160:3333'
})

export default api
