import React from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import {
  AxisModel, ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
  ColumnSeries, Legend, DateTime, Tooltip, DataLabel, LineSeries,
}
  from '@syncfusion/ej2-react-charts';
import { Button, LineChart,Bar} from "../components";
import {
  recentTransactions,
  dropdownData,
} from "../data/dummy";
import { earningData } from "../data/meiroData";
import { useStateContext } from "../contexts/ContextProvider";
import {MediumCard,SmallCard,CardWithChart, Filters,ChartCard} from '../components';
import Line from "./Charts/Line";
import "../Styles.css"



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

    return <ChartComponent 
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
  
  type CardPropType={
    title?: string,
    duration?: string,
    value?: string,
    icon?: string,
    percent?: string,
    height?: string,
  }

  const MediumCardProps: CardPropType = {
    title:"DRIVER REVENUE",
    duration:"Last 7 days",
    value:"₹ 5,000",
    icon:"positive",
    percent:"10",
  }

  const SmallCardOneProps : CardPropType = {
    title:"DRIVER",
    duration:"Current",
    value:"1080",
    icon:"positive",
    percent:"5.45",
  }
  const SmallCardTwoProps : CardPropType = {
    title:"ACTIVE USERS",
    duration:"Last 7 days",
    value:"945",
    icon:"Negative",
    percent:"3.75",
  }

  const AttritionedDrivers: CardPropType = {
    title:"TOTAL ATTRITIONED DRIVERS",
    duration:"Last 7 days",
    value:"576",
    icon:"Negative",
    percent:"1.75",
  }

  const ActiveDrivers: CardPropType = {
    title:"TOTAL ACTIVE DRIVERS",
    duration:"Last 7 days",
    value:"8990",
    icon:"Positive",  
    percent:"1.67",
  }

  const PercentActiveDrivers: CardPropType = {
    title:"TOTAL ACTIVE DRIVERS",
    duration:"Since Last Month",
    value:"9.1%",
    icon:"positive",  
    percent:"1.69",
  }
  const VehiclePercent: CardPropType = {
    title:"TOTAL VEHICLES",
    duration:"Since Last Month",
    value:"6.87%",
    icon:"positive",  
    percent:"1.69",
  }

  const UnactivatedDrivers: CardPropType = {
    title:"TOTAL UNACTIVE DRIVERS",
    duration:"Last 7 days",
    value:"678",
    icon:"positive",  
    percent:"2.79",
  }

  const TotalVehicles: CardPropType = {
    title:"TOTAL VEHICLES",
    duration:"Last 7 days",
    value:"1056",
    icon:"positive",  
    percent:"7.79",
  }
  const CardWithChartProp1 : CardPropType = {
    title: "DRIVER REVENUE",
    duration: "Last 7 days",
  }

  const ReveneMeiro : CardPropType = {
    title: "CHANGE OVER MEIRO REVENUE",
    duration: "Over last N months",
  }

  const AvgDistPerUser : CardPropType = {
    title: "AVG DISTANCE PER USER",
    duration: "Over last N months",
  }

  const ReveneDriver : CardPropType = {
    title: "CHANGE OVER DRIVER REVENUE",
    duration: "Over last N months",
  }

  const AvgTripDuration : CardPropType = {
    title: "AVG TRIP DURATION",
    duration: "Over last N months",
  }


 
  const CashFreeUsers2 : CardPropType = {
    title: "CASH FREE USERS",
    duration: "Last 7 days",
  }

  const TotalDrivers : CardPropType = {
    title: "TOTAL DRIVERS",
    duration: "Last 7 days",
  }
  const TotalTripsChart : CardPropType = {
    title: "TOTAL TRIPS",
    duration: "Last 7 days",
  }
  const CardWithChartProp2 : CardPropType = {
    title: "MRR",
    duration: "Last 7 days",
    value:"₹ 28,07,653",
    icon:"positive",
    percent:"7.35",
  }

  const MeiroRevenuePercentChange : CardPropType = {
    title: "CHANGE OVER MEIRO REVENUE",
    duration: "Last Month",
    value:"28%",
    icon:"positive",
    percent:"5.32",
  }

  const DriverRevenuePercentChange : CardPropType = {
    title: "CHANGE OVER DRIVER REVENUE",
    duration: "Last Month",
    value:"17%",
    icon:"positive",
    percent:"1.52",
  }

  const NewDrivers : CardPropType = {
    title: "TOTAL NEW DRIVERS",
    duration: "Last 7 days",
    value:"6458",
    icon:"positive",
    percent:"7.35",
  }

  const TotalTrips: CardPropType = {
    title: "TOTAL TRIPS",
    duration: "Last 7 days",
    value:"65,332",
    icon:"positive",
    percent:"0.35",
  }
  
  const TotalDownloads: CardPropType = {
    title: "TOTAL DOWNLOADS",
    duration: "Last 7 days",
    value:"1,00,043",
    icon:"positive",
    percent:"0.31",
  }

  const TotalTripsAtTheTime: CardPropType = {
    title: "TOTAL TRIPS",
    duration: "For this particular day",
    value:"1032",
    icon:"negative",
    percent:"0.12",
  }

  const LiveTrips: CardPropType = {
    title: "LIVE TRIPS",
    duration: "Currently",
    value:"122",
    icon:"positive",
    percent:"0.11",
  }

  const DistanceCovered: CardPropType = {
    title: "DISTANCE COVERED",
    duration: "Last 7 Days",
    value:"45,367 km",
    icon:"positive",
    percent:"0.71",
  }

  const AvgDistanceCovered: CardPropType = {
    title: "AVG TRIP LENGTH",
    duration: "Last 7 Days",
    value:"2.9 km",
    icon:"negative",
    percent:"0.91",
  }

  const GrowthRateDrivers: CardPropType = {
    title: "GROWTH RATE OF DRIVERS",
    duration: "Last 7 Days",
    value:"2.7%",
    icon:"negative",
    percent:"0.36",
  }

  const ComplementCashFreeUsers: CardPropType = {
    title: "COMPLEMENT OF CASH FREE USERS",
    duration: "Last 7 Days",
    value: "25,997",
    icon: "negative",
    percent: "0.3",
   

}

