import React from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import Logo_Light from "../data/assets/meiro_dark_logo.png";
import Logo_Dark from "../data/assets/meiro_no_bg_for_dark - Tight Crop.png";
import { links } from "../data/meiroData";
import { useStateContext } from "../contexts/ContextProvider";
import smartCity from "../data/assets/smartCity.png"
import { useStateContextDisplay } from "../contexts/DisplayContextProvider";

const Sidebar = () => {
  const { screenSize } =
    useStateContext();
  const { currentColor, activeMenu, setActiveMenu, currentMode } = useStateContextDisplay();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && Number(screenSize) <= 900) {
      setActiveMenu(false);
    }
  };


  const activeLink =
    "displayFlex flexAlignCenter gapMedium paddingLeftMedium paddingTopSmall paddingBottomSmall roundedLarge textMedium extraSmallMargin dark:text-white dark:bg-[#584F9D] bg-[#584F9D] text-white ";
  const normalLink =
    "displayFlex flexAlignCenter gapMedium paddingLeftMedium paddingTopSmall paddingBottomSmall roundedLarge textMedium text-white hover:text-black hover:bg-light-gray extraSmallMargin";

  return (
    <div className="marginLeftSmall heightScreen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="displayFlex justify-between flexAlignCenter flexJustifyCenter">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="flexAlignCenter gap-3 marginLeftSmall mt-4 displayFlex text-xl font-extrabold tracking-tight dark:textWhite text-slate-900"
            >
              {
                currentMode === "Dark" ? (<span><img src={smartCity} alt="Logo" className="h-24 w-32 mr-12" /></span>) : (<span><img src={smartCity} alt="Logo" className="h-24 w-32 mr-12" /></span>)
              }

            </Link>

            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                title="Close"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-2 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <br />
          <div className="mt-4 ">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.route}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    // style={({ isActive }) => ({
                    //   backgroundColor: isActive ? currentColor : "",
                    // })}

                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }

                  >
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
      <img src={Logo_Dark} className="h-14 w-auto" alt="Meiro Logo" />
    </div>
  );
};

export default Sidebar;