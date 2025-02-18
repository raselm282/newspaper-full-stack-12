import React from "react";
import TrendingArticles from "../Components/Home/TrendingArticles";
import AllPublisher from "../Components/Home/AllPublisher";
import Statistics from "../Components/Home/Statistics";
import PlansSection from "../Components/Home/PlansSection";
import { Helmet } from "react-helmet-async";
import HomePageModal from "../Components/Home/HomePageModal";
import SwiperSlider from "../Components/Home/SwiperSlider";
import HomePageSections from "../Components/Home/HomePageSections";
import HomePieChart from "../Components/Home/HomePieChart";
import AboutMe from "../Components/Home/AboutMe";
// import Navbar from "../Components/Navbar";
// import Footer from "../Components/Footer";
// import { Toaster } from "react-hot-toast";
// import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Newspaper || Home</title>
      </Helmet>{" "}
      <SwiperSlider></SwiperSlider>
      <TrendingArticles></TrendingArticles>
      <AllPublisher></AllPublisher>
      <AboutMe></AboutMe>
      <Statistics />
      <PlansSection />
      <HomePageSections/>
      <HomePieChart/>
      {/* <HomePageModal/> */}
    </div>
  );
};

export default Home;
