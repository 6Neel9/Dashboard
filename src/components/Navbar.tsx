import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../contexts/ContextProvider";
import "../Styles.scss"
import { Months, States, FilterDuration } from "../data/meiroData";


type ButtonPropType={
  title?: string,
  customFunc: () => void| undefined,
  icon?: JSX.Element,
  color?: string,
  dotColor?: string
}

const NavButton = ({ title, customFunc, icon, color, dotColor }: ButtonPropType) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      className="MenuColor relative text-xl rounded-full p-3  hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2 "
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
    handleDurationChange,
    handleStateChange,
    selectedDuration,
    selectedState,
    setSelectedDuration,
    setSelectedState,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (Number(screenSize) <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className={activeMenu?"fixed flex justify-between bg-main-bg dark:bg-[#110C16]  bg-opacity-5":"bg-main-bg dark:bg-[#110C16]  fixed flex justify-between w-full"} style={activeMenu?{width:"82%"}:{}}>
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className=" flex m-3">
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

          {/* <button
            type="button"
            // onClick={handleApplyFilters}
            className={`filtersButton`}
          >
            Apply
          </button>
          {"   "}
          <button
            type="button"
            // onClick={handleResetFilters}
            className={`filtersButton`}
          >
            Reset
          </button> */}
        </div>
      </div>
        
      </div>
    </div>
  );
};

export default Navbar;
