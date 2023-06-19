import {api}                     from "../api";
import {Toasts}                  from "../../utils/toast/toasts";

export class ProductService {

    static async GetProductById(id: any) {
        try {
            const res = await api.get(`products/${id}`);
            return res;
        }
        catch (error: any) {
            if (error.response && error.response.status === 401) {
                Toasts.showError({text: "Não foi possível carregar"})
            } 
        }
    }

    static async GetAll() {
        try {
            const res = await api.get('products')
            return res
        }
        catch (error: any) {
            if (error.response && error.response.status === 401) {
                // TODO: Criar toast de contagem regressiva
                Toasts.showError({text: "Não foi possível carregar"})

            } 
        }
    }
}
