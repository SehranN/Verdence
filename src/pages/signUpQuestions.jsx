import React, { useState } from 'react';
import ButtonDark from '../components/buttonDark';
import ButtonLight from '../components/buttonLight';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';


const SignUpQuestions = () => {

    const ProgressBar = ({ progress }) => {
        return (
          <div className="flex items-center justify-center h-2 mt-2">
            <div className="w-72 h-2">
              <div className="w-full bg-lightGreen h-2 rounded-full overflow-hidden">
                <div
                  className="bg-darkGreen h-2 rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              
            </div>
          </div>
        );
    };

    // goal multi select
    const [selected, setSelected] = useState([]);

    const toggleGoal = (goal) => {
      setSelected((prev) =>
        prev.includes(goal)
          ? prev.filter((c) => c !== goal)
          : [...prev, goal]
      );
    };

    const goals = [
        ["Build long term wealth", "pound.png"],
        ["Save for retirement", "retirement.png"],
        ["Generate passive income", "wallet.png"],
        ["Explore investing", "stocksUp.png"],
        ["Others", "others.png"],
    ];

    // securities multi select
    const [selectedSecurities, setSelectedSecurities] = useState([]);

    const toggleSecurities = (sec) => {
        setSelectedSecurities((prev) =>
        prev.includes(sec)
            ? prev.filter((c) => c !== sec)
            : [...prev, sec]
        );
    };

    const securities = [
        ["ETFs", "pound.png"],
        ["Stocks", "stocksUp.png"],
        ["FX", "forex.png"],
        ["Crypto", "crypto.png"],
        ["Alternatives", "others.png"],
    ];

    // risk tolerance single

    const [selectedRisk, setSelectedRisk] = useState("");

    const risks = [
        ["Conservative", "pound1.png"],
        ["Moderately Conservative", "pound2.png"],
        ["Moderately Aggeresive", "pound3.png"],
        ["Aggeresive", "pound4.png"],
        ["Very Aggeresive", "pound5.png"],
        
    ];

    const toggleRisk = (risk) => {
        setSelectedRisk(risk);
    };

    // primary objective single

    const [selectedObj, setSelectedObj] = useState("");

    const objs = [
        ["Balance growth a income", "balance.png"],
        ["Maximize growth ", "stocksUp.png"],
        ["Maximize income ", "income.png"],
    ];

    const toggleObj = (obj) => {
        setSelectedObj(obj);
    };

    // use single

    const [selectedUse, setSelectedUse] = useState("");

    const uses = [
        ["Feel more confident about my investment strategy", "confident.png"],
        ["Increase risk-adjusted returns", "stocksChart.png"],
        ["Increase downside protection", "stocksDown.png"],
        ["Get more personalized recommendations", "personal.png"],
        ["Keep track of my net worth in one place", "pound.png"],
        
    ];

    const toggleUse = (use) => {
        setSelectedUse(use);
    };

    // pref single

    const [selectedPref, setSelectedPref] = useState("");

    const prefs = [
        ["Automated actions", "AI.png"],
        ["Manual control", "manual.png"],
        
    ];

    const togglePref = (pref) => {
        setSelectedPref(pref);
    };

    // want single

    const [selectedWant, setSelectedWant] = useState("");

    const wants = [
        ["Sustainable investments", "stocksUp.png"],
        ["Diversified global options", "diversified.png"],
        
    ];

    const toggleWant = (want) => {
        setSelectedWant(want);
    };

    // income select
    const [selectedInc, setSelectedInc] = useState("");

    const toggleInc = (inc) => {
        setSelectedInc(inc);
    };

    const incs = ["<£25,000", "£25,000 - £100,000", ">£100,000"];

    // time select
    const [selectedTime, setSelectedTime] = useState("");

    const toggleTime = (time) => {
        setSelectedTime(time);
    };

    const times = ["<1yr", "1 - 3 yr", "3 - 5 yr", ">5yr"];

    // expirience select
    const [selectedExp, setSelectedExp] = useState("");

    const toggleExp = (exp) => {
        setSelectedExp(exp);
    };

    const exps = ["Beginner", "Intermediate", "Experienced", "Expert"];

    // net worth slider
    const [valueNet, setValueNet] = useState(1000);

    const handleNetChange = (e) => {
      const val = Math.round(Number(e.target.value) / 1000) * 1000;
      setValueNet(val);
    };

    const progress = ((valueNet - 1000) / (100000 - 1000)) * 100;

    // investment slider
    const [valueInv, setValueInv] = useState(1000);

    const handleInvChange = (e) => {
      const val = Math.round(Number(e.target.value) / 1000) * 1000;
      setValueInv(val);
    };

    const progressInv = ((valueInv - 1000) / (100000 - 1000)) * 100;

    // monthly slider
    const [valueMon, setValueMon] = useState(1000);

    const handleMonChange = (e) => {
      const val = Math.round(Number(e.target.value) / 1000) * 1000;
      setValueMon(val);
    };

    const progressMon = ((valueMon - 1000) / (100000 - 1000)) * 100;



      

  return (
    <div className="grid grid-rows-[6rem_1fr] grid-cols-[16rem_1fr] h-auto w-screen overflow-x-hidden">
        {/* Top Nav */}
        <div className="row-start-1 col-span-2 fixed top-0 left-0 w-screen h-24 z-50 bg-offWhite flex items-center px-12">
            {/* Logo */}
            <div className="flex-1">
                <img src="logoNav.png" className="h-10" />
            </div>

        </div>
        

        
        <div className="row-start-2 col-span-2 flex flex-col md:flex-col items-center bg-offWhite justify-center mt-8 mb-8">
            <h1 className='text-5xl font-bold font-inria text-darkGreen'>Hello John,</h1>
            <p className='text-base font-bold font-inria text-darkGreen'>to make your experience much more personal and accurate we will need you to answer some questions</p>
            {/* <div className='w-full mt-8'>
                <p className='text-base font-bold font-inria text-darkGreen'>Step 1/4</p>
                <ProgressBar progress={25} />
            </div> */}
            {/* step 1 */}
            <div className="flex-1 flex items-center justify-center text-left font-inria mt-8 w-full">
                <div className="w-full max-w-xl space-y-8">

                    
        
                    <form className="space-y-6">

                        <h2 className='text-center text-2xl font-bold font-inria text-darkGreen'>Personal Information</h2>
                        
                        <div>
                        <label className="block mb-1 text-sm font-bold text-darkGreen">
                            Age
                        </label>
                        <input
                            type="text"
                            name='age'
                            placeholder="Enter age"
                            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-darkGreen transition-all duration-500"
                        />
                        </div>
            
                        
                        <div>
                        <label className="block mb-1 text-sm font-bold text-darkGreen">
                            Occupation sector:
                        </label>
                        <input
                            type="text"
                            name='occupation'
                            placeholder="Enter sector"
                            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-darkGreen transition-all duration-500"
                        />
                        </div>
            
                        
                        <div>
                        <label className="block mb-1 text-sm font-bold text-darkGreen">
                            Country of residence
                        </label>
                        <input
                            type="text"
                            name='country'
                            placeholder="Enter country"
                            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-darkGreen transition-all duration-500"
                        />
                        </div>
                        <label className="block mb-2 text-sm font-bold text-darkGreen">
                            What brings you to Verdence (you can select multiple):
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {goals.slice(0,4).map(([label, icon]) => (
                                <label
                                    key={label}
                                    className={`cursor-pointer px-4 py-2 rounded-2xl border flex flex-col w-[150px] h-[150px] items-center gap-3 transition-all duration-300 shadow-sm ${
                                    selected.includes(label)
                                        ? "bg-mint text-darkGreen border-darkGreen"
                                        : "bg-white text-darkGreen border-gray-300 hover:border-mint"
                                    }`}
                                >
                                    <input
                                    type="checkbox"
                                    value={label}
                                    checked={selected.includes(label)}
                                    onChange={() => {
                                        toggleGoal(label)
                                    }}
                                    className="hidden"
                                    />
                                    <img src={`${icon}`} alt={label} className="w-12 h-12 mt-4" />
                                    <span className="text-xs font-bold font-inria mt-2 text-center">{label}</span>
                                </label>
                            ))}
                            <label
                                key={goals[4][0]}
                                className={`cursor-pointer px-4 py-2 rounded-2xl border flex flex-col w-[150px] h-[150px] items-center gap-3 transition-all duration-300 shadow-sm ${
                                    selected.includes(goals[4][0])
                                        ? "bg-mint text-darkGreen border-darkGreen"
                                        : "bg-white text-darkGreen border-gray-300 hover:border-mint"
                                }`}
                            >
                                <input
                                type="checkbox"
                                value={goals[4][0]}
                                checked={selected.includes(goals[4][0])}
                                onChange={() => toggleGoal(goals[4][0])}
                                className="hidden"
                                />
                                <img src={`${goals[4][1]}`} alt={goals[4][0]} className="w-12 h-12 mt-4" />
                                <span className="text-xs font-bold font-inria mt-2 text-center">{goals[4][0]}</span>
                            </label>
                        </div>

                        <h2 className='text-center text-2xl font-bold font-inria text-darkGreen'>Financial Snapshot</h2>

                        <div>
                            <label className="block mb-2 text-sm font-bold text-darkGreen">
                                Monthly income range:
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {incs.map((inc) => (
                                    <label
                                        key={inc}
                                        className={`cursor-pointer px-4 py-2 rounded-full border text-sm transition-all duration-300 flex items-center gap-2 ${
                                        selectedInc === inc
                                            ? "bg-mint text-darkGreen border-darkGreen"
                                            : "bg-white text-darkGreen border-gray-300 hover:border-mint"
                                        }`}
                                    >
                                        <input
                                        type="radio"
                                        name="income"
                                        value={inc}
                                        checked={selectedInc === inc}
                                        onChange={() => toggleInc(inc)}
                                        className="hidden"
                                        />
                                        {inc}
                                    </label>
                                ))}
                                
                            </div>
                        </div>
                        
                        {/* networth */}
                        <div>
                        <label className="block mb-2 text-sm font-bold text-darkGreen">
                            Net-worth estimation:
                        </label>
                            <div className="w-full max-w-sm mx-auto text-center mt-1">
                                {/* Animated Number */}
                                <div className="h-10 overflow-hidden text-3xl font-bold text-darkGreen mb-4 relative">
                                    <AnimatePresence mode="popLayout">
                                    <motion.div
                                        key={valueNet}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        £{valueNet.toLocaleString()}
                                    </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Slider */}
                                <input
                                    type="range"
                                    min={1000}
                                    max={100000}
                                    step={1000}
                                    value={valueNet}
                                    onChange={handleNetChange}
                                    className="w-full h-2 appearance-none cursor-pointer"
                                    style={{
                                        background: `linear-gradient(to right, #003E31 0%, #003E31 ${progress}%, #C9FFE6 ${progress}%, #C9FFE6 100%)`,
                                        borderRadius: '9999px', // full rounding for the track
                                        WebkitAppearance: 'none', // remove default
                                    }}
                                />
                                <style jsx>{`
                                    input[type='range']::-webkit-slider-thumb {
                                        -webkit-appearance: none;
                                        appearance: none;
                                        height: 20px;
                                        width: 20px;
                                        border-radius: 9999px;
                                        background: #34d399;
                                        
                                        cursor: pointer;
                                        margin-top: 0px; /* centers thumb on track */
                                        transition: background 0.3s;
                                    }

                                    input[type='range']::-moz-range-thumb {
                                        height: 20px;
                                        width: 20px;
                                        border-radius: 9999px;
                                        background: #34d399;
                                        border: 2px solid #065f46;
                                        cursor: pointer;
                                    }
                                    `}
                                </style>

                            </div>
                        </div>
                        
                        {/* investment */}
                        <div>
                        <label className="block mb-2 text-sm font-bold text-darkGreen">
                            How much are you looking to invest:
                        </label>
                            <div className="w-full max-w-sm mx-auto text-center mt-1">
                                {/* Animated Number */}
                                <div className="h-10 overflow-hidden text-3xl font-bold text-darkGreen mb-4 relative">
                                    <AnimatePresence mode="popLayout">
                                    <motion.div
                                        key={valueInv}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        £{valueInv.toLocaleString()}
                                    </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Slider */}
                                <input
                                    type="range"
                                    min={1000}
                                    max={100000}
                                    step={1000}
                                    value={valueInv}
                                    onChange={handleInvChange}
                                    className="w-full h-2 appearance-none cursor-pointer"
                                    style={{
                                        background: `linear-gradient(to right, #003E31 0%, #003E31 ${progressInv}%, #C9FFE6 ${progressInv}%, #C9FFE6 100%)`,
                                        borderRadius: '9999px', // full rounding for the track
                                        WebkitAppearance: 'none', // remove default
                                    }}
                                />
                                <style jsx>{`
                                    input[type='range']::-webkit-slider-thumb {
                                        -webkit-appearance: none;
                                        appearance: none;
                                        height: 20px;
                                        width: 20px;
                                        border-radius: 9999px;
                                        background: #34d399;
                                        
                                        cursor: pointer;
                                        margin-top: 0px; /* centers thumb on track */
                                        transition: background 0.3s;
                                    }

                                    input[type='range']::-moz-range-thumb {
                                        height: 20px;
                                        width: 20px;
                                        border-radius: 9999px;
                                        background: #34d399;
                                        border: 2px solid #065f46;
                                        cursor: pointer;
                                    }
                                    `}
                                </style>

                            </div>
                        </div>

                        {/* monthly */}
                        <div>
                        <label className="block mb-2 text-sm font-bold text-darkGreen">
                            How much can you contribute monthly:
                        </label>
                            <div className="w-full max-w-sm mx-auto text-center mt-1">
                                {/* Animated Number */}
                                <div className="h-10 overflow-hidden text-3xl font-bold text-darkGreen mb-4 relative">
                                    <AnimatePresence mode="popLayout">
                                    <motion.div
                                        key={valueMon}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        £{valueMon.toLocaleString()}
                                    </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Slider */}
                                <input
                                    type="range"
                                    min={1000}
                                    max={100000}
                                    step={1000}
                                    value={valueMon}
                                    onChange={handleMonChange}
                                    className="w-full h-2 appearance-none cursor-pointer"
                                    style={{
                                        background: `linear-gradient(to right, #003E31 0%, #003E31 ${progressMon}%, #C9FFE6 ${progressMon}%, #C9FFE6 100%)`,
                                        borderRadius: '9999px', // full rounding for the track
                                        WebkitAppearance: 'none', // remove default
                                    }}
                                />
                                <style jsx>{`
                                    input[type='range']::-webkit-slider-thumb {
                                        -webkit-appearance: none;
                                        appearance: none;
                                        height: 20px;
                                        width: 20px;
                                        border-radius: 9999px;
                                        background: #34d399;
                                        
                                        cursor: pointer;
                                        margin-top: 0px; /* centers thumb on track */
                                        transition: background 0.3s;
                                    }

                                    input[type='range']::-moz-range-thumb {
                                        height: 20px;
                                        width: 20px;
                                        border-radius: 9999px;
                                        background: #34d399;
                                        border: 2px solid #065f46;
                                        cursor: pointer;
                                    }
                                    `}
                                </style>

                            </div>
                        </div>
                        
                        <div>
                            <label className="block mb-2 text-sm font-bold text-darkGreen">
                                How long do you want to stay invested:
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {times.map((time) => (
                                    <label
                                        key={time}
                                        className={`cursor-pointer px-4 py-2 rounded-full border text-sm transition-all duration-300 flex items-center gap-2 ${
                                        selectedTime === time
                                            ? "bg-mint text-darkGreen border-darkGreen"
                                            : "bg-white text-darkGreen border-gray-300 hover:border-mint"
                                        }`}
                                    >
                                        <input
                                        type="radio"
                                        name="income"
                                        value={time}
                                        checked={selectedTime === time}
                                        onChange={() => toggleTime(time)}
                                        className="hidden"
                                        />
                                        {time}
                                    </label>
                                ))}
                                
                            </div>
                        </div>

                        <h2 className='text-center text-2xl font-bold font-inria text-darkGreen'>Risk & Experience</h2>
                        
                        <div>
                            <label className="block mb-2 text-sm font-bold text-darkGreen">
                                Investment experience level:
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {exps.map((exp) => (
                                    <label
                                        key={exp}
                                        className={`cursor-pointer px-4 py-2 rounded-full border text-sm transition-all duration-300 flex items-center gap-2 ${
                                        selectedExp === exp
                                            ? "bg-mint text-darkGreen border-darkGreen"
                                            : "bg-white text-darkGreen border-gray-300 hover:border-mint"
                                        }`}
                                    >
                                        <input
                                        type="radio"
                                        name="expierence"
                                        value={exp}
                                        checked={selectedExp === exp}
                                        onChange={() => toggleExp(exp)}
                                        className="hidden"
                                        />
                                        {exp}
                                    </label>
                                ))}
                                
                            </div>
                        </div>
            
                        <label className="block mb-2 text-sm font-bold text-darkGreen">
                        Risk Tolerance:
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {risks.map(([label, icon]) => (
                                <label
                                    key={label}
                                    className={`cursor-pointer px-4 py-2 rounded-2xl border flex flex-col w-[150px] h-[150px] items-center gap-3 transition-all duration-300 shadow-sm ${
                                        selectedRisk === label
                                        ? "bg-mint text-darkGreen border-darkGreen"
                                        : "bg-white text-darkGreen border-gray-300 hover:border-mint"
                                    }`}
                                >
                                    <input
                                    type="radio"
                                    name="risk"
                                    value={label}
                                    checked={selectedRisk === label}
                                    onChange={() => toggleRisk(label)}
                                    className="hidden"
                                    />
                                    <img src={`${icon}`} alt={label} className="w-12 h-12 mt-4" />
                                    <span className="text-xs font-bold font-inria mt-2 text-center">{label}</span>
                                </label>
                            ))}
                            
                        </div>

                        <label className="block mb-2 text-sm font-bold text-darkGreen">
                            What kinds of securities would you like to see recommendations for? (you can select multiple):
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {securities.slice(0,4).map(([label, icon]) => (
                                <label
                                    key={label}
                                    className={`cursor-pointer px-4 py-2 rounded-2xl border flex flex-col w-[150px] h-[150px] items-center gap-3 transition-all duration-300 shadow-sm ${
                                        selectedSecurities.includes(label)
                                        ? "bg-mint text-darkGreen border-darkGreen"
                                        : "bg-white text-darkGreen border-gray-300 hover:border-mint"
                                    }`}
                                >
                                    <input
                                    type="checkbox"
                                    value={label}
                                    checked={selectedSecurities.includes(label)}
                                    onChange={() => toggleSecurities(label)}
                                    className="hidden"
                                    />
                                    <img src={`${icon}`} alt={label} className="w-12 h-12 mt-4" />
                                    <span className="text-xs font-bold font-inria mt-2 text-center">{label}</span>
                                </label>
                            ))}
                            <label
                                key={securities[4][0]}
                                className={`cursor-pointer px-4 py-2 rounded-2xl border flex flex-col w-[150px] h-[150px] items-center gap-3 transition-all duration-300 shadow-sm ${
                                    selectedSecurities.includes(goals[4][0])
                                        ? "bg-mint text-darkGreen border-darkGreen"
                                        : "bg-white text-darkGreen border-gray-300 hover:border-mint"
                                }`}
                            >
                                <input
                                type="checkbox"
                                value={goals[4][0]}
                                checked={selectedSecurities.includes(goals[4][0])}
                                onChange={() => toggleSecurities(goals[4][0])}
                                className="hidden"
                                />
                                <img src={`${goals[4][1]}`} alt={goals[4][0]} className="w-12 h-12 mt-4" />
                                <span className="text-xs font-bold font-inria mt-2 text-center">{goals[4][0]}</span>
                            </label>
                        </div>

                        <label className="block mb-2 text-sm font-bold text-darkGreen">
                        What is your primary investment objective?
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {objs.map(([label, icon]) => (
                                <label
                                    key={label}
                                    className={`cursor-pointer px-4 py-2 rounded-2xl border flex flex-col w-[150px] h-[150px] items-center gap-3 transition-all duration-300 shadow-sm ${
                                        selectedObj === label
                                        ? "bg-mint text-darkGreen border-darkGreen"
                                        : "bg-white text-darkGreen border-gray-300 hover:border-mint"
                                    }`}
                                >
                                    <input
                                    type="radio"
                                    name="risk"
                                    value={label}
                                    checked={selectedObj === label}
                                    onChange={() => toggleObj(label)}
                                    className="hidden"
                                    />
                                    <img src={`${icon}`} alt={label} className="w-12 h-12 mt-4" />
                                    <span className="text-xs font-bold font-inria mt-2 text-center">{label}</span>
                                </label>
                            ))}
                            
                        </div>

                        <h2 className='text-center text-2xl font-bold font-inria text-darkGreen'>Preferences & Summary</h2>
            
                        <label className="block mb-2 text-sm font-bold text-darkGreen">
                        What would you like to get out of Verdence?
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {uses.map(([label, icon]) => (
                                <label
                                    key={label}
                                    className={`cursor-pointer px-4 py-2 rounded-2xl border flex flex-col w-[150px] h-[150px] items-center gap-3 transition-all duration-300 shadow-sm ${
                                        selectedUse === label
                                        ? "bg-mint text-darkGreen border-darkGreen"
                                        : "bg-white text-darkGreen border-gray-300 hover:border-mint"
                                    }`}
                                >
                                    <input
                                    type="radio"
                                    name="risk"
                                    value={label}
                                    checked={selectedUse === label}
                                    onChange={() => toggleUse(label)}
                                    className="hidden"
                                    />
                                    <img src={`${icon}`} alt={label} className="w-12 h-12 mt-4" />
                                    <span className="text-xs font-bold font-inria mt-2 text-center">{label}</span>
                                </label>
                            ))}
                            
                        </div>


                        <label className="block mb-2 text-sm font-bold text-darkGreen">
                        Would you prefer:
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {prefs.map(([label, icon]) => (
                                <label
                                    key={label}
                                    className={`cursor-pointer px-4 py-2 rounded-2xl border flex flex-col w-[150px] h-[150px] items-center gap-3 transition-all duration-300 shadow-sm ${
                                        selectedPref === label
                                        ? "bg-mint text-darkGreen border-darkGreen"
                                        : "bg-white text-darkGreen border-gray-300 hover:border-mint"
                                    }`}
                                >
                                    <input
                                    type="radio"
                                    name="risk"
                                    value={label}
                                    checked={selectedPref === label}
                                    onChange={() => togglePref(label)}
                                    className="hidden"
                                    />
                                    <img src={`${icon}`} alt={label} className="w-12 h-12 mt-4" />
                                    <span className="text-xs font-bold font-inria mt-2 text-center">{label}</span>
                                </label>
                            ))}
                            
                        </div>

                        <label className="block mb-2 text-sm font-bold text-darkGreen">
                        Do you want:
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {wants.map(([label, icon]) => (
                                <label
                                    key={label}
                                    className={`cursor-pointer px-4 py-2 rounded-2xl border flex flex-col w-[150px] h-[150px] items-center gap-3 transition-all duration-300 shadow-sm ${
                                        selectedWant === label
                                        ? "bg-mint text-darkGreen border-darkGreen"
                                        : "bg-white text-darkGreen border-gray-300 hover:border-mint"
                                    }`}
                                >
                                    <input
                                    type="radio"
                                    name="risk"
                                    value={label}
                                    checked={selectedWant === label}
                                    onChange={() => toggleWant(label)}
                                    className="hidden"
                                    />
                                    <img src={`${icon}`} alt={label} className="w-12 h-12 mt-4" />
                                    <span className="text-xs font-bold font-inria mt-2 text-center">{label}</span>
                                </label>
                            ))}
                            
                        </div>


                        <Link to="/dashboard">
                            <button
                            type="submit"
                            className="min-w-[200px] mt-4 w-full flex items-center justify-center gap-2 rounded-full bg-card-gradient bg-[length:200%] bg-left hover:bg-right transition-[background-position] duration-500 px-6 py-2 font-inria text-xl text-darkGreen"
                            >
                            Next
                            </button>
                        
                        </Link>
                        
                    </form>

                </div>
            </div>
            


        
            
        </div>

      

    </div>
  );
};

export default SignUpQuestions;
