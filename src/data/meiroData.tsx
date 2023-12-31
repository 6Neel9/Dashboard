import { FiHome, FiEdit, FiPieChart,FiUserPlus } from "react-icons/fi";
import {
  AiOutlineAreaChart,
  AiOutlineBarChart,
  AiOutlineStock,
} from "react-icons/ai";
import { IoMdContacts } from "react-icons/io";
import { RiStockLine , RiParkingBoxFill} from "react-icons/ri";
import {
  BsKanban,
  BsBarChart,
  BsCurrencyRupee,
  BsGraphUpArrow,
  BsCashCoin
} from "react-icons/bs";
import { GiLouvrePyramid } from "react-icons/gi";
import { BiSupport } from "react-icons/bi";
import { MdOutlineSupervisorAccount ,MdOutlineAnalytics,MdAppRegistration,MdPriceChange} from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";
import {FaClipboardList, FaRoute} from "react-icons/fa";
import { Route } from 'react-router-dom';
import { GridColumn } from "@syncfusion/ej2-react-grids";

type LinksType={
  title: string,
  links:{
    name: string,
    route: string,
    icon: JSX.Element,
  }[],
}[]

export const links: LinksType = [
  {
    title: "Dashboard",
    links: [
      {
        name: "Home",
        route: "",
        icon: <FiHome />,
      },
      {
        name: "Trip Analytics",
        route: "tripAnalytics",
        icon: <BsGraphUpArrow />,
      },
      {
        name: "Revenue Analytics",
        route: "revenueAnalytics",
        icon: <BsCashCoin />,
      },
      {
        name: "Driver Analytics",
        route: "driverAnalytics",
        icon: <MdOutlineAnalytics />,
      },
    ],
  },

  {
    title: "Monitoring",
    links: [
      {
        name: "Drivers",
        route: "drivers",
        icon: <IoMdContacts />,
      },
      {
        name: "Trips",
        route: "trips",
        icon: <FaClipboardList />,
      },
      {
        name: "Add New Driver",
        route: "addNewDriver",
        icon : <FiUserPlus />,
      },
      {
        name: "Tracking",
        route: "tracking",
        icon: <FaRoute />,
      },
      {
        name: "Parking",
        route: "parking",
        icon: <RiParkingBoxFill />,
      },
     
    ],
  },
  {
    title: "Support",
    links: [
      {
        name: "Issue Management",
        route: "issueManagement",
        icon: <BiSupport />,
      },
     
    ],
  },
  {
    title: "Global Settings",
    links: [
      {
        name: "App Constants",
        route: "appConstants",
        icon: <MdAppRegistration />,
      },
      {
        name: "Pricing",
        route: "pricing",
        icon: <MdPriceChange />,
      },
     
    ],
  },
  // {
  //   title: "Apps",
  //   links: [
  //     {
  //       name: "kanban",
  //       route: "kanban",
  //       icon: <BsKanban />,
  //     },
  //     {
  //       name: "editor",
  //       route: "editor",
  //       icon: <FiEdit />,
  //     },
  //   ],
  // },
  // {
  //   title: "Charts",
  //   links: [
  //     {
  //       name: "line",
  //       route: "line",
  //       icon: <AiOutlineStock />,
  //     },
  //     {
  //       name: "area",
  //       route: "area",
  //       icon: <AiOutlineAreaChart />,
  //     },

  //     {
  //       name: "bar",
  //       route: "bar",
  //       icon: <AiOutlineBarChart />,
  //     },
  //     {
  //       name: "pie",
  //       route: "pie",
  //       icon: <FiPieChart />,
  //     },
  //     {
  //       name: "financial",
  //       route: "financial",
  //       icon: <RiStockLine />,
  //     },
  //     {
  //       name: "color-mapping",
  //       route: "color-mapping",
  //       icon: <BsBarChart />,
  //     },
  //     {
  //       name: "pyramid",
  //       route: "pyramid",
  //       icon: <GiLouvrePyramid />,
  //     },
  //     {
  //       name: "stacked",
  //       route: "stacked",
  //       icon: <AiOutlineBarChart />,
  //     },
  //   ],
  // },
];

type EarningDataType ={
  icon: JSX.Element;
  amount: string;
  percentage: string;
  title: string;
  iconColor: string;
  iconBg: string;
  pcColor: string;
}[]

export const earningData : EarningDataType= [
  {
    icon: <MdOutlineSupervisorAccount />,
    amount: "10,354",
    percentage: "-4%",
    title: "Total Drivers",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(0, 194, 146)",
    pcColor: "red-600",
  },
  {
    icon: <BsCurrencyRupee />,
    amount: "2,40,396",
    percentage: "+23%",
    title: "Total Revenue",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(0, 194, 146)",
    pcColor: "green-600",
  },
  {
    icon: <HiOutlineRefresh />,
    amount: "39,354",
    percentage: "-12%",
    title: "Total Trips",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(0, 194, 146)",
    pcColor: "red-600",
  },
];

type DriverGridType=({
  field: string;
  headerText: string;
  width: string;
  textAlign: string;
  format?: undefined;
} | {
  field: string;
  headerText: string;
  width: string;
  format: string;
  textAlign: string;
})[]

