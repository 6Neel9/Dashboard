import React from 'react'
import { SlArrowDown, SlArrowUp } from "react-icons/sl";


const MediumCard = ({ props }: any) => {
  return (
    <div className="container mediumContainer smallMargin mediumPadding extraSmallText">
      <h1 className=" textStyle mediumText smallPadding">{props.title.toUpperCase()}</h1>
      <div className="textStyle smallPadding ">
        {props.duration.toLowerCase()}
      </div>
      <div className="largeText textStyle smallPadding mediumWeightText">
        {props.value.toUpperCase()}
      </div>
      {props.icon && <div >

        {props.icon === "positive" ?
          <h1 className="percent smallPadding percentIncrease"><SlArrowUp className="percentIcon" /> {props.percent}%</h1> :
          <h1 className="percent smallPadding percentDecrease"><SlArrowDown className="percentIcon" /> {props.percent}%</h1>
        }
      </div>}

    </div>
  )
}

export default MediumCard