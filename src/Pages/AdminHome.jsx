import React from "react";
import PieChart from "../Components/PieChart";
import { Helmet } from "react-helmet-async";
import StaticCharts from "../Components/StaticCharts";

const AdminHome = () => {
  return (
    <div>
      <Helmet>
        <title>Dashboard || Admin Home</title>
      </Helmet>
      <PieChart></PieChart>
      <StaticCharts/>
    </div>
  );
};

export default AdminHome;
