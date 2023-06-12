import React from 'react'
import { Filters, SmallCard, CardWithChart, ChartCard, LineChart, Bar } from '../components'


type CardPropType = {
    title?: string,
    duration?: string,
    value?: string,
    icon?: string,
    percent?: string,
    height?: string,
}

const SmallCardProps1: CardPropType = {
    title: "AVERAGE TRIP DURATION",
    duration: "Last 7 days",
    value: "14 min",
    icon: "positive",
    percent: "2.45",
}

const CardWithChartProp1: CardPropType = {
    title: "TOTAL TRIPS",
    duration: "Last 7 days",
}

const CardWithChartProp2: CardPropType = {
    title: "TOTAL TRIPS",
    duration: "Last 7 days",
    value: "1126",
    icon: "positive",
    percent: "2.35",
}

const ChartCardProps: CardPropType = {
    title: "TRIP DURARION",
    duration: "Last 7 days",
}




const TripAnalytics = () => {
    return (
        <div className="m-2 text-[#FEFEFA]">
            <Filters />
            <div className="main-container-2 flex text-left w-full ">
                <CardWithChart prop1={CardWithChartProp1} prop2={CardWithChartProp2} chart={<Bar />} />
            </div>
            <div className="main-container-1 flex text-left justify-between w-full">
                <ChartCard prop={ChartCardProps} chart={<Bar />} />
                <SmallCard props={SmallCardProps1} />
            </div>


        </div>
    )
}

export default TripAnalytics
