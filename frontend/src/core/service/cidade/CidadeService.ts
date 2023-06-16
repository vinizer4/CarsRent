import {api}                     from "../api";
import {Toasts}                  from "../../utils/toast/toasts";

export class CidadeService {

    static async GetAll() {
        try {
            const res = await api.get('cidades')
            return res
        }
        catch (error: any) {
            if (error.response && error.response.status === 401) {
                // TODO: Criar toast de contagem regressiva
                Toasts.showError({text: "Não foi possível carregar"})

            } 
        }
    }

    static async GetCidadeById(id: any) {
        try {
            const res = await api.get(`cidades/${id}`);
            return res;
        }
        catch (error: any) {
            if (error.response && error.response.status === 401) {
                Toasts.showError({text: "Não foi possível carregar"})
            } 
        }
    }
   
}