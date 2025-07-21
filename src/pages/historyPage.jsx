import React, { useEffect, useState } from 'react';
import "@fontsource/inria-sans/300.css"; // Light
import "@fontsource/inria-sans/400.css"; // Regular
import "@fontsource/inria-sans/700.css"; // Bold
import ButtonDarkImg from '../components/buttonDarkImg';
import Portfolio from '../components/portfolio';
import History from '../components/history';
import axios from 'axios';
import { Link } from 'react-router-dom';


const HistoryPage = () => {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchAll = async () => {
        try {
          const [
            userProfile,
            portfolioHeader,
            allocation,
            portfolioInsights,
            performers,
            goals,
            portfolioScore,
            historyChart,
            aiSummary
          ] = await Promise.all([
            axios.get("http://localhost:3001/userProfile"),
            axios.get("http://localhost:3001/portfolioHeader"),
            axios.get("http://localhost:3001/allocation"),
            axios.get("http://localhost:3001/portfolioInsights"),
            axios.get("http://localhost:3001/performers"),
            axios.get("http://localhost:3001/goals"),
            axios.get("http://localhost:3001/portfolioScore"),
            axios.get("http://localhost:3001/historyChart"),
            axios.get("http://localhost:3001/aiSummary")
          ]);
  
          setData({
            user: userProfile.data,
            header: portfolioHeader.data,
            allocation: allocation.data,
            insights: portfolioInsights.data,
            performers: performers.data,
            goals: goals.data,
            score: portfolioScore.data,
            history: historyChart.data,
            aiSummary: aiSummary.data
          });
  
        } catch (err) {
          console.error("Failed to fetch dashboard data", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchAll();
    }, []);
  
    if (loading) return <p>Loading...</p>;



    return (
            
        <div className="grid grid-rows-[6rem_1fr] grid-cols-[16rem_1fr] h-screen w-screen">

            {/* Top Nav */}
            <div className="row-start-1 col-span-2 fixed top-0 left-0 w-screen h-24 z-50 bg-offWhite border-b-2 border-b-darkGreen flex items-center px-12">
                {/* Logo */}
                <div className="flex-1">
                    <img src="logoNav.png" className="h-10" />
                </div>

                {/* Search bar */}
                <div className="flex-1 flex justify-center">
                    <div className="relative w-96 h-10">
                    <input
                        type="text"
                        placeholder="Search stocks, ETFs, etc"
                        className="w-full h-full bg-white rounded-lg border border-darkGreen text-darkGreen placeholder-darkGreen placeholder-opacity-70 font-inria px-2 pr-10 font-sm"
                    />
                    <img
                        src="/search.png"
                        alt="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5"
                    />
                    </div>
                </div>

                {/* Icons */}
                <div className="flex-1 flex justify-end items-center gap-4">
                    <img src="/help.png" className="h-8 w-8" />
                    <img src="/settings.png" className="h-8 w-8" />
                    <img src="/bell.png" className="h-8 w-8" />
                    <div className="h-12 w-12">
                    <img src="/user.jpg" className="h-12 w-12 rounded-full" />
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="row-start-2 col-start-1 bg-offWhite border-r border-darkGreen p-6 flex flex-col gap-4">
                <ButtonDarkImg onClick={() => console.log("Clicked")} />
                <Link to="/dashboard">
                    <a href='#' className='text-xl text-darkGreen'>Portfolio</a>
                </Link>
                <a href='#' className='text-xl text-darkGreen'>History</a>
            {/* Add more nav items */}
            </div>

            {/* Main Content */}
            {/* <Portfolio data={data} /> */}
            <History />

        </div>
    );
};

export default HistoryPage;
