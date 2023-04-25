import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./driverDetails.scss";
import { Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";

type DriverDataType = {
    _id: string;
    did: number,
    fname: string,
    lname: string,
    bdate: Date,
    dlno: string,
    working: Boolean,
    trips: [
        {
            tid: number,
            stime: Date,
            etime: Date,
            sloc: [],
            eloc: [],
            revenue: number,
            city: {
                id: string,
                name: string,
                state: string,
            },
        },
    ],

};
type TempObjType = {
    tripsArr: any;
    fname: string;
    lname: string;
    dlno: string;
    bdate: string;
    did: number;
    work: string;
    trips: number;
    revenue: string;
    id: string,
};

const ViewDriver = ({ data }: any) => {

    const { currentColor, currentMode } = useStateContext();
    const navigate = useNavigate();
    const location = useLocation();
    // const [allData, setAllData] = useState([]);
    const { dr_id } = location.state;
    const [updateData, setUpdateData] = useState<TempObjType>({
        tripsArr: undefined,
        fname: '',
        lname: '',
        dlno: '',
        bdate: '',
        did: 0,
        work: '',
        trips: 0,
        revenue: '',
        id: '',
    });
    const [drdata, setDrdata] = useState<TempObjType>({
        tripsArr: undefined,
        fname: '',
        lname: '',
        dlno: '',
        bdate: '',
        did: 0,
        work: '',
        trips: 0,
        revenue: '',
        id: '',
    });

    const handleClick = () => {
        navigate("/driverUpdate", { state: updateData });
    };


    useEffect(() => {
        // console.log(dr_id)
        fetchData(dr_id);
        // setAllData(data);
    }, []);

    const fetchData = (drid: number) => {
        data.forEach((d: DriverDataType) => {
            // console.log(d)
            // console.log(drid)
            if (d.did === Number(drid)) {

                var obj: TempObjType = {
                    id: d._id,
                    tripsArr: d.trips,
                    fname: d.fname,
                    lname: d.lname,
                    dlno: d.dlno,
                    bdate: String(d.bdate).slice(0, 10),
                    did: d.did,
                    work: d.working ? "Working" : "Not Working",
                    trips: TotalTrips(d.trips),
                    revenue: "Rs. " + TotalRevenue(d.trips),
                }
                setDrdata(obj);
                setUpdateData(obj);
            }
        });
    };

    const buttonProps = {
        color: "white",
        bgColor: currentColor,
        icon: undefined,
        width: undefined
    }
    const buttonProps1 = {
        ...buttonProps,
        size: "",
        bgHoverColor: "",
        borderRadius: "10px",
        text: "Update",
    }
    const buttonProps2 = {
        ...buttonProps,
        bgHoverColor: "bg-gray-400",
        size: "xl",
        borderRadius: "100%",
        text: "X",
    }


    const TotalTrips = (trips: any) => {
        var total = 0;
        trips.forEach((element: any) => {
            total += 1;
        });
        return total;
    };

    const TotalRevenue = (trips: any) => {
        var total = 0;
        trips.forEach((element: any) => {
            total = total + Number(element.revenue);
        });
        return total;
    };

    return (
        <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">


            <div className="flex float-right mb-2">
                <span onClick={() => navigate("/driversList")}>
                    <Button
                        prop={buttonProps2}
                    />
                </span>
            </div>
            <h1 className="text-black font-extrabold text-4xl dark:text-white">Update Driver Info:</h1>
            <form style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "1%",
            }} className="w-full max-w-lg" >
                <div className="flex flex-wrap -mx-3 mb-5">
                    <div className="w-full md:w-1/2 px-3 mb-5 md:mb-0">
                        <label className="block uppercase text-xl tracking-wide text-gray-700  font-bold mb-2" htmlFor="FirstName">
                            First Name
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text"
                            id="FirstName"
                            placeholder="First Name"
                            value={drdata.fname}
                            name="fname" disabled />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2" htmlFor="LastName">
                            Last Name
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text"
                            id="LastName"
                            placeholder="Last Name"
                            defaultValue={drdata.lname}
                            name="lname" disabled />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-5">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2" htmlFor="Bdate" >
                            Birth Date
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text"
                            id="Bdate"
                            placeholder="BirthDate"
                            defaultValue={drdata.bdate}
                            name="bdate" disabled />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-5">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2" htmlFor="DriverId" >
                            Driver Id
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text"
                            id="DriverId"
                            placeholder="Driver Id"
                            defaultValue={dr_id}
                            name="driverId" disabled />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-5">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2" htmlFor="LicenceNo" >
                            Licence No.
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text"
                            id="LicenceNo"
                            placeholder="Licence No."
                            defaultValue={drdata.dlno}
                            name="licenceNo" disabled />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-5">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2" htmlFor="workStatus" >
                            Work Status
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text"
                            id="workStatus"
                            defaultValue={drdata.work}
                            name="licenceNo" disabled />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-5">
                    <div className="w-full md:w-1/2 px-3 mb-5 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2" htmlFor="totalTrips">
                            Total Trips
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text"
                            id="totalTrips"
                            value={drdata.trips}
                            name="totalTrips" disabled />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2" htmlFor="totalRevenue">
                            Total Revenue
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text"
                            id="totalRevenue"
                            defaultValue={drdata.revenue}
                            name="totalRevenue" disabled />
                    </div>
                </div>
            </form>
            <div className="flex  justify-center">

                <span onClick={handleClick}>
                    <Button
                        prop={buttonProps1}

                    />
                </span>

            </div>
        </div>
    )
}

export default ViewDriver
