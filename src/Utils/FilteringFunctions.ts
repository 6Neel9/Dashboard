import { periodTypes, tripElements } from "./Constants";

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

      if (filterDuration === -1) {
        filterStart = new Date(1970, 1, 1, 0, 0, 0);
      } else {
        filterStart.setDate(filterEnd.getDate() - filterDuration);
      }
      break;

    case "previous":
      filterStart.setUTCHours(0, 0, 0, 0);

      if (filterDuration === 0) {
        filterStart.setDate(filterEnd.getDate() - 1);
      } else if (filterDuration === -1) {
        filterStart = new Date(1970, 1, 1, 0, 0, 0);
      } else {
        filterStart.setDate(filterEnd.getDate() - filterDuration);
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
  period: String,
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
  period: String,
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
};
