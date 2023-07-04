const periodTypes = {
    CURRENT: "current",
    PREVIOUS: "previous",

};

const tripElements = {
    TRIP_DISTANCE: "tripDistance",
    TRIP_SPEED: "tripSpeed",
    TRIP_DURATION: "tripDuration",
    START_TIME: "startTime",
    END_TIME: "endTime",
    TRIP_FARE: "tripFare"
}

// 
const mapOfPeriods =  new Map();
mapOfPeriods.set("Till Date",-1);
mapOfPeriods.set("Today",0);
mapOfPeriods.set("Last 7 Days",7);
mapOfPeriods.set("Last 30 Days",30);
mapOfPeriods.set("Last 6 Months",180);
mapOfPeriods.set("Last Year",365);


export  { periodTypes, tripElements, mapOfPeriods };
