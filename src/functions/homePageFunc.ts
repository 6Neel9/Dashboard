function sayHi() {
    console.log("hi")
}

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

//Filter function trips by filter period
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
function filteredTrips(selectedDuration: string, trips: any[]) {
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

//Filter growth/decrease rate
function calculateRevenueChange(trips: Trip[], period: number): number {
    const currentDate = new Date();
    const previousDate = new Date(currentDate.getTime() - period * 24 * 60 * 60 * 1000);
  
    const currentRevenue = calculateTotalRevenue(trips, currentDate);
    const previousRevenue = calculateTotalRevenue(trips, previousDate);
  
    if (previousRevenue === 0) {
      return 0; // or any other appropriate value indicating no growth or decrease
    }
  
    const revenueGrowthRate = ((currentRevenue - previousRevenue) / Math.abs(previousRevenue)) * 100;
    
  
    return revenueGrowthRate;
}

function calculateTotalRevenue(trips: Trip[], date: Date): number {
  const filteredTrips = filterTripsByPeriods(trips, date);
  const totalRevenue = filteredTrips.reduce((acc, trip) => {
    return acc + trip.tripFare;
  }, 0);
  return totalRevenue;
}

function filterTripsByPeriods(trips: Trip[], date: Date): Trip[] {
  const filterStart = new Date(date);
  filterStart.setHours(0, 0, 0, 0);

  const filterEnd = new Date(date);
  filterEnd.setHours(23, 59, 59, 999);

  const filteredTrips = trips.filter((trip) => {
    const startTime = new Date(trip.startTime);
    return startTime >= filterStart && startTime <= filterEnd;
  });

  return filteredTrips;
}



//Filtered increase decrease revenue
function filteredRevenueUpDown(selectedDuration: string, trips: any[]) {
    let totalRevenueUpDown: number = 0;
    if (selectedDuration === "Today") {
        totalRevenueUpDown = calculateRevenueChange(trips, 0);
    } else if (selectedDuration === "Till Date") {
        totalRevenueUpDown = calculateRevenueChange(trips, -1)
    } else if (selectedDuration === "Last 7 Days") {
        totalRevenueUpDown = calculateRevenueChange(trips, 7);

    } else if (selectedDuration === "Last 30 Days") {
        totalRevenueUpDown = calculateRevenueChange(trips, 30);

    } else if (selectedDuration === "Last 6 Months") {
        totalRevenueUpDown = calculateRevenueChange(trips, 180);

    } else if (selectedDuration === "Last Year") {
        totalRevenueUpDown = calculateRevenueChange(trips, 365);
    }
    return totalRevenueUpDown;

}








export { filterTripsByPeriod, filteredTrips, calculateRevenueChange, filteredRevenueUpDown }