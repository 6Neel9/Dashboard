import React from "react";
import "../../Styles.scss";
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { BsInfoCircle } from 'react-icons/bs';

function SmallCardFormatter({ props }: any) {
  let style: object = {
    display: 'inline-block',
    padding: '5px'
};
  return (
    <div
      className={` h-${props.height} smallCardFormatterContainer`}
    >
      <div>
        <h1 className="smallCardFormatterTitleText">
          {props.title.toUpperCase()}<TooltipComponent width="300px" isSticky={false} content={props.content} position={props.position} opensOn='Click' style={style} ><BsInfoCircle className='m-0 p-0' /></TooltipComponent>
        </h1>

      </div>
      <div>
        <div className="smallCardFormatterValueText">
          {props.value.toUpperCase()}
        </div>
        <div className="smallCardFormatterDurationText">
          {props.duration.toLowerCase()}
        </div>
      </div>
    </div>
  );
}

export default SmallCardFormatter;
