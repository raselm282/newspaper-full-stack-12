import React, { useState, useEffect } from "react";
import useArticles from "../../Hooks/useArticles";
import ArticleCard from "../ArticleCard";
import LoadingSpinner from "../LoadingSpinner";

const TrendingArticles = () => {
  const [articles, loading] = useArticles(); 
  const [trendingArticles, setTrendingArticles] = useState([]);
  useEffect(() => {
    if (articles?.length > 0) {
      const sortedArticles = articles.sort((a, b) => b.views - a.views); 
      setTrendingArticles(sortedArticles.slice(0, 6)); 
    }
  }, [articles]); 

  if (loading) return <LoadingSpinner />;
  return (
    <div>
      <div className="flex items-center gap-x-3">
        <p className="font-bold ml-12 my-12 text-3xl">
          All Trending Articles:{" "}
        </p>
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {trendingArticles?.length}
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        {trendingArticles.map((article) => (
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

export default TrendingArticles;
