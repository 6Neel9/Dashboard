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

  let allFilteredTrips = filteredTrips(selectedDuration, tripData);

  let revenueChange = calculatePercentChangeUsingValue(
    tripData,
    mapOfPeriods.get(selectedDuration),
    "tripFare"
  );

  let tripChange = calculatePercentChangeUsingCount(
    tripData,
    mapOfPeriods.get(selectedDuration)
  );

  let DriverChange = calculatePercentChangeUsingValue(
    driverData,
    mapOfPeriods.get(selectedDuration),
    "driverId"
  );

  let averageTripLengthChange = calculatePercentChangeOfAverage(
    tripData,
    mapOfPeriods.get(selectedDuration),
    "tripDistance"
  );

  let distanceCovered = calculatePercentChangeUsingValue(
    tripData,
    mapOfPeriods.get(selectedDuration),
    "tripDistance"
  );
//
  let averageTripsPerHour = allFilteredTrips.length / 24;

  let driverRevenueChange = calculatePercentChangeUsingValue(tripData, mapOfPeriods.get(selectedDuration), "tripFare");
  let  avgRevenuePerTrip = calculatePercentChangeOfAverage(tripData, mapOfPeriods.get(selectedDuration),'TripFare');

  let tripDurationChange = calculatePercentChangeUsingValue(tripData, mapOfPeriods.get(selectedDuration), "tripDuration")
  let tripDurationValue = calculateAverageUsingValue(tripData, new Date(), mapOfPeriods.get(selectedDuration), "current", "tripDuration")
  let tripLengthValue = calculateTotalValue(tripData, new Date(), mapOfPeriods.get(selectedDuration), "current", "tripDistance")
  let tripLengthChange = calculatePercentChangeUsingValue(tripData, mapOfPeriods.get(selectedDuration), "tripDistance")
  let tripSpeedValue = calculateTotalValue(tripData, new Date(), mapOfPeriods.get(selectedDuration), "current", "tripSpeed")
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
