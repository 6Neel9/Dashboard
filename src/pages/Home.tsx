import React, { useEffect, useState, useCallback } from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import {
  AxisModel,
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  ColumnSeries,
  Legend,
  DateTime,
  Tooltip,
  DataLabel,
  LineSeries,
  ValueType,
  IntervalType,
  EdgeLabelPlacement,
  ChartRangePadding,
} from "@syncfusion/ej2-react-charts";
import { Bar, DateTimeLineChart, Histogram, HistogramLine, LineChart, Pie } from "../components";
import { dropdownData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import {
  MediumCard,
  SmallCard,
  CardWithChart,
  Filters,
  ChartCard,
  SmallCardWithChart,
} from "../components";
import "../Styles.scss";

import { useSelector, useDispatch } from "react-redux";
import { fetchDrivers } from "../store/driverSlice";
import { fetchTrips } from "../store/tripSlice";

//
import AreaCharts from "../components/Charts/AreaCharts";
import SmallCardFormatter from "../components/Cards/SmallCardFormatter";
import { filterTripsByPeriod, filteredTrips, calculatePercentChangeUsingValue, filteredRevenueUpDown, calculatePercentChangeUsingCount, calculatePercentChangeOfAverage, getTop10Drivers, minMax } from "../Utils/FilteringFunctions";
import { mapOfPeriods } from "../Utils/Constants";
import AnalyticsCalculation from "../Utils/AnalyticsCalculation";
import LineChartTremor from "../components/Charts/LineChartTremor";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

const Home = () => {
  const {
    currentColor,
    currentMode,
    selectedDuration,
    selectedState,
    setSelectedDuration,
    setSelectedState,
    // handleTripData,
    setTripData,
    tripData,
    driverData,
    setDriverData
  } = useStateContext();
  // const [driverData, setDrivers] = useState<any[]>([]);
  // const [tripData, setTrips] = useState<any[]>([]);
  const CalvulatedValues = AnalyticsCalculation();


  // useEffect(()=>{
  //   setTripData(trips)
  // },[])

  //Redux dispatch call
  const dispatch: any = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchDrivers());
  //   dispatch(fetchTrips())
  // }, []);


  //Getting redux data
  // const driverData: any = useSelector((state: any) => state.drivers);
  // const tripData: any = useSelector((state: any) => state.trips);
  // console.log(driverData)
  // console.log(tripData)



  // interface
  interface Trip {
    _id: string;
    driverId: number;
    tripId: number;
    startLocation: string;
    tripDistance: number;
    tripSpeed: number;
    tripDuration: number;
    endLocation: string;
    startTime: string;
    tripFare: number;
    paymentType: string;
    endTime: string;
  }






  // todo : Check wheather its working for all numbers or not(large numbers).
  var total_revenue = 0;
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





  var total_trips = 0;


  // useEffect(() => {
  //   // totalRevenue()
  //   console.log(filterTripsByPeriod(trips, 7))

  // }, [selectedDuration, trips])

  const RevTimeChart = () => {
    var new_dateTimeData: any[] = [];
    // var date_trip: any[] = [];
    // var revenue_trip: any[] =[];
    // var revenue_trip_temp: any[] =[];
    // data.forEach((element: any) => {
    //   const temp = element.trips;
    //   temp.forEach((e: any) => {
    //     // date_trip.push(new Date(e.etime))
    //     // revenue_trip_temp.push({date: new Date(e.etime), revenue: e.revenue})
    //     new_dateTimeData.push({ x: new Date(e.etime), y: e.revenue });
    //   });
    // });
    // for (var j = 0; j < new_dateTimeData.length - 1; j++) {
    //   var i = j;
    //   var e1 = new_dateTimeData[i];
    //   var e2 = new_dateTimeData[i + 1];
    //   while (e1.x > e2.x) {
    //     const t = new_dateTimeData[i];
    //     new_dateTimeData[i] = new_dateTimeData[i + 1];
    //     new_dateTimeData[i + 1] = t;
    //     i++;
    //   }
    // }

    // date_trip.sort();
    // date_trip.forEach((e:any)=>{
    //   revenue_trip_temp.forEach((ele:any)=>{
    //     if(e === ele.date){
    //       revenue_trip.push(ele.revenue)
    //     }
    //   })
    // })

    // for(var i =0;i<date_trip.length;i++){
    //   new_dateTimeData.push({ x: new Date(date_trip[i]), y: revenue_trip[i] })
    // }

    const primaryxAxis: AxisModel = {
      valueType: "DateTime",
      zoomFactor: 0.2,
      zoomPosition: 0.6,
      title: "Sales Across Years",
      labelFormat: "yMd",
      minimum: new Date(2020, 6, 1),
      maximum: new Date(2022, 11, 1),
    };
    const primaryyAxis: AxisModel = { title: "Sales Amount in millions(USD)" };
    // const zoomsettings: ZoomSettingsModel = { enableSelectionZooming: true, enableScrollbar: true };

    return (
      <ChartComponent
        primaryXAxis={primaryxAxis}
        primaryYAxis={primaryyAxis}
        // zoomSettings={zoomsettings}
        title="Average Sales Comparison"
      >
        <Inject
          services={[
            ColumnSeries,
            Legend,
            Tooltip,
            DataLabel,
            LineSeries,
            DateTime,
          ]}
        />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={new_dateTimeData}
            xName="x"
            yName="y"
            name="Sales"
            type="Line"
          ></SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>
    );
  };

  const buttonProps = {
    color: "white",
    bgColor: currentColor,
    borderRadius: "10px",
    icon: undefined,
    bgHoverColor: "",
    size: "",
    width: undefined,
  };

  const DropDown = () => (
    <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
      <DropDownListComponent
        fields={{ text: "Time", value: "Id" }}
        style={{ border: "none", color: currentMode === "Dark" ? "white" : "" }}
        value="1"
        dataSource={dropdownData}
        popupHeight="220px"
        popupWidth="120px"
      />
    </div>
  );






  let allFilteredTrips = filteredTrips(selectedDuration, tripData);
  // console.log(allFilteredTrips)
  //revenue updown
  // let allFilterRevenueUpDown = filteredRevenueUpDown(selectedDuration,trips);
  // console.log(allFilterRevenueUpDown)
  let revenueChange = calculatePercentChangeUsingValue(tripData, mapOfPeriods.get(selectedDuration), "tripFare");
  // console.log(revenueChange);
  // console.log(filterTripsByPeriod(trips, 0))
  let tripChange = calculatePercentChangeUsingCount(tripData, mapOfPeriods.get(selectedDuration))

  let DriverChange = calculatePercentChangeUsingValue(driverData, mapOfPeriods.get(selectedDuration), 'driverId');
  let averageTripLengthChange = calculatePercentChangeOfAverage(tripData, mapOfPeriods.get(selectedDuration), 'tripDistance');
  let distanceCovered = calculatePercentChangeUsingValue(tripData, mapOfPeriods.get(selectedDuration), 'tripDistance');
  let averageTripsPerHour = (allFilteredTrips.length) / 24



  const Revenue = (data: any) => {
    var temp = 0;
    data.forEach((element: any) => {
      temp += element.tripFare;
    });
    return temp;
  };

  //All new drivers
  function filterNewDriver(trips: any[]): any[] {
    const filterEnd = new Date();

    let filterStart = new Date();
    filterStart = new Date(filterEnd.getTime() - 7 * 24 * 60 * 60 * 1000);

    const todayTrips = trips.filter((trip) => {
      const startTime = new Date(trip.signedUpDate);
      return startTime >= filterStart && startTime <= filterEnd;
    });

    return todayTrips;
  }

  let filteredDriver = filterNewDriver(driverData)
  let newDriverLength = filterNewDriver(driverData).length;

  //Avg Trip Length
  let totalFilteredTripLength = 0;

  CalvulatedValues.allFilteredTrips.forEach(element => {
    totalFilteredTripLength += element.tripDistance
  });
  var averageTripLength = String(totalFilteredTripLength / CalvulatedValues.allFilteredTrips.length)


  //Distance Covered
  let totalDistance = 0;
  CalvulatedValues.allFilteredTrips.forEach(elem => {
    totalDistance += Math.round(elem.tripDistance)
  })




  const DriverRevenueChart = () => {
    const primaryxAxis: AxisModel = { valueType: "DateTime" };
    // function getLast7DaysArray() {
    //   const today = new Date();
    //   const last7DaysArray = [];

    //   for (let i = 6; i >= 0; i--) {
    //     const currentDate = new Date(today);
    //     currentDate.setDate(today.getDate() - i);
    //     last7DaysArray.push(currentDate.toISOString().split('T')[0]);
    //   }

    //   return last7DaysArray;
    // }

    // const last7Days = getLast7DaysArray();



    // var data: any[] = [];

    // allFilteredTrips.forEach((driver) => {
    //   var totalRevenue = 0;
    //   allFilteredTrips.forEach((trip) => {
    //     if (last7Days.includes(driver.startTime.split("T")[0])) {
    //       totalRevenue += trip.tripFare;
    //     }
    //   });
    //   data.push({ Date: driver.startTime.split("T")[0], Revenue: driver.tripFare });
    // });

    interface ConvertedData {
      Date: string;
      Revenue: number;
    }

    function convertDataFormat(trips: Trip[]): ConvertedData[] {
      const dataMap: Map<string, number> = new Map();

      trips.forEach((trip) => {
        const date = trip.startTime.slice(0, 10);
        const revenue = dataMap.get(date) || 0;
        dataMap.set(date, revenue + trip.tripFare);
      });

      const data: ConvertedData[] = Array.from(dataMap, ([Date, Revenue]) => ({ Date, Revenue }));
      return data;
    }


    const convertedData = convertDataFormat(allFilteredTrips);
    console.log(convertedData);




    const data = [
      { "Date": "2023-06-01", "Revenue": 2500 },
      { "Date": "2023-06-02", "Revenue": 1800 },
      { "Date": "2023-06-03", "Revenue": 3500 },
      { "Date": "2023-06-04", "Revenue": 4100 },
      { "Date": "2023-06-05", "Revenue": 2900 },
      { "Date": "2023-06-06", "Revenue": 2200 },
      { "Date": "2023-06-07", "Revenue": 3800 },
      { "Date": "2023-06-08", "Revenue": 2700 },
      { "Date": "2023-06-09", "Revenue": 3100 },
      { "Date": "2023-06-10", "Revenue": 3900 }
    ]



    return (
      <LineChart
        primary_XAxis={primaryxAxis}
        data={convertedData}
        x_name="Date"
        y_name="Revenue"
        chart_name="Driver Revenue"
      />
    );
  };

  const TripDurationChart = () => {
    const primaryxAxis: AxisModel = { valueType: "DateTime" };
    const data = [
      { "Date": "2023-06-01", "Time": 17 },
      { "Date": "2023-06-02", "Time": 15 },
      { "Date": "2023-06-03", "Time": 19 },
      { "Date": "2023-06-04", "Time": 21 },
      { "Date": "2023-06-05", "Time": 18 },
      { "Date": "2023-06-06", "Time": 14 },
      { "Date": "2023-06-07", "Time": 20 },
      { "Date": "2023-06-08", "Time": 16 },
      { "Date": "2023-06-09", "Time": 18 },
      { "Date": "2023-06-10", "Time": 20 }
    ]



    return (
      <LineChart
        primary_XAxis={primaryxAxis}
        data={data}
        x_name="Date"
        y_name="Time"
        chart_name="Driver Revenue"
      />
    );
  }

  type CardPropType = {
    title?: string;
    duration?: string;
    value?: any;
    icon?: string;
    percent?: string;
    height?: string;
    content?: any;
    position?: string;
  };

  const DriverRevenueToolTip = () => {
    return (
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Aggregate of all driver's revenue</p>
        <p className="text-white">Drivers Revenue ---- {"₹ " + numberFormat(String(Revenue(CalvulatedValues.allFilteredTrips)))}</p>
        <p className="text-white">{selectedDuration}</p>
      </div>
    )
  }
  const MediumCardProps: CardPropType = {
    title: "DRIVER REVENUE",
    duration: selectedDuration,
    value: "₹ " + numberFormat(String(Revenue(CalvulatedValues.allFilteredTrips))),
    icon: "positive",
    percent: String(CalvulatedValues.revenueChange),
    content: DriverRevenueToolTip,
    position: "RightBottom"
  };

  const DriversTooltip = () => {
    return (
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Drivers getting added to the Meiro family</p>
        <p className="text-white">Total Drivers ---- {numberFormat(String(driverData.length))}</p>
        <p className="text-white">{selectedDuration}</p>
      </div>
    )
  }
  const SmallCardOneProps: CardPropType = {
    title: "DRIVERS",
    duration: selectedDuration,
    value: numberFormat(String(driverData.length)),
    icon: "positive",
    percent: String(CalvulatedValues.DriverChange),
    content: DriversTooltip,
    position: "RightBottom"
  };

  const TotalDriverChartTooltip=()=> {
    return (
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Chart for the total number of drivers per state </p>
      </div>
    )
  }
  const TotalDrivers: CardPropType = {
    title: "TOTAL DRIVERS",
    duration: selectedDuration,
    content: TotalDriverChartTooltip,
    position: "RightBottom"
  };

  const TotalTripsChartTooltip=()=>{
    return(
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Line chart for the total number of trips per date </p>      </div>
    )
  }
  const TotalTripsChart: CardPropType = {
    title: "TOTAL TRIPS",
    duration: selectedDuration,
    content: TotalTripsChartTooltip,
    position: "RightBottom"
  };

  const NewDriversTooltip = () => {
    return (
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Drivers getting added to the Meiro family in the selected duration</p>
        <p className="text-white">New Drivers added ---- 143</p>
        <p className="text-white">{selectedDuration}</p>
      </div>
    )
  }
  const NewDrivers: CardPropType = {
    title: "TOTAL NEW DRIVERS",
    duration: selectedDuration,
    value: "143",
    icon: "positive",
    percent: "7.35",
    content: NewDriversTooltip,
    position: "RightBottom"
  };

  const TotalTripsTooltip=()=>{
    return(
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Aggregate of number of trips</p>
        <p className="text-white">Total Trips ---- {numberFormat(String(CalvulatedValues.allFilteredTrips.length))}</p>
      </div>
    )
  }
  const TotalTrips: CardPropType = {
    title: "TOTAL TRIPS",
    duration: selectedDuration,
    value: numberFormat(String(CalvulatedValues.allFilteredTrips.length)),
    icon: "positive",
    percent: String(CalvulatedValues.tripChange),
    content: TotalTripsTooltip,
    position: "RightBottom"
  };

  const LiveTripsToolTip = () => {
    return (
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Total number of trips live</p>
        <p className="text-white">Total Live Trips ---- {numberFormat(String(2500))}</p>
      </div>
    )
  }
  const LiveTrips: CardPropType = {
    title: "LIVE TRIPS",
    duration: selectedDuration,
    value: "2,500",
    icon: "positive",
    percent: "0.11",
    content: LiveTripsToolTip,
    position: "RightBottom"
  };

  const  DistanceCoveredTooltip=()=>{
    return(
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Aggregate of distance covered by all drivers</p>
        <p className="text-white">Total Distance Covered ---- {`${numberFormat(String(totalDistance))} km`}</p>
      </div>
    )
  }
  const DistanceCovered: CardPropType = {
    title: "DISTANCE COVERED",
    duration: selectedDuration,
    value: `${numberFormat(String(totalDistance))} km`,
    icon: "positive",
    percent: String(CalvulatedValues.distanceCovered),
    content: DistanceCoveredTooltip,
    position: "RightBottom"
  };

  const AvgTripLengthTooltip =()=>{
    return(
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Average value of the trip length</p>
        <p className="text-white">Average Trip Length ---- {String(Number(averageTripLength).toFixed(2))} km</p>
      </div>
    )
  }
  const AvgTripLength: CardPropType = {
    title: "AVG TRIP LENGTH",
    duration: selectedDuration,
    value: String(Number(averageTripLength).toFixed(2)),
    icon: "negative",
    percent: String(CalvulatedValues.averageTripLengthChange),
    content: AvgTripLengthTooltip,
    position: "RightBottom"
  };


  const AvgTripsPerHourTooltip=()=>{
    return(
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Average number of trips per hour</p>
        <p className="text-white">Average Trips / Hour ---- {numberFormat(String(CalvulatedValues.averageTripsPerHour))}</p>
      </div>
    )
  }
  const SmallCardProps6: CardPropType = {
    title: "Avg trips / hour",
    duration: "",
    value: numberFormat(String(CalvulatedValues.averageTripsPerHour)),
    content: AvgTripsPerHourTooltip,
    position: "LeftBottom"
  };


  const MorningPeakTooltip=()=>{
    return(
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

  const EveningPeakTooltip=()=>{
    return(
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

  const TripDurationChartTooltip =()=>{
    return(
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Aggregate of the trip duration per date</p>
        </div>
    )
  }
  const ChartCardProps: CardPropType = {
    title: "TRIP DURATION",
    duration: selectedDuration,
    content: TripDurationChartTooltip,
    position: "RightBottom"
  };

   const PaymentTypeToolTip = () => {
    return (
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Ratio of all the payment type Online/Offline </p>
        <p className="text-white">Ratio ---- 75/25</p>
        <p className="text-white">{selectedDuration}</p>
      </div>
    )
   }
  const PaymentType: CardPropType = {
    title: "Payment Type: Online / Offline",
    duration: "",
    content: PaymentTypeToolTip,
    position: "LeftBottom"
  };

  const PieChartData = [
    { x: "Online", y: 75, text: "Online", fill: "#D6CDE9" },
    { x: "Offline", y: 25, text: "Offline", fill: "#F7F7F7" },
  ];
  // useEffect(() => {
  //   setSelectedDuration('Till Date');
  //   setSelectedState('All');
  // },[]);

  const columnTotalDriver = [

    { state: 'Maharashtra', drivers: 65000 },
    { state: 'Uttar Pradesh', drivers: 48000 },
    { state: 'Karnataka', drivers: 75000 },
    { state: 'Gujarat', drivers: 58000 },
    { state: 'Tamil Nadu', drivers: 68000 },
    { state: 'Rajasthan', drivers: 52000 },
    { state: 'West Bengal', drivers: 45000 }
  ];
  const TopTenDriversChartData = [
    { driver: 'Rajesh', revenue: 35000 },
    { driver: 'Amit', revenue: 34000 },
    { driver: 'Suresh', revenue: 33000 },
    { driver: 'Vikram', revenue: 32000 },
    { driver: 'Deepak', revenue: 31000 },
    { driver: 'Rohit', revenue: 30000 },
    { driver: 'Neha', revenue: 29000 },
    { driver: 'Priya', revenue: 28000 },
    { driver: 'Manish', revenue: 27500 },
    { driver: 'Pooja', revenue: 27000 }
  ];


  const TopTenDriversChartTooltip=()=>{
    return(
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Top 10 drivers with highest revenue</p>
      </div>
    )
  }
  const TopTenDrivers: CardPropType = {
    title: "TOP 10 DRIVERS",
    duration: selectedDuration,
    content: TopTenDriversChartTooltip,
    position: "RightBottom"
  };


  function calculateTotalRevenue(data: any[]) {
    const revenueMap: Map<string, number> = new Map();

    // Iterate over the dataset
    for (const item of data) {
      const startTime: any = item["startTime"].split("T")[0]; // Extract the date from the start time
      const tripFare: any = item["tripFare"]; // Get the trip fare

      if (revenueMap.has(startTime)) {
        // If the date is already in the map, add the trip fare to the existing revenue
        const currentRevenue: number = revenueMap.get(startTime)!;
        revenueMap.set(startTime, currentRevenue + tripFare);
      } else {
        // If the date is not in the map, initialize the revenue with the trip fare
        revenueMap.set(startTime, tripFare);
      }
    }

    // Convert the revenue map to an array of objects
    const revenueData: any[] = Array.from(revenueMap, ([date, revenue]) => ({ x: new Date(date), y: revenue }));
    revenueData.sort((a, b) => a.x - b.x); // Sort the array by date

    if (selectedDuration === "Today") {
      let revDataToday: any[] = [];
      CalvulatedValues.allFilteredTrips.forEach((trip) => {
        let date = new Date(trip.startTime.split("T")[0])
        let date2 = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0))
        date2.setHours(0, 0, 0, 0)
        revDataToday.push({ x: date2, y: trip.tripFare });
        revDataToday.sort((a, b) => a.x - b.x); // Sort the array by date
      });
      return revDataToday;
    } else {
      return revenueData;
    }

  }

  //Calculate max and min of the calculateTotalRevenue revenue
  const maxMinCount = calculateTotalRevenue(allFilteredTrips);
  //   const mins = maxMinCount.reduce((prev, curr) => prev.revenue < curr.revenue ? prev : curr);
  //   const maxs = maxMinCount.reduce((prev, curr) => prev.revenue > curr.revenue ? curr : prev);
  // console.log(mins,maxs)
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



  const minMaxVal = findMinMaxY(maxMinCount)



  // console.log(calculateTotalRevenue(allFilteredTrips))
  // console.log(minMaxVal)


  const top10Drivers = getTop10Drivers(allFilteredTrips, driverData);
  const topTenMinMaxVal = minMax(top10Drivers, 'revenue');
  const totalDriversMinMaxVal = minMax(columnTotalDriver, "drivers");
  // console.log(top10Drivers);



  return (
    <div className="extraSmallMargin overflow-x-hidden">
      <div className="displayFlex">
        <Filters />
      </div>
      <div className=" marginLeftSmall">
        <p className="text-2xl extraBoldWeightText  mainText grayText">Overview</p>
      </div>
      <div className="displayFlex textLeft flexJustifyBetween ">
        <SmallCard props={SmallCardOneProps} />
        <SmallCard props={LiveTrips} />
        <MediumCard props={MediumCardProps} />
      </div>
      <div>
        <CardWithChart
          prop1={TotalTripsChart}
          prop2={TotalTrips}
          chart={<DateTimeLineChart chartData={calculateTotalRevenue(CalvulatedValues.allFilteredTrips)} props={minMaxVal} chart_name={"No. of Trips"} />}
        />
      </div>
      <div>
        <CardWithChart
          prop1={TotalDrivers}
          prop2={NewDrivers}
          chart={<Bar columnData={columnTotalDriver} xTitle="state" yTitle="drivers" minMax={totalDriversMinMaxVal} Chart_name={"Drivers per State"} />}
        />
      </div>
      <div className=" marginLeftSmall marginTopMoreMedium">
        <p className="text-2xl extraBoldWeightText  mainText grayText">Fleet Performance</p>
      </div>
      <div className="displayFlex  textLeft flexJustifyBetween widthFull">
        <SmallCard props={AvgTripLength} />
        <SmallCard props={DistanceCovered} />
        <SmallCardWithChart
          props={PaymentType}
          chart={<Pie h="30%" w="30%" data={PieChartData} Chart_name="Payment Mode: Online/Offline" />}
        />
      </div>
      <div className=" displayFlex textLeft flexJustifyBetween widthFull">
        <ChartCard prop={TopTenDrivers} chart={<Bar columnData={top10Drivers} xTitle="driverName" yTitle="revenue" minMax={topTenMinMaxVal} />} Chart_name={"Revenue per driver"} />
      </div>




      <div className=" marginLeftSmall marginTopMoreMedium">
        <p className="text-2xl extraBoldWeightText  mainText grayText">Demand</p>
      </div>
      <div className=" displayFlex  textLeft flexJustifyBetween widthFull">
        <SmallCardFormatter props={SmallCardProps7} />
        <SmallCardFormatter props={SmallCardProps8} />
        <SmallCardFormatter props={SmallCardProps6} />
      </div>
      <div className="displayFlex textLeft flexJustifyCenter widthFull">
        <ChartCard prop={ChartCardProps} chart={<TripDurationChart />} />
      </div>
      {/* <div className="displayFlex textLeft flexJustifyCenter widthFull">
        <ChartCard prop={ChartCardProps} chart={<LineChartTremor />} />
      </div>
      <LineChartTremor /> */}
      {/* <div className="displayFlex textLeft flexJustifyCenter widthFull">
        <ChartCard prop={ChartCardProps} chart={<Histogram />} />
      </div>
      <div className="displayFlex textLeft flexJustifyCenter widthFull">
        <ChartCard prop={ChartCardProps} chart={<HistogramLine />} />
      </div> */}
      {/* <div className="displayFlex  textLeft flexJustifyBetween widthFull">
        <SmallCard props={AttritionedDrivers} />
        <SmallCard props={ActiveDrivers} />
        <SmallCard props={DistanceCovered} />
      </div>

      <div className="displayFlex  textLeft flexJustifyBetween widthFull">
        <SmallCard props={UnactivatedDrivers} />
        <SmallCard props={TotalVehicles} />
        <SmallCard props={AvgDistanceCovered} />
      </div>

      <div >
        <CardWithChart prop1={TotalTripsChart} prop2={TotalTrips} chart={<DriverRevenueChart />}/>
      </div>

      <div className="displayFlex  textLeft flexJustifyBetween widthFull">
        <SmallCard props={TotalDownloads} />
        <SmallCard props={TotalTripsAtTheTime} />
        <SmallCard props={LiveTrips} />
      </div>

      <div className=" displayFlex  textLeft flexJustifyBetween widthFull">
        <SmallCard props={DistanceCovered} />
        <SmallCard props={AvgDistanceCovered} />
        <SmallCard props={GrowthRateDrivers} />
      </div>

      <div>
        <CardWithChart
          prop1={CashFreeUsers2}
          prop2={ComplementCashFreeUsers}
          chart={<DriverRevenueChart />}
        />
      </div>

      <div className=" displayFlex  textLeft flexJustifyBetween widthFull">
        <SmallCard props={ConversionRate} />
        <SmallCard props={TotalRevenueMeiro} />
        <SmallCard props={AvgRevenuePerUser} />
      </div>

      {/* <div>
        <CardWithChart
          prop1={ReveneMeiro}
          prop2={MeiroRevenuePercentChange}
          chart={<Bar />}
        />
      </div>

      <div>
        <CardWithChart
          prop1={ReveneDriver}
          prop2={DriverRevenuePercentChange}
          chart={<Bar />}
        />
      </div> */}
    </div>
  );
};

export default Home;

// <div className="mt-10">
// <Filters />
//   <div className="displayFlex displayFlex-wrap   lg:displayFlex-nowrap  justify-center widthFull">
//     <div className="displayFlex m-3 displayFlex-wrap justify-center  gap-1 items-center widthFull">

//       <div className=" displayFlex justify-center widthFull sm:displayFlex-row">
//         {earningData.map((item: EarningDataType) => (
//           <div className=" bg-white dark:text-gray-200 dark:bg-secondary-dark-bg displayFlex justify-evenly w-1/3 m-2 p-4 rounded-2xl">

//             <div className="text-2xl lg:text-2xl mr-2 displayFlex justify-center font-semibold">  <div className={`text-3xl lg:text-3xl mr-2`}  style={{color: currentColor}}>{item.icon}</div>{item.title}</div>
//             <div className="text-2xl lg:text-2xl mr-2">
//               <span className="text-lg lg:text-3xl font-semibold">
//                 {item.title === "Total Drivers" && total_drivers}
//                 {item.title === "Total Revenue" &&
//                   "₹" + numberFormat(String(total_revenue))}
//                 {item.title === "Total Trips" && numberFormat(String(total_trips))}
//               </span></div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>

//   <div className="displayFlex gap-10 displayFlex-wrap justify-center ">

//   </div>

//   <div className="displayFlex gap-10 m-4 displayFlex-wrap justify-center">

//     <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
//     <div className="displayFlex flexJustifyBetween items-center gap-2 mb-10">
//         <p className="text-xl font-semibold">Revenue: </p>

//       </div>
//       <div className="md:widthFull overflow-auto">
//       <Bar />
//       </div>
//     </div>
//     <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
//       <div className="displayFlex flexJustifyBetween items-center gap-2 mb-10">
//         <p className="text-xl font-semibold">Sales Overview</p>

//       </div>
//       <div className="md:widthFull overflow-auto">
//         <Pie />
//       </div>
//     </div>
//   </div>
//   <div className="displayFlex gap-10 m-4 displayFlex-wrap justify-center">

//     <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
//       <div className="displayFlex flexJustifyBetween items-center gap-2 mb-10">
//         <p className="text-xl font-semibold">Sales Overview</p>

//       </div>
//       <div className="md:widthFull overflow-auto">
//         <Area />
//       </div>
//     </div>
//     <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
//       <div className="displayFlex flexJustifyBetween items-center gap-2 mb-10">
//         <p className="text-xl font-semibold">Sales Overview</p>
//       </div>
//       <div className="md:widthFull overflow-auto">
//         <Line />
//       </div>
//     </div>
// </div>
//   </div>
