import React, { useEffect } from "react";
import {
  Filters,
  SmallCard,
  CardWithChart,
  ChartCard,
  LineChart,
  Bar,
} from "../components";
import { useStateContext } from "../contexts/ContextProvider";

type CardPropType = {
  title?: string;
  duration?: string;
  value?: string;
  icon?: string;
  percent?: string;
  height?: string;
};

const SmallCardProps1: CardPropType = {
  title: "AVERAGE TRIP DURATION",
  duration: "Last 7 days",
  value: "14 min",
  icon: "positive",
  percent: "2.45",
};
const SmallCardProps2: CardPropType = {
  title: "Average fuel consumption per vehicle",
  duration: "Last 7 days",
  value: "35.26 KG",
  icon: "positive",
  percent: "2.45",
};
const SmallCardProps3: CardPropType = {
  title: "Average fuel consumption per kilometer",
  duration: "Last 7 days",
  value: "0.253 KG",
  icon: "negative",
  percent: "0.25",
};
const SmallCardProps4: CardPropType = {
  title: "Average fuel consumption per vehicle",
  duration: "Last 7 days",
  value: "35.26 KG",
  icon: "positive",
  percent: "2.45",
};
const SmallCardProps5: CardPropType = {
  title: "Average Trip speed",
  duration: "Last 7 days",
  value: "35.26 km/hr",
  icon: "positive",
  percent: "2.45",
};
const SmallCardProps6: CardPropType = {
  title: "Peak hour (cumulative)",
  duration: "Last 7 days",
  value: "5:43 PM",
};
const SmallCardProps7: CardPropType = {
  title: "Morning peak",
  duration: "Last 7 days",
  value: "10:12 AM",
};
const SmallCardProps8: CardPropType = {
  title: "Evening peak",
  duration: "Last 7 days",
  value: "7:13 PM",
};

const CardWithChartProp1: CardPropType = {
  title: "TOTAL TRIPS",
  duration: "Last 7 days",
};

const CardWithChartProp2: CardPropType = {
  title: "TOTAL TRIPS",
  duration: "Last 7 days",
  value: "1126",
  icon: "positive",
  percent: "2.35",
};

const ChartCardProps: CardPropType = {
  title: "TRIP DURATION",
  duration: "Last 7 days",
};
const ChartCardProps4: CardPropType = {
  title: "TRIP LENGTH",
  duration: "Last 7 days",
};

const ChartCardProps2: CardPropType = {
  title: "TRIP SPEED",
  duration: "Last 7 days",
};

const TripAnalytics = () => {
  const {
    currentColor,
    currentMode,
    selectedDuration,
    selectedState,
    setSelectedDuration,
    setSelectedState,
  } = useStateContext();

  console.log(selectedDuration, selectedState);

  useEffect(() => {
    setSelectedDuration("Till Date");
    setSelectedState("All");
  }, []);
  return (
    <div className="extraSmallMargin">
      <div className="displayFlex">
        <Filters />
      </div>
      {/* <div className=" displayFlex  textLeft flexJustifyBetween widthFull">

                <SmallCard props={SmallCardProps6} />
                <SmallCard props={SmallCardProps7} />
                <SmallCard props={SmallCardProps8} />
            </div> */}
      <div className=" marginLeftSmall">
        <p className="text-2xl extraBoldWeightText  mainText grayText">
          Overview
        </p>
      </div>
      <div>
        <CardWithChart
          prop1={CardWithChartProp1}
          prop2={CardWithChartProp2}
          chart={<Bar />}
        />
      </div>
      <div className=" displayFlex  textLeft flexJustifyBetween widthFull">
        <SmallCard props={SmallCardProps6} />
        <SmallCard props={SmallCardProps7} />
        <SmallCard props={SmallCardProps8} />
      </div>
      {/* <div className=" displayFlex  textLeft flexJustifyBetween widthFull">
        <SmallCard props={SmallCardProps2} />
        <SmallCard props={SmallCardProps3} />
        <SmallCard props={SmallCardProps4} />
      </div> */}
      {/* <div className="displayFlex textLeft flexJustifyBetween widthFull">
        <ChartCard prop={ChartCardProps} chart={<Bar />} />
        <SmallCard props={SmallCardProps1} />
      </div> */}

      <div className=" marginLeftSmall marginTopMoreMedium">
        <p className="text-2xl extraBoldWeightText  mainText grayText">
          Trip Statistics
        </p>
      </div>
      <div className="displayFlex textLeft flexJustifyCenter widthFull">
        <ChartCard prop={ChartCardProps2} chart={<Bar />} />
      </div>
      <div className="displayFlex textLeft flexJustifyCenter widthFull">
        <ChartCard prop={ChartCardProps4} chart={<Bar />} />
      </div>
      <div className="displayFlex textLeft flexJustifyCenter widthFull">
        <ChartCard prop={ChartCardProps} chart={<Bar />} />
      </div>
      <div className=" marginLeftSmall marginTopMoreMedium">
        <p className="text-2xl extraBoldWeightText  mainText grayText">
          Spatial Patterns
        </p>
      </div>

      {/* <div className=" displayFlex  textLeft flexJustifyBetween widthFull">
        <SmallCard props={SmallCardProps5} />
        <ChartCard prop={ChartCardProps2} chart={<Bar />} />
      </div> */}
    </div>
  );
};

export default TripAnalytics;
