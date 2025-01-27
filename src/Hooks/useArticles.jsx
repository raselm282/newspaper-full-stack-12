import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useArticles = () => {
    const axiosPublic = useAxiosPublic();
    // const [menu, setMenu] = useState([]);
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     fetch('https://bistro-boss-server-seven-sage.vercel.app/menu')
    //         .then(res => res.json())
    //         .then(data => {
    //             setMenu(data);
    //             setLoading(false);
    //         });
    // }, [])

    const {data: articles = [], isPending: loading, refetch} = useQuery({
        queryKey: ['articles'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/articles');
            return res.data;
        }
    })


    return [articles, loading, refetch]
};

export default useArticles;