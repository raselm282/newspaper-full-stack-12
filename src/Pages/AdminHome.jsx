import React from "react";
import PieChart from "../Components/PieChart";
import { Helmet } from "react-helmet-async";

const AdminHome = () => {
  return (
    <div>
      <Helmet>
        <title>Dashboard || Admin Home</title>
      </Helmet>
      <PieChart></PieChart>
    </div>
  );
};

export default AdminHome;
