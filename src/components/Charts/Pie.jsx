
import React from 'react';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, AccumulationDataLabel, AccumulationTooltip, AccumulationLegend } from '@syncfusion/ej2-react-charts';
import "../../Styles.scss";
import { useStateContextDisplay } from '../../contexts/DisplayContextProvider';

const Pie = ({ h, w, data, Chart_name }) => {
  const { currentMode } = useStateContextDisplay();
  const legendSettings = { visible: true, position: 'Bottom', alignment: 'Center', textStyle: { color: currentMode === "Dark" ? "white" : "black", fontWeight: "500" } };
  const datalabel = { visible: true, name: 'text', position: 'Outside', font: { color: currentMode === "Dark" ? "white" : "black", fontWeight: "500" } };
  
  return (
    <AccumulationChartComponent height={h} width={w} className='mainText' tooltip={{ enable: true }} legendSettings={legendSettings}>
      <Inject services={[AccumulationDataLabel, AccumulationLegend, AccumulationTooltip]} />
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective dataSource={data} xName='x' yName='y' radius='100%' pointColorMapping='fill' dataLabel={datalabel} name={Chart_name} />
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
  );
};

export default Pie;












// import React from 'react';
// import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationLegend, PieSeries, AccumulationDataLabel, Inject, AccumulationTooltip } from '@syncfusion/ej2-react-charts';

// import { useStateContext } from '../../contexts/ContextProvider';


// type PieType = {
//   id?: string | undefined,
//   data?: Object | undefined,
//   legendVisiblity?: boolean | undefined,
//   height?: string | undefined
// }
// const Pie = ({ id, data, legendVisiblity, height }: PieType) => {
//   const { currentMode } = useStateContext();

//   return (
//     <AccumulationChartComponent
//       legendSettings={{ visible: legendVisiblity, background: 'white' }}
//       height={height}
//       background={currentMode === 'Dark' ? '#33373E' : '#fff'}
//       tooltip={{ enable: true }}
//     >
//       <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip]} />
//       <AccumulationSeriesCollectionDirective>
//         <AccumulationSeriesDirective
//           name="Sale"
//           dataSource={data}
//           xName="x"
//           yName="y"
//           innerRadius="40%"
//           startAngle={0}
//           endAngle={360}
//           radius="70%"
//           explode
//           explodeOffset="10%"
//           explodeIndex={2}
//           dataLabel={{
//             visible: true,
//             name: 'text',
//             position: 'Inside',
//             font: {
//               fontWeight: '600',
//               color: '#fff',
//             },
//           }}
//         />
//       </AccumulationSeriesCollectionDirective>
//     </AccumulationChartComponent>
//   );
// };

// export default Pie;
