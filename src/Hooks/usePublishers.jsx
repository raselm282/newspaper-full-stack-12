import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
const usePublishers = () => {
    const axiosPublic = useAxiosPublic();
      const {data: publishers = [], isPending: loading} = useQuery({
        queryKey: ['publishers'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/publisherData');
            return res.data;
        }
    })
    return [publishers, loading]
};

export default usePublishers;



