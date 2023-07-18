import { periodTypes, tripElements } from "./Constants";

import { Trip } from "../contexts/ContextProvider";


interface DriverRevenue {
  driverId: number;
  revenue: number;
  driverName: string;
}

/**
 * Filter function trips by filter period
 *
 * @param trips JSON object of all trips
 * @param filterEnd The end date of the filter duration
 * @param filterDuration Number of days over which to filter
 * @param period Whether the filter should calculate over the "current" period or the "previous" period
 */
function filterTripsByPeriod(
  trips: Trip[],
  filterEnd: Date,
  filterDuration: number,
  period: String
): Trip[] {
  let filterStart = new Date(filterEnd);

  switch (period) {
    case "current":
      filterStart.setUTCHours(0, 0, 0, 0);
      if (filterDuration === 0) {
        filterStart.setDate(filterEnd.getDate() - 0);
      } else if (filterDuration === -1) {
        filterStart = new Date(1970, 1, 1, 0, 0, 0);
      } else {
        filterStart.setDate(filterEnd.getDate() - filterDuration + 1);
      }
      break;

    case "previous":
      filterStart.setUTCHours(0, 0, 0, 0);

      if (filterDuration === 0) {
        filterStart.setDate(filterEnd.getDate() - 1);
      } else if (filterDuration === -1) {
        filterStart = new Date(1970, 1, 1, 0, 0, 0);
      } else {
        filterStart.setDate(filterEnd.getDate() - filterDuration + 1);
      }

      break;
  }

  const todayTrips = trips.filter((trip) => {
    const startTime = new Date(trip.startTime);
    return startTime >= filterStart && startTime <= filterEnd;
  });


  return todayTrips;
}

// TODO: FilterDuration.TODAY = "Today", FilterDuration.LAST_7_DAYS = "Last 7 Days" and so on
// TODO: Period.CURRENT = "current", Period.PREVIOUS = "previous"
// Export from Constants.js

function filteredTrips(selectedDuration: string, trips: any[]) {
  let totalTrips: any[] = trips;
  let currentDate = new Date();

  if (selectedDuration === "Today") {
    totalTrips = filterTripsByPeriod(trips, currentDate, 0, "current");
  } else if (selectedDuration === "Till Date") {
    totalTrips = trips;
  } else if (selectedDuration === "Last 7 Days") {
    totalTrips = filterTripsByPeriod(trips, currentDate, 7, "current");
  } else if (selectedDuration === "Last 30 Days") {
    totalTrips = filterTripsByPeriod(trips, currentDate, 30, "current");
  } else if (selectedDuration === "Last 6 Months") {
    totalTrips = filterTripsByPeriod(trips, currentDate, 180, "current");
  } else if (selectedDuration === "Last Year") {
    totalTrips = filterTripsByPeriod(trips, currentDate, 365, "current");
  }
  return totalTrips;
}

/**
 * Filter growth/decrease rate
 *
 * @param trips
 *  */
function calculatePercentChangeUsingValue(
  trips: Trip[],
  period: number,
  tripElement: string
): number {
  const currentDate = new Date();
  const previousDate = new Date();
  previousDate.setDate(currentDate.getDate() - period);
  previousDate.setHours(0, 0, 0, 0);

  // const currentRevenue = calculateTotalRevenue(trips, currentDate, period, "current");
  const currentRevenue = calculateTotalValue(
    trips,
    currentDate,
    period,
    periodTypes.CURRENT,
    tripElement
  );
  // const previousRevenue = calculateTotalRevenue(trips, previousDate, period, "previous");
  const previousRevenue = calculateTotalValue(
    trips,
    previousDate,
    period,
    periodTypes.PREVIOUS,
    tripElement
  );

  if (previousRevenue != 0) {
    return (
      ((currentRevenue - previousRevenue) / Math.abs(previousRevenue)) * 100
    );
  } else {
    return currentRevenue != 0 ? Infinity : 0;
    // Infinity should be handled in the component
  }
}

