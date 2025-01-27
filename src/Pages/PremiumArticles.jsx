import React from "react";
import useArticles from "../Hooks/useArticles";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const PremiumArticles = () => {
  const [articles] = useArticles();
  console.log(articles);
  const premiumArticles = articles.filter((item) => item.isPremium);
  console.log(premiumArticles);

  return (
    <div>
      <Helmet>
        <title>Premium Articles</title>
      </Helmet>
      <div className="flex items-center gap-x-3">
        <p className="font-bold ml-12 my-12 text-3xl">Premium Articles: </p>
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {premiumArticles.length}
        </span>
      </div>

      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Premium Articles
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {premiumArticles?.map((article) => (
            <div key={article._id} className="border rounded-lg shadow-md p-4">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-60 rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="text-sm text-gray-600">
                {/* Publisher: {article.publisher} */}
              </p>
              <p className="text-gray-700 mb-4">
                {article.description.slice(0, 100)}...
              </p>
              <Link to={`/articles/${article._id}`}>
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumArticles;
