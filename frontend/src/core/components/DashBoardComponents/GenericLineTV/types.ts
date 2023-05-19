export interface IChartLineModelTValues {
    id: string | number
    data: Array<{
        x: number | string | Date
        y: number | string | Date
    }>
}

export interface IChartModelTValues {
    id: string;
    label: string;
    valuey: number;
    valuex: number;
    filtered: boolean;
}
