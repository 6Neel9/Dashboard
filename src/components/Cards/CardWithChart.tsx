import React from 'react'
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import "../../Styles.scss"
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { BsInfoCircle } from 'react-icons/bs';



const CardWithChart = ({ prop1, prop2, chart }: any) => {
    let style: object = {
        display: 'inline-block',
        padding: '5px'
    };
    return (
        <div className='cardWithChartContainer'>
            <div className="cardWithChartSecondaryContainer">
                <div className="marginRightMedium">
                    <div className='cardWithChartTertiaryContainer'>
                        <div className="cardWithChartQuaternaryContainer">
                            <div className="cardWithChartTitleText" >
                                {prop2.title}<TooltipComponent width="300px" isSticky={false} content={prop2.content} position={prop2.position} opensOn='Click' style={style} ><BsInfoCircle className='m-0 p-0' /></TooltipComponent>
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
                                    <h1 className="smallCardPositive"><SlArrowUp className="percentIcon" /> {Number(prop2.percent).toFixed(2)}%</h1> :
                                    <h1 className="smallCardNegative"><SlArrowDown className="percentIcon" /> {String(Number(prop2.percent).toFixed(2)).slice(1)}%</h1>
                                }

                            </div>}
                        </div>
                    </div>
                </div>
                <div className="cardWithChartPrimaryContainer">
                    <div className="cardWithChartSecondaryChartContainer">
                        <h1 className="cardWithChartChartTitleText">{prop1.title}<TooltipComponent width="300px" isSticky={false} content={prop1.content} position={prop1.position} opensOn='Click' style={style} ><BsInfoCircle className='m-0 p-0' /></TooltipComponent></h1>
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