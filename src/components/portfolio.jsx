import React, { useState } from 'react';
import ButtonDark from './buttonDark';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const Portfolio = ({data = []}) => {

    const generateRandomData = () => {
        const months = ['Jul', 'Sep', 'Nov', 'Jan', 'Mar', 'May'];
        const data = [];
      
        for (let year = 2025; year <= 2027; year++) {
          for (let i = 0; i < months.length; i += 2) {
            if (year === 2025 && months[i] !== 'Jul') continue;
            if (year === 2027 && months[i] !== 'Jul') continue;
            const value = 10000 + Math.floor(Math.random() * 4000); // Random between 10k-14k
            data.push({
              date: `${months[i]} '${String(year).slice(2)}`,
              value,
            });
          }
        }
      
        return data;
      };
      
      const InvestmentHistoryChart = ({ strokeColor = "#4ade80", fillColor = "#bbf7d0" }) => {
        const data = generateRandomData();
      
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[10000, 14000]} ticks={[10000, 11000, 12000, 13000, 14000]} />
              <Tooltip formatter={(val) => `£${val.toLocaleString()}`} />
              <Line type="monotone" dataKey="value" stroke={strokeColor} strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      };

      const [showSuggestions, setShowSuggestions] = useState(false);


    return (
        
        <div className='row-start-2 col-start-2 overflow-y-auto p-6 bg-offWhite flex flex-col gap-4 font-inria'>
            {showSuggestions && (
                
                <div
                    className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
                    onClick={() => setShowSuggestions(false)}
                    >
                    <div
                        className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto shadow-lg relative"
                        onClick={(e) => e.stopPropagation()} // Prevent close on inner click
                    >
                        <h2 className="text-xl font-bold mb-2 text-darkGreen">AI Summary</h2>
                        <p className="mb-4 text-gray-700">{data.aiSummary.shortSummary}</p>

                        <section className="mb-4">
                        <h3 className="font-semibold text-darkGreen">Suggested Actions</h3>
                        <ul className="list-disc list-inside text-sm text-gray-800">
                            {data.aiSummary.suggestedActions.map((item, idx) => (
                            <li key={idx}>{item}</li>
                            ))}
                        </ul>
                        </section>

                        <section className="mb-4">
                        <h3 className="font-semibold text-darkGreen">Portfolio Score</h3>
                        <p><strong>Score:</strong> {data.aiSummary.portfolioScore.score} ({data.aiSummary.portfolioScore.rating})</p>
                        <p className="text-sm text-gray-700">{data.aiSummary.portfolioScore.summary}</p>
                        </section>

                        <section className="mb-4">
                        <h3 className="font-semibold text-darkGreen">Retirement Readiness</h3>
                        <p><strong>Score:</strong> {data.aiSummary.retirementReadiness.score}</p>
                        <p className="text-sm text-gray-700">{data.aiSummary.retirementReadiness.comment}</p>
                        </section>

                        <section className="mb-4">
                        <h3 className="font-semibold text-darkGreen">What's Going Well</h3>
                        <ul className="list-disc list-inside text-sm text-gray-800">
                            {data.aiSummary.whatsGoingWell.map((item, idx) => (
                            <li key={idx}>{item}</li>
                            ))}
                        </ul>
                        </section>

                        <section className="mb-4">
                        <h3 className="font-semibold text-darkGreen">Hidden Opportunities</h3>
                        <ul className="list-disc list-inside text-sm text-gray-800">
                            {data.aiSummary.hiddenOpportunities.map((item, idx) => (
                            <li key={idx}>{item}</li>
                            ))}
                        </ul>
                        </section>

                        <section className="mb-4">
                        <h3 className="font-semibold text-darkGreen">How You Compare</h3>
                        <ul className="list-disc list-inside text-sm text-gray-800">
                            {data.aiSummary.howYouCompare.map((item, idx) => (
                            <li key={idx}>{item}</li>
                            ))}
                        </ul>
                        </section>

                        <button
                        className="absolute top-3 right-3 text-gray-500 hover:text-black"
                        onClick={() => setShowSuggestions(false)}
                        >
                        ✕
                        </button>
                    </div>
                </div>
                
            )}

            {/* Top Banner */}
            <div className="flex flex-row items-center justify-between gap-4 w-full relative">
                <div className="flex-1 bg-gradient-to-r from-[#28EE99] to-[#178857] text-darkGreen py-2 px-4 rounded-lg">
                    <img src='AI.png' className='h-10 w-10 absolute -left-5 -top-5 '/>
                    <p className="font-bold font-inria text-left">Hello {data.user?.name}. AI has 4 investing recommendations.</p>
                </div>
                <ButtonDark text="View Suggestions" />
            </div>

            

            {/* Header Cards */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 bg-white rounded-md text-darkGreen items-center justify-center">
                <div className="md:col-span-1 py-4 flex flex-col px-8 text-left gap-2">
                    <div className='p-1 px-2 w-32 bg-gradient-to-r from-[#28EE99] to-white rounded-lg'>
                        <h3 className="text-base">Net-worth</h3>
                    </div>
                    
                    <p className="text-5xl font-bold">£{data.header?.netWorth.value}</p>
                    <p className="text-xs mt-1"><span className='bg-offWhite p-1 rounded-md'>↑ {data.header?.netWorth.changePercent}%</span> in the last 30 days</p>
                </div>

                <div className="py-4 flex flex-col px-8 text-left gap-2 ml-4 ">
                    <div className='w-fit flex flex-row gap-2 rounded-lg'>
                        <h3 className="text-base font-bold">Invested</h3>
                        <p className="text-xs mt-1"><span className='bg-offWhite p-1 rounded-md'>↑ {data.header?.invested.changePercent}%</span></p>
                    </div>
                    
                    <p className="text-3xl font-bold">£{data.header?.invested.value}</p>
                    
                </div>

                <div className="py-4 flex flex-col px-8 text-left gap-2 ml-4 ">
                    <div className='w-fit flex flex-row gap-2 rounded-lg'>
                        <h3 className="text-base font-bold">Total Returns</h3>
                        <p className="text-xs mt-1"><span className='bg-offWhite p-1 rounded-md'>↑ {data.header?.totalReturns.changePercent}%</span></p>
                    </div>
                    
                    <p className="text-3xl font-bold">£{data.header?.totalReturns.value}</p>
                    
                </div>

                <div className="py-4 flex flex-col px-8 text-left gap-2 ml-4 ">
                    <div className='w-fit flex flex-row gap-2 rounded-lg'>
                        <h3 className="text-base font-bold">P&L</h3>
                        <p className="text-xs mt-1"><span className='bg-offWhite p-1 rounded-md'>↑ {data.header?.profitLoss.changePercent}%</span></p>
                    </div>
                    
                    <p className="text-3xl font-bold">£{data.header?.profitLoss.value}</p>
                    
                </div>

                <div className="py-4 flex flex-col px-8 text-left gap-2 ml-4 ">
                    <div className='w-fit flex flex-row gap-2 rounded-lg'>
                        <h3 className="text-base font-bold">Risk</h3>
                        <p className="text-xs mt-1"><span className='bg-offWhite p-1 rounded-md'>{data.header?.riskLevel.rating}</span></p>
                    </div>
                    
                    <p className="text-3xl font-bold">{data.header?.riskLevel.value}</p>
                    
                </div>
                
                <div onClick={() => {setShowSuggestions(true)}}>
                    <ButtonDark text='Get AI Summary'  />
                </div>
            </div>

            {/* Allocation Grid */}
            <div className="bg-white rounded-xl px-8 py-4 text-darkGreen font-inria">
                <div>
                    <h3 className="text-2xl text-left font-bold mb-2">Allocation</h3>    
                </div>

                <div className='flex flex-row gap-2'>
                    <p className="text-darkGreen text-5xl font-bold">£{data.allocation?.growthGBP.value} </p>
                    <div className='flex flex-col text-left'>
                        <p className="text-xs mt-1"><span className='bg-offWhite p-1 rounded-md'>↑ {data.allocation?.growthGBP.changePercent}%</span></p>
                    <   p>in the last 30 days</p>
                    </div>
                </div>
                
                
            
                <div className="flex flex-row gap-0 text-sm font-medium mt-4">
                    <div className="bg-green-100 p-4 border border-darkGreen" style={{ width: `${data.allocation?.assets[0].allocationPercent}%`}}>{data.allocation?.assets[0].shortName} <span className="block text-xs text-green-700">+{data.allocation?.assets[0].change1MPercent}</span></div>
                    <div className="bg-red-100 p-4 border border-[#FFC9C9] text-red-700" style={{ width: `${data.allocation?.assets[1].allocationPercent}%`}}>{data.allocation?.assets[1].shortName} <span className="block text-xs text-red-700">{data.allocation?.assets[1].change1MPercent}</span></div>
                    <div className="bg-red-200 p-4 border border-[#FFC9C9] text-red-700" style={{ width: `${data.allocation?.assets[2].allocationPercent}%`}}>{data.allocation?.assets[2].shortName} <span className="block text-xs text-red-700">{data.allocation?.assets[2].change1MPercent}</span></div>
                    <div className="bg-green-100 p-4 border border-darkGreen" style={{ width: `${data.allocation?.assets[3].allocationPercent}%`}}>{data.allocation?.assets[3].shortName} <span className="block text-xs text-green-700">+{data.allocation?.assets[3].change1MPercent}</span></div>
                    <div className="bg-green-100 p-4 border border-darkGreen" style={{ width: `${data.allocation?.assets[4].allocationPercent}%`}}>{data.allocation?.assets[4].shortName} <span className="block text-xs text-green-700">+{data.allocation?.assets[4].change1MPercent}</span></div>
                    <div className="bg-red-200 p-4 border border-[#FFC9C9] text-red-700" style={{ width: `${data.allocation?.assets[5].allocationPercent}%`}}>{data.allocation?.assets[5].shortName} <span className="block text-xs text-red-700">{data.allocation?.assets[5].change1MPercent}</span></div>

                </div>
                <div className='flex flex-row gap-2 mt-2'>
                    <img src='AI.png' className='w-10 h-10'/>
                    <p className='text-sm text-darkGreen text-left w-3/5 flex-1'>Your portfolio shows a balanced allocation, but it leans slightly conservative despite your moderate risk profile. 
                        While ETFs provide safety and exposure, you're underweight in growth sectors like emerging markets, tech equities, and alternatives. </p>
                    <ButtonDark text='Get AI Suggestions' />
                </div>
            </div>

            {/* Insights + Performers + Goals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
            <div className="bg-white rounded-xl p-4 text-left font-inria font text-darkGreen h-[450px] overflow-x-hidden overflow-y-scroll">
                <h3 className="text-2xl text-left font-bold mb-2">Your portfolio insights</h3>
                <ul className="space-y-4 text-darkGreen mt-4">
                <li><div className='flex flex-row gap-2 text-xl font-bold items-center'><img src='daily.png' className='w-5 h-5' />Daily Update:</div><p className='text-md font-normal'>{data.insights?.dailyUpdate}</p></li>
                <li><div className='flex flex-row gap-2 text-xl font-bold items-center'><img src='globe.png' className='w-5 h-5' />General Market News:</div><p className='text-md font-normal'>{data.insights?.marketNews}</p></li>
                <li><div className='flex flex-row gap-2 text-xl font-bold items-center'><img src='stocksUp.png' className='w-5 h-5' />Stocks on the move:</div><p className='text-md font-normal'>{data.insights?.stocksOnTheMove}</p></li>
                <li><div className='flex flex-row gap-2 text-xl font-bold items-center'><img src='company.png' className='w-5 h-5' />Company News:</div><p className='text-md font-normal'>{data.insights?.companyNews}</p></li>
                <li><div className='flex flex-row gap-2 text-xl font-bold items-center'><img src='forex.png' className='w-5 h-5' />Currency watch:</div><p className='text-md font-normal'>{data.insights?.currencyWatch}</p></li>
                </ul>
            </div>

            <div className="bg-white rounded-xl px-8 py-4 shadow ">
                <h3 className="text-2xl text-left font-bold mb-2 text-darkGreen">Best Performing Assets</h3>
                <ul className="text-xl font-bold space-y-2 text-darkGreen">
                <li className="flex flex-row items-center justify-between gap-4 text-lg w-full">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-darkGreen rounded-full" />
                        <span>{data.performers?.best[0].shortName}</span>
                    </div>
                    <p>+{data.performers?.best[0].changePercent} (£{data.performers?.best[0].pnl})</p>
                </li>
                <li className="flex flex-row items-center justify-between gap-4 text-lg w-full">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-darkGreen rounded-full" />
                        <span>{data.performers?.best[1].shortName}</span>
                    </div>
                    <p>+{data.performers?.best[1].changePercent} (£{data.performers?.best[1].pnl})</p>
                </li>
                
                </ul>
                <h3 className="text-2xl text-left font-bold mb-2 text-darkGreen">Worst Performing Assets</h3>
                <ul className="text-xl font-bold space-y-2 text-darkGreen">
                <li className="flex flex-row items-center justify-between gap-4 text-lg w-full">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-red-700 rounded-full" />
                        <span>{data.performers?.worst[0].shortName}</span>
                    </div>
                    <p className='text-red-700'>+{data.performers?.worst[0].changePercent} (£{data.performers?.worst[0].pnl})</p>
                </li>
                <li className="flex flex-row items-center justify-between gap-4 text-lg w-full">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-red-700 rounded-full" />
                        <span>{data.performers?.worst[1].shortName}</span>
                    </div>
                    <p className='text-red-700'>+{data.performers?.worst[1].changePercent} (£{data.performers?.worst[1].pnl})</p>
                </li>
                </ul>
                <div className='flex flex-row gap-2 mt-2'>
                    <img src='AI.png' className='w-10 h-10'/>
                    <p className='text-[10px] text-darkGreen text-left w-3/5 flex-1'>AZN, FTSE 100, BTCX, and VGOV show mixed results—UK equities strong, crypto and bonds lag. Hold AZN/FTSE, trim BTCX, keep VGOV for balance. </p>
                    <ButtonDark text='Get AI Suggestions' />
                </div>
            </div>

            <div className="bg-white rounded-xl px-8 py-4 shadow">
                <h3 className="text-2xl text-left font-bold mb-2 text-darkGreen">Best Performing Assets</h3>
                <ul className="space-y-2 text-sm text-gray-700 flex flex-col gap-6">
                <li>
                    <div className='w-full h-24 bg-mint flex flex-row p-2 rounded-lg text-darkGreen text-left'>
                        <div className='flex flex-col gap-2'>
                            <p className='font-bold text-xl'>{data.goals[0]?.name}:</p> 
                            <p className='font-bold text-3xl'>{data.goals[0]?.growthPercent}%</p>
                        </div>
                        <div className='w-auto flex flex-row justify-end items-end'><p className='font-bold text-3xl'>£{data.goals[0]?.saved}</p><p className='font-bold text-lg top-2'>/ £{data.goals[0]?.target}</p> </div>
                    
                    
                    </div>
                </li>
                <li>
                    <div className='w-full h-24 bg-mint flex flex-row p-2 rounded-lg text-darkGreen text-left'>
                        <div className='flex flex-col gap-2'>
                            <p className='font-bold text-xl'>{data.goals[1]?.name}:</p> 
                            <p className='font-bold text-3xl'>{data.goals[1]?.growthPercent}%</p>
                        </div>
                        <div className='w-auto flex flex-row justify-end items-end'><p className='font-bold text-3xl'>£{data.goals[1]?.saved}</p><p className='font-bold text-lg top-2'>/ £{data.goals[1]?.target}</p> </div>
                    
                    
                    </div>
                </li><li>
                    <div className='w-full h-24 bg-mint flex flex-row p-2 rounded-lg text-darkGreen text-left'>
                        <div className='flex flex-col gap-2'>
                            <p className='font-bold text-xl'>{data.goals[2]?.name}:</p> 
                            <p className='font-bold text-3xl'>{data.goals[2]?.growthPercent}%</p>
                        </div>
                        <div className='w-auto flex flex-row justify-end items-end'><p className='font-bold text-3xl'>£{data.goals[2]?.saved}</p><p className='font-bold text-lg top-2'>/ £{data.goals[2]?.target}</p> </div>
                    
                    
                    </div>
                </li>
                </ul>
            </div>
            </div>

            {/* Portfolio Score */}
            <div className="bg-white rounded-xl p-4 shadow w-full">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">Portfolio Score</h3>
                <button className="text-sm text-darkGreen underline">Deeper Analysis</button>
            </div>
            <p className="text-sm text-darkGreen text-left">Score: <strong>{data.score?.score}</strong> ({data.score?.rating})</p>
            <p className="text-sm text-darkGreen font-bold text-left"> {data.score?.percentile}</p>
            <div className="h-2 bg-gray-200 rounded-full mb-2 mt-2">
                <div className={`h-2 bg-darkGreen rounded-full w-[68%]`}></div>
            </div>
           

            <div className="grid grid-cols-3 gap-2 mt-4 text-sm">
                <div className="p-2 rounded bg-green-100">
                <strong className="block text-lg text-green-800">{data.score?.riskMatch.value}/10</strong>
                Risk Match<br /><span className="text-xs text-gray-600">{data.score?.riskMatch.rating}</span>
                </div>
                <div className="p-2 rounded bg-green-100">
                <strong className="block text-lg text-green-800">{data.score?.riskAdjustedReturn.value}/10</strong>
                Risk Adjusted Return<br /><span className="text-xs text-gray-600">{data.score?.riskAdjustedReturn.rating}</span>
                </div>
                <div className="p-2 rounded bg-green-100">
                <strong className="block text-lg text-green-800">{data.score?.downsideProtection.value}/10</strong>
                Downside Protection<br /><span className="text-xs text-gray-600">{data.score?.downsideProtection.rating}</span>
                </div>
            </div>
            <div className='flex flex-row gap-2 mt-2'>
                    <img src='AI.png' className='w-10 h-10'/>
                    <p className='text-sm text-darkGreen text-left w-3/5 flex-1'>Your portfolio perfectly aligns with your risk preference, but shows weak performance in downside protection and risk-adjusted . </p>
                    <ButtonDark text='Get AI Suggestions' />
                </div>
            </div>

            {/* History and Expected Performance */}
            <div className="bg-white rounded-xl p-4 shadow w-full h-fit">
            <h3 className="font-semibold text-lg mb-2">History and Expected Performance</h3>
            <p className="text-green-600 text-xl font-bold">+{data.history?.growthPercent}%</p>
            <p className="text-sm text-gray-600 mb-4">in the last {data.history?.period}</p>
            {/* Chart component placeholder */}
            <InvestmentHistoryChart/>
            </div>
        </div>
    );
  };
  
  export default Portfolio;