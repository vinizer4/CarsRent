import React, {memo, useEffect, useState} from 'react';
import {IChartModelTValues} from './types';
import {randomColor, setOpacity} from '../../../utils/generators';
import {formatCurrency} from '../../../utils/utils';
import Typography from '../../CustomText/Typhography';
import {LineContainer} from './styles';
import Loadgif from '../../../assets/Loadgif';
import { ResponsiveLine, Serie } from '@nivo/line'
import { BasicTooltip } from "@nivo/tooltip";

type props = {
    dataFiltro: any;
    chartData?: Array<any>;
    title: string;
    // customTooltip?: React.FunctionComponent<BarTooltipProps<DefaultRawDatum>>;
    render: any;
    statusCode: number;
};

function LineTV({
                    dataFiltro,
                    chartData,
                    title,
                    render,
                    statusCode,
                }: props) {
    const [data, setData] = useState<Array<IChartModelTValues>>();
    const [isLoading, setIsLoading] = useState(false);

    async function handleData() {
        setIsLoading(true);
        if (chartData) {
            setData(chartData);
            setIsLoading(false);
        } else {
            setData(undefined);
        }
        if (statusCode === 204) setIsLoading(false);
    }

    useEffect(() => {
        handleData();
    }, [dataFiltro, chartData, statusCode]);

    const BarRender = (dataGraph: Array<IChartModelTValues>) => {
        var sliceCount = 0;
        return (
            <ResponsiveLine
                data={data as unknown as Serie[]}
                margin={{top: 30, right: 110, bottom: 20, left: 80}}
                pointLabelYOffset={-12}
                lineWidth={3}
                enableArea={true}
                enablePoints={true}
                pointSize={10}
                pointBorderWidth={3}
                colors={(e) => {
                    var element = dataGraph.find((ele) => e.indexValue === ele.id);
                    var n = sliceCount;
                    sliceCount++;
                    if (element && element.filtered) {
                        return setOpacity(randomColor(n), 0.3);
                    } else {
                        return randomColor(n);
                    }
                }}
                tooltip={(point) => (
                    <>
                        <BasicTooltip id={title} value={point.point.data.x}/>
                        <BasicTooltip
                            id={point.point.serieId}
                            value={formatCurrency(Number(point.point.data.y))}
                        />
                    </>
                )
                }
                pointColor="#ffffff"
                pointBorderColor={{from: 'serieColor'}}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        );
    };
    return (
        <>
            <LineContainer>
                <Typography
                    style={{fontSize: '1.2em', textAlign: 'center'}}
                >
                    {title}
                </Typography>
                <div style={{height: 210, margin: 'auto', textAlign: 'center'}}>
                    {isLoading && (
                        <Loadgif width={'250px'} height={'250px'}/>
                    )}
                    {(statusCode !== 200 || statusCode !== 200) &&
                    !isLoading ? (
                        <div>Sem dados disponíveis</div>
                    ) : (data && !isLoading && BarRender(data))}
                </div>
            </LineContainer>
        </>
    );
}

export default  LineTV;
