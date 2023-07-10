import React, { useState, useEffect } from "react";
import {
  Filters,
  SmallCard,
  CardWithChart,
  ChartCard,
  LineChart,
  Bar,
  Histogram,
  HistogramLine
} from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { ColoredMap } from "../components/Charts/ColoredMap";
import heatMap from "../data/assets/heatMap.png";
import { filterTripsByPeriod, filteredTrips, calculatePercentChangeUsingValue, filteredRevenueUpDown, calculatePercentChangeUsingCount, calculatePercentChangeOfAverage, calculateTotalValue, minMax } from "../Utils/FilteringFunctions";
import { mapOfPeriods } from "../Utils/Constants";
import AnalyticsCalculation from "../Utils/AnalyticsCalculation";

import MapWithHeatmap from "../components/HeatMap/MapWithHeatmap";
import LineChartTremor from "../components/Charts/LineChartTremor";





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
    tripData,
    driverData,
  } = useStateContext();

  const CalvulatedValues = AnalyticsCalculation();


  type CardPropType = {
    title?: string;
    duration?: string;
    value?: string;
    icon?: string;
    percent?: string;
    height?: string;
  };
  // const [driverData, setDrivers] = useState<any[]>([]);
  // const [tripData, setTrips] = useState<any[]>([]);
  // useEffect(() => {
  //   fetch("http://localhost:5000/yuja-sm/v1/drivers", {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setDrivers(data);
  //     });
  // }, [selectedDuration, selectedState]);

  // useEffect(() => {
  //   fetch("http://localhost:5000/yuja-sm/v1/trips", {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((e) => {
  // var temp: any[] =[];
  // e.forEach((element: any) => {
  //   const end_time = new Date(element.endTime);
  //   if(end_time > thisYear){
  //     temp.push(element);
  //   }
  //  });
  //       setTrips(e);
  //     });
  // }, [selectedDuration, selectedState]);

  //Filter func 

  // function filterTripsByPeriod(trips: any[], period: number): any[] {
  //   const filterEnd = new Date();

  //   let filterStart = new Date();
  //   if (period === 0) {
  //     filterStart.setHours(0, 0, 0, 0);
  //   } else {
  //     filterStart = new Date(filterEnd.getTime() - period * 24 * 60 * 60 * 1000);
  //   }

  //   const todayTrips = trips.filter((trip) => {
  //     const startTime = new Date(trip.startTime);
  //     return startTime >= filterStart && startTime <= filterEnd;
  //   });

  //   return todayTrips;
  // }
  // function filteredTrips() {
  //   let totalTrips: any[] = trips
  //   if (selectedDuration === "Today") {
  //     totalTrips = filterTripsByPeriod(trips, 0);
  //   } else if (selectedDuration === "Till Date") {
  //     totalTrips = trips
  //   } else if (selectedDuration === "Last 7 Days") {
  //     totalTrips = filterTripsByPeriod(trips, 7);

  //   } else if (selectedDuration === "Last 30 Days") {
  //     totalTrips = filterTripsByPeriod(trips, 30);

  //   } else if (selectedDuration === "Last 6 Months") {
  //     totalTrips = filterTripsByPeriod(trips, 180);

  //   } else if (selectedDuration === "Last Year") {
  //     totalTrips = filterTripsByPeriod(trips, 365);
  //   }
  //   return totalTrips;

  // }

  var allFilteredTrips = filteredTrips(selectedDuration, tripData);

  //number format function
  function numberFormat(x: string | number): string {
    if (typeof x === 'number') {
      return x.toLocaleString(undefined, { maximumFractionDigits: 1 });
    }
    if (typeof x === 'string') {
      const parts = x.split('.');
      const formattedInteger = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      if (parts.length === 2) {
        const decimalPart = parts[1].substring(0, 1); // Limit decimal to 1 digit
        return `${formattedInteger}.${decimalPart}`;
      }
      return formattedInteger;
    }
    return '';
  }

 

  const SmallCardProps1: CardPropType = {
    title: "AVERAGE TRIP DURATION",
    duration: selectedDuration,
    value: "14 min",
    icon: "positive",
    percent: "2.45",
  };
  const SmallCardProps2: CardPropType = {
    title: "Average fuel consumption per vehicle",
    duration:selectedDuration,
    value: "35.26 KG",
    icon: "positive",
    percent: "2.45",
  };
  const SmallCardProps3: CardPropType = {
    title: "Average fuel consumption per kilometer",
    duration: selectedDuration,
    value: "0.253 KG",
    icon: "negative",
    percent: "0.25",
  };
  const SmallCardProps4: CardPropType = {
    title: "Average fuel consumption per vehicle",
    duration: selectedDuration,
    value: "35.26 KG",
    icon: "positive",
    percent: "2.45",
  };
  const SmallCardProps5: CardPropType = {
    title: "Average Trip speed",
    duration: selectedDuration,
    value: "35.26 km/hr",
    icon: "positive",
    percent: "2.45",
  };
  const SmallCardProps6: CardPropType = {
    title: "Peak hour (cumulative)",
    duration: selectedDuration,
    value: "5:43 PM",
  };
  const SmallCardProps7: CardPropType = {
    title: "Morning peak",
    duration: selectedDuration,
    value: "10:12 AM",
  };
  const SmallCardProps8: CardPropType = {
    title: "Evening peak",
    duration: selectedDuration,
    value: "7:13 PM",
  };

  const CardWithChartProp1: CardPropType = {
    title: "TOTAL TRIPS",
    duration: selectedDuration,
  };

  const CardWithChartProp2: CardPropType = {
    title: "TOTAL TRIPS",
    duration: selectedDuration,
    value: numberFormat(String(allFilteredTrips.length)),
    icon: "positive",
    percent: String(CalvulatedValues.tripChange),
  };

  const ChartCardProps: CardPropType = {
    title: "TRIP SPEED",
    duration: selectedDuration,
  };
  const ChartCardProps4: CardPropType = {
    title: "TRIP LENGTH",
    duration: selectedDuration,
  };

  const ChartCardProps2: CardPropType = {
    title: "TRIP DURATION",
    duration: selectedDuration,
  };

  const CardWithChartProps: CardPropType = {
    title: "TRIP DURATION",
    duration: selectedDuration,
    value: numberFormat(String(CalvulatedValues.tripDurationValue)),
    icon: "positive",
    percent: String(CalvulatedValues.tripDurationChange),
  };
  const CardWithChartProps4: CardPropType = {
    title: "TRIP LENGTH",
    duration: selectedDuration,
    value: numberFormat(String(Math.round(CalvulatedValues.tripLengthValue))),
    icon: "positive",
    percent: String(CalvulatedValues.tripLengthChange),
  };
  const CardWithChartProps2: CardPropType = {
    title: "TRIP SPEED",
    duration: selectedDuration,
    value: numberFormat(String(Math.round(CalvulatedValues.tripSpeedValue))),
    icon: "positive",
    percent: String(CalvulatedValues.tripSpeedChange),
  };

  


  const TotalTripsChartData = [
    { state: 'Maharashtra', trips: 62000 },
    { state: 'Uttar Pradesh', trips: 53000 },
    { state: 'Karnataka', trips: 71000 },
    { state: 'Gujarat', trips: 59000 },
    { state: 'Tamil Nadu', trips: 66000 },
    { state: 'Rajasthan', trips: 50000 },
    { state: 'West Bengal', trips: 44000 },
    { state: 'Punjab', trips: 58000 },
    { state: 'Madhya Pradesh', trips: 67000 },
    { state: 'Bihar', trips: 48000 }
  ];

  const TripSpeedChartData = [
    { tripSpeed: 'Slow', trips: 44000 },
    { tripSpeed: 'Moderate', trips: 48000 },
    { tripSpeed: 'Average', trips: 50000 },
    { tripSpeed: 'Good', trips: 53000 },
    { tripSpeed: 'Better', trips: 59000 },
    { tripSpeed: 'Great', trips: 62000 },
    { tripSpeed: 'Excellent', trips: 66000 },
    { tripSpeed: 'Superb', trips: 67000 },
    { tripSpeed: 'Fantastic', trips: 71000 },
    { tripSpeed: 'Outstanding', trips: 79000 }
  ];

  const TripLengthChartData = [
    { TripLength: 'Short', trips: 24000 },
    { TripLength: 'Medium', trips: 31000 },
    { TripLength: 'Average', trips: 41000 },
    { TripLength: 'Long', trips: 54000 },
    { TripLength: 'Extended', trips: 66000 },
    // { TripLength: 'Very Long', trips: 37000},
    // { TripLength: 'Extra Long', trips: 84000 },
    // { TripLength: 'Super Long', trips: 92000 },
    // { TripLength: 'Ultra Long', trips: 99000 },
    // { TripLength: 'Mega Long', trips: 78000 }
  ];

  // const TripDurationChartData = [
  //   { TripDuration: 'Short', trips: 24000 },
  //   { TripDuration: 'Medium', trips: 66000 },
  //   { TripDuration: 'Average', trips: 41000 },
  //   { TripDuration: 'Long', trips: 54000 },
  //   { TripDuration: 'Extended', trips: 31000 },
  //   // { TripDuration: 'Very Long', trips: 37000},
  //   // { TripDuration: 'Extra Long', trips: 84000 },
  //   // { TripDuration: 'Super Long', trips: 92000 },
  //   // { TripDuration: 'Ultra Long', trips: 99000 },
  //   // { TripDuration: 'Mega Long', trips: 78000 }
  // ];

 


  const TestChartData = ()=>{
    function getLast7DaysArray() {
      const today = new Date();
      const last7DaysArray = [];

      for (let i = 6; i >= 0; i--) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() - i);
        last7DaysArray.push(currentDate.toISOString().split('T')[0]);
      }

      return last7DaysArray;
    }

    const last7Days = getLast7DaysArray();
    var data: any[] = [];

    CalvulatedValues.allFilteredTrips.forEach((driver) => {
      var totalRevenue = 0;
      allFilteredTrips.forEach((trip) => {
        if (last7Days.includes(driver.startTime.split("T")[0])) {
          totalRevenue += trip.tripFare;
        }
      });
      data.push({ Date: new Date(driver.startTime.split("T")[0]), Revenue: driver.tripFare });
    });

    console.log(data);
    return data;
  }
  // console.log(TestChartData());


  // useEffect(() => {
  //   setSelectedDuration("Till Date");
  //   setSelectedState("All");
  // }, []);

  const generateHistoData = (field: any)=>{
    let data: any[] = [];
    CalvulatedValues.allFilteredTrips.forEach((trip) => {
      if(field === 'TripDuration'){
        data.push({ TripDuration: trip.tripDuration});
      }else if( field === 'TripLength'){
        data.push({ TripLength: trip.tripDistance});
      }else if( field === 'TripSpeed'){
        data.push({ TripSpeed: trip.tripSpeed});
      }
    });
    return data;
  }
  const TripDurationChartProps={
    chartData: generateHistoData('TripDuration'),
    yName: "TripDuration",
    chartName: "Trips by Duration",
    xAxisTitle: "Trip Duration",
    yAxisTitle: "No. of Trips",
    
  }
  const TripLengthChartProps={
    chartData: generateHistoData('TripLength'),
    yName: "TripLength",
    chartName: "Trips by Length",
    xAxisTitle: "Trip Length",
    yAxisTitle: "No. of Trips",
  }
  const TripSpeedChartProps={
    chartData: generateHistoData('TripSpeed'),
    yName: "TripSpeed",
    chartName: "Trips by Speed",
    xAxisTitle: "Trip Speed",
    yAxisTitle: "No. of Trips",
  }

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
          chart={<Bar columnData={TotalTripsChartData} xTitle="state" yTitle="trips" Chart_name="Trips per state" minMax={minMax(TotalTripsChartData,'trips')}/>}
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
          chart={<HistogramLine histogramProps={TripDurationChartProps} />}
        />
        {/* <Bar columnData={TripDurationChartData} xTitle="TripDuration" yTitle="trips" /> */}
      </div>
      <div>
        <CardWithChart
          prop1={ChartCardProps4}
          prop2={CardWithChartProps4}
          chart={<HistogramLine histogramProps={TripLengthChartProps} />}
        />
        {/* <Bar columnData={TripLengthChartData} xTitle="TripLength" yTitle="trips" /> */}
      </div>
      <div>
        <CardWithChart
          prop1={ChartCardProps}
          prop2={CardWithChartProps2}
          chart={<HistogramLine histogramProps={TripSpeedChartProps} />}
        />
        {/* <Bar columnData={TripSpeedChartData} xTitle="tripSpeed" yTitle="trips" /> */}
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
      {/* <ColoredMap /> */}
      <div className="flex justify-center">
        <div className="container mediumContainer smallMargin mediumPadding mainShadow flex justify-center" >

          <img src={heatMap} alt="heatMap" style={{ height: "50vh" }} />
        </div>
        {/* <MapWithHeatmap />   */}
      </div>
      {/* <Histogram />
      <HistogramLine /> */}
      {/* <LineChartTremor chartData={TestChartData()}/> */}
     
    </div>
  );
};

export default TripAnalytics;
