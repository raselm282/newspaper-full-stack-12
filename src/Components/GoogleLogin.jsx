import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const GoogleLogin = () => {
    const axiosPublic = useAxiosPublic()
    const { signInWithGoogle } = useAuth();
    const navigate = useNavigate();


    const handleGoogleSignIn = () =>{
        signInWithGoogle()
        .then(result =>{
            console.log(result.user);
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res =>{
                console.log(res.data);
                navigate('/');
            })
        })
    }
    return (
        <div className="p-8">
            {/* <div className="divider"></div> */}
            <div>
                <button onClick={handleGoogleSignIn} className="btn bg-green-600 w-full hover:bg-green-400">
                    <FaGoogle className="mr-2"></FaGoogle>
                    Google
                </button>
            </div>
        </div>
    );
};

export default GoogleLogin;