// function calculateTotalRevenue(trips: Trip[], endDate: Date, filterDuration: number, period: String): number {
//     const filteredTrips = filterTripsByPeriod(trips, endDate, filterDuration, period);
//     const totalRevenue = filteredTrips.reduce((acc, trip) => {
//         return acc + trip.tripFare;
//     }, 0);
//     return totalRevenue;
// }

/**
 *
 * @param trips List of all trips
 * @param endDate The end date of the filter duration
 * @param filterDuration Number of days over which to filter
 * @param period Whether the filter should calculate over the "current" period or the "previous" period
 * @param tripElement Values of the element of the Trip interface which should be accumulated, e.g., "tripSpeed"
 * @returns Accumulated value of the selected element of the Trip interface, e.g. "tripSpeed"
 */
function calculateTotalValue(
  trips: Trip[],
  endDate: Date,
  filterDuration: number,
  period: string,
  tripElement: string
): number {
  const filteredTrips = filterTripsByPeriod(
    trips,
    endDate,
    filterDuration,
    period
  );
  const totalValue = filteredTrips.reduce((acc, trip) => {
    return acc + Number(trip[tripElement as keyof Trip]);
  }, 0);
  return totalValue;
}

//Filtered increase decrease revenue
// tripFare is dynamic
function filteredRevenueUpDown(selectedDuration: string, trips: any[]) {
  let totalRevenueUpDown: number = 0;
  if (selectedDuration === "Today") {
    totalRevenueUpDown = calculatePercentChangeUsingValue(trips, 0, "tripFare");
  } else if (selectedDuration === "Till Date") {
    totalRevenueUpDown = calculatePercentChangeUsingValue(
      trips,
      -1,
      "tripFare"
    );
  } else if (selectedDuration === "Last 7 Days") {
    totalRevenueUpDown = calculatePercentChangeUsingValue(trips, 7, "tripFare");
  } else if (selectedDuration === "Last 30 Days") {
    totalRevenueUpDown = calculatePercentChangeUsingValue(
      trips,
      30,
      "tripFare"
    );
  } else if (selectedDuration === "Last 6 Months") {
    totalRevenueUpDown = calculatePercentChangeUsingValue(
      trips,
      180,
      "tripFare"
    );
  } else if (selectedDuration === "Last Year") {
    totalRevenueUpDown = calculatePercentChangeUsingValue(
      trips,
      365,
      "tripFare"
    );
  }
  return totalRevenueUpDown;
}

// 5.07.2023 //
//Trip Length and averages function
function calculatePercentChangeUsingCount(
  trips: Trip[],
  period: number
): number {
  const currentDate = new Date();
  const previousDate = new Date();
  previousDate.setDate(currentDate.getDate() - period);
  previousDate.setHours(0, 0, 0, 0);

  // const currentRevenue = calculateTotalRevenue(trips, currentDate, period, "current");
  const currentCount = filterTripsByPeriod(
    trips,
    currentDate,
    period,
    periodTypes.CURRENT
  ).length;
  // const previousRevenue = calculateTotalRevenue(trips, previousDate, period, "previous");
  const previousCount = filterTripsByPeriod(
    trips,
    previousDate,
    period,
    periodTypes.PREVIOUS
  ).length;

  if (previousCount != 0) {
    return ((currentCount - previousCount) / Math.abs(previousCount)) * 100;
  } else {
    return currentCount != 0 ? Infinity : 0;
    // Infinity should be handled in the component
  }
}

//Trip Length and averages function
function calculatePercentChangeOfAverage(
  trips: Trip[],
  period: number,
  tripElement: string
): number {
  const currentDate = new Date();
  const previousDate = new Date();
  previousDate.setDate(currentDate.getDate() - period);
  previousDate.setHours(0, 0, 0, 0);

  // const currentRevenue = calculateTotalRevenue(trips, currentDate, period, "current");
  const currentCount = calculateAverageUsingValue(
    trips,
    currentDate,
    period,
    periodTypes.CURRENT,
    tripElement
  );
  // const previousRevenue = calculateTotalRevenue(trips, previousDate, period, "previous");
  const previousCount = calculateAverageUsingValue(
    trips,
    previousDate,
    period,
    periodTypes.PREVIOUS,
    tripElement
  );

  if (previousCount !== 0) {
    return ((currentCount - previousCount) / Math.abs(previousCount)) * 100;
  } else {
    return currentCount != 0 ? Infinity : 0;
    // Infinity should be handled in the component
  }
}

