import React, { useEffect, useState, useCallback, useMemo, Suspense, lazy } from "react";
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
import { filterTripsByPeriod, filteredTrips, calculatePercentChangeUsingValue, filteredRevenueUpDown, calculatePercentChangeUsingCount, calculatePercentChangeOfAverage, minMax, getRevenuePerTripChart } from "../Utils/FilteringFunctions";
import { mapOfPeriods } from "../Utils/Constants";
import AnalyticsCalculation from "../Utils/AnalyticsCalculation";
import { Trip } from "../contexts/ContextProvider";



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

  const CalculatedValues = AnalyticsCalculation();


  //
  const LazyLoader = lazy(() => import("../components/Charts/Bar"))
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
  const Revenue = useMemo(() => {
    return (data: any) => {
      var totalRevenue = 0;
      data.forEach((element: any) => {
        totalRevenue += element.tripFare;
      });
      return totalRevenue;
    };
  }, []);

  const PaymentModeCalculate = useCallback(() => {
    var online = 0;
    var offline = 0;
    CalculatedValues.allFilteredTrips.forEach((element: any) => {
      if (element.paymentType === "cash") {
        offline += 1;
      } else {
        online += 1;
      }
    });
    const pt = { online, offline };
    return pt;
  }, [CalculatedValues.allFilteredTrips]);


  const DriverRevenueToolTip = () => {
    return (
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Aggregate of all driver's revenue</p>
        <p className="text-white">Drivers Revenue ---- {"₹ " + numberFormat(String(Revenue(CalculatedValues.allFilteredTrips)))}</p>
        <p className="text-white">{selectedDuration}</p>
      </div>
    )
  }
  const DriverRevenue: CardPropType = {
    title: "DRIVER REVENUE",
    duration: selectedDuration,
    value: "₹ " + numberFormat(String(Revenue(CalculatedValues.allFilteredTrips))),
    icon: "positive",
    percent: String(CalculatedValues.driverRevenueChange),
    content: DriverRevenueToolTip,
    position: "RightBottom"
  }

  const PaymentTypeToolTip = () => {
    return (
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Ratio of all the payment type Online/Offline </p>
        <p className="text-white">Ratio ---- {Math.round(PaymentModeCalculate().online / (PaymentModeCalculate().offline + PaymentModeCalculate().online) * 100)}/{Math.round(PaymentModeCalculate().offline / (PaymentModeCalculate().offline + PaymentModeCalculate().online) * 100)}</p>
        <p className="text-white">{selectedDuration}</p>
      </div>
    )
  }
  const PaymentType: CardPropType = {
    title: "PAYMENT MODE",
    duration: selectedDuration,
    content: PaymentTypeToolTip,
    position: "LeftBottom"
  }

  const PieChartData = [
    {
      x: 'Online',
      y: PaymentModeCalculate().online,
      text: `Online (${Math.round(PaymentModeCalculate().online / (PaymentModeCalculate().offline + PaymentModeCalculate().online) * 100)} %)`
      , fill: "#D6CDE9"
    },
    {
      x: 'Offline',
      y: PaymentModeCalculate().offline,
      text: `Offline (${Math.round(PaymentModeCalculate().offline / (PaymentModeCalculate().offline + PaymentModeCalculate().online) * 100)} %)`
      , fill: "#F7F7F7"
    },
  ];


  const AvgDriverRevenueTooltip = () => {
    return (
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Average of driver's revenue per trip</p>
        <p className="text-white">Avg Drivers Revenue per Trip ---- {"₹ " + numberFormat(String(Revenue(CalculatedValues.allFilteredTrips) / CalculatedValues.allFilteredTrips.length))}</p>
        <p className="text-white">{selectedDuration}</p>
      </div>
    )
  }
  const AvgDriverRevenue: CardPropType = {
    title: "AVG DRIVER REVENUE / TRIP",
    duration: selectedDuration,
    value: "₹ " + numberFormat(String(Revenue(CalculatedValues.allFilteredTrips) / CalculatedValues.allFilteredTrips.length)),
    icon: "positive",
    percent: String(CalculatedValues.avgRevenuePerTrip),
    content: AvgDriverRevenueTooltip,
    position: "RightBottom"
  }

  const RevenuePerTripChartTooltip = () => {
    return (
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Revenue per trip per state</p>
      </div>
    )
  }
  const RevenuePerTrips: CardPropType = {
    title: "REVENUE PER TRIP",
    duration: selectedDuration,
    content: RevenuePerTripChartTooltip,
    position: "RightBottom"
  };

  const RevenuePerTripTooltip = () => {
    return (
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Average Revenue per trip</p>
        <p className="text-white">Avg Revenue per Trip ---- {"₹ " + numberFormat(String(Revenue(CalculatedValues.allFilteredTrips) / CalculatedValues.allFilteredTrips.length))}</p>
        <p className="text-white">{selectedDuration}</p>
      </div>
    )
  }
  const RevenuePerTrips2: CardPropType = {
    title: "REVENUE PER TRIP",
    duration: selectedDuration,
    value: "₹ " + numberFormat(String(Revenue(CalculatedValues.allFilteredTrips) / CalculatedValues.allFilteredTrips.length)),
    icon: "positive",
    percent: String(CalculatedValues.avgRevenuePerTrip),
    content: RevenuePerTripTooltip,
    position: "RightBottom"
  };

  const RevenuePerOperatingHoursChartTooltip = () => {
    return (
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Revenue per operating hour per state</p>
      </div>
    )
  }
  const RevenuePerOperatingHour: CardPropType = {
    title: "REVENUE PER OPERATING HOUR",
    duration: selectedDuration,
    content: RevenuePerOperatingHoursChartTooltip,
    position: "RightBottom"
  };

  const RevenuePerOperatingHourTooltip = () => {
    return (
      <div className="px-2 py-2 text-sm">
        <p className="text-white">Average Revenue per operating hour</p>
        <p className="text-white">Avg Revenue per Operating Hour ---- ₹ 8,300</p>
        <p className="text-white">{selectedDuration}</p>
      </div>
    )
  }
  const RevenuePerOperatingHour2: CardPropType = {
    title: "REVENUE PER OPERATING HOUR",
    duration: selectedDuration,
    value: "₹ 8,300",
    icon: "positive",
    percent: "0.6",
    content: RevenuePerOperatingHourTooltip,
    position: "RightBottom"
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
  //Revenue per trip data
  const revenuePerTripChart = useMemo(() => {
    return getRevenuePerTripChart(CalculatedValues.allFilteredTrips);
  }, [CalculatedValues.allFilteredTrips]);

  // console.log(revenuePerTripChart)

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
          // chart={<Suspense fallback={<div>Please  wait ....</div>}>
          //   <LazyLoader columnData={revenuePerTripChart} xTitle="months" yTitle="revenuePerTrip" Chart_name="Revenue/trip per month" minMax={minMax(RevenuePerTripChart, 'revenuePerTrip')} />
          // </Suspense>
          // }
          chart={<Bar columnData={revenuePerTripChart} xTitle="months" yTitle="revenuePerTrip" Chart_name="Revenue/trip per month" minMax={minMax(RevenuePerTripChart, 'revenuePerTrip')}/>}
        />
      </div>
      <div>
        <CardWithChart
          prop1={RevenuePerOperatingHour}
          prop2={RevenuePerOperatingHour2}
          chart={<Bar columnData={RevenuePerHourChart} xTitle="states" yTitle="revenuePerHour" Chart_name="Revenue/hr per state" minMax={minMax(RevenuePerHourChart, 'revenuePerHour')} />}
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
