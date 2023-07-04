import React from 'react';
import "../Styles.scss"

const ChartsHeader = ({ category, title }: {category?:string, title?:string}) => (
  <div className="chartHeadersContainer">
    <div>
      <p className="chartHeadersChartTitle">Chart</p>
      <p className="chartHeadersCategoryText">{category}</p>
    </div>
    <p className="chartHeadersTitleText">{title}</p>
  </div>
);

export default ChartsHeader;
