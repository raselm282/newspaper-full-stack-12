import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useArticlesByEmail = () => {
    const {user} =useAuth()
    const axiosSecure = useAxiosSecure()
    const {
      data: articles = [],
      isLoading: loading,
      refetch,
    } = useQuery({
      queryKey: ['articles', user?.email],
      queryFn: async () => {
        const { data } = await axiosSecure(`/articles/${user?.email}`)
  
        return data
      },
    })
    return [articles, loading, refetch]
};

export default useArticlesByEmail;

