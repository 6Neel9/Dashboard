import React from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Legend, Tooltip, AxisModel, ColumnSeries, Category, ChartSeriesType, DataLabel, LegendSettingsModel } from '@syncfusion/ej2-react-charts';
import { useStateContextDisplay } from '../../contexts/DisplayContextProvider';

const LineChart = React.memo(({ primary_XAxis, primary_YAxis, data, x_name, y_name, chart_name }: { primary_XAxis?: AxisModel | undefined, primary_YAxis?: AxisModel | undefined, data?: any[] | undefined, x_name?: string, y_name?: string, chart_name?: string }) => {
  const { currentMode } = useStateContextDisplay();

  const marker = {
    visible: true,
    height: 10, width: 10,
    dataLabel: { visible: true, font: { color: currentMode === "Dark" ? "white" : "black", fontWeight: "500" } }
  };

  return (
    <ChartComponent primaryXAxis={primary_XAxis} height="50%" width='800vw'>
      <Inject services={[ColumnSeries, Tooltip, LineSeries, Category, DataLabel, DateTime, Legend]} />
      <SeriesCollectionDirective>
        <SeriesDirective dataSource={data} xName={x_name} yName={y_name} name={chart_name} width={3} type='Line' fill='#D6CDE9' marker={marker} />
      </SeriesCollectionDirective>
    </ChartComponent>
  );
});

export default LineChart;
