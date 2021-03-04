import axios from 'axios'


const api = axios.create({
    baseURL: 'http://172.22.227.33:3333'
})

export default api
