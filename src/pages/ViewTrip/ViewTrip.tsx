import React from 'react'
import { MapContainer, TileLayer } from "react-leaflet";
import RoutingMap from '../../components/Map/RoutingMap';
import { Header } from '../../components';
import "../../Styles.css"

const ViewTrip = () => {

  
  const tripData = {
    "driverId": 1,
    "tripID": 0,
    "startTime": "2023-04-01T17:06:00",
    "startLocation": [
      22.985913,
      72.553724
    ],
    "tripDistance": 9.1,
    "tripSpeed": 39.46,
    "tripDuration": 14,
    "endLocation": [
      23.052786,
      72.604619
    ],
    "tripFare": 97,
    "paymentType": "upi",
    "endTime": "2023-04-01T17:19:00"
  }

  return (
    <div className="largeMargin marginTopMedium largePadding mainBackground rounded3XLarge mainBorder mainShadow">
      <Header title="Trip Info:" />
      <MapContainer zoom={15} style={{ height: "45vh", borderRadius: "10px" }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RoutingMap start={{lat: tripData.startLocation[0], lng: tripData.startLocation[1]}} end={{lat: tripData.endLocation[0], lng: tripData.endLocation[1]}} />
      </MapContainer>

      <div className='mt-5 flex flex-row ml-auto mr-auto  justify-between '>
        <div className='ml-3'>
          <dl className="divide-y divide-gray-400">
            <div className="px-4 py-3 grid grid-cols-4 gap-10">
              <dt className="text-sm font-extrabold leading-6 mainText col-span-2">Trip Id</dt>
              <dd className=" text-sm leading-6 mainText col-span-2">{tripData.tripID}</dd>
            </div>
            <div className="px-4 py-3 grid grid-cols-4 gap-10">
              <dt className="text-sm font-extrabold leading-6 mainText col-span-2">Start Time</dt>
              <dd className=" text-sm leading-6 mainText col-span-2 ">{tripData.startTime}</dd>
            </div>
            <div className="px-4 py-3 grid grid-cols-4 gap-10">
              <dt className="text-sm font-extrabold leading-6 mainText col-span-2"> Distance [Km]</dt>
              <dd className=" text-sm leading-6 mainText col-span-2 ">{tripData.tripDistance}</dd>
            </div>
            <div className="px-4 py-3 grid grid-cols-4 gap-10">
              <dt className="text-sm font-extrabold leading-6 mainText col-span-2">Start Location [Coord.]</dt>
              <dd className=" text-sm leading-6 mainText col-span-2 ">{tripData.startLocation[0]+ ", "+ tripData.startLocation[1]}</dd>
            </div>

          </dl>
        </div>
        <div className='ml-3'>
          <dl className="divide-y divide-gray-400">
            <div className="px-4 py-3 grid grid-cols-4 gap-10">
              <dt className="text-sm font-extrabold leading-6 mainText col-span-2">Driver Id</dt>
              <dd className=" text-sm leading-6 mainText col-span-2 ">{tripData.driverId}</dd>
            </div>
            <div className="px-4 py-3 grid grid-cols-4 gap-10">
              <dt className="text-sm font-extrabold leading-6 mainText col-span-2">End Time</dt>
              <dd className=" text-sm leading-6 mainText col-span-2 ">{tripData.endTime}</dd>
            </div>
            <div className="px-4 py-3 grid grid-cols-4 gap-10">
              <dt className="text-sm font-extrabold leading-6 mainText col-span-2">Duration [min]</dt>
              <dd className=" text-sm leading-6 mainText col-span-2 ">{tripData.tripDuration}</dd>
            </div>
            <div className="px-4 py-3 grid grid-cols-4 gap-10">
              <dt className="text-sm font-extrabold leading-6 mainText col-span-2">End Location [Coord.]</dt>
              <dd className=" text-sm leading-6 mainText col-span-2 ">{tripData.endLocation[0] + ", "+ tripData.endLocation[1]}</dd>
            </div>
          </dl>
        </div>
        <div className='ml-3'>
          <dl className="divide-y divide-gray-400">
          <div className="px-4 py-3 grid grid-cols-4 gap-10">
              <dt className="text-sm font-extrabold leading-6 mainText col-span-2">Trip Fare [₹]</dt>
              <dd className=" text-sm leading-6 mainText col-span-2 ">{tripData.tripFare}</dd>
            </div>
            <div className="px-4 py-3 grid grid-cols-4 gap-10">
              <dt className="text-sm font-extrabold leading-6 mainText col-span-2">Payment Type</dt>
              <dd className=" text-sm leading-6 mainText col-span-2 ">{tripData.paymentType}</dd>
            </div>
            {/* <div className="px-4 py-3 grid grid-cols-4 gap-10">
              <dt className="text-sm font-extrabold leading-6 mainText">tripSpeed</dt>
              <dd className=" text-sm leading-6 mainText col-span-2 ">$120,000</dd>
            </div> */}
          </dl>
        </div>
      </div>

    </div >
  )
}

export default ViewTrip
