import {api}                     from "../api";
import {Toasts}                  from "../../utils/toast/toasts";
import {IUserCreate, IUserLogin} from "../../interface/UserInterface";

export class UserService {

    static async GetAll() {
        try {
            const res = await api.get('users')
            return res
        }
        catch (error: any) {
            if (error.response && error.response.status === 401) {
                // TODO: Criar toast de contagem regressiva
                Toasts.showError({text: "Sessão expirada faça"
                        + " login novamente"})

                setTimeout(() => {
                    window.location.replace('http://localhost:5173/login')
                }, 5000)
            } else {
                Toasts.showError({text: "Falha na requisição dos"
                        + " dados de usuário"})
            }

        }
    }

    static async GetOne(id: number) {
        try {
            const res = await api.get(`users/${id}`)
            return res
        }
        catch (error: any) {
            if (error.response && error.response.status === 401) {
                // TODO: Criar toast de contagem regressiva
                Toasts.showError({text: "Sessão expirada faça"
                        + " login novamente"})

                setTimeout(() => {
                    window.location.replace('http://localhost:5173/login')
                }, 5000)
            } else {
                Toasts.showError({text: "Falha na requisição dos"
                        + " dados de usuário"})
            }
        }
    }

    static async Delete(id: number) {
        try {
            const res = await api.delete(`users/${id}`)
            return res
        }
        catch (error: any) {
            if (error.response && error.response.status === 401) {
                // TODO: Criar toast de contagem regressiva
                Toasts.showError({text: "Sessão expirada faça"
                        + " login novamente"})

                setTimeout(() => {
                    window.location.replace('http://localhost:5173/login')
                }, 5000)
            } else {
                Toasts.showError({text: "Falha na requisição dos"
                        + " dados de usuário"})
            }
        }
    }

    static async Post(data: IUserCreate) {
        try {
            const res = await api.post(`users/`)
            return res
        }
        catch (error: any) {
            if (error.response && error.response.status === 401) {
                // TODO: Criar toast de contagem regressiva
                Toasts.showError({text: "Sessão expirada faça"
                        + " login novamente"})

                setTimeout(() => {
                    window.location.replace('http://localhost:5173/login')
                }, 5000)
            } else {
                Toasts.showError({text: "Falha na requisição dos"
                        + " dados de usuário"})
            }
        }
    }

    static async Login(data: IUserLogin) {
        try {
            const res = await api.post(`users/login`, data)

            console.log(res.data)

            localStorage.setItem('token', res.data)

            return res
        }
        catch (error: any) {
            if (error.response && error.response.status === 401) {
                // TODO: Criar toast de contagem regressiva
                Toasts.showError({text: "Sessão expirada faça"
                        + " login novamente"})

                setTimeout(() => {
                    window.location.replace('http://localhost:5173/login')
                }, 5000)
            } else {
                Toasts.showError({text: "Falha na requisição dos"
                        + " dados de usuário"})
            }
        }
    }

    static async Put(data: IUserCreate) {
        try {
            const res = await api.put(`users/`)
            return res
        }
        catch (error: any) {
            if (error.response && error.response.status === 401) {
                // TODO: Criar toast de contagem regressiva
                Toasts.showError({text: "Sessão expirada faça"
                        + " login novamente"})

                setTimeout(() => {
                    window.location.replace('http://localhost:5173/login')
                }, 5000)
            } else {
                Toasts.showError({text: "Falha na requisição dos"
                        + " dados de usuário"})
            }
        }
    }


}
