import React from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Legend, Tooltip, AxisModel } from '@syncfusion/ej2-react-charts';

import { lineCustomSeries, LinePrimaryXAxis, LinePrimaryYAxis } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';

const LineChart = ({primary_XAxis,primary_YAxis}: {primary_XAxis?:AxisModel | undefined ,primary_YAxis?:AxisModel | undefined}) => {
  const { currentMode } = useStateContext();
  // const primaryXAxis = {...LinePrimaryXAxis};
  // const primaryYAxis = {...LinePrimaryYAxis};
  

  return (
    <ChartComponent
      id="line-chart"
      height="50%"
      primaryXAxis ={primary_XAxis }
      primaryYAxis={primary_YAxis}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === 'Dark' ? '#2C1F39' : '#2C1F39'}
      legendSettings={{ background: '#2C1F39' }}
    >
      <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {lineCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineChart;
