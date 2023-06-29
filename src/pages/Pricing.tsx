import React, { useState } from "react";
import "../Styles.css";

const Pricing = () => {

  return (
    <div className="displayFlex flexJustifyCenter flexCol" >
      <div className=" marginLeftSmall marginTopMoreMedium widths">
        <p className="text-2xl extraBoldWeightText  mainText grayText">
          Pricing
        </p>
      </div>
      <div className="inputElem displayFlex flexJustifyCenter flexCol widths">
        <label>
          <h2>Day Fare Intercept</h2>
          <input
            className="input"
            type="text"
            placeholder="Enter Date"
            value="3"
            disabled
          />
        </label>
        <label>
          <h2>Day Fare Intercept</h2>
          <input
            className="input"
            type="text"
            placeholder="Enter Date"
            value="3"
            disabled
          />
        </label>
        <label>
          <h2>Day Fare Intercept</h2>
          <input type="text" placeholder="Enter Date" value="3" disabled />
        </label>
        <label>
          <h2>Day Fare Intercept</h2>
          <input
            className="input"
            type="text"
            placeholder="Enter Date"
            value="3"
            disabled
          />
        </label>{" "}
        <label>
          <h2>Day Fare Intercept</h2>
          <input
            className="input"
            type="text"
            placeholder="Enter Date"
            value="3"
            disabled
          />
        </label>
      </div>
    </div>
  );
};

export default Pricing;
