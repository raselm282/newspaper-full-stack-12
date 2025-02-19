import React from "react";
import useArticles from "../Hooks/useArticles";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../Components/Home/SectionTitle";

const PremiumArticles = () => {
  const [articles] = useArticles();
  // console.log(articles);
  const premiumArticles = articles.filter((item) => item.isPremium);
  // console.log(premiumArticles);

  return (
    <div>
      <Helmet>
        <title>Premium Articles</title>
      </Helmet>
      <div className="flex items-center gap-x-3">
      <SectionTitle heading="Premium Articles"></SectionTitle>
        {/* <p className="font-bold ml-12 my-12 text-3xl">Premium Articles: </p>
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {premiumArticles.length}
        </span> */}
      </div>

      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Premium Articles
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {premiumArticles?.map((article) => (
            <div key={article._id} className="border rounded-lg shadow-md p-4">
              <h2 className="text-xl text-slate-500 font-semibold pb-5 hover:text-[21px] hover:text-black  dark:hover:text-white/50 transition underline">{article.title}</h2>
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-60 rounded-md mb-4"
              />
              <p className="text-sm text-gray-600">
                {/* Publisher: {article.publisher} */}
              </p>
              <p className="text-gray-700 mb-4 dark:text-white/50">
                {article.description.slice(0, 100)}...
              </p>
              <Link to={`/articles/${article._id}`}>
                <button className="btn bg-yellow-500 dark:bg-yellow-500/70 hover:bg-yellow-600 text-black py-2 px-4 rounded hover:text-black hover:text-xl transition w-full">
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
