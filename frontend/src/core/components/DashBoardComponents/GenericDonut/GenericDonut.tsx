import { ComputedDatum, DefaultRawDatum, ResponsivePie } from "@nivo/pie";
import { BasicTooltip } from "@nivo/tooltip";
import React, { memo, useEffect, useState } from "react";
import {IChartModel} from './types';
import {DonutModel} from './DonutModel';
import {randomColor, setOpacity} from '../../../utils/generators';
import {dataShowTolerancy} from '../../../consts';
import {formatCurrency} from '../../../utils/utils';
import {DonutContainer} from './styles';
import Typography from '../../CustomText/Typhography';
import Loadgif from '../../../assets/Loadgif';

type props = {
    dataFiltro: any;
    title: string;
    render: any;
    filterStorage: string;
    statusCode: number;
    storageName: string;
    chartData?: Array<IChartModel>;
    customTooltip?: React.FunctionComponent<ComputedDatum<DefaultRawDatum>>;
    arcLabel?: any;
};

function GenericDonut({
                          dataFiltro,
                          chartData,
                          title,
                          customTooltip,
                          render,
                          filterStorage,
                          statusCode,
                          storageName,
                          arcLabel
                      }: props) {
    const [data, setData] = useState<Array<IChartModel>>();
    const [sumQtd, setSumQtd] = useState(0);

    async function handleData() {
        if (chartData) {
            let sum = 0;
            chartData.forEach((data) => (sum += data.value));
            setSumQtd(sum);
            setData(DonutModel(chartData));
        } else {
            setData(undefined);
        }
    }

    function changeFilters(filterData: string) {
        var storedFilters = localStorage.getItem(filterStorage);
        if (storedFilters === null) {
            storedFilters = JSON.parse(`{
        "${storageName}" : ["${filterData}"]
      }`);
        } else {
            localStorage.removeItem(filterStorage);
            var obj = JSON.parse(storedFilters);

            if (Object.keys(obj).includes(storageName)) {
                if (obj[storageName].includes(filterData)) {
                    for (var i = 0; i < obj[storageName].length; i++) {
                        if (obj[storageName][i] === filterData) {
                            obj[storageName].splice(i, 1);
                            i--;
                        }
                    }
                } else {
                    obj[storageName].push(filterData);
                }
            } else {
                obj[storageName] = [filterData];
            }
            storedFilters = obj;
        }
        // console.log(storedFilters);

        localStorage.setItem(filterStorage, JSON.stringify(storedFilters));
        render();
    }
    useEffect(() => {
        handleData();
    }, [dataFiltro, chartData, statusCode]);

    const PieTooltip: React.FunctionComponent<ComputedDatum<DefaultRawDatum>> = (
        props
    ) => {
        return (
            <>
                <BasicTooltip id={title} value={props.label} color={props.color} />
                <BasicTooltip
                    id={`Produtos vendidos`}
                    value={props.value}
                    color={props.color}
                />
            </>
        );
    };
    const PieRender = (dataGraph: Array<IChartModel>) => {
        var sliceCount = 0;
        return (
            <ResponsivePie
                margin={{ top: 30, right: 30, bottom: 20, left: 30 }}
                data={dataGraph}
                colors={(e) => {
                    var element = dataGraph.find((ele) => e.id === ele.id);
                    var n = sliceCount;
                    sliceCount++;
                    if (element && element.filtered) {
                        return setOpacity(randomColor(n), 0.3);
                    } else {
                        return randomColor(n);
                    }
                }}
                innerRadius={0.5}
                arcLabel={function (e) {
                    return `${((e.value * 100) / sumQtd).toFixed(2)} %`;
                }}
                arcLabelsSkipAngle={dataShowTolerancy}
                padAngle={0.7}
                cornerRadius={3}
                arcLinkLabel={(e) => arcLabel ? arcLabel(e) : `${e.label} (${formatCurrency(e.value)})`}
                arcLinkLabelsSkipAngle={dataShowTolerancy}
                tooltip={(point) => {
                    if (customTooltip) {
                        return customTooltip(point.datum);
                    } else {
                        return PieTooltip(point.datum);
                    }
                }}
                onClick={(e) => changeFilters(e.id.toString())}
                // legends={[
                //     {
                //         anchor: "top-left",
                //         direction: "column",
                //         justify: false,
                //         translateY: 0,
                //         itemWidth: 100,
                //         itemHeight: 12,
                //         itemsSpacing: 0,
                //         symbolSize: 10,
                //         translateX: -35,
                //         itemDirection: "left-to-right",
                //     },
                // ]}
            />
        );
    };

    return (
        <>
            <DonutContainer>
                <Typography style={{ fontSize: "1.2em",textAlign: "center" }}>
                    {title}
                </Typography>
                        <div style={{ height: 210, margin: "auto", textAlign: 'center' }}>
                            {statusCode === 0 && (
                                <Loadgif width={'250px'} height={'250px'}/>
                            )}
                            {statusCode === 204 && <div>Sem dados disponíveis</div>}
                            {data &&
                                (statusCode === 200 || statusCode === 201) &&
                                PieRender(data)
                            }
                        </div>
            </DonutContainer>
        </>
    );
}

export default memo(GenericDonut);
