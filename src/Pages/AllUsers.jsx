import React, { useEffect, useState } from "react";
import useUsers from "../Hooks/useUsers";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../Components/LoadingSpinner";
import useAuth from "../Hooks/useAuth";

const AllUsers = () => {
  const {loading} = useAuth()
  // const [usersData, loading, refetch] = useUsers();
  const axiosSecure = useAxiosSecure();
  // console.log(usersData);

  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  // const [filter, setFilter] = useState("");
  // const [sort, setSort] = useState("");
  // const [search, setSearch] = useState("");
  // const [searchText, setSearchText] = useState("");
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axiosSecure(
        `/usersData?page=${currentPage}&size=${itemsPerPage}`
      );
      setJobs(data);
    };
    getData();
  }, [currentPage, itemsPerPage]);
  useEffect(() => {
    const getCount = async () => {
      const { data } = await axiosSecure(
        `/jobs-countUser`
      );

      setCount(data.count);
    };
    getCount();
  }, []);

  // console.log(count);
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  //  handle pagination button
  const handlePaginationButton = (value) => {
    // console.log(value);
    setCurrentPage(value);
  };

// console.log(jobs);

  // Handle making a user an admin
  const makeAdmin = async (id, name, email, photo) => {
    const confirmAction = window.confirm(
      "Are you sure you want to make this user an admin?"
    );
    if (confirmAction) {
      const formData = {
        name,
        email,
        photo,
        isAdmin: true,
      };
      // console.log(formData);
      try {
        // 1. make a post request
        await axiosSecure.put(`/users/${id}`, formData);
        // 2. Reset form
        // form.reset();
        // 3. Show toast and navigate
        toast.success("Data Updated Successfully!!!");
        // navigate("/dashboard/myMarathonList");
        refetch();
      } catch (err) {
        toast.error(err.message);
      }
    }
    
  };
  if(loading) {
    <LoadingSpinner/>
  }
  return (
    <div className="dark:text-white/60 dark:bg-gray-900">
      <Helmet>
        <title>Dashboard || All Users</title>
      </Helmet>{" "}
      <div className="flex items-center gap-x-3">
        <p className="font-bold ml-12 my-12 text-3xl">Total Users Data: </p>
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {jobs.length}
        </span>
      </div>
      <section className="p-8 bg-gray-100 min-h-screen dark:text-white/60 dark:bg-gray-900">
        <h1 className="text-2xl font-semibold mb-6">All Users</h1>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 dark:text-white/60 dark:bg-gray-900">
              <th className="border px-4 py-2">Profile Picture</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="border px-4 py-2">
                 {user?.photo && <img
                    src={user?.photo}
                    alt={`${user?.name}'s profile`}
                    className="w-12 h-12 rounded-full mx-auto"
                  />}
                </td>
                <td className="border px-4 py-2">{user?.name}</td>
                <td className="border px-4 py-2">{user?.email}</td>
                <td className="border px-4 py-2">
                  {user.isAdmin ? (
                    <span className="text-green-500 font-semibold">Admin</span>
                  ) : (
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                      onClick={() =>
                        makeAdmin(user?._id, user?.name, user?.email, user?.photo)
                      }
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

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

export default AllUsers;
