import React from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel, AxisModel, Zoom, Crosshair, Selection } from '@syncfusion/ej2-react-charts';
import { barCustomSeries, barPrimaryXAxis, barPrimaryYAxis } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';
import "../../Styles.scss"




const Bar = ({xTitle, yTitle ,columnData ,minMax} : any) => {
  const { currentMode } = useStateContext();

  // return (
  //     <div className="widthFull mainBackground">
  //       <ChartComponent
  //         height='50%'
  //         primaryXAxis={barPrimaryXAxis}
  //         primaryYAxis={barPrimaryYAxis}
  //         chartArea={{ border: { width: 0 } }}
  //         tooltip={{ enable: true }}
  //         background={currentMode === 'Dark' ? '#2C1F39' : '#ffffff'}
  //     legendSettings={{ background: currentMode === 'Dark' ? '#2C1F39' : '#ffffff' }}
  //       >
  //         <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]} />
  //         <SeriesCollectionDirective>
  //           {/* eslint-disable-next-line react/jsx-props-no-spreading */}
  //           {barCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
  //         </SeriesCollectionDirective>
  //       </ChartComponent>
  //     </div>
  // );

  const primaryxAxis: AxisModel = { valueType: 'Category', title: xTitle ,  titleStyle: {
    size: '16px', color: currentMode==="Dark"? "white": "black", fontWeight: "500" }};
  const primaryyAxis: AxisModel = { minimum:minMax.min*0.99, maximum:minMax.max*1.01, title: yTitle ,titleStyle: {
    size: '16px', color: currentMode==="Dark"? "white": "black", fontWeight: "500" }};

  //  const columnData = [
  //   { state: 'Maharashtra', revenue: 65000 },
  //   { state: 'Uttar Pradesh', revenue: 48000 },
  //   { state: 'Karnataka', revenue: 75000 },
  //   { state: 'Gujarat', revenue: 58000 },
  //   { state: 'Tamil Nadu', revenue: 68000 },
  //   { state: 'Rajasthan', revenue: 52000 },
  //   { state: 'West Bengal', revenue: 45000 }
  // ];
  const marker = {
    visible: true,
    height: 10, 
    width: 10,
    dataLabel: { visible: true ,font: { color: currentMode==="Dark"? "white": "black", fontWeight: "500" } }
  };
  

  return (
    <div className="widthFull mainBackground">
      <ChartComponent
        height='50%'
        primaryXAxis={primaryxAxis}
        primaryYAxis={primaryyAxis}
        >
        <Inject services={[ColumnSeries, Legend, Tooltip, DataLabel, Category]} />
        <SeriesCollectionDirective>
          <SeriesDirective dataSource={columnData} xName={xTitle} yName={yTitle} fill='#D6CDE9'  type='Column' marker={marker}>
          </SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>)
};

export default Bar;



