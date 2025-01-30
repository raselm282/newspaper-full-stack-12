import React from "react";
import { Chart } from "react-google-charts";

const StaticCharts = () => {
  // Data for Bar Chart
  const barChartData = [
    ["Year", "Sales", "Expenses"],
    ["2019", 1000, 400],
    ["2020", 1170, 460],
    ["2021", 660, 1120],
    ["2022", 1030, 540],
  ];

  // Data for Line Chart
  const lineChartData = [
    ["Month", "Visitors"],
    ["Jan", 500],
    ["Feb", 700],
    ["Mar", 800],
    ["Apr", 1200],
    ["May", 1500],
  ];

  // Options for charts
  const barChartOptions = {
    title: "Company Performance",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Total",
      minValue: 0,
    },
    vAxis: {
      title: "Year",
    },
  };

  const lineChartOptions = {
    title: "Website Traffic Over Time",
    curveType: "function",
    legend: { position: "bottom" },
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
      {/* Bar Chart */}
      <Chart
        chartType="BarChart"
        width="500px"
        height="300px"
        data={barChartData}
        options={barChartOptions}
      />

      {/* Line Chart */}
      <Chart
        chartType="LineChart"
        width="500px"
        height="300px"
        data={lineChartData}
        options={lineChartOptions}
      />
    </div>
  );
};

export default StaticCharts;
