import React from "react";
import "./driverUpdate.scss"
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Button";
import { useStateContext } from "../../contexts/ContextProvider";
import { GrClose } from "react-icons/gr";

const DriverUpdate = () => {
  const { currentColor, currentMode } = useStateContext();

  const location = useLocation();
  const navigate = useNavigate();
  const { fname, lname, did, dlno, bdate, id, tripsArr } = location.state;
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const fname = String(e.target.fname.value);
    const lname = String(e.target.lname.value);
    const dlno = String(e.target.licenceNo.value);
    const bdate = new Date(e.target.bdate.value);
    const did = Number(e.target.driverId.value);
    const work = Boolean(e.target.working.value === 'true' ? true : false);

    await fetch("http://127.0.0.1:5000/updateDriverDetail", {
      method: "POST",
      body: JSON.stringify({
        id: String(id),
        fname: fname,
        lname: lname,
        dlno: dlno,
        bdate: bdate,
        did: did,
        working: work,
        trips: tripsArr,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/driversList");
      })
      .catch((err) => {
        console.log(err.message);
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

  console.log(id, tripsArr);

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <div className="flex float-right mb-4">
        <span onClick={() => navigate("/driverView", { state: { dr_id: did } })}>
          <button
            type="button"
            title="Close"
            style={{ color: "black", fontSize: "25px", borderRadius: "50%", fontWeight: "bold" }}
            className="text-2xl p-3 hover:drop-shadow-xl hover:bg-gray-200"
          >
            <GrClose />
          </button>
        </span>
      </div>
      <h1 className="text-black font-extrabold text-4xl dark:text-white">Update Driver Info:</h1>
      <form style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "4%",
      }} className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2" htmlFor="FirstName">
              First Name
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text"
              id="FirstName"
              placeholder="First Name"
              defaultValue={fname}
              name="fname" />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2" htmlFor="LastName">
              Last Name
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text"
              id="LastName"
              placeholder="Last Name"
              defaultValue={lname}
              name="lname" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2" htmlFor="Bdate" >
              Birth Date
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="date"
              id="Bdate"
              placeholder="BirthDate"
              defaultValue={bdate}
              name="bdate" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2" htmlFor="DriverId" >
              Driver Id
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text"
              id="DriverId"
              placeholder="Driver Id"
              defaultValue={did}
              name="driverId" disabled/>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2" htmlFor="LicenceNo" >
              Licence No.
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text"
              id="LicenceNo"
              placeholder="Licence No."
              defaultValue={dlno}
              name="licenceNo" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2" htmlFor="LicenceNo" >
              Work Status
            </label>
            <div className="relative">
              <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="workStatus" name="working">
                <option value={"true"}>Working</option>
                <option value={"false"}>Not Working</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" name="submit" >
          {<Button
            prop={buttonProps1}
          />}
        </button>
      </form>
    </div>

  );
};

export default DriverUpdate;
