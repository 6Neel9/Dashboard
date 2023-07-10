import React, { useEffect, useState } from "react";
import {
  Filters,
  SmallCard,
  CardWithChart,
  ChartCard,
  LineChart,
  Bar,
  Pie,
  SmallCardWithChart,
} from "../components";
import "../Styles.scss";
import { useStateContext } from "../contexts/ContextProvider";
import { filterTripsByPeriod, filteredTrips, calculatePercentChangeUsingValue, filteredRevenueUpDown,calculatePercentChangeUsingCount,calculatePercentChangeOfAverage,minMax } from "../Utils/FilteringFunctions";
import { mapOfPeriods } from "../Utils/Constants";
import AnalyticsCalculation from "../Utils/AnalyticsCalculation";


type CardPropType = {
  title?: string;
  duration?: string;
  value?: string;
  icon?: string;
  percent?: string;
  height?: string;
};

const AvgDriverRevenueperTrip: CardPropType = {
  title: "AVERAGE DRIVER REVENUE / TRIP",
  duration: "Last 7 days",
  value: "₹115",
  icon: "positive",
  percent: "2.45",
};
const SmallCardProps2: CardPropType = {
  title: "TOTAL COMPANY REVENUE",
  duration: "Last 7 days",
  value: "₹347800",
  icon: "positive",
  percent: "8,.75",
};
const SmallCardProps3: CardPropType = {
  title: "AVG COMPANY REVENUE / TRIP",
  duration: "LAST MONTH",
  value: "₹18",
  icon: "positive",
  percent: "0.78",
};

const AvgRevenuePerTrip: CardPropType = {
  title: "AVG REVENUE / KM",
  duration: "LAST 7 DAYS",
  value: "₹46.54",
};
const AvgRevenuePerHour: CardPropType = {
  title: "AVG REVENUE / HOUR",
  duration: "LAST 7 DAYS",
  value: "₹1560",
  icon: "positive",
  percent: "2.45",
};
const AvgRevenuePerUser: CardPropType = {
  title: "AVG REVENUE / USER",
  duration: "Last 7 days",
  value: "₹3489",
  icon: "positive",
  percent: "2.45",
};
const AvgRevPerKm: CardPropType = {
  title: "AVG REVENUE / KM",
  duration: "Last 7 days",
  value: "₹34",
  icon: "positive",
  percent: "2.45",
};

const TotalRevenueForDriver: CardPropType = {
  title: "TOTAL REVENUE FOR DRIVER",
  duration: "MONTHLY REVENUE",
};

const ChartForTotalRevenue: CardPropType = {
  title: "TOTAL REVENUE FOR DRIVERS",
  duration: "LAST MONTH",
  value: "₹11426",
  icon: "positive",
  percent: "2.35",
};

const RevenuePerOperatingHourwrtTime: CardPropType = {
  title: "REVENUE PER OPERATING HOUR",
  duration: "Last 7 days",
};
const RevenuePerOperatingHourwrtCityState: CardPropType = {
  title: "REVENUE PER OPERATING HOUR",
  duration: "State,City wise",
};

const RevenuePerKmwrtTime: CardPropType = {
  title: "REVENUE PER KM",
  value: "₹25",
  duration: "Last 7 days",
  icon: "positive",
  percent: "1.65",
};

const RevenuePerKmwrtStateCity: CardPropType = {
  title: "REVENUE PER KM",
  value: "₹25",
  duration: "State,City wise",
  icon: "positive",
  percent: "1.65",
};

const CompanyRevenueperTrip: CardPropType = {
  title: "TOTAL COMPANY REVENUE / TRIP",

  duration: "Last Month",
};

const CompanyRevenueperTripDetails: CardPropType = {
  title: "TOTAL COMPANY REVENUE / TRIP",
  duration: "LAST MONTH",
  value: "₹16750",
  icon: "positive",
  percent: "5.09",
};

const RevenuePerTripwrtTime: CardPropType = {
  title: "REVENUE PER TRIP",
  value: "₹25",
  duration: "Last 7 days",
  icon: "positive",
  percent: "1.65",
};

const RevenuePerTripwrtCityStates: CardPropType = {
  title: "REVENUE PER TRIP",
  value: "₹25",
  duration: "State,City wise",
  icon: "positive",
  percent: "1.65",
};

