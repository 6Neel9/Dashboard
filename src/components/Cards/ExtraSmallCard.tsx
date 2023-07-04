import React from 'react'
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import "../../Styles.scss"


const ExtraSmallCard = ({ props }: any) => {
    return (
        <div className={` h-${props.height} extraSmallCardContainer`}>

            <h1 className="extraSmallCardTitleText">{props.title.toUpperCase()}</h1>
            <div className="extraSmallCardValueText">
                {props.value}
            </div>


        </div>
    )
}

export default ExtraSmallCard
