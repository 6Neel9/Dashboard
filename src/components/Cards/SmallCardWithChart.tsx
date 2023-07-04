import React from "react";
import "../../Styles.scss";

function SmallCardWithChart({ props, chart }: any) {
  return (
    <div
      className={`smallCardWithChartContainer`}
    >
      <div>
        <h1 className="smallCardWithChartTitleText">
          {props.title.toUpperCase()}
        </h1>
        <div className="smallCardWithChartDurationText">
          {props.duration.toLowerCase()}
        </div>
      </div>
      <div>
        <div className="smallCardWithChartChartContainer">
          {chart}
        </div>
      </div>
    </div>
  );
}

export default SmallCardWithChart;
