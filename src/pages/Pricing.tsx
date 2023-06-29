import React from 'react'
import { Header } from '../components'
import "../Styles.css"

const Pricing = () => {
  return (
    <div className="m-4 md:m-10 mt-24 p-10 mainBackground mainText mainBorder mainShadow rounded-3xl">
       <Header title="Pricing" />
       <form style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "1%",
            }} className="w-full  mt-5" >
                <div className="grid grid-cols-3  mb-5">
                    <div className="w-full px-3 mb-5 md:mb-0">
                        <label className="block uppercase text-md tracking-wide mainText   mb-2" htmlFor="Date">
                            Date
                        </label>
                        <input className="appearance-none block w-full secondaryBackground secondaryText border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white "
                            type="date"
                            id="date"
                            value={"2021-11-03"}
                            name="date" disabled />
                    </div>
                    <div className="w-full  px-3">
                        <label className="block uppercase tracking-wide mainText text-md mb-2" htmlFor="dayFareIntercept">
                            Day Fare Intercept
                        </label>
                        <input className="appearance-none block w-full secondaryBackground secondaryText border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text"
                            id="dayFareIntercept"
                            defaultValue={"3"}
                            name="dayFareIntercept" disabled />
                    </div>
                    <div className="w-full  px-3">
                        <label className="block uppercase tracking-wide mainText text-md mb-2" htmlFor="dayFareSlope">
                        Day Fare Slope
                        </label>
                        <input className="appearance-none block w-full secondaryBackground secondaryText border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text"
                            id="dayFareSlope"
                            defaultValue={"10"}
                            name="dayFareSlope" disabled />
                    </div>
                </div>
                <div className="grid grid-cols-3  mb-5">
                    <div className="w-full px-3 mb-5 md:mb-0">
                        <label className="block uppercase text-mdtracking-wide mainText   mb-2" htmlFor="lagguageRate">
                        Lagguage Rate
                        </label>
                        <input className="appearance-none block w-full secondaryBackground secondaryText border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="text"
                            id="lagguageRate"
                            value={"1"}
                            name="lagguageRate" disabled />
                    </div>
                    <div className="w-full  px-3">
                        <label className="block uppercase tracking-wide mainText text-md mb-2" htmlFor="minFareDayRupees">
                        Min Fare Day [₹]
                        </label>
                        <input className="appearance-none block w-full secondaryBackground secondaryText border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text"
                            id="minFareDayRupees"
                            defaultValue={"15"}
                            name="minFareDayRupees" disabled />
                    </div>
                    <div className="w-full  px-3">
                        <label className="block uppercase tracking-wide mainText text-md mb-2" htmlFor="minFareDistanceMetres">
                        Min Fare Distance [m]
                        </label>
                        <input className="appearance-none block w-full secondaryBackground secondaryText border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text"
                            id="minFareDistanceMetres"
                            defaultValue={"1200"}
                            name="minFareDistanceMetres" disabled />
                    </div>
                </div>
                <div className="grid grid-cols-3  mb-5">
                    <div className="w-full px-3 mb-5 md:mb-0">
                        <label className="block uppercase text-mdtracking-wide mainText   mb-2" htmlFor="minFareNightRupee">
                        Min Fare Night [₹]
                        </label>
                        <input className="appearance-none block w-full secondaryBackground secondaryText border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="text"
                            id="minFareNightRupee"
                            value={"22.5"}
                            name="minFareNightRupee" disabled />
                    </div>
                    <div className="w-full  px-3">
                        <label className="block uppercase tracking-wide mainText text-md mb-2" htmlFor="nightFareIntercept">
                        Night Fare Intercept
                        </label>
                        <input className="appearance-none block w-full secondaryBackground secondaryText border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text"
                            id="nightFareIntercept"
                            defaultValue={"4.5"}
                            name="nightFareIntercept" disabled />
                    </div>
                    <div className="w-full  px-3">
                        <label className="block uppercase tracking-wide mainText text-md mb-2" htmlFor="nightFareSlope">
                        Night Fare Slope
                        </label>
                        <input className="appearance-none block w-full secondaryBackground secondaryText border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text"
                            id="nightFareSlope"
                            defaultValue={"15"}
                            name="nightFareSlope" disabled />
                    </div>
                </div>
                <div className="grid grid-cols-3  mb-5">
                    <div className="w-full px-3 mb-5 md:mb-0">
                        <label className="block uppercase text-mdtracking-wide mainText   mb-2" htmlFor="waitingRatePerMinute">
                        Waiting Rate [/min]
                        </label>
                        <input className="appearance-none block w-full secondaryBackground secondaryText border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="text"
                            id="waitingRatePerMinute"
                            value={"0.2"}
                            name="waitingRatePerMinute" disabled />
                    </div>
                    
                </div>
               
                
                
            </form>
    </div>
  )
}

export default Pricing
