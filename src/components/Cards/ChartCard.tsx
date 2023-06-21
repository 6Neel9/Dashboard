import React from 'react'

const ChartCard = ({prop, chart}:any) => {
  return (
    <div className="container smallMargin mediumPadding  textLeft  flexJustifyBetween widthFull ">
    <div >
                <div className="displayFlex flexJustifyBetween marginLeftMedium">
                <h1 className="smallText smallPadding mainText">{prop.title.toUpperCase()}</h1>
                <h4 className="smallPadding textRight mainText" >
                    {prop.duration.toUpperCase()}
                </h4>
                </div>
                <div className="mediumText textCenter marginLeftLarge marginTopMedium displayFlex flexJustifyCenter">{chart}</div>
            </div>
    </div>
  )
}

export default ChartCard
