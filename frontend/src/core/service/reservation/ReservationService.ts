import {api}                  from "../api";
import {Toasts}               from "../../utils/toast/toasts";
import qs                     from 'qs';
import {normalizeEmpity}      from "../../utils/rest/restUtils";
import {ReservationInterface} from "../../interface/ReservationInterface";

export class ReservationService {

    static async Post(data: ReservationInterface) {
        try {
            const res = await api.post('reservations', normalizeEmpity(data))
            return res;
        }
        catch (error: any) {
            if (error.response && error.response.status === 401) {
                Toasts.showError({text: "Não foi possível carregar"})
            }
        }
    }

    static async Put(data: ReservationInterface) {
        try {
            const res = await api.put('reservations', normalizeEmpity(data), {
                params: {
                    id: data.id
                }
            })
            return res;
        }
        catch (error: any) {
            if (error.response && error.response.status === 401) {
                Toasts.showError({text: "Não foi possível carregar"})
            }
        }
    }

    static async GetByProductId(id: any) {
        try {
            const res = await api.get(`reservations/product/${id}`);
            return res;
        }
        catch (error: any) {
            if (error.response && error.response.status === 401) {
                Toasts.showError({text: "Não foi possível carregar"})
            }
        }
    }
}
