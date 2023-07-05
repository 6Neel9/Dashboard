import React from 'react'
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import "../../Styles.scss"


const SmallCard = ({ props }: any) => {
    return (
        <div className={`smallCardContainer h-${props.height} `}>
            <div>
                <h1 className="smallCardTitleText">{props.title.toUpperCase()}</h1>
                <div className="smallCardDurationText">
                    {props.duration.toLowerCase()}
                </div>
            </div>
            <div>
                <div className="smallCardValueText">
                    {props.value}
                </div>
                {props.percent && <div>
                    {Number(props.percent) === 0 ? <h1 className="smallCardNeutral">0%</h1> : props.percent > 0 ?
                        <h1 className="smallCardPositive"><SlArrowUp className="percentIcon" /> {Number(props.percent).toFixed(2)}%</h1> :
                        <h1 className="smallCardNegative"><SlArrowDown className="percentIcon" /> {String(Number(props.percent).toFixed(2)).slice(1)}%</h1>
                    }

                </div>}
            </div>
        </div>
    )
}

export default SmallCard