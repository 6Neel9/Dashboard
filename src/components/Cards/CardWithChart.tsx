import React from 'react'
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import "../../Styles.scss"



const CardWithChart = ({ prop1, prop2, chart }: any) => {
    return (
        <div className='cardWithChartContainer'>
            <div className="cardWithChartSecondaryContainer">
                <div className="marginRightMedium">
                    <div className='cardWithChartTertiaryContainer'>
                        <div className="cardWithChartQuaternaryContainer">
                            <div className="cardWithChartTitleText" >
                                {prop2.title}
                            </div>
                            <div className="cardWithChartDurationText" >
                                {prop2.duration.toLowerCase()}
                            </div>
                        </div>
                        <div className="cardWithChartValueText" >
                            {prop2.value}
                        </div>
                        <div >
                            {prop2.percent && <div>
                                {Number(prop2.percent) === 0 ? <h1 className="smallCardNeutral">0%</h1> : prop2.percent > 0 ?
                                    <h1 className="smallCardPositive"><SlArrowUp className="percentIcon" /> {prop2.percent}%</h1> :
                                    <h1 className="smallCardNegative"><SlArrowDown className="percentIcon" /> {prop2.percent}%</h1>
                                }

                            </div>}
                        </div>
                    </div>
                </div>
                <div className="cardWithChartPrimaryContainer">
                    <div className="cardWithChartSecondaryChartContainer">
                        <h1 className="cardWithChartChartTitleText">{prop1.title}</h1>
                        <h4 className="cardWithChartChartDurationText" >
                            {prop1.duration.toLowerCase()}
                        </h4>
                    </div>

                    <div className="cardWithChartChart">{chart}</div>
                </div>

            </div>
        </div>
    )
}

export default CardWithChart