const ConversionRate: CardPropType = {
  title: "ACTIVE DRIVERS AS AGAINST DOWNLOADS",
  duration: "Last 7 Days",
  value: "25,876",
  icon: "positive",
  percent: "2.46",
 

}

const TotalRevenueMeiro: CardPropType = {
  title: "TOTAL REVENUE FOR MEIRO",
  duration: "Last 7 Days",
  value: "₹ 50,589",
  icon: "positive",
  percent: "2.46",
 

}

const AvgRevenuePerUser: CardPropType = {
  title: "AVG REVENUE / USER",
  duration: "Last 7 days",
  value: "₹3489",
  icon: "positive",
  percent: "2.45",

}
  


  

  

  return (

    <div className = "extraSmallMargin">
      <div className="displayFlex">
      <Filters />
      </div>
      
      <div className="displayFlex textLeft flexJustifyBetween ">
        <MediumCard props={MediumCardProps}/>
        <SmallCard props={SmallCardOneProps}/>
        <SmallCard props={SmallCardTwoProps}/>
      </div>
      <div className="displayFlex textLeft heightFitContent smallMargin  mediumPadding marginBottomMedium container widthFull">
        <CardWithChart prop1={CardWithChartProp1} prop2={CardWithChartProp2} chart={<LineChart />}/>
      </div>


    
      <div className="displayFlex textLeft heightFitContent smallMargin mediumPadding marginBottomMedium container w-fit">
        <CardWithChart prop1={TotalDrivers} prop2={NewDrivers} chart={<Bar />}/>
      </div>

      <div className="displayFlex  textLeft flexJustifyBetween widthFull">
        <SmallCard props={AttritionedDrivers} />
        <SmallCard props={ActiveDrivers} />
        <SmallCard props={DistanceCovered} />
        
      </div>

      <div className="displayFlex  textLeft flexJustifyBetween widthFull">
        <SmallCard props={UnactivatedDrivers} />
        <SmallCard props={TotalVehicles} />
        <SmallCard props={AvgDistanceCovered} />
      </div>

      <div className="displayFlex textLeft heightFitContent smallMargin mediumPadding marginBottomMedium container">
        <CardWithChart prop1={TotalTripsChart} prop2={TotalTrips} chart={<LineChart />}/>
      </div>

      <div className="displayFlex  textLeft flexJustifyBetween widthFull">
        <SmallCard props={TotalDownloads} />
        <SmallCard props={TotalTripsAtTheTime} />
        <SmallCard props={LiveTrips} />
      </div>

      <div className="main-container-3 flex  text-left justify-between w-full">
        <SmallCard props={DistanceCovered} />
        <SmallCard props={AvgDistanceCovered} />
        <SmallCard props={GrowthRateDrivers} />
      </div>

      <div className=" displayFlex textLeft heightFitContent smallMargin mediumPadding marginBottomMedium container">
        <CardWithChart prop1={CashFreeUsers2} prop2={ComplementCashFreeUsers} chart={<LineChart />}/>
      </div>

      <div className=" displayFlex  textLeft flexJustifyBetween widthFull">
        <SmallCard props={ConversionRate} />
        <SmallCard props={TotalRevenueMeiro} />
        <SmallCard props={AvgRevenuePerUser} />
      </div>

      <div className="main-container-2 flex text-left bg-[#2C1F39] h-fit m-2.5 p-5 border-1 border-[#8b7da9] shadow-lg shadow-[#8b7da9]  rounded-2xl  ">
        <CardWithChart prop1={ReveneMeiro} prop2={MeiroRevenuePercentChange} chart={<Bar />}/>
      </div>

      <div className="main-container-2 flex text-left bg-[#2C1F39] h-fit m-2.5 p-5 border-1 border-[#8b7da9] shadow-lg shadow-[#8b7da9]  rounded-2xl  ">
        <CardWithChart prop1={ReveneDriver} prop2={DriverRevenuePercentChange} chart={<Bar />}/>
      </div>




     

      </div >
  );
};




