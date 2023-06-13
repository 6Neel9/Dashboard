import React from 'react'
import { SlArrowDown, SlArrowUp } from "react-icons/sl";


const MediumCard = ({ props }: any) => {
  return (
    <div className="container activeTrip-Time bg-flow_blue   h-fit m-2.5 w-3/5 p-5 rounded-2xl border-1 border-[#8b7da9] shadow-md shadow-[#8b7da9]">
      <h1 className="text-2xl p-2">{props.title.toUpperCase()}</h1>
      <div className="values p-2">
        {props.duration.toUpperCase()}
      </div>
      <div className="time text-5xl p-2 font-medium">
        {props.value.toUpperCase()}
      </div>
      {props.icon && <div className="per-change p-2">

        {props.icon === "positive" ?
          <h1 className="inline-block bg-green text-green-600"><SlArrowUp className="inline-block" /> {props.percent}%</h1> :
          <h1 className="inline-block bg-red text-red-600"><SlArrowDown className="inline-block" /> {props.percent}%</h1>
        }
      </div>}

    </div>
  )
}

export default MediumCard
