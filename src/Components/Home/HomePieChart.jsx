import React from 'react';
import { Chart } from "react-google-charts";
import SectionTitle from './SectionTitle';

const HomePieChart = () => {
    // Data for Pie Chart (Article Category Distribution)
  const pieChartData = [
    ["Category", "Articles"],
    ["Politics", 40],
    ["Technology", 30],
    ["Sports", 15],
    ["Entertainment", 10],
    ["Health", 5],
  ];

  const pieChartOptions = {
    title: "Article Categories",
    pieHole: 0.4,
  };
    return (
        <div className='dark:bg-gray-900 dark:text-white/60'>
            {/* Infographics & Data Insights Section */}
                  <section style={{ padding: "20px", textAlign: "center" }}>
                  <div className="flex items-center gap-x-3">
                  <SectionTitle heading="Infographics & Data Insights" subHeading="Infographics & Data Insights presents complex data in visually engaging formats, helping users quickly grasp key trends, statistics, and patterns for informed decision-making. 📊"></SectionTitle>
                    {/* <p className="font-bold ml-12 my-12 text-3xl">Infographics & Data Insights</p> */}
                  </div>
                    <Chart className='dark:bg-gray-900 dark:text-white/60'
                      chartType="PieChart"
                      width="500px"
                      height="300px"
                      data={pieChartData}
                      options={pieChartOptions}
                    />
                  </section>
        </div>
    );
};

export default HomePieChart;