function calculateAverageUsingValue(
  trips: Trip[],
  endDate: Date,
  filterDuration: number,
  period: string,
  tripElement: string
): number {
  const filteredTrips = filterTripsByPeriod(
    trips,
    endDate,
    filterDuration,
    period
  );
  const averageValue =
    filteredTrips.reduce((acc, trip) => {
      return acc + Number(trip[tripElement as keyof Trip]);
    }, 0) / filteredTrips.length;
  return averageValue;
}

// Top 10 driver list data

function getTop10Drivers(data: Trip[], driverData: any[]): DriverRevenue[] {
  const driverRevenueMap = new Map<number, number>();

  data.forEach((trip) => {
    const driverId = trip.driverId;
    const tripFare = trip.tripFare;

    if (driverRevenueMap.has(driverId)) {
      const currentRevenue = driverRevenueMap.get(driverId) as number;
      driverRevenueMap.set(driverId, currentRevenue + tripFare);
    } else {
      driverRevenueMap.set(driverId, tripFare);
    }
  });

  const sortedDrivers = Array.from(driverRevenueMap.entries()).sort(
    (a, b) => b[1] - a[1]
  );

  const top10DriversTemp = sortedDrivers
    .slice(0, 10)
    .map(([driverId, revenue]) => ({ driverId, revenue }));

  const top10Drivers: DriverRevenue[] = [];

  driverData.forEach((driver) => {
    top10DriversTemp.forEach((topDriver) => {
      if (driver.driverId === topDriver.driverId) {
        top10Drivers.push({
          driverId: driver.driverId,
          driverName: driver.firstName,
          revenue: topDriver.revenue,
        });
      }
    });
  });

  return top10Drivers;
}

// function topTenMinMax(data: DriverRevenue[]): { min: number; max: number } {
//   const min = Math.min(...data.map((item) => item.revenue));
//   const max = Math.max(...data.map((item) => item.revenue));
//   return { min, max };
// }

function minMax(data: any, field: string) {
  var min, max;
  if (field === "drivers") {
    min = Math.min(...data.map((item: any) => item.drivers));
    max = Math.max(...data.map((item: any) => item.drivers));
  } else if (field === "trips") {
    min = Math.min(...data.map((item: any) => item.trips));
    max = Math.max(...data.map((item: any) => item.trips));
  } else if (field === "revenue") {
    min = Math.min(...data.map((item: any) => item.revenue));
    max = Math.max(...data.map((item: any) => item.revenue));
  } else if (field === "activeHours") {
    min = Math.min(...data.map((item: any) => item.activeHours));
    max = Math.max(...data.map((item: any) => item.activeHours));
  } else if (field === "revenuePerTrip") {
    min = Math.min(...data.map((item: any) => item.revenuePerTrip));
    max = Math.max(...data.map((item: any) => item.revenuePerTrip));
  } else if (field === "revenuePerHour") {
    min = Math.min(...data.map((item: any) => item.revenuePerHour));
    max = Math.max(...data.map((item: any) => item.revenuePerHour));
  } else if (field === "tripsPerHour") {
    min = Math.min(...data.map((item: any) => item.tripsPerHour));
    max = Math.max(...data.map((item: any) => item.tripsPerHour));
  } else if (field === "tripsPerDriver") {
    min = Math.min(...data.map((item: any) => item.tripsPerDriver));
    max = Math.max(...data.map((item: any) => item.tripsPerDriver));
  } else if (field === "revenuePerDriver") {
    min = Math.min(...data.map((item: any) => item.revenuePerDriver));
    max = Math.max(...data.map((item: any) => item.revenuePerDriver));
  } else if (field === "TripDuration") {
    min = Math.min(...data.map((item: any) => item.TripDuration));
    max = Math.max(...data.map((item: any) => item.TripDuration));
  } else if (field === "TripLength") {
    min = Math.min(...data.map((item: any) => item.TripLength));
    max = Math.max(...data.map((item: any) => item.TripLength));
  } else if (field === "TripSpeed") {
    min = Math.min(...data.map((item: any) => item.TripSpeed));
    max = Math.max(...data.map((item: any) => item.TripSpeed));
  }else if(field==="duration"){
    min = Math.min(...data.map((item: any) => item.y));
    max = Math.max(...data.map((item: any) => item.y));
  }

  return { min, max };
}

