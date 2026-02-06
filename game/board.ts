import { Tile } from './types';

export const BOARD_DATA: Tile[] = [
    // SIDE 1: The Foundation (Digital & Banking Hygiene)
    {
        id: 0,
        name: 'GO / 10th PASS',
        type: 'CORNER',
        lesson: 'Establishing identity & digital incentives.',
        description: 'Action: Collect monthly stipend. Choice: Cash (₹1000) OR Bank Transfer (₹1100).',
        price: 0
    },
    {
        id: 1,
        name: 'Aadhaar/PAN Link',
        type: 'PROPERTY',
        price: 60,
        color: '#9370DB', // Purple
        lesson: 'Importance of KYC documentation.',
        description: 'Action: Mini-game: Drag and drop correct ID proof.'
    },
    {
        id: 2,
        name: 'Dadi\'s Secret Stash',
        type: 'COMMUNITY',
        lesson: 'Physical cash vs. Digital safety.',
        description: 'Action: You find cash. Choice: Keep at home (risk theft) OR Deposit in Bank (safe).'
    },
    {
        id: 3,
        name: 'Phone Purchase',
        type: 'PROPERTY',
        price: 60,
        color: '#9370DB', // Purple
        lesson: 'Understanding the hidden cost of EMIs (Interest).',
        description: 'Choice: Buy latest model on EMI (Total ₹15k) OR Buy basic model (₹6k).'
    },
    {
        id: 4,
        name: 'Financial Tip',
        type: 'CHANCE',
        description: 'Did you know? Inflation eats your savings if kept as cash.',
        lesson: 'General Knowledge.'
    },
    {
        id: 5,
        name: 'Cycle Repair Shop',
        type: 'STATION',
        price: 500,
        lesson: 'Maintenance costs of assets.',
        description: 'Action: Pay ₹500 for repairs. Quiz Save option available.'
    },
    {
        id: 6,
        name: 'UPI Setup',
        type: 'PROPERTY',
        price: 100,
        color: '#87CEEB', // Light Blue
        lesson: 'Digital security hygiene.',
        description: 'Action: Simulate setting a strong 6-digit PIN.'
    },
    {
        id: 7,
        name: 'Friend Needs Money',
        type: 'CHANCE',
        lesson: 'Setting financial boundaries.',
        description: 'Scenario: Friend asks for ₹500 loan. Choice: Lend (Social Capital) OR Decline (Keep cash).'
    },
    {
        id: 8,
        name: 'Cyber Cafe',
        type: 'PROPERTY',
        price: 200,
        color: '#87CEEB', // Light Blue
        lesson: 'The cost of digital services.',
        description: 'Action: Pay ₹200 to fill an online form for an exam.'
    },
    {
        id: 9,
        name: 'Phishing Trap',
        type: 'PROPERTY',
        price: 120,
        color: '#87CEEB', // Light Blue
        lesson: 'Identifying common digital scams.',
        description: 'Action: fake "You won a lottery!" pop-up. Choice: Click Link (Lose ₹1000) OR Delete (Gain Knowledge).'
    },
    {
        id: 10,
        name: 'DEBT TRAP (Jail)',
        type: 'CORNER',
        lesson: 'Where bad financial decisions lead.',
        description: 'Condition: Just visiting.'
    },

    // SIDE 2: The Hustle (Earning & Skill Building)
    {
        id: 11,
        name: 'Skill Center (ITI)',
        type: 'PROPERTY',
        price: 3000,
        color: '#FF69B4', // Pink
        lesson: 'Investing in oneself increases earning potential.',
        description: 'Investment: Pay ₹3000. Reward: GO income increases by ₹500.'
    },
    {
        id: 12,
        name: 'Mobile Data Plan',
        type: 'UTILITY',
        price: 150,
        lesson: 'Smart consumer choices for recurring utilities.',
        description: 'Action: Choose a plan. Pick wrong -> Pay extra.'
    },
    {
        id: 13,
        name: 'Gig Economy Task',
        type: 'PROPERTY',
        price: 1500, // Earning potential
        color: '#FF69B4', // Pink
        lesson: 'Effort equals income.',
        description: 'Action: Complete 10s mini-game. Earn ₹1500.'
    },
    {
        id: 14,
        name: 'Tool Purchase',
        type: 'PROPERTY',
        price: 5000,
        color: '#FF69B4', // Pink
        lesson: 'Differentiating between expense and business asset.',
        description: 'Action: Buy an asset needed for work (₹5000).'
    },
    {
        id: 15,
        name: 'Shared Auto/Bus',
        type: 'STATION',
        price: 300,
        lesson: 'Daily commute costs.',
        description: 'Action: Pay daily commute cost ₹300. Quiz Save option available.'
    },
    {
        id: 16,
        name: 'Fake Job Offer',
        type: 'PROPERTY',
        price: 2000,
        color: '#FFA500', // Orange
        lesson: 'Recognizing employment scams.',
        description: 'Scenario: Agent asks ₹2000 fee. Choice: Pay (Lose) OR Report (Earn Knowledge).'
    },
    {
        id: 17,
        name: 'Govt Skill Grant',
        type: 'COMMUNITY',
        lesson: 'Utilizing available government support.',
        description: 'Action: Submit right document to claim ₹2000 grant.'
    },
    {
        id: 18,
        name: 'Apprenticeship',
        type: 'PROPERTY',
        price: 1000, // stipend
        color: '#FFA500', // Orange
        lesson: 'Value of experience over immediate high pay.',
        description: 'Income: Collect ₹1000. Low pay, but gain Experience Badge.'
    },
    {
        id: 19,
        name: 'Side Hustle',
        type: 'PROPERTY',
        price: 0,
        color: '#FFA500', // Orange
        lesson: 'Entrepreneurship.',
        description: 'Income: You sold goods online. Collect variable amount (roll dice).'
    },

    // SIDE 3: The Shield (Protection & Credit Understanding)
    {
        id: 20,
        name: 'VILLAGE SQUARE',
        type: 'CORNER',
        lesson: 'Safe zone. Education.',
        description: 'Action: Watch 30s video to earn "Credit Shield".'
    },
    {
        id: 21,
        name: 'Loan Shark',
        type: 'PROPERTY',
        price: 0,
        color: '#FF0000', // Red
        lesson: 'Avoiding predatory lending.',
        description: 'Action: Offer instant cash at 50% interest. Choice: Accept OR Reject.'
    },
    {
        id: 22,
        name: 'Medical Emergency',
        type: 'CHANCE',
        lesson: 'The critical importance of an emergency fund.',
        description: 'Scenario: Need ₹5000. Check: Do you have Emergency Fund? If yes, pay 0. Else pay ₹5000.'
    },
    {
        id: 23,
        name: 'Bank Loan',
        type: 'PROPERTY',
        price: 0,
        color: '#FF0000', // Red
        lesson: 'How formal credit works.',
        description: 'Action: Match Credit Score to get low-interest loan.'
    },
    {
        id: 24,
        name: 'Accident Guard',
        type: 'PROPERTY',
        price: 500,
        color: '#FF0000', // Red
        lesson: 'Small premiums protect against large losses.',
        description: 'Action: Pay premium ₹500. Benefit: Protects from future accidents.'
    },
    {
        id: 25,
        name: 'Fuel Price Hike',
        type: 'STATION',
        price: 800,
        lesson: 'Rising costs.',
        description: 'Expense: Pay ₹800. Quiz Save option available.'
    },
    {
        id: 26,
        name: 'Gold Loan',
        type: 'PROPERTY',
        price: 0,
        color: '#FFD700', // Yellow
        lesson: 'Using assets as collateral during a crisis.',
        description: 'Action: Pledge Gold for instant, low-interest cash.'
    },
    {
        id: 27,
        name: 'Credit Score',
        type: 'PROPERTY',
        price: 0,
        color: '#FFD700', // Yellow
        lesson: 'Good financial behavior has rewards.',
        description: 'Action: Paid bills on time? Receive "High CIBIL" bonus (+₹1000). Else fine.'
    },
    {
        id: 28,
        name: 'Clean Water',
        type: 'UTILITY',
        price: 400,
        lesson: 'Essential services.',
        description: 'Expense: Pay ₹400 for essential services.'
    },
    {
        id: 29,
        name: 'Wedding Inv',
        type: 'PROPERTY',
        price: 3000,
        color: '#FFD700', // Yellow
        lesson: 'Managing social obligations within budget.',
        description: 'Choice: Attend (Cost ₹3000) OR Regrets (Cost ₹500).'
    },

    // SIDE 4: The Growth (Assets & Future Planning)
    {
        id: 30,
        name: 'GO TO DEBT TRAP',
        type: 'CORNER',
        lesson: 'Consequences of bad debt.',
        description: 'Action: Go to Box 10. Pay 20% of cash to exit.'
    },
    {
        id: 31,
        name: 'Inflation Monster',
        type: 'PROPERTY',
        price: 0,
        color: '#008000', // Green
        lesson: 'Keeping cash idle means losing value.',
        description: 'Action: Cost of living up. Pay 10% of cash holding.'
    },
    {
        id: 32,
        name: 'Start RD',
        type: 'PROPERTY',
        price: 500,
        color: '#008000', // Green
        lesson: 'Disciplined, forced savings.',
        description: 'Action: Commit to pay ₹500 every GO. Lump sum after 5 rounds.'
    },
    {
        id: 33,
        name: 'Bumper Harvest',
        type: 'COMMUNITY',
        lesson: 'Don\'t blow it all at once.',
        description: 'Reward: One-time windfall gain of ₹5000.'
    },
    {
        id: 34,
        name: 'Buy House',
        type: 'PROPERTY',
        price: 0,
        color: '#008000', // Green
        lesson: 'Ultimate Goal.',
        description: 'Action: Requires large down payment + Bank Loan approval.'
    },
    {
        id: 35,
        name: 'Inter-City Travel',
        type: 'STATION',
        price: 1500,
        lesson: 'Career mobility costs.',
        description: 'Expense: Pay ₹1500 for travel to interview.'
    },
    {
        id: 36,
        name: 'Market Fluctuation',
        type: 'CHANCE',
        lesson: 'Understanding investment risk.',
        description: 'Scenario: Roll dice. Even = Value up. Odd = Value down.'
    },
    {
        id: 37,
        name: 'SHG Pool',
        type: 'PROPERTY',
        price: 1000,
        color: '#00008B', // Dark Blue
        lesson: 'Community financial resilience.',
        description: 'Action: Contribute ₹1000. Benefit: Pool pays for you in crisis.'
    },
    {
        id: 38,
        name: 'Why pay Tax?',
        type: 'TAX',
        price: 100,
        lesson: 'Civic duty and basic tax awareness.',
        description: 'Action: Pay small tax. Quiz Save: Answer to reduce payment.'
    },
    {
        id: 39,
        name: 'Fin Freedom',
        type: 'PROPERTY',
        price: 0,
        color: '#00008B', // Dark Blue
        lesson: 'Net Worth Calculation.',
        description: 'Action: (Assets + Savings) - Loans > 0 ? Win Star.'
    },
];
