import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Home1 from "./Pages/Home1";
import ContractDetails from "./Pages/ContractDetails";
import EditContract from "./Pages/EditContract";
import AddContract from "./Pages/AddContract";
import AddEmpresa from "./Pages/AddEmpsresa";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "*", element: <NotFound /> },
    {
      path: "home1",
      element: <Home1 />,
    },
    {
      path: "contractdetails",
      element: <ContractDetails />,
    },
    {
      path: "editcontract",
      element: <EditContract />,
    },
    {
      path: "addcontract",
      element: <AddContract />,
    },
    {
      path: "addempresa",
      element: <AddEmpresa />,
    },
  ]);

  return element;
};

export default ProjectRoutes;
