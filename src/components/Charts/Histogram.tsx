import React from 'react';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Category,
  Tooltip,
  ColumnSeries,
  Inject,
} from '@syncfusion/ej2-react-charts';
import "../../Styles.scss"

const histogramData = [
  { x: 'Category 1', y: 10 },
  { x: 'Category 2', y: 20 },
  { x: 'Category 3', y: 30 },
  { x: 'Category 4', y: 40 },
  { x: 'Category 5', y: 50 },
  { x: 'Category 6', y: 60 },
];

const Histogram: React.FC = () => {
  return (
    <div className="widthFull mainBackground">
      <ChartComponent primaryXAxis={{ valueType: 'Category' }} title="Histogram Chart">
        <Inject services={[ColumnSeries, Tooltip, Category]} />
        <SeriesCollectionDirective>
          <SeriesDirective type="Column" dataSource={histogramData} fill='#D6CDE9' xName="x" yName="y">
          </SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default Histogram;
