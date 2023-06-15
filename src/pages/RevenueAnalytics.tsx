import React from 'react'
import { Filters, SmallCard, CardWithChart, ChartCard, LineChart, Bar,Pie} from '../components'


type CardPropType = {
    title?: string,
    duration?: string,
    value?: string,
    icon?: string,
    percent?: string,
    height?: string,
}

const AvgDriverRevenueperTrip: CardPropType = {
    title: "AVERAGE DRIVER REVENUE / TRIP",
    duration: "Last 7 days",
    value: "₹115",
    icon: "positive",
    percent: "2.45",
}
const SmallCardProps2: CardPropType = {
    title: "TOTAL COMPANY REVENUE",
    duration: "Last 7 days",
    value: "₹347800",
    icon: "positive",
    percent: "8,.75",
}
const SmallCardProps3: CardPropType = {
    title: "AVG COMPANY REVENUE / TRIP",
    duration: "LAST MONTH",
    value: "₹18",
    icon: "positive",
    percent: "0.78",
}

const AvgRevenuePerTrip: CardPropType = {
    title: "AVG REVENUE / KM",
    duration: "LAST 7 DAYS",
    value: "₹46.54",

}
const AvgRevenuePerHour: CardPropType = {
    title: "AVG REVENUE / HOUR",
    duration: "LAST 7 DAYS",
    value: "₹1560",
    icon: "positive",
    percent: "2.45",

}
const AvgRevenuePerUser: CardPropType = {
    title: "AVG REVENUE / USER",
    duration: "Last 7 days",
    value: "₹3489",
    icon: "positive",
    percent: "2.45",

}
const AvgRevPerKm: CardPropType = {
    title: "AVG REVENUE / KM",
    duration: "Last 7 days",
    value: "₹34",
    icon: "positive",
    percent: "2.45",


}

const TotalRevenueForDriver: CardPropType = {
    title: "TOTAL REVENUE FOR DRIVER",
    duration: "MONTHLY REVENUE",
}

const ChartForTotalRevenue: CardPropType = {
    title: "TOTAL REVENUE FOR DRIVERS",
    duration: "LAST MONTH",
    value: "₹11426",
    icon: "positive",
    percent: "2.35",
}

const RevenuePerOperatingHourwrtTime: CardPropType = {
    title: "REVENUE PER OPERATING HOUR",
    duration: "Last 7 days",
}
const RevenuePerOperatingHourwrtCityState: CardPropType = {
    title: "REVENUE PER OPERATING HOUR",
    duration: "State,City wise",
}

const RevenuePerKmwrtTime: CardPropType = {
    title: "REVENUE PER KM",
    value: "₹25",
    duration: "Last 7 days",
    icon: "positive",
    percent: "1.65",

}

const RevenuePerKmwrtStateCity: CardPropType = {
    title: "REVENUE PER KM",
    value: "₹25",
    duration: "State,City wise",
    icon: "positive",
    percent: "1.65",
}



const CompanyRevenueperTrip: CardPropType = {
    title: "TOTAL COMPANY REVENUE / TRIP",
   
    duration: "Last Month",
    

}

const CompanyRevenueperTripDetails: CardPropType = {
    title: "TOTAL COMPANY REVENUE / TRIP",
    duration: "LAST MONTH",
    value: "₹16750",
    icon: "positive",
    percent: "5.09",
}


const RevenuePerTripwrtTime: CardPropType = {
    title: "REVENUE PER TRIP",
    value: "₹25",
    duration: "Last 7 days",
    icon: "positive",
    percent: "1.65",

}

const RevenuePerTripwrtCityStates: CardPropType = {
    title: "REVENUE PER TRIP",
    value: "₹25",
    duration: "State,City wise",
    icon: "positive",
    percent: "1.65",

}


const RevenueAnalytics = () => {
    return (
        <div className="m-2 text-[#FEFEFA]">
            <Filters />
            <div className="main-container-2 flex text-left bg-[#2C1F39] h-fit m-5 p-5 border-1 border-[#8b7da9] shadow-lg shadow-[#8b7da9]  rounded-2xl ">
                <CardWithChart prop1={TotalRevenueForDriver} prop2={ChartForTotalRevenue} chart={<Bar />} />
            </div>
            

            <div className="main-container-2 flex text-left bg-[#2C1F39] h-fit m-5 p-5 border-1 border-[#8b7da9] shadow-lg shadow-[#8b7da9]  rounded-2xl ">
                <CardWithChart prop1={CompanyRevenueperTrip} prop2={CompanyRevenueperTripDetails} chart={<Bar />} />
            </div>

            
            <div className="main-container-1 flex text-left justify-between w-full">
                <ChartCard prop={RevenuePerTripwrtTime} chart={<Bar />} />
                <ChartCard prop={RevenuePerTripwrtCityStates} chart={<Bar />} />
            </div>

            <div className="main-container-1 flex text-left justify-between w-full">
                <ChartCard prop={RevenuePerKmwrtTime} chart={<Bar />} />
                <ChartCard prop={RevenuePerKmwrtStateCity} chart={<Bar />} />
            </div>

            <div className="main-container-1 flex text-left justify-between w-full">
                <ChartCard prop={RevenuePerOperatingHourwrtTime} chart={<Bar />} />
                <ChartCard prop={RevenuePerOperatingHourwrtCityState} chart={<Bar />} />
            </div>


            <div className="main-container-3 flex  text-left justify-between w-full">

               
                <SmallCard props={AvgRevenuePerHour} />
                <SmallCard props={AvgRevenuePerUser} />
                <SmallCard props={AvgDriverRevenueperTrip} />

            </div>
            
            <div className="main-container-3 flex  text-left justify-between w-full">
                <SmallCard props={SmallCardProps2} />
                <SmallCard props={SmallCardProps3} />
                <SmallCard props={AvgRevPerKm} />



               

            </div>


        </div>
    )
}

export default RevenueAnalytics