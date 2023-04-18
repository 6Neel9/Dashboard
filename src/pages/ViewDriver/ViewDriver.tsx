import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./driverDetails.scss";

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
        console.log("update");
    };


     useEffect(() => {
        console.log(dr_id)
        fetchData(dr_id);
        // setAllData(data);
    }, []);

    const fetchData =(drid:number) => {
        data.forEach((d: DriverDataType) => {
            // console.log(d)
            console.log(drid)
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

                <div className="moreDetail">
                    <div className="left">
                        <table className="table table-striped">
                            <tbody>
                                <tr>
                                    <td className="bold">First Name</td>
                                    <td>{drdata.fname}</td>
                                </tr>
                                <tr>
                                    <td className="bold">Last Name</td>
                                    <td>{drdata.lname}</td>
                                </tr>
                                <tr>
                                    <td className="bold">Driver Id</td>
                                    <td>{String(drdata.did)}</td>
                                </tr>
                                <tr>
                                    <td className="bold">Licence No.</td>
                                    <td>{drdata.dlno}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="right">
                        <table className="table table-striped">
                            <tbody>
                                <tr>
                                    <td className="bold">Birth Date</td>
                                    <td>{drdata.bdate}</td>
                                </tr>
                                <tr>
                                    <td className="bold">Work Status</td>
                                    <td>{drdata.work}</td>
                                </tr>
                                <tr>
                                    <td className="bold">Total Trips</td>
                                    <td>{drdata.trips}</td>
                                </tr>
                                <tr>
                                    <td className="bold">Total Revenue</td>
                                    <td>{drdata.revenue}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary space updateBtn"
                        onClick={handleClick}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ViewDriver
