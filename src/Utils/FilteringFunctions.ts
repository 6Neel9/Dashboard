import {periodTypes , tripElements} from './Constants';

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



/**
 * Filter function trips by filter period
 * 
 * @param trips JSON object of all trips
 * @param filterEnd The end date of the filter duration
 * @param filterDuration Number of days over which to filter
 * @param period Whether the filter should calculate over the "current" period or the "previous" period
 */
function filterTripsByPeriod(trips: Trip[], filterEnd: Date, filterDuration: number, period: String): Trip[] {

    let filterStart = new Date(filterEnd);

    switch (period) {
        case "current":
            if (filterDuration === -1) {
                filterStart = new Date(1970,1,1,0,0,0);
                console.log("current: " + filterStart);
            } else {
                filterStart.setDate(filterEnd.getDate() - filterDuration);
            }
            filterStart.setHours(0, 0, 0, 0);
            break

        case "previous":
            if (filterDuration === 0) {
                filterStart.setDate(filterEnd.getDate() - 1);
            } else if (filterDuration === -1) {
                filterStart = new Date(1970,1,1,0,0,0);
                console.log("previous: " + filterStart);
            } else {
                filterStart.setDate(filterEnd.getDate() - filterDuration);
            }
            filterStart.setHours(0, 0, 0, 0);

            break
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
    let totalTrips: any[] = trips
    let currentDate = new Date();

    if (selectedDuration === "Today") {
        totalTrips = filterTripsByPeriod(trips, currentDate, 0, "current");
    } else if (selectedDuration === "Till Date") {
        totalTrips = trips
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
function calculatePercentChange(trips: Trip[], period: number,tripElement:string): number {
    const currentDate = new Date();
    const previousDate = new Date();
    previousDate.setDate(currentDate.getDate() - period);
    previousDate.setHours(0, 0, 0, 0)


    // const currentRevenue = calculateTotalRevenue(trips, currentDate, period, "current");
    const currentRevenue = calculateTotalValue(trips, currentDate, period, periodTypes.CURRENT, tripElement);
    // const previousRevenue = calculateTotalRevenue(trips, previousDate, period, "previous");
    const previousRevenue = calculateTotalValue(trips, previousDate, period, "previous", tripElement);

    if (previousRevenue != 0) {
        return ((currentRevenue - previousRevenue) / Math.abs(previousRevenue)) * 100;

    } else {
        return currentRevenue != 0 ? Infinity : 0
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
function calculateTotalValue(trips: Trip[], endDate: Date, filterDuration: number, period: String, tripElement: string): number {
    const filteredTrips = filterTripsByPeriod(trips, endDate, filterDuration, period);
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
        totalRevenueUpDown = calculatePercentChange(trips, 0 , "tripFare");
    } else if (selectedDuration === "Till Date") {
        totalRevenueUpDown = calculatePercentChange(trips, -1 , "tripFare")
    } else if (selectedDuration === "Last 7 Days") {
        totalRevenueUpDown = calculatePercentChange(trips, 7 , "tripFare");

    } else if (selectedDuration === "Last 30 Days") {
        totalRevenueUpDown = calculatePercentChange(trips, 30 , "tripFare");

    } else if (selectedDuration === "Last 6 Months") {
        totalRevenueUpDown = calculatePercentChange(trips, 180 , "tripFare");

    } else if (selectedDuration === "Last Year") {
        totalRevenueUpDown = calculatePercentChange(trips, 365 , "tripFare");
    }
    return totalRevenueUpDown;

}










export { filterTripsByPeriod, filteredTrips, calculatePercentChange, filteredRevenueUpDown  }