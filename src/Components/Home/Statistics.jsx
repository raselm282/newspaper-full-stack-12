import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useArticles from "../../Hooks/useArticles";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import LoadingSpinner from "../LoadingSpinner";
import SectionTitle from "./SectionTitle";

const Statistics = () => {
    const axiosPublic = useAxiosPublic()
    const { data: countUp = {},isLoading: loading } = useQuery({
        queryKey: ['countUp'],
        queryFn: async () => {
            const res = await axiosPublic.get('/statistics');
            return res.data;
        }
    });
    const [articles] = useArticles();
  // console.log(articles);
  const premiumArticles = articles.filter((item) => item.isPremium);
  // console.log(premiumArticles);
  const premium = premiumArticles.length
  
  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
        <div className="flex items-center gap-x-3">
        <SectionTitle heading="Statistics" subHeading="Statistics provides insights and analytical data, including user engagement, article performance, and publisher contributions. It helps track trends, measure impact, and optimize content strategy. 📊"></SectionTitle>
        {/* <p className="font-bold ml-12 my-12 text-3xl">
        Statistics
        </p> */}
      </div>
      <div className="dark:bg-gray-900 dark:text-white/60" style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
        {/* মোট ইউজার */}
        <div className="dark:bg-gray-900 dark:text-white/60">
          <h3 className="font-bold bg-orange-200 p-3 rounded-md dark:bg-gray-800 dark:text-white/60">Total Users</h3>
          <CountUp className="text-5xl " end={countUp.users} duration={3} />
        </div>
        {/* নরমাল ইউজার */}
        <div>
          <h3 className="font-bold bg-orange-200 p-3 rounded-md dark:bg-gray-800 dark:text-white/60">Normal Users</h3>
          <CountUp className="text-5xl" end={countUp.users} duration={3} />
        </div>
        {/* প্রিমিয়াম ইউজার */}
        <div>
          <h3 className="font-bold bg-orange-200 p-3 rounded-md dark:bg-gray-800 dark:text-white/60">Premium Users</h3>
          <CountUp className="text-5xl" end={premium} duration={3} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
