import React from "react";
import "../../Styles.css";

function SmallCardWithChart({ props, chart }: any) {
  return (
    <div
      className={`container smallContainer smallMargin mediumPadding h-${props.height} displayFlex flexCol flexJustifyBetween mainShadow`}
    >
      <div>
        <h1 className="textStyle normalText smallPadding extraSmallText">
          {props.title.toUpperCase()}
        </h1>
        <div className="textStyle smallPadding">
          {props.duration.toLowerCase()}
        </div>
      </div>
      <div>
        <div className="mediumText textCenter marginLeftLarge displayFlex flexJustifyCenter">
          {chart}
        </div>
      </div>
    </div>
  );
}

export default SmallCardWithChart;