// function totalDriversMinMax(data: any[]) {
//   const min = Math.min(...data.map((item) => item.drivers));
//   const max = Math.max(...data.map((item) => item.drivers));
//   return { min, max };
// }

// function tripsMinMax(data: any[]) {
//   const min = Math.min(...data.map((item) => item.trips));
//   const max = Math.max(...data.map((item) => item.trips));
//   return { min, max };
// }

//Number format decimal value till 2
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

// Revenue Per Trip chart Data according to months

interface RevenuePerTripChartItem {
  months: string;
  revenuePerTrip: number;
}

const getRevenuePerTripChart = (trips: Trip[]): RevenuePerTripChartItem[] => {
  const revenuePerMonth: { [key: string]: { totalFare: number; tripCount: number } } = {};

  trips.forEach(trip => {
    const startTime = new Date(trip.startTime);
    const month = startTime.toLocaleString('en-US', { month: 'long' });

    if (!revenuePerMonth[month]) {
      revenuePerMonth[month] = {
        totalFare: 0,
        tripCount: 0
      };
    }

    revenuePerMonth[month].totalFare += trip.tripFare;
    revenuePerMonth[month].tripCount++;
  });

  const sortedMonths = Object.keys(revenuePerMonth).sort((a, b) => {
    const monthA = new Date(Date.parse('01 ' + a));
    const monthB = new Date(Date.parse('01 ' + b));
    return monthA.getMonth() - monthB.getMonth();
  });

  const RevenuePerTripChart: RevenuePerTripChartItem[] = sortedMonths.map(month => {
    const { totalFare, tripCount } = revenuePerMonth[month];
    const revenuePerTrip = (totalFare / tripCount).toFixed(2);
    return {
      months: month,
      revenuePerTrip: Number(revenuePerTrip)
    };
  });

  return RevenuePerTripChart;
};


//Trip Duration / Driver revenue chart data homepage
// interface AverageTripDuration {
//   x: Date;
//   y: number;
// }

// function calculateAverageTripDuration(dataset: Trip[]): AverageTripDuration[] {
//   const dateMap = new Map<string, { totalDuration: number; tripCount: number }>();
//   const tripsByDate: AverageTripDuration[] = [];

//   for (const trip of dataset) {
//     const startDate = trip.startTime.substr(0, 10); // Extract date from startTime
//     const tripDuration = trip.tripDuration;

//     if (dateMap.has(startDate)) {
//       dateMap.set(startDate, {
//         totalDuration: dateMap.get(startDate)!.totalDuration + tripDuration,
//         tripCount: dateMap.get(startDate)!.tripCount + 1,
//       });
//     } else {
//       dateMap.set(startDate, {
//         totalDuration: tripDuration,
//         tripCount: 1,
//       });
//     }
//   }

//   const dateArray = Array.from(dateMap.entries());

//   for (const [date, { totalDuration, tripCount }] of dateArray) {
//     const averageDuration = (totalDuration / tripCount).toFixed(1); // Round to one decimal place
//     tripsByDate.push({
//       x: new Date(date),
//       y: Number(averageDuration), // Convert back to number
//     });
//     tripsByDate.sort((a, b) => a.x.getTime() - b.x.getTime());
//   }
//   return tripsByDate;
// }
interface HourlyTripData {
  x: string; // Hour in "HH:00" format
  y: number; // Trip count for the hour
}

