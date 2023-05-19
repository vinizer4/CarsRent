import {dataShowTolerancy} from '../../../consts';
import {IChartModel} from './types';

export const DonutModel = (data: Array<IChartModel>) => {
    var sumQtd = 0;
    data.forEach((d) => {
        sumQtd += d.value;
    });
    var other: IChartModel = {
        id: "other",
        label: "OUTROS",
        value: 0,
        filtered: true,
    };
    var dataTemp: Array<IChartModel> = new Array<IChartModel>();
    data.forEach((d) => {
        if (Number((d.value * 100) / sumQtd) >= dataShowTolerancy) {
            dataTemp.push(d);
        } else {
            other.value += d.value;
        }
    });
    if (other.value > 0) dataTemp.push(other);
    return dataTemp!;
};
