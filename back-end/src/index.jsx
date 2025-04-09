import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";
import "./styles/font.css";
import Footer1 from "../../components/Footer1";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
