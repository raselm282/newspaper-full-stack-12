import React, { useState, useEffect } from "react";
import { FaCheckDouble } from "react-icons/fa";
// import { fetchArticles, updateArticleStatus } from "../api/articles"; // API কল ফাংশন
import Modal from "../Components/Modal";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { updateArticleStatus } from "../Components/updateArticleStatus";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";
// import Modal from "../components/Modal";

const AllArticlesPage = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  //   const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [declineReason, setDeclineReason] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: articles = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data } = await axiosPublic(`/articles`);
      return data;
    },
  });
  // setArticles(data)
  console.log("articles", articles);
  //   const { _id, title, image, tags, description, status,buyer } = articles;

  const handlePremiumChange = async (id, newPremium) => {
    // if (status === newStatus) return
    try {
      // update order status
      await axiosSecure.patch(`/articlesPremium/${id}`, {
        isPremium: newPremium,
      });
      // call refetch to refresh ui(fetch orders data again)
      refetch();
      toast.success("Premium Updated");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };
  // আর্টিকেলের স্ট্যাটাস আপডেট করার ফাংশন
  // handle status change

  const handleStatusChange = async (id, newStatus, reasons = null) => {
    // if (status === newStatus) return
    try {
      // update order status
      await axiosSecure.patch(`/articlesStatus/${id}`, {
        status: newStatus,
        reason: reasons,
      });
      // call refetch to refresh ui(fetch orders data again)
      refetch();
      toast.success("Status Updated");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Helmet>
        <title>Dashboard || All Articles</title>
      </Helmet>{" "}
      <div className="flex items-center gap-x-3">
        <p className="font-bold ml-12 my-12 text-3xl">Total Articles: </p>
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {articles.length}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div key={article._id} className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="font-bold text-lg">{article.title}</h2>
            <div className="text-sm text-gray-500">
              <p>Author: {article?.buyer?.name}</p>
              <p>Email: {article?.buyer?.email}</p>
              <p>Publisher: {article?.publishers}</p>
              {/* <p>Posted Date: {new Date(article.postedDate).toLocaleDateString()}</p> */}
              {article?.postedDate && (
                <p>Posted Date: {format(new Date(article.postedDate), "PP")}</p>
              )}
              <p>Status: {article.status}</p>
              {article.status === "declined" && (
                <p className="text-red-500">Reason: {article?.reason}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button
                onClick={() => handleStatusChange(article._id, "approved")}
                className="btn btn-xs bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                {article?.status === "approved" ? (
                  <>
                    Approved
                    <FaCheckDouble />
                  </>
                ) : (
                  "Approve"
                )}
              </button>
              <button
                onClick={() => {
                  setSelectedArticle(article);
                  setIsModalOpen(true);
                  setDeclineReason("");
                }}
                className="btn btn-xs bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Decline
              </button>
              <button
                onClick={() => handlePremiumChange(article._id, true)}
                className="btn btn-xs bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                {article?.isPremium ? (
                  <>
                    Premium
                    <FaCheckDouble />
                  </>
                ) : (
                  "Make Premium"
                )}
              </button>
              <button
                onClick={() => handleStatusChange(article._id, "deleted")}
                className="btn btn-xs bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={() =>
            handleStatusChange(selectedArticle._id, "declined", declineReason)
          }
        >
          <textarea
            required
            placeholder="Enter reason for decline..."
            value={declineReason}
            onChange={(e) => setDeclineReason(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </Modal>
      )}
    </div>
  );
};

export default AllArticlesPage;
// import React, { useState } from 'react';
// import { Navigate } from 'react-router-dom';

// // Example data: All articles
// const articles = [
//   {
//     id: 1,
//     title: 'Understanding the Cosmos',
//     authorName: 'Jane Doe',
//     authorEmail: 'jane.doe@example.com',
//     authorPhoto: 'https://via.placeholder.com/100',
//     postedDate: '2025-01-20',
//     status: 'Pending',
//     publisher: 'Space Times',
//     isPremium: false,
//   },
//   {
//     id: 2,
//     title: 'Healthy Living Tips',
//     authorName: 'John Smith',
//     authorEmail: 'john.smith@example.com',
//     authorPhoto: 'https://via.placeholder.com/100',
//     postedDate: '2025-01-22',
//     status: 'Approved',
//     publisher: 'Health Digest',
//     isPremium: false,
//   },
// ];

// // Admin Route Component
// const AdminRoute = ({ children, isAdmin }) => {
//   return isAdmin ? children : <Navigate to="/login" />;
// };

// const AllArticlesPage = () => {
//   const [declineReason, setDeclineReason] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedArticle, setSelectedArticle] = useState(null);

//   const handleApprove = (id) => {
//     alert(`Article ${id} approved!`);
//     // Logic to approve article
//   };

//   const handleDecline = (article) => {
//     setSelectedArticle(article);
//     setModalVisible(true);
//   };

//   const handleDeclineSubmit = () => {
//     alert(`Article ${selectedArticle.id} declined with reason: ${declineReason}`);
//     setModalVisible(false);
//     setDeclineReason('');
//     // Logic to decline article
//   };

//   const handleDelete = (id) => {
//     alert(`Article ${id} deleted!`);
//     // Logic to delete article
//   };

//   const handleMakePremium = (id) => {
//     alert(`Article ${id} is now premium!`);
//     // Logic to make article premium
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">All Articles</h1>
//       <div className="grid grid-cols-1 gap-6">
//         {articles.map(article => (
//           <div key={article.id} className="border rounded-lg shadow-lg overflow-hidden">
//             <div className="p-4">
//               <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
//               <div className="flex items-center gap-4 mb-3">
//                 <img
//                   src={article.authorPhoto}
//                   alt={article.authorName}
//                   className="w-12 h-12 rounded-full"
//                 />
//                 <div>
//                   <p className="text-sm font-medium">{article.authorName}</p>
//                   <p className="text-xs text-gray-500">{article.authorEmail}</p>
//                 </div>
//               </div>
//               <p className="text-sm text-gray-500 mb-1">Posted Date: {article.postedDate}</p>
//               <p className="text-sm text-gray-500 mb-3">Status: {article.status}</p>
//               <p className="text-sm text-gray-500 mb-3">Publisher: {article.publisher}</p>
//               <div className="flex gap-2">
//                 <button
//                   className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                   onClick={() => handleApprove(article.id)}
//                 >
//                   Approve
//                 </button>
//                 <button
//                   className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                   onClick={() => handleDecline(article)}
//                 >
//                   Decline
//                 </button>
//                 <button
//                   className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
//                   onClick={() => handleMakePremium(article.id)}
//                 >
//                   Make Premium
//                 </button>
//                 <button
//                   className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//                   onClick={() => handleDelete(article.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {modalVisible && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded shadow-lg w-96">
//             <h2 className="text-xl font-semibold mb-4">Decline Article</h2>
//             <textarea
//               className="w-full border p-2 rounded mb-4"
//               rows="4"
//               placeholder="Reason for decline"
//               value={declineReason}
//               onChange={(e) => setDeclineReason(e.target.value)}
//             />
//             <div className="flex justify-end gap-2">
//               <button
//                 className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//                 onClick={() => setModalVisible(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                 onClick={handleDeclineSubmit}
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
