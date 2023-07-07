import React from 'react';
import {
    AxisModel, ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LegendSettingsModel, ZoomSettingsModel,
    Legend, DateTime, Tooltip, DataLabel, AreaSeries, Zoom, ColumnSeries, LineSeries
}
    from '@syncfusion/ej2-react-charts';
    import { useStateContext } from '../../contexts/ContextProvider';



const DateTimeLineChart = ({chartData}: any) => {
    const { currentMode } = useStateContext();
    const primaryxAxis: AxisModel = { valueType: 'DateTime', zoomFactor:0.2 };
    const legendSettings: LegendSettingsModel = { visible: false };
    const zoomSettings: ZoomSettingsModel = {  enablePan: true ,enableMouseWheelZooming: true};
    const border = { width: 0.5, color: '#00bdae' };
    const tooltip = { enable: true };
    const animation = { enable: false };
    const zoomData: Object[] = [
        { x: new Date(2016, 0, 1), y: 7.1 }, { x: new Date(2016, 1, 1), y: 3.7 },
        { x: new Date(2016, 2, 1), y: 0.8 }, { x: new Date(2016, 3, 1), y: 6.3 },
        { x: new Date(2016, 4, 1), y: 13.3 }, { x: new Date(2016, 5, 1), y: 18.0 },
        { x: new Date(2016, 6, 1), y: 19.8 }, { x: new Date(2016, 7, 1), y: 18.1 },
        { x: new Date(2016, 8, 1), y: 13.1 }, { x: new Date(2016, 9, 1), y: 4.1 },
        { x: new Date(2016, 10, 1), y: -3.8 }, { x: new Date(2016, 11, 1), y: -6.8 }
    ];
    const marker = {
        visible: true,
        height: 3, width: 3,
        dataLabel: { visible: false ,font: { color: currentMode==="Dark"? "white": "black", fontWeight: "500" } }
      };
    return (
        <div className='w-full p-1'>
            <ChartComponent 
                primaryXAxis={primaryxAxis}
                legendSettings={legendSettings}
                zoomSettings={zoomSettings}
                tooltip={tooltip}
                // width='800vw'
                height='50%'
                >
                <Inject services={[ColumnSeries, LineSeries, Legend, Tooltip, DataLabel, Zoom, DateTime]} />
                <SeriesCollectionDirective>
                    <SeriesDirective dataSource={chartData} xName='x' yName='y'  width={1} type='Line' fill='#D6CDE9' marker={marker}
                        border={border} animation={animation}>
                    </SeriesDirective>
                </SeriesCollectionDirective>
            </ChartComponent>
        </div>
    )
}

export default DateTimeLineChart