const RevenueAnalytics = () => {

  const {
    currentColor,
    currentMode,
    selectedDuration,
    selectedState,
    setSelectedDuration,
    setSelectedState,
    tripData,
    driverData
  } = useStateContext();

  const CalvulatedValues = AnalyticsCalculation();

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
  // const [tripData, setTrips] = useState<Trip[]>([]);

  // useEffect(() => {
  //   fetch("http://localhost:5000/yuja-sm/v1/trips", {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((e) => {
  //       setTrips(e);
  //     });
  // }, [selectedDuration, selectedState]);

  // function filterTripsByPeriod(trips: Trip[], period: number): Trip[] {
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

  //Filter Function
 

  function numberFormat(x: string | number): string {
    if (typeof x === 'number') {
      return x.toLocaleString(undefined, { maximumFractionDigits: 1 });
    }
    if (typeof x === 'string') {
      const parts = x.split('.');
      const formattedInteger = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      if (parts.length === 2) {
        const decimalPart = parts[1].substring(0, 2); // Limit decimal to 1 digit
        return `${formattedInteger}.${decimalPart}`;
      }
      return formattedInteger;
    }
    return '';
  }
  const Revenue = (data: any) => {
    var temp = 0;
    data.forEach((element: any) => {
      temp += element.tripFare;
    });
    return temp;
  };

  const PaymentModeCalculate = () => {
    var online = 0;
    var offline = 0;
    CalvulatedValues.allFilteredTrips.forEach((element: any) => {
      if (element.paymentType === "cash") {
        offline += 1;
      }
      else {
        online += 1;
      }
    });
    const pt = { online, offline }
    return pt;
  }

  const DriverRevenue: CardPropType = {
    title: "DRIVER REVENUE",
    duration: selectedDuration,
    value: "₹ " + numberFormat(String(Revenue(CalvulatedValues.allFilteredTrips))),
    icon: "positive",
    percent: String(CalvulatedValues.driverRevenueChange),
  }

  const PaymentType: CardPropType = {
    title: "PAYMENT MODE",
    duration: selectedDuration,
  }

  const PieChartData = [
    {
      x: 'Online',
      y: PaymentModeCalculate().online,
      text: `Online (${Math.round(PaymentModeCalculate().online / (PaymentModeCalculate().offline + PaymentModeCalculate().online) * 100)} %)`
      ,fill: "#D6CDE9"
    },
    {
      x: 'Offline',
      y: PaymentModeCalculate().offline,
      text: `Offline (${Math.round(PaymentModeCalculate().offline / (PaymentModeCalculate().offline + PaymentModeCalculate().online) * 100)} %)`
      , fill: "#F7F7F7"
    },
  ];

  const AvgDriverRevenue: CardPropType = {
    title: "AVG DRIVER REVENUE / TRIP",
    duration: selectedDuration,
    value: "₹ " + numberFormat(String(Revenue(CalvulatedValues.allFilteredTrips) / CalvulatedValues.allFilteredTrips.length)),
    icon: "positive",
    percent: String(CalvulatedValues.avgRevenuePerTrip),
  }

  const RevenuePerTrips: CardPropType = {
    title: "REVENUE PER TRIP",
    duration: selectedDuration,
  };

  const RevenuePerTrips2: CardPropType = {
    title: "REVENUE PER TRIP",
    duration: selectedDuration,
    value: "₹ " + numberFormat(String(Revenue(CalvulatedValues.allFilteredTrips) / CalvulatedValues.allFilteredTrips.length)),
    icon: "positive",
    percent: String(CalvulatedValues.avgRevenuePerTrip),
  };

  const RevenuePerOperatingHour: CardPropType = {
    title: "REVENUE PER OPERATING HOUR",
    duration: selectedDuration,
  };

  const RevenuePerOperatingHour2: CardPropType = {
    title: "REVENUE PER OPERATING HOUR",
    duration: selectedDuration,
    value: "₹ 8,300",
    icon: "positive",
    percent: "0.6",
  };

  const RevenuePerTripChart = [
    { months: 'January', revenuePerTrip: getRandomNumber(50, 160) },
    { months: 'February', revenuePerTrip: getRandomNumber(50, 160) },
    { months: 'March', revenuePerTrip: getRandomNumber(50, 160) },
    { months: 'April', revenuePerTrip: getRandomNumber(50, 160) },
    { months: 'May', revenuePerTrip: getRandomNumber(50, 160) },
    { months: 'June', revenuePerTrip: getRandomNumber(50, 160) },
    { months: 'July', revenuePerTrip: getRandomNumber(50, 160) },
    { months: 'August', revenuePerTrip: getRandomNumber(50, 160) },
    { months: 'September', revenuePerTrip: getRandomNumber(50, 160) },
    { months: 'October', revenuePerTrip: getRandomNumber(50, 160) }
  ];
  const RevenuePerHourChart = [
    { states: 'Maharashtra', revenuePerHour: getRandomNumber(5000, 16000) },
    { states: 'Uttar Pradesh', revenuePerHour: getRandomNumber(5000, 16000) },
    { states: 'Karnataka', revenuePerHour: getRandomNumber(5000, 16000) },
    { states: 'Gujarat', revenuePerHour: getRandomNumber(5000, 16000) },
    { states: 'Tamil Nadu', revenuePerHour: getRandomNumber(5000, 16000) },
    { states: 'Rajasthan', revenuePerHour: getRandomNumber(5000, 16000) },
    { states: 'West Bengal', revenuePerHour: getRandomNumber(5000, 16000) },
    { states: 'Punjab', revenuePerHour: getRandomNumber(5000, 16000) },
    { states: 'Madhya Pradesh', revenuePerHour: getRandomNumber(5000, 16000) },
    { states: 'Bihar', revenuePerHour: getRandomNumber(5000, 16000) }
  ];
    
  function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // useEffect(() => {
  //   setSelectedDuration("Till Date");
  //   setSelectedState("All");
  // }, []);
  return (
    <div className="extraSmallMargin">
      <div className="displayFlex">
        <Filters />
      </div>

      <div className="displayFlex  textLeft flexJustifyBetween widthFull">
        <SmallCard props={DriverRevenue} />
        <SmallCardWithChart props={PaymentType} chart={<Pie h='30%' w='30%' data={PieChartData} Chart_name="Payment Mode: Online/Offline" />} />
        <SmallCard props={AvgDriverRevenue} />
      </div>
      <div>
        <CardWithChart
          prop1={RevenuePerTrips}
          prop2={RevenuePerTrips2}
          chart={<Bar columnData={RevenuePerTripChart} xTitle="months" yTitle="revenuePerTrip" Chart_name="Revenue/trip per month" minMax={minMax(RevenuePerTripChart,'revenuePerTrip')}/>}
        />
      </div>
      <div>
        <CardWithChart
          prop1={RevenuePerOperatingHour}
          prop2={RevenuePerOperatingHour2}
          chart={<Bar columnData={RevenuePerHourChart} xTitle="states" yTitle="revenuePerHour" Chart_name="Revenue/hr per state" minMax={minMax(RevenuePerHourChart,'revenuePerHour')}/>}
        />
      </div>


      {/* <div>
        <CardWithChart
          prop1={TotalRevenueForDriver}
          prop2={ChartForTotalRevenue}
          chart={<Bar />}
        />
      </div>

      <div>
        <CardWithChart
          prop1={CompanyRevenueperTrip}
          prop2={CompanyRevenueperTripDetails}
          chart={<Bar />}
        />
      </div>

      <div className=" displayFlex textLeft flexJustifyBetween widthFull">
        <ChartCard prop={RevenuePerTripwrtTime} chart={<Bar />} />
        <ChartCard prop={RevenuePerTripwrtCityStates} chart={<Bar />} />
      </div>

      <div className=" displayFlex textLeft flexJustifyBetween widthFull">
        <ChartCard prop={RevenuePerKmwrtTime} chart={<Bar />} />
        <ChartCard prop={RevenuePerKmwrtStateCity} chart={<Bar />} />
      </div>

      <div className=" displayFlex textLeft flexJustifyBetween widthFull">
        <ChartCard prop={RevenuePerOperatingHourwrtTime} chart={<Bar />} />
        <ChartCard prop={RevenuePerOperatingHourwrtCityState} chart={<Bar />} />
      </div>

      <div className=" displayFlex  textLeft flexJustifyBetween widthFull">
        <SmallCard props={AvgRevenuePerHour} />
        <SmallCard props={AvgRevenuePerUser} />
        <SmallCard props={AvgDriverRevenueperTrip} />
      </div>

      <div className=" displayFlex  textLeft flexJustifyBetween widthFull">
        <SmallCard props={SmallCardProps2} />
        <SmallCard props={SmallCardProps3} />
        <SmallCard props={AvgRevPerKm} />
      </div> */}
    </div>
  );
};

export default RevenueAnalytics;
