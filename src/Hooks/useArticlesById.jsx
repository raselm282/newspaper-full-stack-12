import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useArticlesById = (id) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: article = {},
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/articlesDetailsPage/${id}`);

      return data;
    },
  });

  // const { data: article={}, isLoading , refetch} = useQuery({
  //     queryKey: ["article", id],
  //     queryFn: async () => {
  //       const { data } = await axiosSecure.get(
  //         `${import.meta.env.VITE_API_URL}/articlesDetails/${id}`
  //       );
  //       return data;
  //     },

  //   });
  return [article, loading, refetch];
};

export default useArticlesById;
