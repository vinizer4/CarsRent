import {api}                     from "../api";
import {Toasts}                  from "../../utils/toast/toasts";

export class CategoryService {

    static async GetAll() {
        try {
            const res = await api.get('categories')
            return res;
        }
        catch (error: any) {
            if (error.response && error.response.status === 401) {
                Toasts.showError({text: "Não foi possível carregar"})
            } 
        }
    }
}
