import React from "react";
import "../../Styles.scss";
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { BsInfoCircle } from 'react-icons/bs';


function SmallCardWithChart({ props, chart }: any) {
  let style: object = {
    display: 'inline-block',
    padding: '5px'
};
  return (
    <div
      className={`smallCardWithChartContainer`}
    >
      <div>
        <h1 className="smallCardWithChartTitleText">
          {props.title.toUpperCase()}<TooltipComponent width="300px" isSticky={false} content={props.content} position={props.position} opensOn='Click' style={style} ><BsInfoCircle className='m-0 p-0' /></TooltipComponent>
        </h1>
        <div className="smallCardWithChartDurationText">
          {props.duration.toLowerCase()}
        </div>
      </div>
      <div>
        <div className="smallCardWithChartChartContainer">
          {chart}
        </div>
      </div>
    </div>
  );
}

export default SmallCardWithChart;
