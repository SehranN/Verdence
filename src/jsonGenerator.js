const generatePortfolio = (data) => {
    const {
        riskTolerance,
        investmentTimeHorizon,
        netWorth,
        investmentAmount,
        monthlyContribution,
        goals,
        securities,
        primaryObjective,
        userIntent,
        prefrence,
        wants

    } = data.userProfile;

    const seed = Math.random()

    const expectedReturnMap = {
        "Conservative": 3.5,
        "Moderately Conservative": 5.2,
        "Moderately Aggressive": 7.1,
        "Aggressive": 9.3,
        "Very Aggressive": 11.4
    };

    const timeMapping = {
        "<1yr": 0.5,
        "1 - 3 yr": 2,
        "3 - 5 yr": 4,
        ">5yr": 6,
    };

    const timeYears = timeMapping[selectedTime] ?? 3;

    const baseAllocations = [
        { type: "ETFs", min: 0.1, max: 0.85 },
        { type: "Stocks", min: 0.1, max: 0.6 },
        { type: "Crypto", min: 0.0, max: 0.2 },
        { type: "Cash", min: 0.05, max: 0.3 },
    ];
    
    const equitiesWeight = Math.min(0.2 + 0.15 * riskScore + 0.05 * timeYears, 0.85);
    const bondsWeight = incomeTilt ? 0.5 : Math.max(0.6 - 0.1 * riskScore - 0.05 * timeYears, 0.1);
    const alternativesWeight = riskScore >= 3 ? 0.15 : 0.05;
    const cashWeight = 1 - (equitiesWeight + bondsWeight + alternativesWeight);

    const allocation = [
        { type: "ETFs", allocation: equitiesWeight },
        { type: "Stocks", allocation: bondsWeight },
        { type: "Crypto", allocation: alternativesWeight },
        { type: "Cash", allocation: cashWeight },
    ];

    const instrumentSuggestions = {
        Equities: [
          { name: "iShares Core MSCI World ETF", type: "ETF", expectedReturn: 0.08 },
          { name: "Vanguard FTSE 100 ETF", type: "ETF", expectedReturn: 0.06 }
        ],
        Bonds: [
          { name: "UK Gilts (VGOV)", type: "Bond", expectedReturn: 0.025 },
          { name: "Investment Grade Corporate Bonds", type: "Bond", expectedReturn: 0.03 }
        ],
        Alternatives: [
          { name: "iShares Global Infrastructure ETF", type: "ETF", expectedReturn: 0.05 },
          { name: "Gold ETC", type: "Commodity", expectedReturn: 0.04 }
        ],
        Cash: [
          { name: "Money Market Fund", type: "Cash", expectedReturn: 0.015 },
          { name: "High-Yield Savings", type: "Cash", expectedReturn: 0.01 }
        ]
      };

    const rating = "Moderate"

    if 



    const estimatedReturn = expectedReturnMap[riskTolerance] || 5.0;

    const portfolioHeader = {
        "netWorth": {
            "value": netWorth + investmentAmount*Math.round((estimatedReturn / 12) * 100) + (monthlyContribution * (seed * 12)),
            "changePercent": Math.round((estimatedReturn / 12) * 100)
        },
        "invested": {
            "value": investmentAmount + (monthlyContribution * (seed * 12)),
            "changePercent": Math.round((investmentAmount + (monthlyContribution * (seed * 12)) / investmentAmount)* 100) 
        },
        "totalReturns": {
            "value": investmentAmount*Math.round((estimatedReturn / 12) * 100),
            "changePercent": Math.round((estimatedReturn / 12) * seed * 100)
        },
        "riskLevel": {
            "value": expectedReturnMap[riskTolerance] * seed,
            "rating": 
        }
    }

    
    
    

}