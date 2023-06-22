import React, { FormEvent } from "react";
import Button from "../components/Button";
import { useStateContext } from "../contexts/ContextProvider";
import { GrClose } from "react-icons/gr";
import "../Styles.css";


const AddNewDriver = () => {
    const { currentColor, currentMode } = useStateContext();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const fname = String(e.target.fname.value);
        const lname = String(e.target.lname.value);
        const dlno = String(e.target.licenceNo.value);
        const bdate = new Date(e.target.bdate.value);
        const did = Number(e.target.driverId.value);
        const work = Boolean(e.target.working.value === 'true' ? true : false);

        if (fname === "" || lname === "" || dlno === "" || did === null) {
            alert("Please fill all the details!")
        } else {

            await fetch("http://127.0.0.1:5000/addNewDriver", {
                method: "POST",
                body: JSON.stringify({
                    fname: fname,
                    lname: lname,
                    dlno: dlno,
                    bdate: bdate,
                    did: did,
                    working: work,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === "ok") {
                        alert(fname + " has been added successfully!")
                    } else {
                        alert("Process Unsuccessfull!")
                    }

                })
                .catch((err) => {
                    console.log(err.message);
                });
        }

    };

    const buttonProps = {
        color: "white",
        bgColor: "flow_blue",
        icon: undefined,
        width: undefined
    }
    const buttonProps1 = {
        ...buttonProps,
        size: "",
        bgHoverColor: "",
        bgColor: "flow_blue",
        borderRadius: "10px",
        text: "Add Driver",
    }




    return (
        <div className="largeMargin marginTopMedium largePadding mainBackground mainShadow mainBorder rounded3XLarge">
            <div className="displayFlex floatRight marginBottomMedium">
                {/* <span onClick={() => navigate("/driverView", { state: { dr_id: did } })}>
            <button
              type="button"
              title="Close"
              style={{ color: "black", fontSize: "25px", borderRadius: "50%", fontWeight: "bold" }}
              className="text-2xl p-3 hover:drop-shadow-xl hover:bg-gray-200"
            >
              <GrClose />
            </button>
          </span> */}
            </div>
            <h1 className="mainText extraBoldWeightText mediumLargeText">Add New Driver:</h1>
            <form style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "4%",
            }} className="widthFull maxWidthLarge" onSubmit={handleSubmit}>
                <div className="displayFlex flexWrap neagativeMarginXSmall marginBottomMediumLarge">
                    <div className="halfWidth averageXPadding ">
                        <label className="mainText formLabel smallText boldWeightText" htmlFor="FirstName">
                            First Name
                        </label>
                        <input className="formInput widthFull secondaryBackground mainBorder roundedMedium " type="text"
                            id="FirstName"
                            placeholder="First Name"
                            name="fname" />
                    </div>
                    <div className="widthFull halfWidth averageXPadding">
                        <label className="mainText formLabel smallText boldWeightText" htmlFor="LastName">
                            Last Name
                        </label>
                        <input className="formInput widthFull secondaryBackground mainBorder roundedMedium " type="text"
                            id="LastName"
                            placeholder="Last Name"
                            name="lname" />
                    </div>
                </div>
                <div className="displayFlex flexWrap neagativeMarginXSmall marginBottomMediumLarge">
                    <div className="widthFull averageXPadding">
                        <label className="mainText formLabel smallText boldWeightText" htmlFor="Bdate" >
                            Birth Date
                        </label>
                        <input type="date" className="formInput secondaryText widthFull secondaryBackground mainBorder roundedMedium"
                            id="Bdate"
                            placeholder="BirthDate"
                            name="bdate" />
                    </div>
                </div>
                <div className="displayFlex flexWrap neagativeMarginXSmall marginBottomMediumLarge">
                    <div className="widthFull averageXPadding">
                        <label className="mainText formLabel smallText boldWeightText" htmlFor="DriverId" >
                            Driver Id
                        </label>
                        <input className="formInput widthFull secondaryBackground mainBorder roundedMedium" type="text"
                            id="DriverId"
                            placeholder="Driver Id"
                            name="driverId" />
                    </div>
                </div>
                <div className="displayFlex flexWrap neagativeMarginXSmall marginBottomMediumLarge">
                    <div className="widthFull averageXPadding">
                        <label className="mainText formLabel smallText boldWeightText" htmlFor="LicenceNo" >
                            Licence No.
                        </label>
                        <input className="formInput  widthFull secondaryBackground mainBorder roundedMedium" type="text"
                            id="LicenceNo"
                            placeholder="Licence No."
                            name="licenceNo" />
                    </div>
                </div>
                <div className="displayFlex flexWrap neagativeMarginXSmall marginBottomMediumLarge">
                    <div className="widthFull averageXPadding">
                        <label className="mainText formLabel smallText boldWeightText" htmlFor="LicenceNo" >
                            Work Status
                        </label>
                        <div className="relative">
                            <select className="formInput secondaryText widthFull secondaryBackground mainBorder roundedMedium" id="workStatus" name="working">
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
}

export default AddNewDriver




