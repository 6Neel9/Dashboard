import React from 'react'
import { SlArrowDown, SlArrowUp } from "react-icons/sl";


const CardWithChart = ({ prop1, prop2, chart }: any) => {
    return (
        <div className=" heightFitContent smallMargin  textLeft flexJustifyBetween displayGrid gridCols3 divideXSmall widthFull ">
            <div className="marginRightMedium">
                <div className="displayFlex flexJustifyBetween marginBottomLarge">
                    <div className="mediumText smallPadding textLeft textStyle" >
                        {prop2.title}
                    </div>

                    <div className="smallPadding textLeft textStyle" >
                        {prop2.duration}
                    </div>
                </div>
                <div className="extraLargeText smallPadding mediumWeightText textStyle" >
                    {prop2.value}
                </div>
                <div >
                    {prop2.icon === "positive" ?
                        <h1 className="displayInlineBlock percentIncrease"><SlArrowUp className="displayInlineBlock" /> {prop2.percent}%</h1> :
                        <h1 className="displayInlineBlock percentDecrease"><SlArrowDown className="displayInlineBlock" /> {prop2.percent}%</h1>
                    }
                </div>
            </div>
            <div className="marginLeftSmall colSpan2">
                <div className="displayFlex flexJustifyBetween marginLeftMedium">
                <h1 className="mediumText textStyle">{prop1.title}</h1>
                <h4 className="text-right textStyle" >
                    {prop1.duration}
                </h4>
                </div>

                <div className="textCenter marginLeftLarge  displayFlex flexJustifyCenter">{chart}</div>
            </div>


        </div>
    )
}

export default CardWithChart