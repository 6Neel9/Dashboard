import React from 'react';
import {
  AxisModel, ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LegendSettingsModel, ZoomSettingsModel,
  Legend, DateTime, Tooltip, DataLabel, AreaSeries, Zoom, ColumnSeries, LineSeries ,Category
} from '@syncfusion/ej2-react-charts';
import { useStateContext } from '../../contexts/ContextProvider';
import Loading from '../Loading';

const DateTimeLineChart = React.memo(({ chartData, props, chart_name ,chartType }: any) => {
  const { currentMode } = useStateContext();
  const typeAll = (chartType === 'Category' ?'Category' : 'DateTime');
  const injectServiceChartType =  (chartType === 'Category' ? Category : DateTime);
  const primaryxAxis: AxisModel = { valueType:typeAll, zoomFactor: 0.1, zoomPosition: 0.9,intervalType: 'Days' };
  const primaryyAxis: AxisModel = {
    minimum: props.min / 1.05, maximum: props.max * 1.05
  };
  const legendSettings: LegendSettingsModel = { visible: true, position: 'Bottom', alignment: 'Center', textStyle: { color: currentMode === "Dark" ? "white" : "black", fontWeight: "500" } };
  const zoomSettings: ZoomSettingsModel = { enablePan: true, enableMouseWheelZooming: true };
  const border = { width: 0.5, color: '#00bdae' };
  const tooltip = { enable: true };
  const animation = { enable: false };
  const marker = {
    visible: true,
    height: 3, width: 3,
    dataLabel: { visible: false, font: { color: currentMode === "Dark" ? "white" : "black", fontWeight: "500" } }
  };

  return (
    <div className='w-full p-1'>
      {chartData.length === 0 ? <div><Loading /> </div> : <ChartComponent
        primaryXAxis={primaryxAxis}
        primaryYAxis={primaryyAxis}
        legendSettings={legendSettings}
        zoomSettings={zoomSettings}
        tooltip={tooltip}
        height='50%'
      >
        <Inject services={[ColumnSeries, LineSeries, Legend, Tooltip, DataLabel, Zoom, injectServiceChartType]} />
        <SeriesCollectionDirective>
          <SeriesDirective dataSource={chartData} xName='x' yName='y' width={1} type='Line' fill='#D6CDE9' marker={marker} name={chart_name}
            border={border} animation={animation}>
          </SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>}
    </div>
  );
});

export default DateTimeLineChart;
