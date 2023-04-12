import React from 'react';
import { SparklineComponent, Inject, SparklineTooltip } from '@syncfusion/ej2-react-charts';

type PropType = {
  id?: string | undefined,
  height?: string | undefined,
  width?: string | undefined,
  color?: string | undefined,
  data?: Object[] | undefined,
  type?: "Line" | "Column" | "WinLoss" | "Pie" | "Area" | undefined,
  currentColor?: string | undefined
}



const SparkLine = ({ id, height, width, color, data, type, currentColor }: PropType) => {

  return (
    <SparklineComponent
      id={id}
      height={height}
      width={width}
      lineWidth={1}
      valueType="Numeric"
      fill={color}
      border={{ color: currentColor, width: 2 }}
      tooltipSettings={{
        visible: true,
        // eslint-disable-next-line no-template-curly-in-string
        format: '${x} : data ${yval}',
        trackLineSettings: {
          visible: true,
        },
      }}
      markerSettings={{ visible: ['All'], size: 2.5, fill: currentColor }}
      dataSource={data}
      xName="x"
      yName="yval"
      type={type}
    >
      <Inject services={[SparklineTooltip]} />
    </SparklineComponent>
  );
}


export default SparkLine;
