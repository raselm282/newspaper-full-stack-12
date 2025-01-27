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
                <ul className="menu bg-base-200 rounded-box w-56">
                    <li><NavLink to={'adminHome'}>Admin Home</NavLink></li>
                    <li><NavLink to={'allUsers'}>All Users</NavLink></li>
                    <li><NavLink to={'allArticlesPage'}>All Articles</NavLink></li>
                    <li><NavLink to={'addPublisher'}>Add Publisher</NavLink></li>
                </ul>
            </div>
            <div className='w-[80%] pb-10'><Outlet></Outlet></div>
        </div>
    );
};

export default Dashboard;