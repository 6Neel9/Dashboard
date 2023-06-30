import React, { useEffect, useState } from "react";
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
import { Bar, LineChart, Pie } from "../components";
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
import "../Styles.css";

import { useSelector, useDispatch } from "react-redux";
import { fetchDrivers } from "../store/driverSlice";
import { fetchTrips } from "../store/tripSlice";

//
import AreaCharts from "../components/Charts/AreaCharts";
import SmallCardFormatter from "../components/Cards/SmallCardFormatter";

const Home = ({ data }: any) => {
  const {
    currentColor,
    currentMode,
    selectedDuration,
    selectedState,
    setSelectedDuration,
    setSelectedState,
  } = useStateContext();
  const [drivers, setDrivers] = useState<any[]>([]);
  const [trips, setTrips] = useState<any[]>([]);

  // console.log(selectedDuration, selectedState);
  //Redux dispatch call
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(fetchDrivers());
    dispatch(fetchTrips())
  }, []);



  //Getting redux data
  const driverData: any = useSelector((state: any) => state.drivers);
  const tripData: any = useSelector((state: any) => state.trips);
  // console.log(driverData)
  // console.log(tripData)



  // Filter function
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






  //
  var total_revenue = 0;
  function numberFormat(x: string) {
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== "") lastThree = "," + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
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
    data.forEach((element: any) => {
      const temp = element.trips;
      temp.forEach((e: any) => {
        // date_trip.push(new Date(e.etime))
        // revenue_trip_temp.push({date: new Date(e.etime), revenue: e.revenue})
        new_dateTimeData.push({ x: new Date(e.etime), y: e.revenue });
      });
    });
    for (var j = 0; j < new_dateTimeData.length - 1; j++) {
      var i = j;
      var e1 = new_dateTimeData[i];
      var e2 = new_dateTimeData[i + 1];
      while (e1.x > e2.x) {
        const t = new_dateTimeData[i];
        new_dateTimeData[i] = new_dateTimeData[i + 1];
        new_dateTimeData[i + 1] = t;
        i++;
      }
    }

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
  // console.log(trips);
  //Filter func 

  function filterTripsByPeriod(trips: Trip[], period: number): Trip[] {
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


  let allFilteredTrips = filteredTrips()
  // console.log(filterTripsByPeriod(trips, 0))

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

  let newDriverLength = filterNewDriver(drivers).length;

  //Avg Trip Length
  let totalFilteredTripLength = 0;
  allFilteredTrips.forEach(element => {
    totalFilteredTripLength += element.tripDistance
  });
  var averageTripLength = String(Math.round(totalFilteredTripLength/allFilteredTrips.length))
  

  //Distance Covered
  let totalDistance = 0;
  allFilteredTrips.forEach(elem=>{
    totalDistance += Math.round(elem.tripDistance)
  })




  const DriverRevenueChart = () => {
    const primaryxAxis: AxisModel = { valueType: "Category" };
    // const data: any[] = [
    //   { month: 'Jan', sales: 35 }, { month: 'Feb', sales: 28 },
    //   { month: 'Mar', sales: 34 }, { month: 'Apr', sales: 32 },
    //   { month: 'May', sales: 40 }, { month: 'Jun', sales: 32 },
    //   { month: 'Jul', sales: 35 }, { month: 'Aug', sales: 55 },
    //   { month: 'Sep', sales: 38 }, { month: 'Oct', sales: 30 },
    //   { month: 'Nov', sales: 25 }, { month: 'Dec', sales: 32 }
    // ]
    var data: any[] = [];

    drivers.forEach((driver) => {
      var totalRevenue = 0;
      trips.forEach((trip) => {
        if (driver.driverId === trip.driverId) {
          totalRevenue += trip.tripFare;
        }
      });
      data.push({ Driver: driver.firstName, Revenue: totalRevenue });
    });



    return (
      <LineChart
        primary_XAxis={primaryxAxis}
        data={data}
        x_name="Driver"
        y_name="Revenue"
        chart_name="Driver Revenue"
      />
    );
  };

  type EarningDataType = {
    icon: JSX.Element;
    amount: string;
    percentage: string;
    title: string;
    iconColor: string;
    iconBg: string;
    pcColor: string;
  };

  type CardPropType = {
    title?: string;
    duration?: string;
    value?: any;
    icon?: string;
    percent?: string;
    height?: string;
  };

  const MediumCardProps: CardPropType = {
    title: "DRIVER REVENUE",
    duration: selectedDuration,
    value: "₹ " + numberFormat(String(Math.round(Revenue(allFilteredTrips)))),
    icon: "positive",
    percent: "10",
  };

  const SmallCardOneProps: CardPropType = {
    title: "DRIVERS",
    duration: selectedDuration,
    value: numberFormat(String(drivers.length)),
    icon: "positive",
    percent: "5.45",
  };
  const SmallCardTwoProps: CardPropType = {
    title: "ACTIVE USERS",
    duration: selectedDuration,
    value: numberFormat(String(drivers.length)),
    icon: "Negative",
    percent: "3.75",
  };

  const AttritionedDrivers: CardPropType = {
    title: "TOTAL ATTRITIONED DRIVERS",
    duration: selectedDuration,
    value: "576",
    icon: "Negative",
    percent: "1.75",
  };

  const ActiveDrivers: CardPropType = {
    title: "TOTAL ACTIVE DRIVERS",
    duration: selectedDuration,
    value: "8990",
    icon: "Positive",
    percent: "1.67",
  };

  const PercentActiveDrivers: CardPropType = {
    title: "TOTAL ACTIVE DRIVERS",
    duration: selectedDuration,
    value: "9.1%",
    icon: "positive",
    percent: "1.69",
  };
  const VehiclePercent: CardPropType = {
    title: "TOTAL VEHICLES",
    duration: selectedDuration,
    value: "6.87%",
    icon: "positive",
    percent: "1.69",
  };

  const UnactivatedDrivers: CardPropType = {
    title: "TOTAL UNACTIVE DRIVERS",
    duration: selectedDuration,
    value: "678",
    icon: "positive",
    percent: "2.79",
  };

  const TotalVehicles: CardPropType = {
    title: "TOTAL VEHICLES",
    duration: selectedDuration,
    value: "1056",
    icon: "positive",
    percent: "7.79",
  };
  const CardWithChartProp1: CardPropType = {
    title: "DRIVER REVENUE",
    duration: selectedDuration,
  };

  const ReveneMeiro: CardPropType = {
    title: "CHANGE OVER MEIRO REVENUE",
    duration: selectedDuration,
  };

  const AvgDistPerUser: CardPropType = {
    title: "AVG DISTANCE PER USER",
    duration: selectedDuration,
  };

  const ReveneDriver: CardPropType = {
    title: "CHANGE OVER DRIVER REVENUE",
    duration: selectedDuration,
  };

  const AvgTripDuration: CardPropType = {
    title: "AVG TRIP DURATION",
    duration: selectedDuration,
  };

  const CashFreeUsers2: CardPropType = {
    title: "CASH FREE USERS",
    duration: selectedDuration,
  };

  const TotalDrivers: CardPropType = {
    title: "TOTAL DRIVERS",
    duration: selectedDuration,
  };
  const TotalTripsChart: CardPropType = {
    title: "TOTAL TRIPS",
    duration: selectedDuration,
  };
  const CardWithChartProp2: CardPropType = {
    title: "MRR",
    duration: selectedDuration,
    value: "₹ 28,07,653",
    icon: "positive",
    percent: "7.35",
  };

  const MeiroRevenuePercentChange: CardPropType = {
    title: "CHANGE OVER MEIRO REVENUE",
    duration: selectedDuration,
    value: "28%",
    icon: "positive",
    percent: "5.32",
  };

  const DriverRevenuePercentChange: CardPropType = {
    title: "CHANGE OVER DRIVER REVENUE",
    duration: selectedDuration,
    value: "17%",
    icon: "positive",
    percent: "1.52",
  };

  const NewDrivers: CardPropType = {
    title: "TOTAL NEW DRIVERS",
    duration: "Last 7 Days",
    value: newDriverLength,
    icon: "positive",
    percent: "7.35",
  };

  const TotalTrips: CardPropType = {
    title: "TOTAL TRIPS",
    duration: selectedDuration,
    value: numberFormat(String(filteredTrips().length)),
    icon: "positive",
    percent: "0.35",
  };

  const TotalDownloads: CardPropType = {
    title: "TOTAL DOWNLOADS",
    duration: selectedDuration,
    value: "1,00,043",
    icon: "positive",
    percent: "0.31",
  };

  const TotalTripsAtTheTime: CardPropType = {
    title: "TOTAL TRIPS",
    duration: "For this particular day",
    value: "1032",
    icon: "negative",
    percent: "0.12",
  };

  const LiveTrips: CardPropType = {
    title: "LIVE TRIPS",
    duration: "Currently",
    value: "122",
    icon: "positive",
    percent: "0.11",
  };

  const DistanceCovered: CardPropType = {
    title: "DISTANCE COVERED",
    duration: selectedDuration,
    value: `${String(totalDistance)} km`,
    icon: "positive",
    percent: "0.71",
  };

  const AvgDistanceCovered: CardPropType = {
    title: "AVG TRIP LENGTH",
    duration: selectedDuration,
    value: averageTripLength,
    icon: "negative",
    percent: "0.91",
  };

  const GrowthRateDrivers: CardPropType = {
    title: "GROWTH RATE OF DRIVERS",
    duration: selectedDuration,
    value: "2.7%",
    icon: "negative",
    percent: "0.36",
  };

  const ComplementCashFreeUsers: CardPropType = {
    title: "COMPLEMENT OF CASH FREE USERS",
    duration: selectedDuration,
    value: "25,997",
    icon: "negative",
    percent: "0.3",
  };

  const ConversionRate: CardPropType = {
    title: "ACTIVE DRIVERS AS AGAINST DOWNLOADS",
    duration: selectedDuration,
    value: "25,876",
    icon: "positive",
    percent: "2.46",
  };

  const TotalRevenueMeiro: CardPropType = {
    title: "TOTAL REVENUE FOR MEIRO",
    duration: selectedDuration,
    value: "₹ 50,589",
    icon: "positive",
    percent: "2.46",
  };

  const AvgRevenuePerUser: CardPropType = {
    title: "AVG REVENUE / USER",
    duration: selectedDuration,
    value: "₹ 3489",
    icon: "positive",
    percent: "2.45",
  };

  const TopDrivers: CardPropType = {
    title: "TOP 10 DRIVERS",
    value: "₹25",
    duration: "Last 7 days",
    icon: "positive",
    percent: "1.65",
  };

  const SmallCardProps6: CardPropType = {
    title: "Avg trips / hour",
    duration: "",
    value: "642",
  };
  const SmallCardProps7: CardPropType = {
    title: "Morning peak",
    duration: "1075 average trips per hour",
    value: "10:12 AM",
  };
  const SmallCardProps8: CardPropType = {
    title: "Evening peak",
    duration: "1075 average trips per hour",
    value: "7:13 PM",
  };

  const ChartCardProps: CardPropType = {
    title: "TRIP DURATION",
    duration: "Last 7 days",
  };

  const PaymentType: CardPropType = {
    title: "ACTIVE / INACTIVE",
    duration: "",
  };

  const PieChartData = [
    { x: "Online", y: 75, text: "Online" },
    { x: "Offline", y: 25, text: "Offline" },
  ];
  // useEffect(() => {
  //   setSelectedDuration('Till Date');
  //   setSelectedState('All');
  // },[]);

  return (
    <div className="extraSmallMargin">
      <div className="displayFlex">
        <Filters />
      </div>
      <div className=" marginLeftSmall">
        <p className="text-2xl extraBoldWeightText  mainText grayText">Overview</p>
      </div>
      <div className="displayFlex textLeft flexJustifyBetween ">
        <SmallCard props={SmallCardOneProps} />
        {/* <SmallCard props={SmallCardTwoProps}/> */}
        <SmallCard props={LiveTrips} />
        <MediumCard props={MediumCardProps} />
      </div>
      <div>
        <CardWithChart
          prop1={TotalTripsChart}
          prop2={TotalTrips}
          chart={<DriverRevenueChart />}
        />
      </div>
      {/* <div >
        <CardWithChart prop1={CardWithChartProp1} prop2={CardWithChartProp2} chart={<DriverRevenueChart />}/>
      </div> */}
      <div>
        <CardWithChart
          prop1={TotalDrivers}
          prop2={NewDrivers}
          chart={<Bar />}
        />
      </div>
      <div className=" marginLeftSmall marginTopMoreMedium">
        <p className="text-2xl extraBoldWeightText  mainText grayText">Fleet Performance</p>
      </div>
      <div className="displayFlex  textLeft flexJustifyBetween widthFull">
        <SmallCard props={AvgDistanceCovered} />
        <SmallCard props={DistanceCovered} />
        <SmallCardWithChart
          props={PaymentType}
          chart={<Pie h="30%" w="30%" data={PieChartData} />}
        />
      </div>
      <div className=" displayFlex textLeft flexJustifyCenter widthFull">
        <ChartCard prop={TopDrivers} chart={<Bar />} />
      </div>

      <div className=" marginLeftSmall marginTopMoreMedium">
        <p className="text-2xl extraBoldWeightText  mainText grayText">Demand</p>
      </div>
      <div className=" displayFlex  textLeft flexJustifyBetween widthFull">
        <SmallCardFormatter props={SmallCardProps8} />
        <SmallCardFormatter props={SmallCardProps7} />
        <SmallCardFormatter props={SmallCardProps6} />
      </div>
      <div className="displayFlex textLeft flexJustifyCenter widthFull">
        <ChartCard prop={ChartCardProps} chart={<DriverRevenueChart />} />
      </div>
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
