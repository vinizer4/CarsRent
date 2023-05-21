export const colorPrimary = "#004AAD";
export const colorSecondary = "#067FFF";

export const colorRed = '#F14648'
export const colorTerciary = "#073577";
export const colorQuarternary = "#409091";
export const colorFont = "#000";
export const colorFontW = "#F8FAFF";
export const colorSave = "#169a38";
export const colorDelete = "#c70000";
export const colorInfo = "#2a53f7";
export const colorWarning = "#f5e725";
export const colorSoftGray = "#e3e4eb";
export const colorBGGray = "#efeff0";

export const colorSoftBlack = "#232121FF";
export const colorHeavyGray = "#525D5D";
export const bgColor = "#ededef";
// #004AAD
// #067FFF
// #073577
// #409091
//
// #EAEBE3
// #525D5D
export const timerToast = 3000;

export const MaxWidthViewPort = 900;
export const isMobile = window.innerWidth < MaxWidthViewPort;

export const urlImage = "https://gsappimages.s3.sa-east-1.amazonaws.com/";
export const loadImg = (endpoint: string) => {
    return `${urlImage}${endpoint}`;
};

export const switchColor = (type: colorTypes) => {
    switch (type) {
        case "default":
            return colorFont;
        case "error":
            return colorDelete;
        case "warning":
            return colorWarning;
        case "sucess":
            return colorSave;
        case "info":
            return colorInfo;
        default:
            return colorFont;
    }
};

export type colorTypes = "default" | "error" | "warning" | "sucess" | "info";

export const shortCutSave = ["Shift", "s"];

export const shortCutResetGrid = ["Alt", "r"];

export const dataShowTolerancy = 0;
