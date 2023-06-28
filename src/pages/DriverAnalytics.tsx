import React, { useEffect } from 'react'
import { Filters, SmallCard, CardWithChart, ChartCard, LineChart, Bar,Pie} from '../components'
import "../Styles.css"
import { useStateContext } from '../contexts/ContextProvider'

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
const AttritionedDrivers: CardPropType = {
    title:"TOTAL ATTRITIONED DRIVERS",
    duration:"Last 7 days",
    value:"576",
    icon:"Negative",
    percent:"1.75",
  }
const AvgRevenuePerHour: CardPropType = {
    title: "AVG REVENUE / HOUR",
    duration: "LAST 7 DAYS",
    value: "₹1560",
    icon: "positive",
    percent: "2.45",


}

const DriverRange: CardPropType = {
    title: "DRIVER RANGE",
    duration: "LAST 7 DAYS",
    value: "15km",
    icon: "positive",
    percent: "1.45",

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

const NewDrivers: CardPropType = {
    title: "NEW DRIVERS",
    value: "255",
    duration: "Last 7 Days",
    icon: "positive",
    percent: "0.65",

}
const ActiveDrivers: CardPropType = {
    title:"TOTAL ACTIVE DRIVERS",
    duration:"Last 7 days",
    value:"8990",
    icon:"Positive",  
    percent:"1.67",
  }

  const UnactivatedDrivers: CardPropType = {
    title:"TOTAL UNACTIVE DRIVERS",
    duration:"Last 7 days",
    value:"678",
    icon:"positive",  
    percent:"2.79",
}
  
const PercentActiveDrivers: CardPropType = {
    title:"TOTAL ACTIVE DRIVERS",
    duration:"Since Last Month",
    value:"9.1%",
    icon:"positive",  
    percent:"1.69",
}

const TotalVehicles: CardPropType = {
    title:"TOTAL VEHICLES",
    duration:"Last 7 days",
    value:"1,056",
    icon:"positive",  
    percent:"7.79",
  }

  const TotalDownloads: CardPropType = {
    title: "TOTAL DOWNLOADS",
    duration: "Last 7 days",
    value:"1,00,043",
    icon:"positive",
    percent:"0.31",
  }

  const ComplementCrashFreeUsers: CardPropType = {
    title: "COMPLEMENT OF CRASH FREE USERS",
    duration: "Last 7 Days",
    value: "25,997",
    icon: "negative",
    percent: "0.3",
   

}

const TotalTrips: CardPropType = {
    title: "TOTAL TRIPS",
    duration: "Last 7 days",
    value:"65,332",
    icon:"positive",
    percent:"0.35",
  }
  

const CrashFreeUsers2 : CardPropType = {
    title: "CRASH FREE USERS",
    duration: "Last 7 days",
  }

const ActiveHours: CardPropType = {
    title: "ACTIVE HOURS PER DAY",
    duration: "Last 7 Days",
    value: "1,863",
    icon: "negative",
    percent: "0.3",
   

}

const ChartForTotalRevenue: CardPropType = {
    title: "TOTAL REVENUE Drivers",
    duration: "LAST MONTH",
    value: "₹11426",
    icon: "positive",
    percent: "2.35",
}

const AvgTripPerDay: CardPropType = {
    title: "Average Trip Per Day",
    duration: "LAST MONTH",
    value: "627",
    icon: "positive",
    percent: "2.35",
}
const AvgTimeBWTripsPerDriver: CardPropType = {
    title: "Average Time B/W Trips",
    duration: "LAST MONTH",
    value: "18 Mins",
    icon: "negative",
    percent: "0.35",
}
const ActiveHoursPerDay: CardPropType = {
    title: "Active Hours Per Day",
    duration: "LAST MONTH",
    value: "235 Mins",
    icon: "postive",
    percent: "1.35",
}



const DriverAnalytics = () => {
    const { currentColor, currentMode,  selectedDuration, selectedState, setSelectedDuration, setSelectedState } = useStateContext();

    useEffect(() => {
        setSelectedDuration('none');
        setSelectedState('none');
      },[]);
    return (
        <div className="extraSmallMargin">
            <div className='displayFlex'>
            <Filters />
            </div>
            
            <div className="displayFlex  textLeft flexJustifyBetween widthFull">
            <SmallCard props={DriverRange} />
            <SmallCard props={NewDrivers} />
            <SmallCard props={AttritionedDrivers} />
            </div>

            <div className="displayFlex  textLeft flexJustifyBetween widthFull">
            <SmallCard props={ActiveDrivers} />
            <SmallCard props={UnactivatedDrivers} />
            <SmallCard props={TotalTrips} />
            
           
            </div>

            <div >
                <CardWithChart prop1={CrashFreeUsers2} prop2={ComplementCrashFreeUsers} chart={<LineChart />} />
            </div>
 
            <div className="displayFlex  textLeft flexJustifyBetween widthFull">
            <SmallCard props={TotalVehicles} />
            <SmallCard props={ChartForTotalRevenue} />
            <SmallCard props={TotalDownloads} />
            </div>

            <div className="displayFlex  textLeft flexJustifyBetween widthFull">
            <SmallCard props={ActiveHoursPerDay} />
            <SmallCard props={AvgTripPerDay} />
            <SmallCard props={AvgTimeBWTripsPerDriver} />
            </div>

        </div>
    )
}

export default DriverAnalytics