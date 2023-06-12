import React from 'react'

const ChartCard = ({prop, chart}:any) => {
  return (
    <div className="container activeTrip-Time bg-[#2C1F39] h-fit m-2.5 p-5 border-1 border-[#8b7da9] shadow-lg shadow-[#8b7da9]  rounded-2xl text-left justify-between  w-full ">
    <div className="p1 ml-3 ">
                <div className="flex justify-between ml-5">
                <h1 className="text-xl p-2 chart-name">{prop.title}</h1>
                <h4 className="values p-2 text-right" >
                    {prop.duration}
                </h4>
                </div>
                <div className="chart text-2xl text-center ml-10 mt-5 flex justify-center">{chart}</div>
            </div>
    </div>
  )
}

export default ChartCard
