import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { registerLicense } from "@syncfusion/ej2-base";
import "./Styles.scss"

import ContextProvider from "./contexts/ContextProvider";
import DisplayContextProvider from "./contexts/DisplayContextProvider";
import { Provider } from "react-redux";
import store from "./store/store";

//Added for heatmaplayer
import 'leaflet/dist/leaflet.css'

// Registering Syncfusion license key
// const key = process.env.SYNCFUSION_LICENSE_KEY
registerLicense(
  "ORg4AjUWIQA/Gnt2VFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5Xd0FjUH9edHxVQmdf"
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DisplayContextProvider>
        <ContextProvider>
          <App />
        </ContextProvider>
      </DisplayContextProvider>
    </Provider>
  </React.StrictMode>
);
