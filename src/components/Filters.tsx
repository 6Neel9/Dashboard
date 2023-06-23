import React from 'react'
import Button from './Button';
import { useStateContext } from "../contexts/ContextProvider";
import { Months, States, FilterDuration } from '../data/meiroData';
import "../Styles.css"


const Filters = () => {
    const { currentColor, currentMode } = useStateContext();

    

    const resetSortIcons = () => {
        var sortIcons = document.getElementsByClassName("sort-icon");
        for (var i = 0; i < sortIcons.length; i++) {
            sortIcons[i].classList.remove("asc-icon", "desc-icon");
        }
    }

    const filterTable = () => {


    }


    const resetFilters = () => {


    }

    return (
        <div className=" mainBackground mainText mainShadow mainBorder roundedExtraXLarge averageMargin averagePadding  flexWrap extraSmallMargin widthFull">
            <div className="displayFlex flexJustifyEnd">
                <div className=""> 
                    <select id="filter-duration" className='marginRightMedium roundedMedium extraSmallPadding mainBackground mainText mainBorder' placeholder='Period'>
                        <option value="none">Period</option>
                        {FilterDuration.map((ele) => (<option value={ele.value}>{ele.duration}</option>))}
                    </select>
                    
                    <select id="filter-state" className='marginRightMedium roundedMedium extraSmallPadding mainBackground mainText mainBorder' placeholder='State'>
                        <option value="none">State</option>
                        <option value="All">All</option>
                        {States.map((state) => (<option value={state.state}>{state.state}</option>))}
                    </select>
                        <Button prop={{
                            borderRadius: "10px",
                            text: "Apply",
                            marginRight: 3,
                        }} />
                        {"   "}
                    <Button prop={{
                        borderRadius: "10px",
                        text: "Reset",
                    }} />


                </div>


            </div>
        </div>
    )
}

export default Filters





    /*
     <div className="bg-white  dark:text-gray-200 dark:bg-secondary-dark-bgaverageMargin p-4 rounded-2xl  md:flex-wrap md:m-2   ">
<div className="flex justify-center">
    <div className="filter-container ">
        <label htmlFor="filter-start-date" className='mr-2 font-bold'>Start Date:</label>
        <input type="date" id="filter-start-date" className='mr-5 dark:text-gray-200 dark:bg-secondary-dark-bg' />

        <label htmlFor="filter-end-date" className='mr-2 font-bold'>End Date:</label>
        <input type="date" id="filter-end-date" className='mr-5 dark:text-gray-200 dark:bg-secondary-dark-bg' />

        <label htmlFor="filter-month" className='mr-2 font-bold'>Month:</label>
        <select id="filter-month" className='mr-5 dark:text-gray-200 dark:bg-secondary-dark-bg'>
            <option value="All">All</option>
            {Months.map((month) => (<option value={month.month}>{month.month}</option>))}

        </select>
        <label htmlFor="filter-state" className='mr-2 font-bold'>State:</label>
        <select id="filter-state" className='mr-5 dark:text-gray-200 dark:bg-secondary-dark-bg'>
            <option value="All">All</option>
            {States.map((state) => (<option value={state.state}>{state.state}</option>))}
        </select>
        <label htmlFor="filter-city" className='mr-2 font-bold'>City:</label>
        <select id="filter-city" className='mr-5 dark:text-gray-200 dark:bg-secondary-dark-bg'>
            <option value="">All</option>
            <option value="Gandhinagar">Gandhinagar</option>
            <option value="Ahemdabad">Ahemdabad</option>
            <option value="Baroda">Baroda</option>
            <option value="Rajkot">Rajkot</option>

        </select>
        <label htmlFor="filter-year" className='mr-2 font-bold'>Year:</label>
        <input type="number" id="filter-year" min="2022" placeholder="2022" className='mr-5 w-16 dark:text-gray-200 dark:bg-secondary-dark-bg' />

            <Button prop={{
                color: "white",
                borderRadius: "10px",
                text: "Apply",
                bgColor: currentColor,
                marginRight: 3,
            }} />

            {"   "}

        <Button prop={{
            color: "white",
            borderRadius: "10px",
            text: "Reset",
            bgColor: currentColor,
        }} />


    </div>


</div>
</div> 
*/