export const driverGrid: DriverGridType = [
  // { field: "srno", headerText: "Sr no.", width: "100", textAlign: "Center" },

  { field: "driverId", headerText: "Driver Id", width: "50", textAlign: "Center" },
  {
    field: "firstName",
    headerText: "First Name",
    width: "80",
    textAlign: "start",
  },
  {
    field: "lastName",
    headerText: "Last Name",
    width: "80",
    textAlign: "start",
  },
  {
    field: "vehicleNumber",
    headerText: "Vehicle No.",
    width: "120",
    textAlign: "Center",
  },
  {
    field: "mobile",
    headerText: "Mobile No.",
    width: "120",
    textAlign: "Center",
  },
  {
    field: "licenceNumber",
    headerText: "License No.",
    width: "150",
    textAlign: "Center",
  },
  {
    field: "signedUpDate",
    headerText: "Signed Up Date",
    width: "150",
    textAlign: "Center",
  },


  
];


type TripGridType=({
  field: string;
  headerText: string;
  width: string;
  textAlign: string;
  format?: undefined;
} | {
  field: string;
  headerText: string;
  width: string;
  format: string;
  textAlign: string;
})[]
export const tripGrid: TripGridType = [
{ field: "tripId", headerText: "Trip Id", width: "80", textAlign: "Center" },
{
  field: "driverId",
  headerText: "Driver Id",
  width: "80",
  textAlign: "start",
},
{
  field: "tripFare",
  headerText: "Revenue",
  width: "80",
  textAlign: "Center",
},
{
  field: "paymentType",
  headerText: "Payment Type",
  width: "80",
  textAlign: "Center",
},
{
  field: "paymentStatus",
  headerText: "Payment Status",
  width: "80",
  textAlign: "Center",
},
{
  field: "startTime",
  headerText: "Start Time",
  width: "0",
  textAlign: "start",
},
{
  field: "endTime",
  headerText: "End Time",
  width: "0",
  textAlign: "Center",
},

{
  field: "startLocation",
  headerText: "Start Location",
  width: "150",
  textAlign: "start",
},

{
  field: "endLocation",
  headerText: "End Location",
  width: "150",
  textAlign: "start",
},


{
  field: "tripDistance",
  headerText: "",
  width: "0",
  textAlign: "Center",
},
{
  field: "tripSpeed",
  headerText: "",
  width: "0",
  textAlign: "Center",
},
{
  field: "tripDuration",
  headerText: "",
  width: "0",
  textAlign: "Center",
},

]

export const IssueManagementGrid: TripGridType = [
  {
    field: "ticketId",
    headerText: "Ticket Id",
    width: "80",
    textAlign: "Center",
  },
  {
    field: "ticketDate",
    headerText: "Ticket Date",
    width: "120",
    textAlign: "Center",
  },
  {
    field: "driverName",
    headerText: "Driver Name",
    width: "120",
    textAlign: "start",
  },
  {
    field: "vehicleNumber",
    headerText: "Vehicle Number",
    width: "120",
    textAlign: "Center",
  },
  {
    field: "query",
    headerText: "Query",
    width: "120",
    textAlign: "Center",
  },
  {
    field: "status",
    headerText: "Status",
    width: "120",
    textAlign: "Center",
  },
  
]





type monthType = {month: string, value: number}[]
export const Months :monthType =[
  { month: "January", value: 1 },
  { month: "February", value: 2 },
  { month: "March", value: 3 },
  { month: "April", value: 4 },
  { month: "May", value: 5 },
  { month: "June", value: 6 },
  { month: "July", value: 7 },
  { month: "August", value: 8 },
  { month: "September", value: 9 },
  { month: "October", value: 10 },
  { month: "November", value: 11 },
  { month: "December", value: 12 },
]

type stateType = {state: string, value: number}[]
export const States :stateType =[
  { state: "Andhra Pradesh", value: 1 },
  { state: "Arunachal Pradesh", value: 2 },
  { state: "Assam", value: 3 },
  { state: "Bihar", value: 4 },
  { state: "Chhattisgarh", value: 5 },
  { state: "Goa", value: 6 },
  { state: "Gujarat", value: 7 },
  { state: "Haryana", value: 8 },
  { state: "Himachal Pradesh", value: 9 },
  { state: "Jharkhand", value: 10 },
  { state: "Karnataka", value: 11 },
  { state: "Kerala", value: 12 },
  { state: "Madhya Pradesh", value: 13 },
  { state: "Maharashtra", value: 14 },
  { state: "Manipur", value: 15 },
  { state: "Meghalaya", value: 16 },
  { state: "Mizoram", value: 17 },
  { state: "Nagaland", value: 18 },
  { state: "Odisha", value: 19 },
  { state: "Punjab", value: 20 },
  { state: "Rajasthan", value: 21 },
  { state: "Sikkim", value: 22 },
  { state: "Tamil Nadu", value: 23 },
  { state: "Telangana", value: 24 },
  { state: "Tripura", value: 25 },
  { state: "Uttar Pradesh", value: 26 },
  { state: "Uttarakhand", value: 27 },
  { state: "West Bengal", value: 28 }
]

type FilterDurationType = {duration: string, value: number}[]
export const FilterDuration :FilterDurationType =[
  {duration: "Till Date",value:-1},  // should be -1
  { duration: "Today", value: 0 },  // should be 0
  {duration: "Last 7 Days",value:7},
  // {duration: "This Month",value:30},
  {duration: "Last 30 Days",value:30},
  // {duration: "This Quarter",value:90},
  {duration: "Last 6 Months",value:180},
  {duration: "Last Year",value:365},
  
]



export const themeColors = [
  {
    name: "flow_blue-theme",
    color: "#2C1F39",
  },
  {
    name: "periwinkle-theme",
    color: "#D6CDE9",
  },
  {
    name: "mellow_scarlet-theme",
    color: "#FC3209",
  },
  {
    name: "spring_green-theme",
    color: "#6CE151",
  }

];
