import React from 'react';
import "../../Styles.scss"

const ChartCard = ({prop, chart}:any) => {
  return (
    <div className="chartCardPrimaryContainer">
    <div >
                <div className="chartCardSecondaryContainer">
                <h1 className="chartCardTitleText">{prop.title.toUpperCase()}</h1>
                <h4 className="chartCardDurationText" >
                    {prop.duration.toLowerCase()}
                </h4>
                </div>
                <div className="ChartCardChartContainer">{chart}</div>
            </div>
    </div>
  )
}

export default ChartCard