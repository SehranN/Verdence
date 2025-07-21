import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-offWhite">

        {/* Left Column */}
        <div className="flex flex-col justify-between pb-8 pt-7 px-12 h-screen">
            {/* Logo */}
            <div>
                <img src="/logoNav.png" alt="Logo" className="h-10" />
            </div>
        
            {/* Form */}
            <div className="flex-1 flex items-center justify-center text-left font-inria">
                <div className="w-full max-w-md space-y-8">
                <h1 className="text-7xl font-bold text-darkGreen">Sign Up</h1>
        
                <form className="space-y-6">
                    {/* Full Name */}
                    <div>
                    <label className="block mb-1 text-sm font-medium text-darkGreen">
                        Full Name
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-darkGreen transition-all duration-500"
                    />
                    </div>
        
                    {/* Email */}
                    <div>
                    <label className="block mb-1 text-sm font-medium text-darkGreen">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-darkGreen transition-all duration-500"
                    />
                    </div>
        
                    {/* Password with Validation Message */}
                    <div>
                    <label className="block mb-1 text-sm font-medium text-darkGreen">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-darkGreen transition-all duration-500"
                    />
                    {password.length > 0 && password.length < 8 && (
                        <p className="text-sm text-red-500 mt-1">
                        Minimum 8 characters required
                        </p>
                    )}
                    </div>
                    <Link to="/signup-questions" className="">
                        <button
                        type="submit"
                        className="min-w-[200px] mt-4 w-full flex items-center justify-center gap-2 rounded-full bg-card-gradient bg-[length:200%] bg-left hover:bg-right transition-[background-position] duration-500 px-6 py-2 font-inria text-xl text-darkGreen"
                        >
                        Sign Up
                        </button>
                    </Link>
                    
                </form>
                <div className="flex flex-row justify-center items-center w-full h-fit gap-4">
                    <button className="w-1/3 flex items-center justify-center gap-2 rounded-full bg-white border border-darkGreen hover:bg-darkGreen hover:text-white duration-500 px-6 py-2 font-inria text-xl text-darkGreen">
                        <img src="google.png" className="h-8 w-8" />
                    </button>
                    <button className="w-1/3 flex items-center justify-center gap-2 rounded-full bg-white border border-darkGreen hover:bg-darkGreen hover:text-white duration-500 px-6 py-2 font-inria text-xl text-darkGreen">
                        <img src="fb.png" className="h-8 w-8" />
                    </button>
                    <button className="w-1/3 flex items-center justify-center gap-2 rounded-full bg-white border border-darkGreen hover:bg-darkGreen hover:text-white duration-500 px-6 py-2 font-inria text-xl text-darkGreen">
                        <img src="apple.png" className="h-8 w-8" />
                    </button>

                </div>
                
        
                <p className="text-sm text-darkGreen text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-darkGreen font-medium underline">
                    Login here
                    </Link>
                </p>
                </div>
            </div>
        </div>
    
        {/* Right Column - Image */}
        <div className="hidden md:flex p-4 bg-offWhite h-screen">
            <div className="relative w-full h-full rounded-md overflow-hidden bg-mint">
                
                {/* Background image */}
                <img 
                src="bglayer.png" 
                className="absolute top-0 left-0 w-full h-full object-cover z-0" 
                alt="background"
                />

                {/* Text on top */}
                <h1 className="absolute p-12 z-20 text-7xl font-inria font-bold text-darkGreen leading-snug text-left max-w-[80%]">
                Join thousands of people simplifying their portfolios.
                </h1>

                {/* Stonks image at bottom */}
                <img 
                src="stonks.png" 
                className="absolute -bottom-20 right-0 w-full object-contain z-10" 
                alt="illustration"
                />
                
            </div>
        </div>

    </div>
  
  );
}
