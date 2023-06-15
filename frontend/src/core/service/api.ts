import axios from 'axios'

export const token = localStorage.getItem('token')

export const api = axios.create({
    baseURL: 'http://54.94.123.112:8081/api/',
    headers: {
        Authorization: `${token}`
    }
})
