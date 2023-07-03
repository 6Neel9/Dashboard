import React from "react";
import "../Styles.scss"

type Component ={
  category?: string,
  title: string
}

const Header = ({ category, title }: Component) => (
  <div className="marginBottomMediumLarge">
    <p className="textLarge mainText">{category}</p>
    <p className="text-3xl extraBoldWeightText trackingTight mainText">
      {title}
    </p>
  </div>
);

export default Header;
