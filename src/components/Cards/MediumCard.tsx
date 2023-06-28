import React from 'react'
import { SlArrowDown, SlArrowUp } from "react-icons/sl";


const MediumCard = ({ props }: any) => {
  return (
    <div className="container mediumContainer smallMargin mediumPadding mainShadow">
      <h1 className=" textStyle normalText smallPadding extraSmallText">{props.title.toUpperCase()}</h1>
      <div className="textStyle smallPadding ">
        {props.duration.toLowerCase()}
      </div>
      <div className="largeText textStyle paddingTopSmall mediumWeightText extraBoldWeightText">
        {props.value.toUpperCase()}
      </div>
      {props.icon && <div >

        {props.icon === "positive" ?
          <h1 className="percent paddingTopSmall percentIncrease"><SlArrowUp className="percentIcon" /> {props.percent}%</h1> :
          <h1 className="percent paddingTopSmall percentDecrease"><SlArrowDown className="percentIcon" /> {props.percent}%</h1>
        }
      </div>}

    </div>
  )
}

export default MediumCard