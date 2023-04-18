import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./driverDetails.scss";
import { Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";

type DriverDataType = {
    _id: String;
    did: Number,
    fname: String,
    lname: String,
    bdate: Date,
    dlno: String,
    working: Boolean,
    trips: [
        {
            tid: Number,
            stime: Date,
            etime: Date,
            sloc: [],
            eloc: [],
            revenue: Number,
            city: {
                id: String,
                name: String,
                state: String,
            },
        },
    ],

};
type TempObjType = {
    tripsArr: any;
    fname: String;
    lname: String;
    dlno: String;
    bdate: string;
    did: Number;
    work: string;
    trips: number;
    revenue: string;
    id: String,
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
        // console.log("update");
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
        borderRadius: "10px",
        icon: undefined,
        bgHoverColor: "",
        size: "",
        width: undefined
    }
    const buttonProps1 = {
        ...buttonProps,
        text: "Update",
    }
    const buttonProps2 = {
        ...buttonProps,
        text: "Back",
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
            <div className="details">
                <h1 className="text-black font-extrabold text-4xl dark:text-white">Driver Info:</h1>
                <div className="flex flex-wrap  md:flex-wrap-reverse">
                    <div className="m-8 p-3  rounded-3xl text-black dark:text-white">
                        <table className="table-auto border-separate border-spacing-x-5 border-spacing-y-2 text-2xl">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-extrabold">First Name</td>
                                    <td>{drdata.fname}</td>
                                </tr>
                                <tr>
                                    <td className="font-extrabold ">Last Name</td>
                                    <td>{drdata.lname}</td>
                                </tr>
                                <tr>
                                    <td className="font-extrabold">Driver Id</td>
                                    <td>{String(drdata.did)}</td>
                                </tr>
                                <tr>
                                    <td className="font-extrabold">Licence No.</td>
                                    <td>{drdata.dlno}</td>
                                </tr>

                                <tr>
                                    <td className="font-extrabold">Birth Date</td>
                                    <td>{drdata.bdate}</td>
                                </tr>
                                <tr>
                                    <td className="font-extrabold">Work Status</td>
                                    <td>{drdata.work}</td>
                                </tr>
                                <tr>
                                    <td className="font-extrabold">Total Trips</td>
                                    <td>{drdata.trips}</td>
                                </tr>
                                <tr>
                                    <td className="font-extrabold">Total Revenue</td>
                                    <td>{drdata.revenue}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                </div>
                <div className="flex  justify-center">
                    <div className=" flex  justify-items-center  justify-between w-60 ">
                        <span onClick={handleClick}>
                            <Button
                                prop={buttonProps1}

                            />
                        </span>
                        <span onClick={()=>navigate("/driversList")}>
                            <Button
                                prop={buttonProps2}
                            />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewDriver
