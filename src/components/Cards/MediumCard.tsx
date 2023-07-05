import React from 'react'
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import "../../Styles.scss"


const MediumCard = ({ props }: any) => {
  return (
    <div className="mediumCardContainer">
      <h1 className="mediumCardTitleText">{props.title.toUpperCase()}</h1>
      <div className="mediumCardDurationText">
        {props.duration.toLowerCase()}
      </div>
      <div className="mediumCardValueText">
        {props.value.toUpperCase()}
      </div>
      {props.percent && <div>
        {Number(props.percent) === 0 ? <h1 className="mediumCardNeutral">0%</h1> : props.percent > 0 ?
          <h1 className="mediumCardPositive"><SlArrowUp className="percentIcon" /> {Number(props.percent).toFixed(2)}%</h1> :
          <h1 className="mediumCardNegative"><SlArrowDown className="percentIcon" /> {String(Number(props.percent).toFixed(2)).slice(1)}%</h1>
        }

      </div>}

    </div>
  )
}

export default MediumCard