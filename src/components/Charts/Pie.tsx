
import * as React from 'react';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective } from '@syncfusion/ej2-react-charts';


const Pie: React.FC = () => {
  const data = [
    { x: 'Jan', y: 3, text: 'Jan: 3' }, { x: 'Feb', y: 3.5, text: 'Feb: 3.5' },
    { x: 'Mar', y: 7, text: 'Mar: 7' }, { x: 'Apr', y: 13.5, text: 'Apr: 13.5' },
    { x: 'May', y: 19, text: 'May: 19' }, { x: 'Jun', y: 23.5, text: 'Jun: 23.5' },
    { x: 'Jul', y: 26, text: 'Jul: 26' }, { x: 'Aug', y: 25, text: 'Aug: 25' },
    { x: 'Sep', y: 21, text: 'Sep: 21' }, { x: 'Oct', y: 15, text: 'Oct: 15' }
  ];
  return (
    <AccumulationChartComponent height='50%' width='50%'>
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective dataSource={data} xName='x' yName='y' radius='100%' />
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>)
}

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
