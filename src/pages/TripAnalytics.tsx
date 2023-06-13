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
const SmallCardProps2: CardPropType = {
    title: "Average fuel consumption per vehicle",
    duration: "Last 7 days",
    value: "35.26 KG",
    icon: "positive",
    percent: "2.45",
}
const SmallCardProps3: CardPropType = {
    title: "Average fuel consumption per kilometer",
    duration: "Last 7 days",
    value: "0.253 KG",
    icon: "negative",
    percent: "0.25",
}
const SmallCardProps4: CardPropType = {
    title: "Average fuel consumption per vehicle",
    duration: "Last 7 days",
    value: "35.26 KG",
    icon: "positive",
    percent: "2.45",
}
const SmallCardProps5: CardPropType = {
    title: "Average Trip speed",
    duration: "Last 7 days",
    value: "35.26 km/hr",
    icon: "positive",
    percent: "2.45",
}
const SmallCardProps6: CardPropType = {
    title: "Peak hour (cumulative)",
    duration: "Last 7 days",
    value: "5:43 PM",

}
const SmallCardProps7: CardPropType = {
    title: "Morning peak",
    duration: "Last 7 days",
    value: "10:12 AM",

}
const SmallCardProps8: CardPropType = {
    title: "Evening peak",
    duration: "Last 7 days",
    value: "7:13 PM",

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
const ChartCardProps2: CardPropType = {
    title: "TRIP SPEED",
    duration: "Last 7 days",
}




const TripAnalytics = () => {
    return (
        <div className="m-2 text-[#FEFEFA]">
            <Filters />
            <div className="main-container-3 flex  text-left justify-between w-full">

                <SmallCard props={SmallCardProps6} />
                <SmallCard props={SmallCardProps7} />
                <SmallCard props={SmallCardProps8} />

            </div>
            <div className="main-container-2 flex text-left bg-[#2C1F39] h-fit m-2.5 p-5 border-1 border-[#8b7da9] shadow-md shadow-[#8b7da9]  rounded-2xl ">
                <CardWithChart prop1={CardWithChartProp1} prop2={CardWithChartProp2} chart={<Bar />} />
            </div>
            <div className="main-container-3 flex  text-left justify-between w-full">

                <SmallCard props={SmallCardProps2} />
                <SmallCard props={SmallCardProps3} />
                <SmallCard props={SmallCardProps4} />

            </div>
            <div className="main-container-1 flex text-left justify-between w-full">
                <ChartCard prop={ChartCardProps} chart={<Bar />} />
                <SmallCard props={SmallCardProps1} />
            </div>



            <div className="main-container-2 flex  text-left justify-between w-full">
                <SmallCard props={SmallCardProps5} />
                <ChartCard prop={ChartCardProps2} chart={<Bar />} />


            </div>






        </div>
    )
}

export default TripAnalytics