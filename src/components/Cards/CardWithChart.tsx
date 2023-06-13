import React from 'react'
import { SlArrowDown, SlArrowUp } from "react-icons/sl";


const CardWithChart = ({ prop1, prop2, chart }: any) => {
    return (
        <div className="container h-fit m-2.5  text-left justify-between grid grid-cols-3 divide-x w-full">
            <div className="p2  mr-5">
                <div className="flex justify-between mb-10">
                    <div className=" text-2xl values p-2 text-left" >
                        {prop2.title}
                    </div>

                    <div className="values p-2 text-left" >
                        {prop2.duration}
                    </div>
                </div>
                <div className="time text-6xl p-2 font-medium " >
                    {prop2.value}
                </div>
                <div className="per-change">
                    {prop2.icon === "positive" ?
                        <h1 className="inline-block bg-green text-green-600"><SlArrowUp className="inline-block" /> {prop2.percent}%</h1> :
                        <h1 className="inline-block bg-red text-red-600"><SlArrowDown className="inline-block" /> {prop2.percent}%</h1>
                    }
                </div>
            </div>
            <div className="p1 ml-3 col-span-2">
                <div className="flex justify-between ml-5">
                <h1 className="text-2xl  chart-name">{prop1.title}</h1>
                <h4 className="values text-right" >
                    {prop1.duration}
                </h4>
                </div>

                <div className="chart text-center ml-10  flex justify-center">{chart}</div>
            </div>


        </div>
    )
}

export default CardWithChart