function calculateAverageTripDuration(dataset: Trip[] , duration: number): HourlyTripData[] {
  const hourlyMap = new Map<string, number>();

  for (const trip of dataset) {
    const startDate = new Date(trip.startTime);
    const startHour = startDate.getHours();
    const formattedStartHour = startHour.toString().padStart(2, "0");
    const key = `${formattedStartHour}:00 - ${formattedStartHour}:59`;

    if (hourlyMap.has(key)) {
      hourlyMap.set(key, hourlyMap.get(key)! + 1);
    } else {
      hourlyMap.set(key, 1);
    }
  }

  const hourlyData: HourlyTripData[] = [];

  for (let hour = 0; hour < 24; hour++) {
    const formattedHour = hour.toString().padStart(2, "0");
    const key = `${formattedHour}:00 - ${formattedHour}:59`;
    const tripCount = hourlyMap.get(key) || 0;

    hourlyData.push({
      x: `${formattedHour}:00`,
      y: tripCount/duration,
    });
  }

  return hourlyData;
}


//Extra Missing trips generate for chart data

function generateUniqueId(existingIds: number[]): number {
  let newId = Math.floor(Math.random() * 1000) + 1;
  while (existingIds.includes(newId)) {
    newId = Math.floor(Math.random() * 1000) + 1;
  }
  return newId;
}
function getDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addMissingTrips(trips: Trip[]): Trip[] {
  if (trips.length === 0) {
    return trips;
  }

  const today = new Date();
  const lastTripStartTime = new Date(trips[trips.length - 1].startTime);
  const daysDiff = Math.floor((today.getTime() - lastTripStartTime.getTime()) / (1000 * 60 * 60 * 24));

  if (daysDiff <= 0) {
    return trips;
  }

  let nextTripId = trips[trips.length - 1].tripId + 1;
  const newTrips: Trip[] = [];

  //
  const existingTripIds = trips.map((trip) => trip.tripId);
const existingDriverIds = trips.map((trip) => trip.driverId);
const newDriverId = generateUniqueId(existingDriverIds);
const newTripId = generateUniqueId(existingTripIds);

  // Include today's trip if it doesn't already exist
  const lastTripDate = new Date(lastTripStartTime).toISOString().slice(0, 10);
  const todayDate = getDateString(today);
  if (lastTripDate !== todayDate) {
    const todayEndTime = new Date(today);
    todayEndTime.setMinutes(todayEndTime.getMinutes() + trips[0].tripDuration);

    const todayTrip: Trip = {
      _id: `64a4f311fb78d8f7ec2d3ff${nextTripId}`,
      driverId: newDriverId, // You can set the appropriate driverId here.
      tripId: newTripId,
      startLocation: trips[0].startLocation,
      tripDistance: 0,
      tripSpeed: 0,
      tripDuration: trips[0].tripDuration,
      endLocation: trips[0].endLocation,
      startTime: todayDate + 'T00:00:00',
      tripFare: 0,
      paymentType: "",
      endTime: getDateString(todayEndTime) + 'T00:00:00',
    };

    newTrips.push(todayTrip);
    nextTripId++;
  }

  // Add missing trips for the days in between last trip and today
  for (let i = 1; i < daysDiff; i++) {
    const nextStartTime = new Date(lastTripStartTime);
    nextStartTime.setDate(nextStartTime.getDate() + i);
    const nextEndTime = new Date(nextStartTime);
    nextEndTime.setMinutes(nextEndTime.getMinutes() + trips[0].tripDuration);

    const newTrip: Trip = {
      _id: `64a4f311fb78d8f7ec2d3ff${nextTripId}`,
      driverId: 0, // You can set the appropriate driverId here.
      tripId: nextTripId,
      startLocation: trips[0].startLocation,
      tripDistance: 0,
      tripSpeed: 0,
      tripDuration: trips[0].tripDuration,
      endLocation: trips[0].endLocation,
      startTime: getDateString(nextStartTime) + 'T00:00:00',
      tripFare: 0,
      paymentType: "",
      endTime: getDateString(nextEndTime) + 'T00:00:00',
    };

    newTrips.push(newTrip);
    nextTripId++;
  }

  return [...trips, ...newTrips];
}



