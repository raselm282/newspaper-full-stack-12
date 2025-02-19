import React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='flex gap-5 flex-col md:flex-row'>
            <Helmet>
            <title>Dashboard</title>
            </Helmet>
            <div className='w-[20%]'>
                <ul className="menu min-h-screen bg-orange-200 dark:text-white/60 dark:bg-gray-800 rounded-box w-56">
                    <li><NavLink to={'allUsers'}>All Users</NavLink></li>
                    <li><NavLink to={'overview'}>Overview</NavLink></li>
                    <li><NavLink to={'myProfile'}>My Profile</NavLink></li>
                    <li><NavLink to={'allArticlesPage'}>All Articles</NavLink></li>
                    <li><NavLink to={'addPublisher'}>Add Publisher</NavLink></li>
                </ul>
            </div>
            <div className='w-[80%] pb-10'><Outlet></Outlet></div>
        </div>
    );
};

export default Dashboard;