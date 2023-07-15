import React from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel, AxisModel, Zoom, Crosshair, Selection, LegendSettingsModel, TooltipSettingsModel } from '@syncfusion/ej2-react-charts';
import { barCustomSeries, barPrimaryXAxis, barPrimaryYAxis } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';
import "../../Styles.scss"

const Bar = React.memo(({ xTitle, yTitle, columnData, minMax, Chart_name }: any) => {
  const { currentMode } = useStateContext();

  const primaryxAxis: AxisModel = {
    valueType: 'Category', title: xTitle, titleStyle: {
      size: '16px', color: currentMode === "Dark" ? "white" : "black", fontWeight: "500"
    }
  };
  const primaryyAxis: AxisModel = {
    minimum: minMax.min * 0.99, maximum: minMax.max * 1.01, title: yTitle, titleStyle: {
      size: '16px', color: currentMode === "Dark" ? "white" : "black", fontWeight: "500"
    }
  };
  const legendSettings: LegendSettingsModel = { visible: true, position: 'Bottom', alignment: 'Center', textStyle: { color: currentMode === "Dark" ? "white" : "black", fontWeight: "500" } };
  const tooltip: TooltipSettingsModel = { enable: true };

  const marker = {
    visible: true,
    height: 10,
    width: 10,
    dataLabel: { visible: true, font: { color: currentMode === "Dark" ? "white" : "black", fontWeight: "500" } }
  };

  return (
    <div className="widthFull mainBackground">
      <ChartComponent
        height='50%'
        primaryXAxis={primaryxAxis}
        primaryYAxis={primaryyAxis}
        legendSettings={legendSettings}
        tooltip={tooltip}
      >
        <Inject services={[ColumnSeries, Legend, Tooltip, DataLabel, Category]} />
        <SeriesCollectionDirective>
          <SeriesDirective dataSource={columnData} xName={xTitle} yName={yTitle} fill='#D6CDE9' type='Column' marker={marker} name={Chart_name}>
          </SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
});

export default Bar;
