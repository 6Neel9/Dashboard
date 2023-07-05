import React from "react";
import "../Styles.scss"

type Component ={
  category?: string,
  title: string
}

const Header = ({ category, title }: Component) => (
  <div className="headerContainer">
    <p className="headerCategory">{category}</p>
    <p className="headerTitle">
      {title}
    </p>
  </div>
);

export default Header;
