import {
  filterTripsByPeriod,
  filteredTrips,
  calculatePercentChangeUsingValue,
  filteredRevenueUpDown,
  calculatePercentChangeUsingCount,
  calculatePercentChangeOfAverage,
  calculateTotalValue,
  calculateAverageUsingValue
} from "./FilteringFunctions";
import { periodTypes, tripElements, mapOfPeriods } from "./Constants";

import { useStateContext } from "../contexts/ContextProvider";
import { useDispatch } from "react-redux";


const AnalyticsCalculation = () => {
  const {
    selectedDuration,
    selectedState,
    setSelectedDuration,
    setSelectedState,
    setTripData,
    tripData,
    driverData,
    setDriverData,
  } = useStateContext();

  // filter trips data by selected duration
  let allFilteredTrips = filteredTrips(selectedDuration, tripData);

  // percentage change in revenue for total drivers revenue card
  let revenueChange = calculatePercentChangeUsingValue(
    tripData,
    mapOfPeriods.get(selectedDuration),
    "tripFare"
  );

  // percentage change in trips for total trips card
  let tripChange = calculatePercentChangeUsingCount(
    tripData,
    mapOfPeriods.get(selectedDuration)
  );

  // percentage change in drivers for total drivers card
  let DriverChange = calculatePercentChangeUsingValue(
    driverData,
    mapOfPeriods.get(selectedDuration),
    "driverId"
  );


  // percentage change in average trip length for average trip length card
  let averageTripLengthChange = calculatePercentChangeOfAverage(
    tripData,
    mapOfPeriods.get(selectedDuration),
    "tripDistance"
  );

  // percentage change in average trip Distance for Distance covered card
  let distanceCovered = calculatePercentChangeUsingValue(
    tripData,
    mapOfPeriods.get(selectedDuration),
    "tripDistance"
  );
 // percentage change in average trips per hour for average trips per hour card
  let averageTripsPerHour = allFilteredTrips.length / 24;

  // percentage change in average revenue per driver for average revenue per driver card
  let driverRevenueChange = calculatePercentChangeUsingValue(tripData, mapOfPeriods.get(selectedDuration), "tripFare");

  // percentage change in average revenue per trip for average revenue per trip card
  let  avgRevenuePerTrip = calculatePercentChangeOfAverage(tripData, mapOfPeriods.get(selectedDuration),'TripFare');

  // percentage change in average trip duration for average trip duration card
  let tripDurationChange = calculatePercentChangeUsingValue(tripData, mapOfPeriods.get(selectedDuration), "tripDuration")
  let tripDurationValue = calculateTotalValue(tripData, new Date(), mapOfPeriods.get(selectedDuration), "current", "tripDuration")
  let tripLengthValue = calculateTotalValue(tripData, new Date(), mapOfPeriods.get(selectedDuration), "current", "tripDistance")
  
  // percentage change in average trip length for trip length card
  let tripLengthChange = calculatePercentChangeUsingValue(tripData, mapOfPeriods.get(selectedDuration), "tripDistance")
  
  // total value of trip speed for trip speed card
  let tripSpeedValue = calculateTotalValue(tripData, new Date(), mapOfPeriods.get(selectedDuration), "current", "tripSpeed")
  
  // percentage change in average trip speed for trip speed card
  let tripSpeedChange = calculatePercentChangeUsingValue(tripData, mapOfPeriods.get(selectedDuration), "tripSpeed")
 
  return {
    allFilteredTrips,
    revenueChange,
    tripChange,
    DriverChange,
    averageTripLengthChange,
    distanceCovered,
    averageTripsPerHour,
    driverRevenueChange,
    avgRevenuePerTrip,
    tripDurationChange,
    tripDurationValue,
    tripLengthValue,
    tripLengthChange,
    tripSpeedValue,
    tripSpeedChange
    
  };
};

export default AnalyticsCalculation;
