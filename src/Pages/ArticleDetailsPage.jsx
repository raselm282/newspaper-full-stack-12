import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const ArticleDetailsPage = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const {
    data: article = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/articlesDetailsPage/${id}`
      );
      return data;
    },
  });
  // console.log(article);
  const { image, title, description, status, tags, _id } = article;

  // function for view count
  const updateViewCount = () => {
    // console.log(id);
    axiosSecure.patch(`/viewCount/${id}`).then((res) => {
      refetch();
      // console.log(res);
    });
  };

  useEffect(() => {
    updateViewCount(); 
  }, [id]);

  if (!article) {
    return <p>Loading...</p>;
  }
  // if (isLoading) return <LoadingSpinner />;
  return (
    <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12">
      <Helmet>
        <title>Articles Details</title>
      </Helmet>{" "}
      {/* Header */}
      <div className="flex flex-col gap-6 flex-1">
        <div>
          <div className="w-full overflow-hidden rounded-xl">
            <img
              className="object-cover w-full"
              src={image}
              alt="header image"
            />
          </div>
        </div>
      </div>
      <div className="md:gap-10 flex-1">
        {/* Plant Info */}
        {/* <Heading title={name} subtitle={`Category: ${category}`} /> */}
        <hr className="my-6" />
        <div
          className="
          text-3xl font-bold text-neutral-800"
        >
          {title}
        </div>
        <div
          className="
          text-lg font-light text-neutral-500"
        >
          {description}
        </div>
        <hr className="my-6" />

        <hr className="my-6" />
        <div className="flex justify-between">
          {/* <p className="font-bold text-3xl text-gray-500">Price: {title}$</p> */}
          
        </div>
        <hr className="my-6" />

        {/* <PurchaseModal
            plant={plant}
            closeModal={closeModal}
            isOpen={isOpen}
            refetch={refetch}
          /> */}
      </div>
    </div>
  );
};

export default ArticleDetailsPage;
