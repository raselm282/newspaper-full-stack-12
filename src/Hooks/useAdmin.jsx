import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: ['isAdmin', user?.email ],
        enabled: !loading && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            // console.log('asking or checking is admin', user)
            const res = await axiosSecure.get(`/users/adminTrue/${user.email}`);
            // console.log(res.data);
            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;