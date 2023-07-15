import React from 'react';
import {
  AxisModel, ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ChartTheme, LegendSettingsModel, TooltipSettingsModel,
  Legend, Category, Tooltip, ColumnSeries, ILoadedEventArgs, DataLabel, HistogramSeries, ZoomSettingsModel
} from '@syncfusion/ej2-react-charts';
import { useStateContext } from '../../contexts/ContextProvider';

const HistogramLine = React.memo(({ histogramProps }: any) => {
  const { currentMode } = useStateContext();
  const { chartData, yName, chartName, xAxisTitle, yAxisTitle } = histogramProps;

  const primaryxAxis: AxisModel = {
    majorGridLines: { width: 0 },
    title: xAxisTitle,
    titleStyle: { size: '16px', color: currentMode === "Dark" ? "white" : "black", fontWeight: "500" }
  };

  const primaryyAxis: AxisModel = {
    title: yAxisTitle,
    majorTickLines: { width: 0 },
    lineStyle: { width: 0 },
    titleStyle: { size: '16px', color: currentMode === "Dark" ? "white" : "black", fontWeight: "500" }
  };

  const legendSettings: LegendSettingsModel = {
    visible: true,
    position: 'Bottom',
    alignment: 'Center',
    textStyle: { color: currentMode === "Dark" ? "white" : "black", fontWeight: "500" }
  };

  const tooltipsettings: TooltipSettingsModel = { enable: true };

  const marker = { dataLabel: { visible: false, font: { color: currentMode === "Dark" ? "white" : "black", fontWeight: "500" } } };

  return (
    <div className='widthFull mainBackground'>
      <ChartComponent
        primaryXAxis={primaryxAxis}
        primaryYAxis={primaryyAxis}
        tooltip={tooltipsettings}
        legendSettings={legendSettings}
        height='50%'
      >
        <Inject services={[HistogramSeries, Legend, Tooltip, Category, DataLabel]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={chartData}
            yName={yName}
            name={chartName}
            type='Histogram'
            marker={marker}
            showNormalDistribution={true}
            showMean={true}
            fill='#D6CDE9'
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
});

export default HistogramLine;
