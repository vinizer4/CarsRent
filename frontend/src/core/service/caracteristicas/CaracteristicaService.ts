import {api}                     from "../api";
import {Toasts}                  from "../../utils/toast/toasts";
import qs from 'qs';

export class CaracteristicaService {

    static async GetAll() {
        try {
            const res = await api.get('caracteristicas')
            return res;
        }
        catch (error: any) {
            if (error.response && error.response.status === 401) {
                Toasts.showError({text: "Não foi possível carregar"})
            }
        }
    }

    static async GetById(id: any) {
        try {
            const res = await api.get(`caracteristicas/${id}`);
            return res;
        }
        catch (error: any) {
            if (error.response && error.response.status === 401) {
                Toasts.showError({text: "Não foi possível carregar"})
            }
        }
    }

    static async GetCaracteristicasByIds(ids: number[]) {
        try {
            const res = await api.get('caracteristicas/byids', {
                params: {
                    caracteristicasIds: ids
                },
                paramsSerializer: params => qs.stringify(params, {arrayFormat: 'repeat'})
            });
            return res;
        }
        catch (error: any) {
            if (error.response && error.response.status === 401) {
                Toasts.showError({text: "Não foi possível carregar"})
            }
        }
    }
}
