import React, { useEffect, useState } from "react";
import usePublishers from "../../Hooks/usePublishers";
import LoadingSpinner from "../LoadingSpinner";
import SectionTitle from "./SectionTitle";

const AllPublisher = () => {
    const [publishers, loading] = usePublishers()
    // console.log(publishers);
  
  if (loading) return <LoadingSpinner></LoadingSpinner>

  return (
    <div className="my-7">
      <div className="flex items-center gap-x-3 mb-7 mt-12">
      {/* <SectionTitle heading="All Publisher"></SectionTitle> */}
      <SectionTitle heading="All Publisher" subHeading="All Publishers showcases a list of verified news publishers contributing articles to the platform. It provides details about each publisher, including their name, credibility, and published content. 📢"></SectionTitle>
        {/* <p className="font-bold ml-12 text-3xl">
          All Publisher :{" "}
        </p> */}
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {publishers.length}
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {publishers.length > 0 ? (
          publishers.map((pub) => (
            <div className="flex gap-5 p-4 items-center dark:bg-gray-800 dark:text-white/60" key={pub._id}>
              <b>{pub.publisher}</b> <img className="w-10 rounded-lg" src={pub.image} alt="image" />
            </div>
          ))
        ) : (
          <p>No publishers found.</p>
        )}
      </div>
    </div>
  );
};

export default AllPublisher;
