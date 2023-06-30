import React, { useState,useEffect } from "react";
import {
  Filters,
  SmallCard,
  CardWithChart,
  ChartCard,
  LineChart,
  Bar,
} from "../components";
import { useStateContext } from "../contexts/ContextProvider";




// const CardWithChartProp1: CardPropType = {
//     title: "TOTAL TRIPS",
//     duration: "Last 7 days",
//   };
  
//   const CardWithChartProp2: CardPropType = {
//     title: "TOTAL TRIPS",
//     duration: "Last 7 days",
//     value: "1126",
//     icon: "positive",
//     percent: "2.35",
//   };

const TripAnalytics = () => {
  const {
    currentColor,
    currentMode,
    selectedDuration,
    selectedState,
    setSelectedDuration,
    setSelectedState,
  } = useStateContext();
  type CardPropType = {
    title?: string;
    duration?: string;
    value?: string;
    icon?: string;
    percent?: string;
    height?: string;
  };
  const [drivers, setDrivers] = useState<any[]>([]);
  const [trips, setTrips] = useState<any[]>([]);
  useEffect(() => {
    fetch("http://localhost:5000/yuja-sm/v1/drivers", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setDrivers(data);
      });
  }, [selectedDuration, selectedState]);

  useEffect(() => {
    fetch("http://localhost:5000/yuja-sm/v1/trips", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((e) => {
        // var temp: any[] =[];
        // e.forEach((element: any) => {
        //   const end_time = new Date(element.endTime);
        //   if(end_time > thisYear){
        //     temp.push(element);
        //   }
        //  });
        setTrips(e);
      });
  }, [selectedDuration, selectedState]);

 //Filter func 

 function filterTripsByPeriod(trips: any[], period: number): any[] {
  const filterEnd = new Date();

  let filterStart = new Date();
  if (period === 0) {
    filterStart.setHours(0, 0, 0, 0);
  } else {
    filterStart = new Date(filterEnd.getTime() - period * 24 * 60 * 60 * 1000);
  }

  const todayTrips = trips.filter((trip) => {
    const startTime = new Date(trip.startTime);
    return startTime >= filterStart && startTime <= filterEnd;
  });

  return todayTrips;
}
function filteredTrips() {
  let totalTrips: any[] = trips
  if (selectedDuration === "Today") {
    totalTrips = filterTripsByPeriod(trips, 0);
  } else if (selectedDuration === "Till Date") {
    totalTrips = trips
  } else if (selectedDuration === "Last 7 Days") {
    totalTrips = filterTripsByPeriod(trips, 7);

  } else if (selectedDuration === "Last 30 Days") {
    totalTrips = filterTripsByPeriod(trips, 30);

  } else if (selectedDuration === "Last 6 Months") {
    totalTrips = filterTripsByPeriod(trips, 180);

  } else if (selectedDuration === "Last Year") {
    totalTrips = filterTripsByPeriod(trips, 365);
  }
  return totalTrips;

}

var allFilteredTrips = filteredTrips();
  
  const SmallCardProps1: CardPropType = {
    title: "AVERAGE TRIP DURATION",
    duration: "Last 7 days",
    value: "14 min",
    icon: "positive",
    percent: "2.45",
  };
  const SmallCardProps2: CardPropType = {
    title: "Average fuel consumption per vehicle",
    duration: "Last 7 days",
    value: "35.26 KG",
    icon: "positive",
    percent: "2.45",
  };
  const SmallCardProps3: CardPropType = {
    title: "Average fuel consumption per kilometer",
    duration: "Last 7 days",
    value: "0.253 KG",
    icon: "negative",
    percent: "0.25",
  };
  const SmallCardProps4: CardPropType = {
    title: "Average fuel consumption per vehicle",
    duration: "Last 7 days",
    value: "35.26 KG",
    icon: "positive",
    percent: "2.45",
  };
  const SmallCardProps5: CardPropType = {
    title: "Average Trip speed",
    duration: "Last 7 days",
    value: "35.26 km/hr",
    icon: "positive",
    percent: "2.45",
  };
  const SmallCardProps6: CardPropType = {
    title: "Peak hour (cumulative)",
    duration: "Last 7 days",
    value: "5:43 PM",
  };
  const SmallCardProps7: CardPropType = {
    title: "Morning peak",
    duration: "Last 7 days",
    value: "10:12 AM",
  };
  const SmallCardProps8: CardPropType = {
    title: "Evening peak",
    duration: "Last 7 days",
    value: "7:13 PM",
  };
  
  const CardWithChartProp1: CardPropType = {
    title: "TOTAL TRIPS",
    duration: "Last 7 days",
  };
  
  const CardWithChartProp2: CardPropType = {
    title: "TOTAL TRIPS",
    duration: selectedDuration,
    value: String(allFilteredTrips.length),
    icon: "positive",
    percent: "2.35",
  };
  
  const ChartCardProps: CardPropType = {
    title: "TRIP DURATION",
    duration: "Last 7 days",
  };
  const ChartCardProps4: CardPropType = {
    title: "TRIP LENGTH",
    duration: "Last 7 days",
  };
  
  const ChartCardProps2: CardPropType = {
    title: "TRIP SPEED",
    duration: "Last 7 days",
  };
  
    const CardWithChartProps: CardPropType = {
      title: "TRIP DURATION",
      duration: "Last 7 days",
      value: "1126",
      icon: "positive",
      percent: "2.35",
    };
    const CardWithChartProps4: CardPropType = {
      title: "TRIP LENGTH",
      duration: "Last 7 days",
      value: "60",
      icon: "positive",
      percent: "2.35",
    };
    const CardWithChartProps2: CardPropType = {
      title: "TRIP SPEED",
      duration: "Last 7 days",
      value: "112",
      icon: "positive",
      percent: "2.35",
    };




  useEffect(() => {
    setSelectedDuration("Till Date");
    setSelectedState("All");
  }, []);
  return (
    <div className="extraSmallMargin">
      <div className="displayFlex">
        <Filters />
      </div>
      {/* <div className=" displayFlex  textLeft flexJustifyBetween widthFull">

                <SmallCard props={SmallCardProps6} />
                <SmallCard props={SmallCardProps7} />
                <SmallCard props={SmallCardProps8} />
            </div> */}
      <div className=" marginLeftSmall">
        <p className="text-2xl extraBoldWeightText  mainText grayText">
          Overview
        </p>
      </div>
      <div>
        <CardWithChart
          prop1={CardWithChartProp1}
          prop2={CardWithChartProp2}
          chart={<Bar />}
        />
      </div>
      <div className=" displayFlex  textLeft flexJustifyBetween widthFull">
        <SmallCard props={SmallCardProps6} />
        <SmallCard props={SmallCardProps7} />
        <SmallCard props={SmallCardProps8} />
      </div>
      {/* <div className=" displayFlex  textLeft flexJustifyBetween widthFull">
        <SmallCard props={SmallCardProps2} />
        <SmallCard props={SmallCardProps3} />
        <SmallCard props={SmallCardProps4} />
      </div> */}
      {/* <div className="displayFlex textLeft flexJustifyBetween widthFull">
        <ChartCard prop={ChartCardProps} chart={<Bar />} />
        <SmallCard props={SmallCardProps1} />
      </div> */}

      <div className=" marginLeftSmall marginTopMoreMedium">
        <p className="text-2xl extraBoldWeightText  mainText grayText">
          Trip Statistics
        </p>
      </div>
      <div>
        <CardWithChart
          prop1={ChartCardProps2}
          prop2={CardWithChartProps}
          chart={<Bar />}
        />
      </div>
      <div>
        <CardWithChart
          prop1={ChartCardProps4}
          prop2={CardWithChartProps4}
          chart={<Bar />}
        />
      </div>
      <div>
        <CardWithChart
          prop1={ChartCardProps}
          prop2={CardWithChartProps2}
          chart={<Bar />}
        />
      </div>
      <div className=" marginLeftSmall marginTopMoreMedium">
        <p className="text-2xl extraBoldWeightText  mainText grayText">
          Spatial Patterns
        </p>
      </div>

      {/* <div className=" displayFlex  textLeft flexJustifyBetween widthFull">
        <SmallCard props={SmallCardProps5} />
        <ChartCard prop={ChartCardProps2} chart={<Bar />} />
      </div> */}
    </div>
  );
};

export default TripAnalytics;
