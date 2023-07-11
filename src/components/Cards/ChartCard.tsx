import React from 'react';
import "../../Styles.scss"
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { BsInfoCircle } from 'react-icons/bs';

const ChartCard = ({prop, chart}:any) => {
  let style: object = {
    display: 'inline-block',
    padding: '5px'
};
  return (
    <div className="chartCardPrimaryContainer">
    <div >
                <div className="chartCardSecondaryContainer">
                <h1 className="chartCardTitleText">{prop.title.toUpperCase()} <TooltipComponent width="300px" isSticky={false} content={prop.content} position={prop.position} opensOn='Click' style={style} ><BsInfoCircle className='m-0 p-0' /></TooltipComponent></h1>
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