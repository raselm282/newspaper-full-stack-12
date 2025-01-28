import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
// import AuthContext from '../AuthContext/AuthContext';
import useAuth from '../Hooks/useAuth';
import useAdmin from '../Hooks/useAdmin';
import { FaSignOutAlt } from "react-icons/fa";
import news_logo from '../assets/Newspaper_logo.png'
import toast from 'react-hot-toast';


const Navbar = () => {
  const navigate = useNavigate()
  const [isAdmin] = useAdmin()
    // const { logOut } = useContext(AuthContext)
    const {user,signOutUser} = useAuth()
    // console.log(user?.email, user?.displayName,user?.photoURL);
  const handleSignOut = ()=>{
    signOutUser()
    .then(()=>{
      navigate('/login');
    })
    .catch(error =>{
        toast.error(error.message);
    }
    )
}

    const links = <>
    <li><NavLink to={'/'}>Home</NavLink></li>
    <li><NavLink to={'/addArticles'}>Add Articles</NavLink></li>
    <li><NavLink to={'/allArticles'}>All Articles</NavLink></li>
    <li><NavLink to={'/subscription'}>Subscription</NavLink></li>
    { user && isAdmin && <><li><NavLink to={'/dashboard'}>Dashboard</NavLink></li></>}
    <li><NavLink to={'/myArticles'}>MY Articles</NavLink></li>
    <li><NavLink to={'/premiumArticles'}>Premium Articles</NavLink></li>
    
    </>
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="gap-3 menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        {/* <p>{user?.email}</p> */}
        <Link to='/' className='flex gap-2 items-center bg-orange-200 p-2 rounded-lg'>
          <img className='w-auto h-7 rounded-md' src={news_logo} alt='' />
          <span className='font-bold'>Newspaper</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-3">
        {links}
        </ul>
      </div>
      <div className="navbar-end">
      {
            user? <><Link to={'/myProfile'}><img src={user?.photoURL} className="w-14 h-14 rounded-full mr-3" alt="" /></Link>{' '} <button onClick={handleSignOut} className="btn">Logout <FaSignOutAlt/></button></> : <><Link  className="mr-4 text-teal-500 btn" to={"/register"}>Register</Link>
        <Link  to={"/login"} className="btn">Login</Link></>
        }
        {/* <Link to={'/login'} className="btn">Login</Link>
        <Link to={'/register'} className="btn">Register</Link> */}
      </div>
    </div>
  );
};

export default Navbar;