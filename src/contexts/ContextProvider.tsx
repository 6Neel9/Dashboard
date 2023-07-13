import React, { useState } from 'react'

type MyInitialStateType = {
    chat: boolean,
    cart: boolean,
    userProfile: boolean,
    notification: boolean,
}

const initialState: MyInitialStateType = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
}

interface Trip {
    _id: string;
    driverId: number;
    tripId: number;
    startLocation: string;
    tripDistance: number;
    tripSpeed: number;
    tripDuration: number;
    endLocation: string;
    startTime: string;
    tripFare: number;
    paymentType: string;
    endTime: string;
}


type MyContextType = {
    initialState: MyInitialStateType,
    screenSize: number | undefined,
    setScreenSize: React.Dispatch<React.SetStateAction<number | undefined>>,
    currentColor: string,
    setCurrentColor: React.Dispatch<React.SetStateAction<string>>,
    currentMode: string,
    setCurrentMode: React.Dispatch<React.SetStateAction<string>>,
    themeSettings: boolean,
    setThemeSettings: React.Dispatch<React.SetStateAction<boolean>>,
    activeMenu: boolean,
    setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>,
    isClicked: MyInitialStateType,
    setIsClicked: React.Dispatch<React.SetStateAction<MyInitialStateType>>,
    handleClick: (clicked: string) => void,
    setMode: (e: any) => void,
    setColor: (color: string) => void
    selectedDuration: string,
    setSelectedDuration: React.Dispatch<React.SetStateAction<string>>,
    selectedState: string,
    setSelectedState: React.Dispatch<React.SetStateAction<string>>,
    handleDurationChange: (event: any) => void,
    handleStateChange: (event: any) => void,
    setTripData: React.Dispatch<React.SetStateAction<Trip[]>>,
    tripData:any[],
    setDriverData: React.Dispatch<React.SetStateAction<any[]>>,
    driverData: any[]
}

const Context = React.createContext<MyContextType>({} as MyContextType)

interface Props {
    children: React.ReactNode
  }

const ContextProvider: React.FC<Props> = ({ children } ) : JSX.Element => {
    const [screenSize, setScreenSize] = useState<number | undefined>(undefined);    
    const [currentColor, setCurrentColor] = useState<string>('#2C1F39');
    const [currentMode, setCurrentMode] = useState<string>('Dark');
    const [themeSettings, setThemeSettings] = useState<boolean>(false);
    const [activeMenu, setActiveMenu] = useState<boolean>(true);
    const [isClicked, setIsClicked] = useState<MyInitialStateType>(initialState);
    const [selectedDuration, setSelectedDuration] = useState<string>('Today');
    const [selectedState, setSelectedState] = useState<string>('All');
    const [tripData, setTripData] = useState<Trip[]>([]);    
    const [driverData, setDriverData] = useState<any[]>([]);



     const handleDurationChange = (event: any) => {
        setSelectedDuration(event.target.value);
    };

    const handleStateChange = (event: any) => {
        setSelectedState(event.target.value);
    };

    const setMode = (e : any) => {
        setCurrentMode(e.target.value);
        localStorage.setItem('themeMode', e.target.value);
    };

    const setColor = (color : string) => {
        setCurrentColor(color);
        localStorage.setItem('colorMode', color);
    };

    const handleClick = (clicked: string) => setIsClicked({ ...initialState, [clicked]: true });

    return (
        <Context.Provider
            value={{
                currentColor,
                currentMode,
                activeMenu,
                screenSize,
                setScreenSize,
                handleClick,
                isClicked,
                initialState,
                setIsClicked,
                setActiveMenu,
                setCurrentColor,
                setCurrentMode,
                setMode,
                setColor,
                themeSettings,
                setThemeSettings,
                selectedDuration,
                setSelectedDuration,
                selectedState,
                setSelectedState,
                handleDurationChange,
                handleStateChange,
                setTripData,
                tripData,
                setDriverData,
                driverData
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default ContextProvider

export const useStateContext = () => React.useContext(Context)
