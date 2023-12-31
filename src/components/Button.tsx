import React from 'react';
import "../Styles.scss"

type props ={
  prop:{
  icon?: JSX.Element|undefined,
  bgHoverColor?: string,
  size?:string, 
  marginRight?:number, 
  text?: string, 
  borderRadius?: string, 
  width?: number|undefined,
  onclick?: () => void,
  }
}

// icon, bgColor, color, bgHoverColor, size, text, borderRadius, width 
const Button = ({prop} : props) => {
  // const { setIsClicked, initialState } = useStateContext();

  // const styles : React.CSSProperties={
  //   borderRadius: prop.borderRadius,
  //   backgroundColor: "#2C1F39"
  // }
  return (
    <button
      type="button"
      onClick={() => prop.onclick}
      className={` text-${prop.size}  w-${prop.width} mr-${prop.marginRight}  hover:bg-${prop.bgHoverColor} buttonContainer`}
    >
      {prop.icon} {prop.text}
    </button>
  );
};

export default Button;
