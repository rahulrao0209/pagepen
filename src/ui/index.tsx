import React from "react";
import { createRoot } from "react-dom/client";
import Popup from "./popup/Popup";
import "../style.css";

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(<Popup />);
