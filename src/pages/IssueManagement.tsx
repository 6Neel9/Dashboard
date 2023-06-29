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
                    dataSource={ticketData}
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
