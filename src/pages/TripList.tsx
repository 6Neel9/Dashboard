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
    Grid,
    FilterSettingsModel,
    ToolbarItems,
    ExcelExportProperties,

} from "@syncfusion/ej2-react-grids";

// import { employeesData, employeesGrid } from "../data/dummy";
import { tripGrid } from "../data/meiroData";
import { Header } from "../components";
import { ClickEventArgs } from "@syncfusion/ej2-react-navigations";
import "../Styles.css"


const TripList = ({ data }: any) => {
    const navigate = useNavigate();

    // type DriverDataType = {
    //     did: Number,
    //     fname: String,
    //     lname: String,
    //     bdate: Date,
    //     dlno: String,
    //     working: Boolean,
    //     trips: [
    //         {
    //             tid: Number,
    //             stime: Date,
    //             etime: Date,
    //             sloc: [],
    //             eloc: [],
    //             revenue: Number,
    //             city: {
    //                 id: String,
    //                 name: String,
    //                 state: String,
    //             },
    //         },
    //     ],

    // };
    // type TripDataType =
    //     {
    //         tid?: Number,
    //         stime?: Date,
    //         etime?: Date,
    //         sloc?: [],
    //         eloc?: [],
    //         revenue?: Number,
    //         city?: {
    //             id: String,
    //             name: String,
    //             state: String,
    //         },

    //     }[];

    const toolbarOptions: ToolbarItems[] = ['Search', 'ExcelExport'];
    const [tripData, setTripData] = useState<any[]>([]);
    const pageSettings: PageSettingsModel = { pageSize: 10, pageCount: 5 }
    const filterOptions: FilterSettingsModel = { type: "Menu" }

    let grid: Grid | null;
    const toolbarClick = (args: ClickEventArgs) => {
        if (grid && args.item.id === "grid_excelexport") {
            const excelExportProperties: ExcelExportProperties = {
                fileName: "TripDetails.xlsx",
            };
            grid.excelExport(excelExportProperties);
        }
    };

    // function numberFormat(x: string) {
    //     x = x.toString();
    //     var lastThree = x.substring(x.length - 3);
    //     var otherNumbers = x.substring(0, x.length - 3);
    //     if (otherNumbers !== "") lastThree = "," + lastThree;
    //     var res: string = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    //     return res;
    // }


    
        // useEffect(() => {
        //     var tr_data: object[] = [];
        //     var srno: number = 1;
        //     data.forEach((e: DriverDataType) => {
        //         const temp_trips = e.trips;
        //         temp_trips.forEach((ele)=>{
        //             const city = ele.city;
        //             const temp: {srno:Number, tid: Number, stime: String, etime: String, sloc: [], eloc: [], revenue: String, city: String}={
        //                 srno:srno, tid: ele.tid, stime: String(ele.stime).slice(0, 10), etime: String(ele.etime).slice(0, 10), sloc: ele.sloc, eloc: ele.eloc, revenue: "₹ " + numberFormat(String((ele.revenue))), city: city['name']
        //             }
        //             tr_data.push(temp)
        //             srno += 1;
        //         })
                
        //     });
        //     setTripData(tr_data);
        // }, [data]);


        
        useEffect(() => {
          fetch("http://localhost:5000/yuja-sm/v1/trips", {
            method: "GET",
          })
            .then((res) => res.json())
            .then((i) => {
              setTripData(i);
              console.log(i);
            })
        }, []);
    const rowSelected = () => {
        if (grid) {
            // const selectedrowindex: number[] = grid.getSelectedRowIndexes();
            const selectedrecords: any = grid.getSelectedRecords();
            const SelectedTripData = JSON.stringify(selectedrecords[0])
            navigate("/tripView", { state: { SelectedTripData: SelectedTripData } })
        }
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

    return (
        <div className="largeMargin marginTopLarge largePadding mainBackground rounded3XLarge mainBorder mainShadow">
            <Header title="Trip List" />
            <GridComponent
                id="grid"
                dataSource={tripData}
                width="auto"
                allowPaging={true}
                allowSorting={true}
                allowFiltering={true}
                pageSettings={pageSettings}
                toolbar={toolbarOptions}
                filterSettings={filterOptions}
                allowExcelExport={true}
                toolbarClick={toolbarClick}
                rowSelected={rowSelected}
                ref={g => grid = g}
            >
                <ColumnsDirective>
                    {tripGrid.map((item: dataGridType, index: any) => (
                        <ColumnDirective key={index} {...item} />
                    ))}
                </ColumnsDirective>
                <Inject services={[Search, Page, Sort, Toolbar, Filter, ExcelExport]} />
            </GridComponent>
        </div>
    )
}

export default TripList




