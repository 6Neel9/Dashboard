/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
  Sort,
  Toolbar,
  Filter,
  ExcelExport,
  PageSettingsModel,
  EditSettingsModel,
  Grid,
  FilterSettingsModel,
  ToolbarItems,
  ExcelExportProperties,

} from "@syncfusion/ej2-react-grids";
import CSS from 'csstype';

// import { employeesData, employeesGrid } from "../data/dummy";
import { driverGrid } from "../data/meiroData";
import { Header } from "../components";
import { ClickEventArgs } from "@syncfusion/ej2-react-navigations";


// const dropdown: CSS.Properties = {
//   position: 'relative',
//   display: 'inline-block',
// };

// const dropbtn: CSS.Properties = {
//   backgroundColor: "green",
//   color: 'white',
//   padding: '16px',
//   fontSize: '16px',
//   border: 'none',
// };
// const dropdowncontent: CSS.Properties = {
//   display: "none",
//   position: 'absolute',
//   backgroundColor: 'white',
//   minWidth: '160px',
//   boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
//   zIndex: '1',
// }
// const dropdowncontenta: CSS.Properties = {
//   color: "black",
//   padding: "12px 16px",
//   textDecoration: "none",
//   display: "block",
// }

// const HoverButton = () => {
//   return (<div style={dropdown}>
//     <button style={dropbtn}>Dropdown</button>
//     <div style={dropdowncontent}>
//       <a href="#" style={dropdowncontenta}>Link 1</a>
//       <a href="#" style={dropdowncontenta}>Link 2</a>
//       <a href="#" style={dropdowncontenta}>Link 3</a>
//     </div>
//   </div>)
// }


const Drivers = ({ data }: any) => {
  const navigate = useNavigate();

  type DriverDataType = {
    did: Number,
    fname: String,
    lname: String,
    bdate: Date,
    dlno: String,
    working: Boolean,
    trips: [
      {
        tid: Number,
        stime: Date,
        etime: Date,
        sloc: [],
        eloc: [],
        revenue: Number,
        city: {
          id: String,
          name: String,
          state: String,
        },
      },
    ],

  };
  type DriverDataType2 = {
    srno?: Number,
    did?: Number,
    name?: String,
    bdate?: String,
    dlno?: String,
    working?: String,
    trips?: Number,
  }[];

  const toolbarOptions: ToolbarItems[] = ['Search', 'ExcelExport'];
  // const editing: EditSettingsModel = {  allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
  const [driverData, setDriverData] = useState<DriverDataType2>([]);
  const pageSettings: PageSettingsModel = { pageSize: 10, pageCount: 5 }
  const filterOptions: FilterSettingsModel = { type: "Menu" }

  let grid: Grid | null;
  const toolbarClick = (args: ClickEventArgs) => {
    if (grid && args.item.id === "grid_excelexport") {
      const excelExportProperties: ExcelExportProperties = {
        fileName: "DriverDetails.xlsx",
      };
      grid.excelExport(excelExportProperties);
    }
  };

  const rowSelected = () => {
    if (grid) {
      const selectedrowindex: number[] = grid.getSelectedRowIndexes();
      const selectedrecords: any = grid.getSelectedRecords();
      const dr_id = Number(JSON.stringify(selectedrecords[0]['did']))
      navigate("/driverView", {state:{dr_id :Number(JSON.stringify(selectedrecords[0]['did']))}})
    }
  }

  type tripType = {
    tid: Number,
    stime: Date,
    etime: Date,
    sloc: [],
    eloc: [],
    revenue: Number,
    city: {
      id: String,
      name: String,
      state: String,
    },
  }

  type dataGridType = {
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
  }


  const TotalTrips = (trips: tripType[]) => {
    var total = 0;
    trips.forEach((element: tripType) => {
      total += 1;
    });
    return total;
  };

  const TotalRevenue = (trips: tripType[]) => {
    var total = 0;
    trips.forEach((element: tripType) => {
      total = total + Number(element.revenue);
    });
    return total;
  };

  function numberFormat(x: string) {
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== "") lastThree = "," + lastThree;
    var res: string = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  }



  useEffect(() => {
    var dvr_data: object[] = [];
    var srno: number = 1;
    data.forEach((e: DriverDataType) => {
      const temp: { srno: number, did: number, name: string, dlno: string, bdate: string, working: string, trips: number, revenue: string } = {
        srno: srno,
        did: Number(e.did),
        name: e.fname + " " + e.lname,
        dlno: String(e.dlno),
        bdate: String(e.bdate).slice(0, 10),
        working: e.working ? "Working" : "Not Working",
        trips: TotalTrips(e.trips),
        revenue: "₹ " + numberFormat(String(TotalRevenue(e.trips))),

      };
      dvr_data.push(temp);
      srno += 1;
    });
    setDriverData(dvr_data);
  }, [data]);



  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:text-white dark:bg-flow_blue rounded-3xl border-1 border-[#8b7da9] shadow-lg shadow-[#8b7da9]">
      <Header title="Driver Details List" />
      <GridComponent
        id="grid"
        dataSource={driverData}
        width="auto"
        allowPaging={true}
        allowSorting={true}
        allowFiltering={true}
        pageSettings={pageSettings}
        // editSettings={editing}
        toolbar={toolbarOptions}
        filterSettings={filterOptions}
        allowExcelExport={true}
        toolbarClick={toolbarClick}
        rowSelected={rowSelected}
        ref={g => grid = g}
      >
        <ColumnsDirective>
          {driverGrid.map((item: dataGridType, index: any) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Search, Page, Sort, Toolbar, Filter, ExcelExport]} />
      </GridComponent>
    </div>
  );
};

export default Drivers;
