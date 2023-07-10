import React from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Legend, Tooltip, AxisModel, ColumnSeries, Category, ChartSeriesType, DataLabel, LegendSettingsModel } from '@syncfusion/ej2-react-charts';

// import { lineCustomSeries, LinePrimaryXAxis, LinePrimaryYAxis } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';

const LineChart = ({ primary_XAxis, primary_YAxis, data, x_name, y_name, chart_name }: { primary_XAxis?: AxisModel | undefined, primary_YAxis?: AxisModel | undefined, data?: any[] | undefined, x_name?: string, y_name?: string, chart_name?: string }) => {
  const { currentMode } = useStateContext();
  // const primaryXAxis = {...LinePrimaryXAxis};
  // const primaryYAxis = {...LinePrimaryYAxis};

  // const legendSettings:LegendSettingsModel = { visible: true, position: 'Top' };

  const marker = {
    visible: true,
    height: 10, width: 10,
    dataLabel: { visible: true ,font: { color: currentMode==="Dark"? "white": "black", fontWeight: "500" } }
  };

  return (
    // <ChartComponent
    //   height="50%"
    //   width='800vw'
    //   primaryXAxis ={primary_XAxis }
    //   // primaryYAxis={primary_YAxis}
    //   chartArea={{ border: { width: 0 } }}
    //   tooltip={{ enable: true }}
    //   background={currentMode === 'Dark' ? '#2C1F39' : '#ffffff'}
    //   legendSettings={{ background: currentMode === 'Dark' ? '#2C1F39' : '#ffffff' }}
    // >
    //   <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
    //   <SeriesCollectionDirective>
    //     {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    //     <SeriesDirective dataSource={data} xName={x_name} yName={y_name} name={chart_name} />
    //   </SeriesCollectionDirective>
    // </ChartComponent>

    <ChartComponent primaryXAxis={primary_XAxis}   height="50%" width='800vw'>
      <Inject services={[ColumnSeries, Tooltip, LineSeries, Category, DataLabel, DateTime, Legend]} />
      <SeriesCollectionDirective>
        <SeriesDirective dataSource={data} xName={x_name} yName={y_name} name={chart_name} width={3} type='Line' fill='#D6CDE9' marker={marker} />
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineChart;