export default Home;





    // <div className="mt-10">
    // <Filters />
    //   <div className="displayFlex displayFlex-wrap   lg:displayFlex-nowrap  justify-center widthFull">
    //     <div className="displayFlex m-3 displayFlex-wrap justify-center  gap-1 items-center widthFull">
         
    //       <div className=" displayFlex justify-center widthFull sm:displayFlex-row">
    //         {earningData.map((item: EarningDataType) => (
    //           <div className=" bg-white dark:text-gray-200 dark:bg-secondary-dark-bg displayFlex justify-evenly w-1/3 m-2 p-4 rounded-2xl">
               
    //             <div className="text-2xl lg:text-2xl mr-2 displayFlex justify-center font-semibold">  <div className={`text-3xl lg:text-3xl mr-2`}  style={{color: currentColor}}>{item.icon}</div>{item.title}</div>
    //             <div className="text-2xl lg:text-2xl mr-2">
    //               <span className="text-lg lg:text-3xl font-semibold">
    //                 {item.title === "Total Drivers" && total_drivers}
    //                 {item.title === "Total Revenue" &&
    //                   "₹" + numberFormat(String(total_revenue))}
    //                 {item.title === "Total Trips" && numberFormat(String(total_trips))}
    //               </span></div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>

    //   <div className="displayFlex gap-10 displayFlex-wrap justify-center ">
        
    //   </div>

    //   <div className="displayFlex gap-10 m-4 displayFlex-wrap justify-center">
        
    //     <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
    //     <div className="displayFlex flexJustifyBetween items-center gap-2 mb-10">
    //         <p className="text-xl font-semibold">Revenue: </p>
           
    //       </div>
    //       <div className="md:widthFull overflow-auto">
    //       <Bar />
    //       </div>
    //     </div>
    //     <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
    //       <div className="displayFlex flexJustifyBetween items-center gap-2 mb-10">
    //         <p className="text-xl font-semibold">Sales Overview</p>
          
    //       </div>
    //       <div className="md:widthFull overflow-auto">
    //         <Pie />
    //       </div>
    //     </div>
    //   </div>
    //   <div className="displayFlex gap-10 m-4 displayFlex-wrap justify-center">
        
    //     <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
    //       <div className="displayFlex flexJustifyBetween items-center gap-2 mb-10">
    //         <p className="text-xl font-semibold">Sales Overview</p>
          
    //       </div>
    //       <div className="md:widthFull overflow-auto">
    //         <Area />
    //       </div>
    //     </div>
    //     <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
    //       <div className="displayFlex flexJustifyBetween items-center gap-2 mb-10">
    //         <p className="text-xl font-semibold">Sales Overview</p>
    //       </div>
    //       <div className="md:widthFull overflow-auto">
    //         <Line />
    //       </div>
    //     </div>
    // </div>
    //   </div>



