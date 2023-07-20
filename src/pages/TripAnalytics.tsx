import React, { useState, useEffect } from "react";
import {
  Filters,
  SmallCard,
  CardWithChart,
  ChartCard,
  LineChart,
  Bar,
  Histogram,
  HistogramLine,DateTimeLineChart
} from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { ColoredMap } from "../components/Charts/ColoredMap";
import heatMap from "../data/assets/heatMap.png";
import { filterTripsByPeriod, filteredTrips, calculatePercentChangeUsingValue, filteredRevenueUpDown, calculatePercentChangeUsingCount, calculatePercentChangeOfAverage, calculateTotalValue, minMax } from "../Utils/FilteringFunctions";
import { mapOfPeriods } from "../Utils/Constants";
import AnalyticsCalculation from "../Utils/AnalyticsCalculation";

import MapWithHeatmap from "../components/HeatMap/MapWithHeatmap";
import LineChartTremor from "../components/Charts/LineChartTremor";
import { useStateContextDisplay } from "../contexts/DisplayContextProvider";
import MapWithHeatmapLayer from "../components/HeatMap/HeatMapReact";


// this is for testing commit


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
    selectedDuration,
    selectedState,
    setSelectedDuration,
    setSelectedState,
    tripData,
    driverData,
  } = useStateContext();

  const CalculatedValues = AnalyticsCalculation();


  type CardPropType = {
    title?: string;
    duration?: string;
    value?: string;
    icon?: string;
    percent?: string;
    height?: string;
    content?: any;
    position?: string;
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
    duration: selectedDuration,
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

  const CumulativePeakTooltip = () => {
    return (
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Cumulative Peak time of the day</p>
        <p className="text-white">Peak Time ---- 5:43 PM</p>
      </div>
    )
  }
  const SmallCardProps6: CardPropType = {
    title: "Peak hour (cumulative)",
    duration: selectedDuration,
    value: "5:43 PM",
    content: CumulativePeakTooltip,
    position: "RightBottom"
  };


  const MorningPeakTooltip = () => {
    return (
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Morning Peak time of the day</p>
        <p className="text-white">Peak Time ---- 10:12 AM</p>
      </div>
    )
  }
  const SmallCardProps7: CardPropType = {
    title: "Morning peak",
    duration: selectedDuration,
    value: "10:12 AM",
    content: MorningPeakTooltip,
    position: "RightBottom"
  };

  const EveningPeakTooltip = () => {
    return (
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Evening Peak time of the day</p>
        <p className="text-white">Peak Time ---- 7:13 PM</p>
      </div>
    )
  }
  const SmallCardProps8: CardPropType = {
    title: "Evening peak",
    duration: selectedDuration,
    value: "7:13 PM",
    content: EveningPeakTooltip,
    position: "RightBottom"
  };

  const TotalTripsChartTooltip = () => {
    return (
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Aggregate of the number of trips per state</p>
      </div>
    )
  }
  const CardWithChartProp1: CardPropType = {
    title: "TOTAL TRIPS",
    duration: selectedDuration,
    content: TotalTripsChartTooltip,
    position: "RightBottom"
  };

  const TotalTripTooltip = () => {
    return (
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Aggregate of the number of trips</p>
        <p className="text-white">Total Trips ---- {numberFormat(String(allFilteredTrips.length))}</p>
        <p className="text-white">{selectedDuration}</p>
      </div>
    )
  }
  const CardWithChartProp2: CardPropType = {
    title: "TOTAL TRIPS",
    duration: selectedDuration,
    value: numberFormat(String(allFilteredTrips.length)),
    icon: "positive",
    percent: String(CalculatedValues.tripChange),
    content: TotalTripTooltip,
    position: "RightBottom"
  };

  const TripSpeedChartTooltip = () => {
    return (
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Histogram of the trip speed values with its noraml distribution and mean</p>
      </div>
    )
  }
  const ChartCardProps: CardPropType = {
    title: "TRIP SPEED",
    duration: selectedDuration,
    content: TripSpeedChartTooltip,
    position: "RightBottom"
  };

  const TripLengthChartTooltip = () => {
    return (
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Histogram of the trip length values with its noraml distribution and mean</p>
      </div>
    )
  }
  const ChartCardProps4: CardPropType = {
    title: "TRIP LENGTH",
    duration: selectedDuration,
    content: TripLengthChartTooltip,
    position: "RightBottom"
  };

  const TripDurationChartTooltip = () => {
    return (
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Histogram of the trip duration values with its noraml distribution and mean </p>
      </div>
    )
  }
  const ChartCardProps2: CardPropType = {
    title: "TRIP DURATION",
    duration: selectedDuration,
    content: TripDurationChartTooltip,
    position: "RightBottom"
  };

  const TripDurationTooltip = () => {
    return (
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Aggregate of the trip duration</p>
        <p className="text-white">Total Trips ---- {numberFormat(String(CalculatedValues.tripDurationValue))}</p>
        <p className="text-white">{selectedDuration}</p>
      </div>
    )
  }
  const CardWithChartProps: CardPropType = {
    title: "TRIP DURATION",
    duration: selectedDuration,
    value: numberFormat(String(CalculatedValues.tripDurationValue)),
    icon: "positive",
    percent: String(CalculatedValues.tripDurationChange),
    content: TripDurationTooltip,
    position: "RightBottom"
  };

  const TripLengthTooltip = () => {
    return (
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Aggregate of the trip Length</p>
        <p className="text-white">Trip Length ---- {numberFormat(String(Math.round(CalculatedValues.tripLengthValue)))}</p>
        <p className="text-white">{selectedDuration}</p>
      </div>
    )
  }
  const CardWithChartProps4: CardPropType = {
    title: "TRIP LENGTH",
    duration: selectedDuration,
    value: numberFormat(String(Math.round(CalculatedValues.tripLengthValue))),
    icon: "positive",
    percent: String(CalculatedValues.tripLengthChange),
    content: TripLengthTooltip,
    position: "RightBottom"
  };


  const TripSpeedTooltip = () => {
    return (
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Average of the trip speed</p>
        <p className="text-white">Trip Speed ---- {numberFormat(String(Math.round(CalculatedValues.tripSpeedValue)))}</p>
        <p className="text-white">{selectedDuration}</p>
      </div>
    )
  }
  const CardWithChartProps2: CardPropType = {
    title: "TRIP SPEED",
    duration: selectedDuration,
    value: numberFormat(String(Math.round(CalculatedValues.tripSpeedValue))),
    icon: "positive",
    percent: String(CalculatedValues.tripSpeedChange),
    content: TripSpeedTooltip,
    position: "RightBottom"
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




  const TestChartData = () => {
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

    CalculatedValues.allFilteredTrips.forEach((driver) => {
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

  const generateHistoData = (field: any) => {
    let data: any[] = [];
    CalculatedValues.allFilteredTrips.forEach((trip) => {
      if (field === 'TripDuration') {
        data.push({ TripDuration: trip.tripDuration });
      } else if (field === 'TripLength') {
        data.push({ TripLength: trip.tripDistance });
      } else if (field === 'TripSpeed') {
        data.push({ TripSpeed: trip.tripSpeed });
      }
    });
    return data;
  }
  const TripDurationChartProps = {
    chartData: generateHistoData('TripDuration'),
    yName: "TripDuration",
    chartName: "Trips by Duration",
    xAxisTitle: "Trip Duration",
    yAxisTitle: "No. of Trips",

  }
  const TripLengthChartProps = {
    chartData: generateHistoData('TripLength'),
    yName: "TripLength",
    chartName: "Trips by Length",
    xAxisTitle: "Trip Length",
    yAxisTitle: "No. of Trips",
  }
  const TripSpeedChartProps = {
    chartData: generateHistoData('TripSpeed'),
    yName: "TripSpeed",
    chartName: "Trips by Speed",
    xAxisTitle: "Trip Speed",
    yAxisTitle: "No. of Trips",
  }


  //Total trips chartdate
  function calculateTotalTrips(data: any[]) {
    const tripsMap: Map<string, number> = new Map();
  
    // Iterate over the dataset
    for (const item of data) {
      const startTime: any = item["startTime"].split("T")[0]; // Extract the date from the start time
  
      if (tripsMap.has(startTime)) {
        // If the date is already in the map, increment the trip count
        const currentTrips: number = tripsMap.get(startTime)!;
        tripsMap.set(startTime, currentTrips + 1);
      } else {
        // If the date is not in the map, initialize the trip count with 1
        tripsMap.set(startTime, 1);
      }
    }
  
    // Convert the trips map to an array of objects
    const tripsData: any[] = Array.from(tripsMap, ([date, tripCount]) => ({ x: new Date(date), y: tripCount }));
    tripsData.sort((a, b) => a.x - b.x); // Sort the array by date
  
    return tripsData;
  }
  

  console.log(calculateTotalTrips(CalculatedValues.allFilteredTrips))

  // Datafiller Chartinterface DataPoint 
  interface DataPoint {
    x: Date; // Date object
    y: number; // Value (in this case, 0)
  }

  function dataFiller(duration: number, dataset: any[]): DataPoint[] {
    const currentDate = new Date();
    const arraySize = duration;

    // Create an array of DataPoint objects with default y value of 0
    const dataArray: DataPoint[] = [];
    for (let i = 0; i < arraySize; i++) {
      const date = new Date(currentDate);
      date.setUTCDate(currentDate.getUTCDate() - i);
      dataArray.push({ x: date, y: 0 });
    }

    // Create a Map to associate dates with their corresponding data points in the dataset
    const datasetMap = new Map<string, number>();
    dataset.forEach((data) => {
      const dateString = new Date(data.x).toISOString().slice(0, 10); // Format to 'YYYY-MM-DD'
      datasetMap.set(dateString, data.y);
    });

    // Sort the dataArray in descending order based on dates
    dataArray.sort((a, b) => b.x.getTime() - a.x.getTime())

    // Merge the dataArray with dataset if the dates are present in the dataset
    dataArray.forEach((dataPoint, index) => {
      const dateString = dataPoint.x.toISOString().slice(0, 10); // Format to 'YYYY-MM-DD'
      const existingData = datasetMap.get(dateString);

      if (existingData !== undefined) {
        dataArray[index].y = existingData;
      }
    });

    return dataArray;
  }



  const totalTripsChartData = dataFiller(mapOfPeriods.get(selectedDuration), calculateTotalTrips(CalculatedValues.allFilteredTrips));

  //Calculate max and min of the calculateTotalRevenue revenue
  function findMinMaxY(data: any[]) {
    const revenueMap: Map<string, number> = new Map();

    // Calculate total revenue for each unique date
    for (const item of data) {
      const date: Date = item["x"];
      const revenue: number = item["y"];


      const dateString: string = date.toDateString();
      // console.log(dateString)

      if (revenueMap.has(dateString)) {
        const currentRevenue: number = revenueMap.get(dateString)!;
        revenueMap.set(dateString, currentRevenue + revenue);
      } else {
        revenueMap.set(dateString, revenue);
      }
    }

    // Get an array of revenue values
    const revenueValues: number[] = Array.from(revenueMap.values());

    // Find the minimum and maximum revenue values
    const minY: number = Math.min(...revenueValues);
    const maxY: number = Math.max(...revenueValues);

    return { min: minY, max: maxY };
  }



  const minMaxVal = findMinMaxY(totalTripsChartData);

  return (
    <div className="extraSmallMargin">
      {/* <div className="displayFlex">
        <Filters />
      </div> */}
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
          chart={<DateTimeLineChart chartData={totalTripsChartData} props={minMaxVal} chart_name={"No. of Trips"} chartType="Null" />}
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
        {/* <MapWithHeatmapLayer/> */}
        {/* <MapWithHeatmap />   */}
      </div>
      {/* <Histogram />
      <HistogramLine /> */}
      {/* <LineChartTremor chartData={TestChartData()}/> */}

    </div>
  );
};

export default TripAnalytics;
