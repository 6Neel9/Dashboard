import React from 'react'

import { Card, Title, LineChart } from "@tremor/react";



// const chartdata = [
    
   
//     { driver: 'Rajesh', revenue: 35000 },
//     { driver: 'Amit', revenue: 34000 },
//     { driver: 'Suresh', revenue: 33000 },
//     { driver: 'Vikram', revenue: 32000 },
//     { driver: 'Deepak', revenue: 31000 },
//     { driver: 'Rohit', revenue: 30000 },
//     { driver: 'Neha', revenue: 29000 },
//     { driver: 'Priya', revenue: 28000 },
//     { driver: 'Manish', revenue: 27500 },
//     { driver: 'Pooja', revenue: 27000 }

// ];

const dataFormatter = (number: number) => `${Intl.NumberFormat("us").format(number).toString()}%`;



const LineChartTremor = ({chartData}: any) => {
    return (
        <div >
                {/* <Title>Export/Import Growth Rates (1970 to 2021)</Title> */}
                <LineChart
                    style={{height:"45vh"}}
                    className="mt-6 bg-main-bg dark:bg-flow_blue dark:text-white"
                    data={chartData}
                    index="Date"
                    categories={["Revenue"]}
                    colors={["emerald", "gray"]}
                    // valueFormatter={dataFormatter}
                    yAxisWidth={40}
                />
        </div>
    )
}

export default LineChartTremor







