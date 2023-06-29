import React from "react";
import "../../Styles.css";

function SmallCardFormatter({ props }: any) {
  return (
    <div
      className={`container smallContainer smallMargin mediumPadding h-${props.height} displayFlex flexCol flexJustifyBetween mainShadow`}
    >
      <div>
        <h1 className="textStyle normalText smallPadding extraSmallText">
          {props.title.toUpperCase()}
        </h1>

      </div>
      <div>
        <div className="largeText textStyle paddingTopSmall  extraBoldWeightText">
          {props.value.toUpperCase()}
        </div>
        <div className="textStyle smallPadding">
          {props.duration.toLowerCase()}
        </div>
      </div>
    </div>
  );
}

export default SmallCardFormatter;
