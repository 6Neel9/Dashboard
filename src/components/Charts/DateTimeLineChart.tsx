import React from 'react';
import {
    AxisModel, ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LegendSettingsModel, ZoomSettingsModel,
    Legend, DateTime, Tooltip, DataLabel, AreaSeries, Zoom, ColumnSeries, LineSeries
}
    from '@syncfusion/ej2-react-charts';
    import { useStateContext } from '../../contexts/ContextProvider';



const DateTimeLineChart = ({chartData,props}: any) => {
    const { currentMode } = useStateContext();
    const primaryxAxis: AxisModel = { valueType: 'DateTime', zoomFactor: 0.1, zoomPosition: 0.9 };
    var primaryyAxis:AxisModel={   
        minimum: props.min/1.05, maximum: props.max*1.05    
 
     };
    const legendSettings: LegendSettingsModel = { visible: false };
    const zoomSettings: ZoomSettingsModel = {  enablePan: true ,enableMouseWheelZooming: true};
    const border = { width: 0.5, color: '#00bdae' };
    const tooltip = { enable: true };
    const animation = { enable: false };
    const marker = {
        visible: true,
        height: 3, width: 3,
        dataLabel: { visible: false ,font: { color: currentMode==="Dark"? "white": "black", fontWeight: "500" } }
      };
    return (
        <div className='w-full p-1'>
            <ChartComponent 
                primaryXAxis={primaryxAxis}
                primaryYAxis={primaryyAxis}
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
