import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Home from "../Pages/Home";
import SignUp from "../Pages/SignUp";
import AddArticles from "../Pages/AddArticles";
import AllArticles from "../Pages/AllArticles";
// import Subscription from "../Pages/Subscription";
import Dashboard from "../Pages/Dashboard";
import PremiumArticles from "../Pages/PremiumArticles";
import MyArticles from "../Pages/MyArticles";
import MyProfile from "../Pages/MyProfile";
import ArticleDetailsPage from "../Pages/ArticleDetailsPage";
import SubscriptionPage from "../Pages/SubscriptionPag";
import AllArticlesPage from "../Pages/AllArticlesPage";
import UpdateMyArticles from "../Pages/UpdateMyArticles";
import AllUsers from "../Pages/AllUsers";
import AddPublisher from "../Pages/AddPublisher";
import Login from "../Pages/Login";
import PrivateRoute from "./PrivateRoute";
import AdminHome from "../Pages/AdminHome";
import MainLayouts from "../Pages/MainLayouts";
import AdminRoute from "./AdminRoute";
import ErrorPage from "../Pages/ErrorPage";
  export const router = createBrowserRouter([
    {
        path:"/",
        element: <MainLayouts></MainLayouts>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/addArticles",
                element: <PrivateRoute><AddArticles></AddArticles></PrivateRoute>
            },
            {
                path: "/allArticles",
                element: <AllArticles></AllArticles>
            },
            {
                path: '/articles/:id',
                element: <PrivateRoute><ArticleDetailsPage></ArticleDetailsPage></PrivateRoute>,
            },
            {
                path: "/subscription",
                element: <PrivateRoute><SubscriptionPage></SubscriptionPage></PrivateRoute>
            },
            {
                path: "/myArticles",
                element: <PrivateRoute><MyArticles></MyArticles></PrivateRoute>
            },
            {
                path: "/updateMyArticles/:id",
                element: <PrivateRoute><UpdateMyArticles></UpdateMyArticles></PrivateRoute>
            },
            {
                path: "/premiumArticles",
                element: <PrivateRoute><PremiumArticles></PremiumArticles></PrivateRoute>
            },
            
            {
                path: "/myProfile",
                element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
            },
            {
                path: "/dashboard",
                element: <PrivateRoute><AdminRoute><Dashboard></Dashboard></AdminRoute></PrivateRoute>,
                children: [
                    {
                        path: "allArticlesPage",
                        element: <PrivateRoute><AllArticlesPage></AllArticlesPage></PrivateRoute>
                    },
                    {
                        path: "allUsers",
                        element: <PrivateRoute><AllUsers></AllUsers></PrivateRoute>
                    },
                    {
                        path: "addPublisher",
                        element: <PrivateRoute><AddPublisher></AddPublisher></PrivateRoute>
                    },
                    {
                        index: true,
                        element: <PrivateRoute><AdminHome></AdminHome></PrivateRoute>
                    },
                    {
                        path: "adminHome",
                        element: <PrivateRoute><AdminHome></AdminHome></PrivateRoute>
                    },
                    
                ]
            },
        ]
    },
    {
        path: "/register",
        element: <SignUp></SignUp>
    },
    {
        path: "/login",
        element: <Login></Login>
    },
    
    
  ]);