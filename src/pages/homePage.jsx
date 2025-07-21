import React from 'react';
import ButtonDark from '../components/buttonDark';
import ButtonLight from '../components/buttonLight';
import { Link } from 'react-router-dom'


const HomePage = () => {
  return (
    <div className="grid grid-rows-[6rem_1fr] grid-cols-[16rem_1fr] h-auto w-screen overflow-x-hidden">
        {/* Top Nav */}
        <div className="row-start-1 col-span-2 fixed top-0 left-0 w-screen h-24 z-50 bg-offWhite flex items-center px-12">
            {/* Logo */}
            <div className="flex-1">
                <img src="logoNav.png" className="h-10" />
            </div>

            

            {/* Icons */}
            <div className="flex-1 flex justify-end items-center gap-4">
                
                <ButtonLight text='Login' />
                <Link to="/signup">
                    <ButtonDark text="Sign up" />
                </Link>
                
            </div>
        </div>
        

        
        <div className="row-start-2 col-span-2 flex flex-col md:flex-row items-center bg-offWhite justify-between gap-10 mt-8">
            {/* Left Content */}
            <div className="md:w-1/2 space-y-6 px-12">
                <h1 className="text-7xl font-bold leading-tight font-inria text-left text-darkGreen">
                Have full control of your <br />
                <span className="text-darkGreen">Financial Portfolio</span>
                </h1>
                <p className="text-2xl font-inria text-left text-darkGreen font-bold">
                Smarter Investing, Backed by Insight.
                </p>

                
                <Link to="/signup">
                    <ButtonDark text="Get Started" />
                </Link>

                <div className="flex items-center gap-3 pt-4">
                    <div className='flex items-start '>
                        <img src="/users1.jpg" alt="users" className="w-16 h-16 object-cover rounded-full relative z-10" />
                        <img src="/users2.jpg" alt="users" className="w-16 h-16 object-cover rounded-full relative z-20 -ml-4" />
                        <img src="/users3.jpg" alt="users" className="w-16 h-16 object-cover rounded-full relative z-30 -ml-4" />
                    </div>
                    
                    <span className="text-2xl font-inria text-left text-darkGreen font-bold">+2000 <br />happy customers</span>
                </div>

                <p className="text-2xl font-inria text-left text-darkGreen font-bold">
                Verdence helps you track performance, manage risk, and optimize returns —
                all in one dashboard. Harness the power of AI for your growth.
                </p>
            </div>

            {/* Right Side Image */}
            <div className="md:w-1/2 relative flex justify-center">
                <img src="/Logo3d.png" alt="3D A" className="w-96 md:w-[400px]" />
            </div>
        </div>

        {/* Preview Screenshot */}
        <div className="relative row-start-3 col-span-2 bg-offWhite flex justify-center overflow-hidden w-screen h-fit pt-8">
            

            {/* Center Image - On Top */}
            <img
                src="/dashboardOverview.png"
                alt="dashboard preview"
                className="w-[80%] h-auto rounded-xl z-20 relative pt-4"
            />

            
        </div>

    </div>
  );
};

export default HomePage;
