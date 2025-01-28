import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useArticles from "../../Hooks/useArticles";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import LoadingSpinner from "../LoadingSpinner";

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
        <p className="font-bold ml-12 my-12 text-3xl">
        Statistics
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
        {/* মোট ইউজার */}
        <div>
          <h3 className="font-bold bg-orange-200 p-3 rounded-md">Total Users</h3>
          <CountUp className="text-5xl" end={countUp.users} duration={3} />
        </div>
        {/* নরমাল ইউজার */}
        <div>
          <h3 className="font-bold bg-orange-200 p-3 rounded-md">Normal Users</h3>
          <CountUp className="text-5xl" end={countUp.users} duration={3} />
        </div>
        {/* প্রিমিয়াম ইউজার */}
        <div>
          <h3 className="font-bold bg-orange-200 p-3 rounded-md">Premium Users</h3>
          <CountUp className="text-5xl" end={premium} duration={3} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
