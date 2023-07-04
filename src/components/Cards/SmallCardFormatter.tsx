import React from "react";
import "../../Styles.scss";

function SmallCardFormatter({ props }: any) {
  return (
    <div
      className={` h-${props.height} smallCardFormatterContainer`}
    >
      <div>
        <h1 className="smallCardFormatterTitleText">
          {props.title.toUpperCase()}
        </h1>

      </div>
      <div>
        <div className="smallCardFormatterValueText">
          {props.value.toUpperCase()}
        </div>
        <div className="smallCardFormatterDurationText">
          {props.duration.toLowerCase()}
        </div>
      </div>
    </div>
  );
}

export default SmallCardFormatter;
