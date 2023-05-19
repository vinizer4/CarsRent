import {toast, ToastPosition} from 'react-toastify'

interface ToastOptions {

    text: string;
    duration?: number;
    destination?: boolean;
    newWindow?: boolean;
    close?: boolean;
    gravity?: "top" | "bottom";
    position?: ToastPosition;
    stopOnFocus?: boolean;
    style?: { [cssRule: string]: string };
    action?: (() => void) | undefined
}

export const timerToast = 3000

export class Toasts {

    public static showSucess(options: ToastOptions): void {
        toast.success(
            options.text,
            {
                autoClose: options.duration || timerToast,
                position: options.position || 'top-center',
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: options.stopOnFocus || true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            }
        )
    }

    public static showError(options: ToastOptions): void {
        toast.error(
            options.text,
            {
                autoClose: options.duration || timerToast,
                position: options.position || 'top-center',
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: options.stopOnFocus || true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            }
        )
    }

    public static showAlert(options: ToastOptions): void {
        toast.warn(
            options.text,
            {
                autoClose: options.duration || timerToast,
                position: options.position || 'top-center',
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: options.stopOnFocus || true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            }
        )
    }
}
