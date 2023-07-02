import axios from 'axios'

export const token = localStorage.getItem('token')

// BACKEND LOCAL
// export const api = axios.create({
//     baseURL: 'http://localhost:8081/api/',
//     headers: {
//         Authorization: `${token}`
//     }
// })

//BACKEND PRODUCAO
export const api = axios.create({
    baseURL: 'http://54.94.123.112:8081/api/',
    headers: {
        Authorization: `${token}`
    }
})
