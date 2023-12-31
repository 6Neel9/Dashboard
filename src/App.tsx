import React, { useState, useEffect, useCallback } from 'react';
import "./App.css";

import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, Sidebar, ThemeSettings, Filters } from "./components";
import {
  Home,
  Drivers,
  Stacked,
  Pyramid,
  Kanban,
  Line,
  Area,
  Bar,
  Financial,
  ColorMapping,
  Editor,
  DriverUpdate,
  ViewDriver,
  AddNewDriver,
  TripList,
  ViewTrip,
  TripAnalytics,
  RevenueAnalytics,
  Tracking,
  DriverAnalytics,
  Parking,
  Trips,
  Pricing,
  IssueManagement
} from "./pages";
import "./maincss/index.css";
import { useStateContext } from "./contexts/ContextProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from './components/Loading';
import axios from 'axios';
import { Trip } from './contexts/ContextProvider';
import { useStateContextDisplay } from './contexts/DisplayContextProvider';
//Added for heatmaplayer
import 'leaflet/dist/leaflet.css'




// type DriverDataType = {
//   did: Number,
//   fname: String,
//   lname: String,
//   bdate: Date,
//   dlno: String,
//   working: Boolean,
//   trips: [
//     {
//       tid: Number,
//       stime: Date,
//       etime: Date,
//       sloc: [],
//       eloc: [],
//       revenue: Number,
//       city: {
//         id: String,
//         name: String,
//         state: String,
//       },
//     },
//   ],
// }
function App() {
  const {
    setTripData,
    tripData,
    driverData,
    setDriverData,
    setCalculatedData
  } = useStateContext();

  const { setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    themeSettings,
    setThemeSettings, } = useStateContextDisplay();




  const fetchData = useCallback(async () => {
    try {
      const driversRequest = axios.get("http://localhost:5000/yuja-sm/v1/drivers");
      const tripsRequest = axios.get<Trip[]>("http://localhost:5000/yuja-sm/v1/trips");
      // const calculatedDataReq = axios.get("http://localhost:5000/yuja-sm/v1/cdata");
      const [driversRes, tripsRes ] = await axios.all([driversRequest, tripsRequest ]);

      // Handle drivers response
      // setDrivers(driversRes.data);
      setDriverData(driversRes.data);

      // Handle trips response
      // setTrips(tripsRes.data);
      setTripData(tripsRes.data);
      setCalculatedData([])
    } catch (error) {
      // Handle error
      console.error(error);
    }
  }, []);


  useEffect(() => {
    fetchData()
  }, [])




  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [setCurrentColor, setCurrentMode]);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="app-1 fixed right-4 bottom-4 " >
            <TooltipComponent content="Settings" position="TopCenter">
              <button
                type="button"
                title='Button'
                onClick={() => setThemeSettings(true)}
                className={`app-2 text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-gray-800 bg-gray-400`}
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-[#2C1F39] bg-[#2C1F39] ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-[#110C16]  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-black  w-full min-h-screen flex-2 "
            }
          >
            <div className="relative navbar w-full ">
              <Navbar />
            </div>
            <div className='mt-14'>
              {themeSettings && <ThemeSettings />}
              {/* <div className={ activeMenu? "displayFlex fixed w-4/5" : "displayFlex fixed w-full"}>
                <Filters />
              </div> */}
              <Routes>
                {/* dashboard  */}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />


                {/* pages  */}
                <Route path="/drivers" element={<Drivers />} />
                <Route path="/driverUpdate" element={<DriverUpdate />} />
                <Route path="/driverView/:id" element={<ViewDriver />} />
                <Route path="/addNewDriver" element={<AddNewDriver />} />
                <Route path="/trips" element={<Trips />} />
                <Route path="/tripView/:id" element={<ViewTrip />} />
                <Route path="/tripAnalytics" element={<TripAnalytics />} />
                <Route path="/RevenueAnalytics" element={<RevenueAnalytics />} />
                <Route path="/tracking" element={<Tracking />} />
                <Route path="/parking" element={<Parking />} />
                <Route path="/driverAnalytics" element={<DriverAnalytics />} />
                <Route path='/issueManagement' element={<IssueManagement />} />
                <Route path="/pricing" element={<Pricing />} />




                {/* apps  */}
                {/* <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} /> */}

                {/* charts  */}
                {/* <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} /> */}
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
