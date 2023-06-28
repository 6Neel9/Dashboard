import React from 'react'
import { SlArrowDown, SlArrowUp } from "react-icons/sl";



const CardWithChart = ({ prop1, prop2, chart }: any) => {
    return (
        <div className='displayFlex textLeft heightFitContent smallMargin  mediumPadding marginBottomMedium mainBackground mainBorder  roundedExtraXLarge'>
        <div className=" heightFitContent   textLeft flexJustifyBetween displayGrid gridCols3 divideXSmall widthFull ">
            <div className="marginRightMedium">
                <div className='displayFlex flexJustifyBetween flexCol'>
                    <div className="displayFlex flexJustifyBetween ">
                        <div className="mediumText textLeft textStyle extraSmallText" >
                            {prop2.title}
                        </div>

                        <div className="smallPadding textLeft textStyle" >
                            {prop2.duration.toLowerCase()}
                        </div>
                    </div>
                    <div className=" largeText smallPadding mediumWeightText textStyle marginTopExtraLarges  extraBoldWeightText" >
                        {prop2.value}
                    </div>
                    <div >
                        {prop2.icon === "positive" ?
                            <h1 className="displayInlineBlock paddingTopSmall percentIncrease"><SlArrowUp className="displayInlineBlock" /> {prop2.percent}%</h1> :
                            <h1 className="displayInlineBlock paddingTopSmall percentDecrease"><SlArrowDown className="displayInlineBlock" /> {prop2.percent}%</h1>
                        }
                    </div>
                </div>
            </div>
            <div className="marginLeftSmall colSpan2">
                <div className="displayFlex flexJustifyBetween marginLeftMedium">
                    <h1 className="mediumText textStyle extraSmallText">{prop1.title}</h1>
                    <h4 className="text-right textStyle " >
                        {prop1.duration.toLowerCase()}
                    </h4>
                </div>

                <div className="textCenter marginLeftLarge  displayFlex flexJustifyCenter">{chart}</div>
            </div>


        </div>
        </div>
    )
}

export default CardWithChart