// function addMissingTrips(trips: Trip[]): Trip[] {
//   if (trips.length === 0) {
//     return trips;
//   }

//   const today = new Date();
//   const lastTripStartTime = new Date(trips[trips.length - 1].startTime);
//   const daysDiff = Math.floor((today.getTime() - lastTripStartTime.getTime()) / (1000 * 60 * 60 * 24));

//   if (daysDiff <= 0) {
//     return trips;
//   }

//   let nextTripId = trips[trips.length - 1].tripId + 1;
//   const newTrips: Trip[] = [];


//   //
//   //   const existingTripIds = trips.map((trip) => trip.tripId);
// // const existingDriverIds = trips.map((trip) => trip.driverId);
// // const newDriverId = generateUniqueId(existingDriverIds);
// // const newTripId = generateUniqueId(existingTripIds);
//   // Include today's trip if it doesn't already exist
//   const lastTripDate = new Date(lastTripStartTime).toISOString().slice(0, 10);
//   const todayDate = getDateString(today);
//   if (lastTripDate !== todayDate) {
//     const todayEndTime = new Date(today);
//     todayEndTime.setMinutes(todayEndTime.getMinutes() + trips[0].tripDuration);

//     const todayTrip: Trip = {
//       _id: `64a4f311fb78d8f7ec2d3ff${nextTripId}`,
//       driverId: 0, // You can set the appropriate driverId here.
//       tripId: nextTripId,
//       startLocation: trips[0].startLocation,
//       tripDistance: 0,
//       tripSpeed: 0,
//       tripDuration: trips[0].tripDuration,
//       endLocation: trips[0].endLocation,
//       startTime: todayDate + 'T00:00:00',
//       tripFare: 0,
//       paymentType: "",
//       endTime: getDateString(todayEndTime) + 'T00:00:00',
//     };

//     newTrips.push(todayTrip);
//     nextTripId++;
//   }

//   // Add missing trips for the days in between last trip and today
//   for (let i = 1; i < daysDiff; i++) {
//     const nextStartTime = new Date(lastTripStartTime);
//     nextStartTime.setDate(nextStartTime.getDate() + i);
//     const nextEndTime = new Date(nextStartTime);
//     nextEndTime.setMinutes(nextEndTime.getMinutes() + trips[0].tripDuration);

//     const newTrip: Trip = {
//       _id: `64a4f311fb78d8f7ec2d3ff${nextTripId}`,
//       driverId: 0, // You can set the appropriate driverId here.
//       tripId: nextTripId,
//       startLocation: trips[0].startLocation,
//       tripDistance: 0,
//       tripSpeed: 0,
//       tripDuration: trips[0].tripDuration,
//       endLocation: trips[0].endLocation,
//       startTime: getDateString(nextStartTime) + 'T00:00:00',
//       tripFare: 0,
//       paymentType: "",
//       endTime: getDateString(nextEndTime) + 'T00:00:00',
//     };

//     newTrips.push(newTrip);
//     nextTripId++;
//   }

//   return [...trips, ...newTrips];
// }




export {
  filterTripsByPeriod,
  filteredTrips,
  calculatePercentChangeUsingValue,
  filteredRevenueUpDown,
  calculatePercentChangeUsingCount,
  calculatePercentChangeOfAverage,
  calculateTotalValue,
  calculateAverageUsingValue,
  getTop10Drivers,
  minMax,
  getRevenuePerTripChart,
  numberFormat,
  calculateAverageTripDuration,
  addMissingTrips
};
