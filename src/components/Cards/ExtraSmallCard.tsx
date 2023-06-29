import React from 'react'
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import "../../Styles.css"


const ExtraSmallCard = ({ props }: any) => {
    return (
        <div className={`container extraXSmallContainer smallMargin mediumPadding h-${props.height} displayFlex flexCol flexJustifyBetween mainShadow`}>

            <h1 className="textStyle normalText smallPadding extraSmallText">{props.title.toUpperCase()}</h1>
            <div className="largeText textStyle paddingTopSmall  extraBoldWeightText">
                {props.value}
            </div>


        </div>
    )
}

export default ExtraSmallCard
