import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
// import AuthContext from '../AuthContext/AuthContext';
import useAuth from '../Hooks/useAuth';
import useAdmin from '../Hooks/useAdmin';
import { FaSignOutAlt } from "react-icons/fa";
import news_logo from '../assets/Newspaper_logo.png'
import toast from 'react-hot-toast';
import { MdDarkMode} from "react-icons/md";
import { MdLightMode } from "react-icons/md";

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


const [isDarkMode, setIsDarkMode] = useState(() => {
  return localStorage.getItem("theme") === "dark";
});

const toggleTheme = () => {
  setIsDarkMode((prevMode) => {
    const newMode = !prevMode;
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    return newMode;
  });
};

useEffect(() => {
  if (isDarkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [isDarkMode]);

  return (
    <div className='sticky left-0 top-0 py-2  backdrop-blur-md w-full z-50 dark:bg-black/50 dark:text-white/60 bg-gradient-to-r from-yellow-400/50 to-yellow-600/50 mx-auto'>
      <div className="navbar max-w-[90%] mx-auto p-0">
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
        <button
            onClick={toggleTheme}
            className="p-3 text-2xl  rounded bg-gray-800 text-white dark:bg-gray-200 dark:text-black"
          >
            {isDarkMode ? <MdLightMode/> : <MdDarkMode/>}
        </button>
      </div>
    </div>
    
  );
};

export default Navbar;