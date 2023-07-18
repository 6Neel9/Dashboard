import React, { useState } from "react";
import Button from "./Button";
import { useStateContext } from "../contexts/ContextProvider";
import { Months, States, FilterDuration } from "../data/meiroData";
import "../Styles.scss";
import { useStateContextDisplay } from "../contexts/DisplayContextProvider";

const Filters = () => {
  const {
    handleDurationChange,
    handleStateChange,
    selectedDuration,
    selectedState,
    setSelectedDuration,
    setSelectedState,
  } = useStateContext();
  // const {currentColor,
  //   currentMode,} = useStateContextDisplay();
  // const [selectedDuration, setSelectedDuration] = useState<IntrinsicAttributes>('none');
  // const [selectedState, setSelectedState] = useState<IntrinsicAttributes>('none');

  // const handleDurationChange = (event: any) => {
  //     setSelectedDuration(event.target.value);
  // };

  // const handleStateChange = (event: any) => {
  //     setSelectedState(event.target.value);
  // };

  const handleApplyFilters = () => { };

  const handleResetFilters = () => {
    setSelectedDuration("Till Date");
    setSelectedState("All");
  };

  return (
    <div className="filtersContainer">
      <div className="filtersSecondaryContainer">
        <div className="">
          <select
            className="filtersSelectContainer"
            value={selectedDuration}
            onChange={handleDurationChange}
          >

            {FilterDuration.map((ele, index) => (
              <option key={`duration-${index}`} value={ele.duration}>
                {ele.duration}
              </option>
            ))}
          </select>

          <select
            className="filtersSelectContainer"
            value={selectedState}
            onChange={handleStateChange}
          >
            <option value="All">All</option>
            {States.map((state, index) => (
              <option key={`state-${index}`} value={state.state}>
                {state.state}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleApplyFilters}
            className={`filtersButton`}
          >
            Apply
          </button>
          {"   "}
          <button
            type="button"
            onClick={handleResetFilters}
            className={`filtersButton`}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
