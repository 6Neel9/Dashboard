import React, { useState } from 'react';
import Button from './Button';
import { useStateContext } from "../contexts/ContextProvider";
import { Months, States, FilterDuration } from '../data/meiroData';
import "../Styles.css";

const Filters = () => {


    const { currentColor, currentMode, handleDurationChange, handleStateChange, selectedDuration, selectedState, setSelectedDuration, setSelectedState } = useStateContext();
    // const [selectedDuration, setSelectedDuration] = useState<IntrinsicAttributes>('none');
    // const [selectedState, setSelectedState] = useState<IntrinsicAttributes>('none');

    // const handleDurationChange = (event: any) => {
    //     setSelectedDuration(event.target.value);
    // };

    // const handleStateChange = (event: any) => {
    //     setSelectedState(event.target.value);
    // };

    const handleApplyFilters = () => {
        
    };
    

    const handleResetFilters = () => {
        setSelectedDuration('none');
        setSelectedState('none');
    };

    return (
        <div className="mainBackground mainText mainShadow mainBorder roundedExtraXLarge averageMargin averagePadding flexWrap extraSmallMargin widthFull">
            <div className="displayFlex flexJustifyEnd">
                <div className="">
                    <select
                        id="filter-duration"
                        className="marginRightMedium roundedMedium extraSmallPadding mainBackground mainText mainBorder"
                        value={selectedDuration}
                        onChange={handleDurationChange}
                    >
                        <option value="none">Period</option>
                        {FilterDuration.map((ele) => (
                            <option key={ele.value} value={ele.value}>
                                {ele.duration}
                            </option>
                        ))}
                    </select>

                    <select
                        id="filter-state"
                        className="marginRightMedium roundedMedium extraSmallPadding mainBackground mainText mainBorder"
                        value={selectedState}
                        onChange={handleStateChange}
                    >
                        <option value="none">State</option>
                        <option value="All">All</option>
                        {States.map((state) => (
                            <option key={state.state} value={state.state}>
                                {state.state}
                            </option>
                        ))}
                    </select>

                    <button
                        type="button"
                        onClick={handleApplyFilters}
                        className={`secondaryBackground secondaryText mainBorder roundedLarge smallPadding  mr-3 hover:drop-shadow-xl  `}
                    >
                        Apply
                    </button>
                    {"   "}
                    <button
                        type="button"
                        onClick={handleResetFilters}
                        className={`secondaryBackground secondaryText mainBorder roundedLarge smallPadding  mr-3 hover:drop-shadow-xl  `}
                    >
                        Reset
                    </button>
                   

                </div>
            </div>
        </div>
    );
};

export default Filters;
