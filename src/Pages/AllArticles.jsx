import axios from "axios";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Components/LoadingSpinner";
import ArticleCard from "../Components/ArticleCard";
import useArticles from "../Hooks/useArticles";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const AllArticles = () => {
  const [articles, loading] = useArticles();
  const axiosSecure = useAxiosSecure();
  // console.log(articles);
  const approvedArticles = articles.filter(
    (item) => item.status === "approved"
  );
  // console.log(approvedArticles);

  if (loading) return <LoadingSpinner />;
  return (
    <div>
      <Helmet>
        <title>All Articles</title>
      </Helmet>
      <div className="flex items-center gap-x-3">
        <p className="font-bold ml-12 my-12 text-3xl">
          All Approved Articles:{" "}
        </p>
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {approvedArticles.length}
        </span>
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
    </div>
  );
};

export default AllArticles;
