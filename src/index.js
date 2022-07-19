import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Cropper from './views/CropperView'

const root = ReactDOM.createRoot(
  document.getElementById("root") 
);
root.render(
    <React.StrictMode>
      <Cropper />
    </React.StrictMode>
);
