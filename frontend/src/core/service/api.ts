import axios from 'axios'

export const token = localStorage.getItem('token')

export const api = axios.create({
    baseURL: 'http://localhost:8080/api/',
    headers: {
        Authorization: `${token}`
    }
})
