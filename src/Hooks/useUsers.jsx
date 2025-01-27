import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useUsers = () => {
    const axiosSecure = useAxiosSecure()
   
    const {data: usersData = [], isPending: loading, refetch} = useQuery({
        queryKey: ['articles'], 
        queryFn: async() =>{
            const res = await axiosSecure.get('/usersData');
            return res.data;
        }
    })


    return [usersData, loading, refetch]
};

export default useUsers;