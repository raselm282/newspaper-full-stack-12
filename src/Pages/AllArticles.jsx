import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Components/LoadingSpinner";
import ArticleCard from "../Components/ArticleCard";
// import useArticles from "../Hooks/useArticles";
// import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import axios from "axios";
import SectionTitle from "../Components/Home/SectionTitle";

const AllArticles = () => {
  const axiosPublic = useAxiosPublic();
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  // const [count, setCount] = useState(0);

  const [search, setSearch] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const [selectedTags, setSelectedTags] = useState("");
  // const { user } = useAuth(); // Get Logged-in User

  const { data: approvedArticles = [], isPending: loading } = useQuery({
    queryKey: ["approvedArticles", search, selectedPublisher, selectedTags,currentPage,itemsPerPage],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (currentPage) params.append("page", currentPage);
      if (itemsPerPage) params.append("size", itemsPerPage);
      

      if (search) params.append("search", search);
      if (selectedPublisher) params.append("publishers", selectedPublisher);
      if (selectedTags)
        params.append("tags", selectedTags);
      // if (selectedTags.length > 0)
      //   params.append("tags", selectedTags.join(","));

      const res = await axiosPublic.get(`/allArticlesPages?${params.toString()}`);
      // console.log(res);
      return res.data;
    },
  });
  // console.log(approvedArticles);

  const { data: count = 0 } = useQuery({
    queryKey: ["approvedArticles", search, selectedPublisher, selectedTags],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (selectedPublisher) params.append("publishers", selectedPublisher);
      if (selectedTags) params.append("tags", selectedTags);
      const res = await axiosPublic.get(`/jobs-count?${params.toString()}`);
      // console.log(res);
      return res.data.count;
    },
  });
  // useEffect(() => {
  //   const getCount = async () => {
  //     const { data } = await axios(
  //       `${
  //         import.meta.env.VITE_API_URL
  //       }/jobs-count?filter=${filter}&search=${search}`
  //     );

  //     setCount(data.count);
  //   };
  //   getCount();
  // }, [filter, search]);
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);
   //  handle pagination button
   const handlePaginationButton = (value) => {
    // console.log(value);
    setCurrentPage(value);
  };
  // const [approvedArticles,setApprovedArticles] = useState([])
  // const [filter, setFilter] = useState('')
  // const [search, setSearch] = useState('')
  // const [sort, setSort] = useState('')
  //   const {data: approvedArticles = [], isPending: loading} = useQuery({
  //     queryKey: ['approvedArticles',search],
  //     queryFn: async() =>{
  //         const res = await axiosPublic.get(`allArticles?search=${search}`);
  //         const allApprovedArticles = res.data.filter(
  //                 (item) => item.status === "approved"
  //               )
  //         // console.log(allApprovedArticles);
  //         return allApprovedArticles;
  //     }
  // })
  // console.log(approvedArticles);
  //-------
  // useEffect(() => {
  //   const fetchAllJobs = async () => {
  //     const { data } = await axios.get(
  //       `${
  //         import.meta.env.VITE_API_URL
  //       }/allArticles?search=${search}`
  //     )
  //     setApprovedArticles(data.filter(
  //       (item) => item.status === "approved"
  //     ))
  //   }
  //   fetchAllJobs()
  // }, [search])
  // const [articles, loading] = useArticles(search);
  //   const axiosPublic = useAxiosPublic()

  //   const [search, setSearch] = useState("");
  //   const {data: articles = [], isLoading: loading} = useQuery({
  //     queryKey: ['articles',search],
  //     queryFn: async() =>{
  //         const res = await axiosPublic.get(`/allArticles?search=${search}`);
  //         return res.data;
  //     }
  // })
  // console.log(search);
  // console.log(articles);
  // const approvedArticles = articles.filter(
  //   (item) => item.status === "approved"
  // );
  // console.log(approvedArticles);

  // if (loading) return <LoadingSpinner />;
  return (
    <div>
      <Helmet>
        <title>All Articles</title>
      </Helmet>
      <div className="flex items-center gap-x-3">
      <SectionTitle heading="All Approved Articles"></SectionTitle>

        {/* <p className="font-bold ml-12 text-3xl">All Approved Articles: </p> */}
        {/* <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {approvedArticles.length}
        </span> */}
      </div>

      <div className="flex w-full justify-around my-12 ">
        {/* 🔍 Search & Filters */}
        <div>
          <input
            type="text"
            placeholder="Search articles by Title"
            className="border dark:bg-gray-900 dark:text-white/60 p-2 rounded w-full text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div>
          <select
            
            value={selectedPublisher}
            onChange={(e) => setSelectedPublisher(
              e.target.value)}
            className="border p-2 rounded dark:bg-gray-900 dark:text-white/60"
          >
            <option value="">All Publishers</option>
            <option value="Prothom Alo">Prothom Alo</option>
            <option value="Kaler Kantho">Kaler Kantho</option>
            <option value="Amar Desh">Amar Desh</option>
            <option value="Doinik Korotoa">Doinik Korotoa</option>
          </select>
        </div>

        {/* Multi-Select Tags */}
        <div>
          <select
            
            value={selectedTags}
            onChange={(e) => setSelectedTags(e.target.value)
            }
            className="border p-2 rounded w-full dark:bg-gray-900 dark:text-white/60"
          >
            <option value="">All Tags</option>
            <option value="Technology">Technology</option>
            <option value="Sports">Sports</option>
            <option value="Health">Health</option>
            <option value="Business">Business</option>
          </select>
        </div>

        {/* <div className="flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
          <input
            className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
            type="text"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Enter Job Title"
            aria-label="Enter Job Title"
          />

          <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
            Search
          </button>
        </div> */}
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        {approvedArticles.map((article) => (
          <ArticleCard
            key={article._id}
            article={article}
            // isPremium={article.is_premium}
            // isUserSubscribed={/* Check user subscription status here */}
          />
        ))}
      </div>
      {/* Pagination Section */}
      <div className="flex justify-center mt-12">
        {/* Previous Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationButton(currentPage - 1)}
          className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white"
        >
          <div className="flex items-center -mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>

            <span className="mx-1">previous</span>
          </div>
        </button>
        {/* Numbers */}
        {pages.map((btnNum) => (
          <button
            onClick={() => handlePaginationButton(btnNum)}
            key={btnNum}
            className={`hidden ${
              currentPage === btnNum ? "bg-blue-500 text-white" : ""
            } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
          >
            {btnNum}
          </button>
        ))}
        {/* Next Button */}
        <button
          disabled={currentPage === numberOfPages}
          onClick={() => handlePaginationButton(currentPage + 1)}
          className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
        >
          <div className="flex items-center -mx-1">
            <span className="mx-1">Next</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AllArticles;
