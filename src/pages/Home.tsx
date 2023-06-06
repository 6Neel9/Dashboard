import React from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import {
  AxisModel, ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
  ColumnSeries, Legend, DateTime, Tooltip, DataLabel, LineSeries,
}
  from '@syncfusion/ej2-react-charts';
import { Button, LineChart, Pie, SparkLine, Stacked } from "../components";
import {
  recentTransactions,
  dropdownData,
} from "../data/dummy";
import { earningData } from "../data/meiroData";
import { useStateContext } from "../contexts/ContextProvider";
import Filters from "../components/Filters";
import Line from "./Charts/Line";



const Home = ({ data }: any) => {
  const { currentColor, currentMode } = useStateContext();

  const total_drivers = data.length;
  var total_revenue = 0;
  function numberFormat(x: string) {
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== "") lastThree = "," + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  }

  var total_trips = 0;
  data.forEach((element: any) => {
    const temp = element.trips;
    temp.forEach((e: any) => {
      total_revenue = total_revenue + Number(e.revenue);
      total_trips += 1;
    });
  });



  const RevTimeChart = () => {

    var new_dateTimeData: any[] = [];
    // var date_trip: any[] = [];
    // var revenue_trip: any[] =[];
    // var revenue_trip_temp: any[] =[];
    data.forEach((element: any) => {
      const temp = element.trips;
      temp.forEach((e: any) => {
        // date_trip.push(new Date(e.etime))
        // revenue_trip_temp.push({date: new Date(e.etime), revenue: e.revenue})
        new_dateTimeData.push({ x: new Date(e.etime), y: e.revenue })
      })
    });
    for (var j = 0; j < new_dateTimeData.length - 1; j++) {
      var i = j;
      var e1 = new_dateTimeData[i];
      var e2 = new_dateTimeData[i + 1];
      while (e1.x > e2.x) {
        const t = new_dateTimeData[i];
        new_dateTimeData[i] = new_dateTimeData[i + 1];
        new_dateTimeData[i + 1] = t;
        i++;
      }
    }

    // date_trip.sort();
    // date_trip.forEach((e:any)=>{
    //   revenue_trip_temp.forEach((ele:any)=>{
    //     if(e === ele.date){
    //       revenue_trip.push(ele.revenue)
    //     }
    //   })
    // })

    // for(var i =0;i<date_trip.length;i++){
    //   new_dateTimeData.push({ x: new Date(date_trip[i]), y: revenue_trip[i] })
    // }

    const primaryxAxis: AxisModel = {
      valueType: 'DateTime', zoomFactor: 0.2, zoomPosition: 0.6, title: 'Sales Across Years', labelFormat: 'yMd',
      minimum: new Date(2020, 6, 1), maximum: new Date(2022, 11, 1)
    };
    const primaryyAxis: AxisModel = { title: 'Sales Amount in millions(USD)' };
    // const zoomsettings: ZoomSettingsModel = { enableSelectionZooming: true, enableScrollbar: true };

    return <ChartComponent id='charts'
      primaryXAxis={primaryxAxis}
      primaryYAxis={primaryyAxis}
      // zoomSettings={zoomsettings}
      title='Average Sales Comparison'>
      <Inject services={[ColumnSeries, Legend, Tooltip, DataLabel, LineSeries, DateTime]} />
      <SeriesCollectionDirective>
        <SeriesDirective dataSource={new_dateTimeData} xName='x' yName='y' name='Sales' type='Line'>
        </SeriesDirective>
      </SeriesCollectionDirective>
    </ChartComponent>

  };


  const buttonProps = {
    color: "white",
    bgColor: currentColor,
    borderRadius: "10px",
    icon: undefined,
    bgHoverColor: "",
    size: "",
    width: undefined
  }

  const buttonProps1 = {
    ...buttonProps,
    text: "Download Report",
  }
  const buttonProps2 = {
    ...buttonProps,
    text: "Add",
  }

  // const dropDownStyle: React.CSSProperties = {
  //   border: "none",
  //   color: currentMode === "Dark" ? "white" : ""
  // }


  const DropDown = () => (
    <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
      <DropDownListComponent
        id="time"
        fields={{ text: "Time", value: "Id" }}
        style={{ border: "none", color: currentMode === "Dark" ? "white" : "" }}
        value="1"
        dataSource={dropdownData}
        popupHeight="220px"
        popupWidth="120px"
      />
    </div>
  );

  type EarningDataType = {
    icon: JSX.Element;
    amount: string;
    percentage: string;
    title: string;
    iconColor: string;
    iconBg: string;
    pcColor: string;
  }

  return (
    <div className="mt-10">
      <Filters />
      <div className="flex flex-wrap   lg:flex-nowrap  justify-center w-full">
        <div className="flex m-3 flex-wrap justify-center  gap-1 items-center w-full">
         
          <div className=" flex justify-center w-full sm:flex-row">
            {earningData.map((item: EarningDataType) => (
              <div className=" bg-white dark:text-gray-200 dark:bg-secondary-dark-bg flex justify-evenly w-1/3 m-2 p-4 rounded-2xl">
               
                <div className="text-2xl lg:text-2xl mr-2 flex justify-center font-semibold">  <div className={`text-3xl lg:text-3xl mr-2`}  style={{color: currentColor}}>{item.icon}</div>{item.title}</div>
                <div className="text-2xl lg:text-2xl mr-2">
                  <span className="text-lg lg:text-3xl font-semibold">
                    {item.title === "Total Drivers" && total_drivers}
                    {item.title === "Total Revenue" &&
                      "₹" + numberFormat(String(total_revenue))}
                    {item.title === "Total Trips" && numberFormat(String(total_trips))}
                  </span></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-10 flex-wrap justify-center ">
        
      </div>

      <div className="flex gap-10 m-4 flex-wrap justify-center">
        
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
        <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold">Revenue: </p>
           
          </div>
          <div className="md:w-full overflow-auto">
          <Stacked />
          </div>
        </div>
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
          <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold">Sales Overview</p>
            <DropDown />
          </div>
          <div className="md:w-full overflow-auto">
            
          </div>
        </div>
      </div>
      <div className="flex gap-10 m-4 flex-wrap justify-center">
        
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
          <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold">Sales Overview</p>
            <DropDown />
          </div>
          <div className="md:w-full overflow-auto">
            <LineChart />
          </div>
        </div>
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
          <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold">Sales Overview</p>
            <DropDown />
          </div>
          <div className="md:w-full overflow-auto">
            <Line />
          </div>
        </div>
      </div>
    </div>
  );
};




export default Home;


