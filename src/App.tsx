import React, { useState, useEffect } from 'react';
import "./App.css";

import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
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
  Parking
} from "./pages";
import "./maincss/index.css";
import { useStateContext } from "./contexts/ContextProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IssueManagement from './pages/IssueManagement';
import Trips from './pages/Trips';


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
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    themeSettings,
    setThemeSettings,
  } = useStateContext();



  const [data, setData] = useState<any>([]);


  useEffect(() => {
    fetch("http://localhost:5000/test", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((i) => {
        setData(i.data);
      });
  }, []);



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
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
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
            <div className="fixed md:static bg-main-bg dark:bg-[#110C16] navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && <ThemeSettings />}

              <Routes>
                {/* dashboard  */}
                <Route path="/" element={<Home data={data} />} />
                <Route path="/home" element={<Home data={data} />} />


                {/* pages  */}
                <Route path="/drivers" element={<Drivers data={data} />} />
                <Route path="/driverUpdate" element={<DriverUpdate  />} />
                <Route path="/driverView/:id" element={<ViewDriver data={data} />} />
                <Route path="/addNewDriver" element={<AddNewDriver />} />
                <Route path="/trips" element={<Trips data={data} />} />
                <Route path="/tripView/:id" element={<ViewTrip />} />
                <Route path="/tripAnalytics" element={<TripAnalytics />} />
                <Route path="/RevenueAnalytics" element={<RevenueAnalytics />} />
                <Route path="/tracking" element={<Tracking />} />
                <Route path="/parking" element={<Parking />} />
                <Route path="/driverAnalytics" element={<DriverAnalytics />} />
                <Route path='/issueManagement' element={<IssueManagement />} />
                
              


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
