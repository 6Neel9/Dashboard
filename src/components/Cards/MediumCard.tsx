import React from 'react'
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import "../../Styles.scss"
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { BsInfoCircle } from 'react-icons/bs';
import Loading from '../Loading';


const MediumCard = ({ props }: any) => {
  let style: object = {
    display: 'inline-block',
    padding: '5px'
  };
  return (
    <div className="mediumCardContainer">
      {props.value === "₹ 0" || props.value === "0" ? <Loading /> : <><h1 className="mediumCardTitleText">{props.title.toUpperCase()} <TooltipComponent width="300px" isSticky={false} content={props.content} position={props.position} opensOn='Click' style={style}><BsInfoCircle className='m-0 p-0' /></TooltipComponent></h1><div className="mediumCardDurationText">
        {props.duration.toLowerCase()}
      </div><div className="mediumCardValueText">
          {props.value.toUpperCase()}
        </div>
        {props.percent && <div>
          {Number(props.percent) === 0 ? <h1 className="mediumCardNeutral">0%</h1> : props.percent > 0 ?
            <h1 className="mediumCardPositive"><SlArrowUp className="percentIcon" /> {Number(props.percent).toFixed(2)}%</h1> :
            <h1 className="mediumCardNegative"><SlArrowDown className="percentIcon" /> {String(Number(props.percent).toFixed(2)).slice(1)}%</h1>
          }

        </div>}</>}
    </div>
  )
}

export default MediumCard