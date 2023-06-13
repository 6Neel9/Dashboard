import React from 'react'
import { SlArrowDown, SlArrowUp } from "react-icons/sl";


const SmallCard = ({ props }: any) => {
    return (
        <div className={`container activeTrip-Time bg-[#2C1F39] h-${props.height} m-2.5 w-2/5 p-5 rounded-2xl border-1 border-[#8b7da9] shadow-lg shadow-[#8b7da9]`}>
            <h1 className="text-2xl p-2">{props.title}</h1>
            <div className="values p-2">
                {props.duration}
            </div>
            <div className="time text-5xl p-2 font-medium">
                {props.value}
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

export default SmallCard
