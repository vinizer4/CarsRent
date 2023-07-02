import {api}                     from "../api";
import {Toasts}                  from "../../utils/toast/toasts";
import qs from 'qs';

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

static async GetImagesByIds(ids: number[]) {
    console.log("api")
    try {
        const res = await api.get('images/byids', {
            params: {
                imagesIds: ids
            },
              paramsSerializer: params => qs.stringify(params) 
        });
        console.log("here")
        console.log(res)
        return res;
    }
    catch (error: any) {
        if (error.response && error.response.status === 401) {
            Toasts.showError({text: "Não foi possível carregar"})
        }
    }
}

}


