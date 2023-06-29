import React, { useState } from 'react'
import "../Styles.css"
import { ExtraSmallCard } from '../components'
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
import { IssueManagementGrid } from '../data/meiroData';
import { ClickEventArgs } from '@syncfusion/ej2-react-navigations';

const IssueManagement = () => {
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

    let grid: Grid | null;
    const toolbarOptions: ToolbarItems[] = ['Search', 'ExcelExport'];
    const [ticketData, setTicketData] = useState<any[]>([]);
    const pageSettings: PageSettingsModel = { pageSize: 10, pageCount: 5 }
    const filterOptions: FilterSettingsModel = { type: "Menu" }

    const toolbarClick = (args: ClickEventArgs) => {
        if (grid && args.item.id === "grid_excelexport") {
            const excelExportProperties: ExcelExportProperties = {
                fileName: "TripDetails.xlsx",
            };
            grid.excelExport(excelExportProperties);
        }
    };

    const issueManagementData=[
        {
          "ticketId": "MEI001",
          "ticketDate": "2023-06-27",
          "driverName": "Michael Brown",
          "vehicleNumber": "PQR9876",
          "query": "I haven't received my weekly payment statement from Meiro.",
          "status": "Open"
        },
        {
          "ticketId": "MEI002",
          "ticketDate": "2023-06-26",
          "driverName": "Sarah Davis",
          "vehicleNumber": "LMN5432",
          "query": "The Meiro driver app is not accurately calculating my earnings.",
          "status": "Open"
        },
        {
          "ticketId": "MEI003",
          "ticketDate": "2023-06-25",
          "driverName": "Robert Wilson",
          "vehicleNumber": "JKL1234",
          "query": "I encountered a bug in the Meiro app that prevents me from accepting ride requests.",
          "status": "Open"
        },
        {
          "ticketId": "MEI004",
          "ticketDate": "2023-06-24",
          "driverName": "Emma Taylor",
          "vehicleNumber": "DEF4567",
          "query": "I've been experiencing frequent GPS inaccuracies while using the Meiro driver app.",
          "status": "Open"
        },
        {
          "ticketId": "MEI005",
          "ticketDate": "2023-06-23",
          "driverName": "David Anderson",
          "vehicleNumber": "GHI7890",
          "query": "The Meiro driver app is not displaying surge pricing information correctly.",
          "status": "Open"
        }
      ]
      

    return (
        <div>
            <div className="displayFlex  textLeft flexJustifyBetween widthFull">
                <ExtraSmallCard props={{ title: "TOTAL TICKETS", value: "36", height: "" }} />
                <ExtraSmallCard props={{ title: "OPEN TICKETS", value: "5", height: "" }} />
                <ExtraSmallCard props={{ title: "INPROGRESS TICKETS", value: "5", height: "" }} />
                <ExtraSmallCard props={{ title: "CLOSED TICKETS", value: "26", height: "" }} />
                <ExtraSmallCard props={{ title: "TOTAL FEEDBACKS", value: "1", height: "" }} />
            </div>
            <div className='mt-4 ml-3 mr-3'>
                <GridComponent
                    dataSource={issueManagementData}
                    width="auto"
                    allowPaging={true}
                    allowSorting={true}
                    allowFiltering={true}
                    pageSettings={pageSettings}
                    toolbar={toolbarOptions}
                    filterSettings={filterOptions}
                    allowExcelExport={true}
                    toolbarClick={toolbarClick}
                    // rowSelected={rowSelected}
                    ref={g => grid = g}
                    className=' bg-flow_blue'
                >
                    <ColumnsDirective>
                        {IssueManagementGrid.map((item: dataGridType, index: any) => (
                            <ColumnDirective key={index} {...item} />
                        ))}
                    </ColumnsDirective>
                    <Inject services={[Search, Page, Sort, Toolbar, Filter, ExcelExport]} />
                </GridComponent>
            </div>
        </div>
    )
}

export default IssueManagement
