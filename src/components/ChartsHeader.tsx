import React from 'react';
import "../Styles.css"

const ChartsHeader = ({ category, title }: {category?:string, title?:string}) => (
  <div className="marginBottomLarge">
    <div>
      <p className="textLarge textLarge">Chart</p>
      <p className="text3XLarge extraBoldWeightText trackingTight mainText">{category}</p>
    </div>
    <p className="textCenter mainText textXLarge marginBottomXS marginTopSmall">{title}</p>
  </div>
);

export default ChartsHeader;
