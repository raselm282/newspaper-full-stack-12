import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const ArticleCard = ({ article }) => {
  const axiosSecure = useAxiosSecure()
    // console.log(article);
    // handle status change
  // const handleStatus = async () => {
  //   // if (status === newStatus) return
  //   try {
  //     // update order status
  //     await axiosSecure.patch(`/articles/${article._id}`, {
  //       views: 2,
  //     })
  //     // call refetch to refresh ui(fetch orders data again)
  //     // refetch()
  //     toast.success('Status Updated')
  //   } catch (err) {
  //     console.log(err)
  //     // toast.error(err.response.data)
  //   }
  // }
  return (
    <div className="card card-compact bg-base-100 shadow-xl dark:bg-gray-900 dark:text-white/60 rounded-none">
      <figure>
        <img
          src={article?.image}
          className="h-[260px]"
          alt="article"
        />
      </figure>
      <div className="card-body">
        <h2 className={`card-title ${article.isPremium && "text-green-500 bg-green-100/60 dark:bg-gray-900 dark:text-white/60 underline"}`}>Title : {article?.title}</h2>
        <p>Description : {article?.description.slice(0, 100)}...</p>
        <p>Status : {article?.status}</p>
        {article?.isPremium && <p className={`text-green-500 underline`}>Premium</p>}
        <p>Publishers : {article?.publishers}</p>
        <p>Tags : {article?.tags.map((item,i)=> <button key={i} item={item}>{item}</button>)}</p>
        <p>Views : {article?.views}</p>
        <div className=" w-full">
            <Link to={`/articles/${article._id}`}><button className={`btn w-full btn-primary ${article.isPremium && "w-full btn btn-sm btn-warning"}`}>Details</button></Link>
        
        </div>
      </div>
    </div>
    // <div className={`card ${isPremium ? 'premium' : ''}`}>
    //     <div className={`card `}>
    //   <img src={article.image} alt={article.title} />
    //   <h3>{article.title}</h3>
    //   {/* <p>By {article.publisher.name}</p> */}
    //   <p>{article.description}</p>
    //   <a
    //     href={`/articles/${article.id}`}
    //     // className={`btn ${isPremium && !isUserSubscribed ? 'disabled' : ''}`}
    //     className={`btn `}
    //     // disabled={isPremium && !isUserSubscribed}
    //   >
    //     Details
    //   </a>
    // </div>
  );
};

export default ArticleCard;
