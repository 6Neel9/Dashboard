import { useMemo } from "react";
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

  // Filter trips data by selected duration
  const allFilteredTrips = useMemo(() => filteredTrips(selectedDuration, tripData), [selectedDuration, tripData]);

  // Percentage change in revenue for total drivers revenue card
  const revenueChange = useMemo(() => calculatePercentChangeUsingValue(tripData, mapOfPeriods.get(selectedDuration), "tripFare"), [tripData, selectedDuration]);

  // Percentage change in trips for total trips card
  const tripChange = useMemo(() => calculatePercentChangeUsingCount(tripData, mapOfPeriods.get(selectedDuration)), [tripData, selectedDuration]);

  // Percentage change in drivers for total drivers card
  const driverChange = useMemo(() => calculatePercentChangeUsingValue(driverData, mapOfPeriods.get(selectedDuration), "driverId"), [driverData, selectedDuration]);

  // Percentage change in average trip length for average trip length card
  const averageTripLengthChange = useMemo(() => calculatePercentChangeOfAverage(tripData, mapOfPeriods.get(selectedDuration), "tripDistance"), [tripData, selectedDuration]);

  // Percentage change in average trip distance for distance covered card
  const distanceCovered = useMemo(() => calculatePercentChangeUsingValue(tripData, mapOfPeriods.get(selectedDuration), "tripDistance"), [tripData, selectedDuration]);

  // Calculate average trips per hour for average trips per hour card
  const averageTripsPerHour = useMemo(() => allFilteredTrips.length / 24, [allFilteredTrips]);

  // Percentage change in average revenue per driver for average revenue per driver card
  const driverRevenueChange = useMemo(() => calculatePercentChangeUsingValue(tripData, mapOfPeriods.get(selectedDuration), "tripFare"), [tripData, selectedDuration]);

  // Percentage change in average revenue per trip for average revenue per trip card
  const avgRevenuePerTrip = useMemo(() => calculatePercentChangeOfAverage(tripData, mapOfPeriods.get(selectedDuration), "tripFare"), [tripData, selectedDuration]);

  // Percentage change in average trip duration for average trip duration card
  const tripDurationChange = useMemo(() => calculatePercentChangeUsingValue(tripData, mapOfPeriods.get(selectedDuration), "tripDuration"), [tripData, selectedDuration]);

  // Calculate total value of trip duration for trip duration card
  const tripDurationValue = useMemo(() => calculateAverageUsingValue(tripData, new Date(), mapOfPeriods.get(selectedDuration), "current", "tripDuration"), [tripData, selectedDuration]);

  // Calculate total value of trip length for trip length card
  const tripLengthValue = useMemo(() => calculateTotalValue(tripData, new Date(), mapOfPeriods.get(selectedDuration), "current", "tripDistance"), [tripData, selectedDuration]);

  // Percentage change in average trip length for trip length card
  const tripLengthChange = useMemo(() => calculatePercentChangeUsingValue(tripData, mapOfPeriods.get(selectedDuration), "tripDistance"), [tripData, selectedDuration]);

  // Calculate total value of trip speed for trip speed card
  const tripSpeedValue = useMemo(() => calculateTotalValue(tripData, new Date(), mapOfPeriods.get(selectedDuration), "current", "tripSpeed"), [tripData, selectedDuration]);

  // Percentage change in average trip speed for trip speed card
  const tripSpeedChange = useMemo(() => calculatePercentChangeUsingValue(tripData, mapOfPeriods.get(selectedDuration), "tripSpeed"), [tripData, selectedDuration]);

  return {
    allFilteredTrips,
    revenueChange,
    tripChange,
    driverChange,
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
