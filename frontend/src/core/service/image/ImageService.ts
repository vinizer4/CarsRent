import {api}                     from "../api";
import {Toasts}                  from "../../utils/toast/toasts";

export class ImageService {

    static async GetImageById(id: any) {
        try {
            const res = await api.get(`images/${id}`);
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
        const res = await api.get('images');
        return res;
    }
    catch (error: any) {
        if (error.response && error.response.status === 401) {
            Toasts.showError({text: "Não foi possível carregar"})
        } 
    }
}
}



