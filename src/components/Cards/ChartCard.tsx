import React from 'react'

const ChartCard = ({prop, chart}:any) => {
  return (
    <div className="container smallMargin averageMediumPadding  textLeft  flexJustifyBetween widthFull ">
    <div >
                <div className="displayFlex flexJustifyBetween marginLeftMedium">
                <h1 className="smallText mainText extraSmallText">{prop.title.toUpperCase()}</h1>
                <h4 className=" textRight mainText" >
                    {prop.duration.toLowerCase()}
                </h4>
                </div>
                <div className="mediumText textCenter marginLeftLarge displayFlex flexJustifyCenter">{chart}</div>
            </div>
    </div>
  )
}

export default ChartCard