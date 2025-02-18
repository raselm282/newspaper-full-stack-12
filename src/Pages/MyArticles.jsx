import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useArticlesByEmail from "../Hooks/useArticlesByEmail";
import LoadingSpinner from "../Components/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const MyArticles = () => {
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()
  const [articles, loading, refetch] = useArticlesByEmail();
  // console.log(articles);
// modern delete
  const handleDelete = async id => {
    // console.log(id);
    try {
      const { data } = await axiosSecure.delete(
        `${import.meta.env.VITE_API_URL}/articlesDelete/${id}`
      )
      toast.success('Data Deleted Successfully!!!')
      refetch()
    } catch (err) {
      toast.error(err.message)
    }
  }
  const modernDelete = (id) => {
    // console.log(id);
    toast(t => (
      <div className='flex gap-3 items-center'>
        <div>
          <p>
            Are you <b>sure?</b>
          </p>
        </div>
        <div className='gap-2 flex'>
          <button
            className='bg-red-400 text-white px-3 py-1 rounded-md'
            onClick={() => {
              toast.dismiss(t.id)
              handleDelete(id)
            }}
          >
            Yes
          </button>
          <button
            className='bg-green-400 text-white px-3 py-1 rounded-md'
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ))
  }
  //--------------
  const handleEdit = (id)=>{
    navigate(`/updateMyArticles/${id}`)
  }
  const modernEdit = (id) => {
    toast((t) => (
      <div className="flex gap-3 items-center">
        <div>
          <p>
            Are you <b>sure?</b>
          </p>
        </div>
        <div className="gap-2 flex">
          <button
            className="bg-red-400 text-white px-3 py-1 rounded-md"
            onClick={() => {
              toast.dismiss(t.id);
              handleEdit(id);
            }}
          >
            Yes to Edit
          </button>
          <button
            className="bg-green-400 text-white px-3 py-1 rounded-md"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };
  if (loading) return <LoadingSpinner />;
  return (
    <section className="container px-4 mx-auto dark:text-white/60 dark:bg-gray-900">
      <Helmet>
        <title>My Articles</title>
      </Helmet>
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-900 ">My Articles</h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {articles?.length}
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 dark:text-white/60 dark:bg-gray-900">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>#</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Title</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Details
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Status</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <button className="flex items-center gap-x-2">
                        <span>IsPremium</span>
                      </button>
                    </th>

                    {/* <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Description
                    </th> */}

                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Delete/Edit
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:text-white/60 dark:bg-gray-900 divide-y divide-gray-200 ">
                  {/* Generate dynamic tr */}
                  {articles.map((article, i) => (
                    <tr key={article?._id}>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {i + 1}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {/* {format(new Date(article.mara_start), "P")} */}
                        {article?.title}
                      </td>
                      <td
                        className={`px-4 py-4 text-sm text-gray-500  whitespace-nowrap ${
                          article.location === "Chattogram" && "text-blue-500 "
                        } ${article.location === "Dhaka" && "text-green-500 "}
                            ${
                              article.location === "Bogura" && "text-red-500 "
                            }`}
                      >
                        <Link to={`/articles/${article?._id}`}>Details</Link>
                      </td>

                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-2">
                          <h2
                            className={`px-3 py-1 uppercase ${
                              article.status === "pending" &&
                              "text-blue-500 dark:text-blue-500/50  bg-blue-100/60 dark:bg-green-100/10"
                            } ${
                              article.status === "approved" &&
                              "text-green-500 dark:text-green-500/50 bg-green-100/60 dark:bg-green-100/10"
                            }
                            ${
                              article.status === "deleted" &&
                              "text-red-500 dark:text-red-500/50 bg-red-100/60 dark:bg-red-100/10"
                            }
                            ${
                              article.status === "declined" &&
                              "text-red-500 dark:text-red-500/50 bg-red-100/60 dark:bg-green-100/10"
                            } text-xs  rounded-full`}
                          >
                            <p className="font-bold">{article.status}</p>
                            {article.status === "declined" && <p>Reason:{article.reason}</p>}
                          </h2>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-2">
                          <p
                            className={`px-3 py-1 uppercase ${
                              article.isPremium === true &&
                              "text-green-500  dark:bg-green-100/10 bg-green-100/60"
                            } text-sm  rounded-full`}
                          >
                            {article.isPremium ? "yes" : "no"}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                          <button
                            onClick={() => modernDelete(article?._id)}
                            // onClick={() => handleDelete(article._id)}
                            className="text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none"
                          >
                            <RiDeleteBin6Line className="text-lg"/>
                            
                          </button>

                          <Link
                            onClick={() => modernEdit(article?._id)}
                            // to={`/update/${article._id}`}
                            className="text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none"
                          >
                            <FaEdit className="text-lg"/>
                            
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyArticles;
