export type CardAction = {
    label: string;
    action_id: string;
    ui_feedback: string;
    isWrong?: boolean;
};

export type CardType = 'DECISION' | 'INFO' | 'MINIGAME' | 'INPUT_FIELD';

export interface CardData {
    card_id: number;
    title: string;
    story: string;
    image_ref: string;
    type: CardType;
    choices: CardAction[];
}

export const CARD_CONFIG: Record<number, CardData> = {
    0: {
        card_id: 0,
        title: "Harvest Payday",
        story: "The monsoon harvest was bountiful. The village cooperative has finally released your payment of ₹5000. This money must last your family until the next season. The cooperative manager offers two ways to receive it.",
        image_ref: "payday_illustration",
        type: 'DECISION',
        choices: [
            { label: "Bank Transfer", action_id: "take_bank", ui_feedback: "Right! Moving money to the bank keeps it safe from the local thieves and village fires." },
            { label: "Cash in Hand", action_id: "take_cash", ui_feedback: "Wrong! Carrying cash home through the dark fields is risky. You lost some coins to a pickpocket! -₹500.", isWrong: true }
        ]
    },
    1: {
        card_id: 1,
        title: "The Banking Van",
        story: "A blue van from the city has arrived in the village square. It is a 'Bank on Wheels.' They are asking everyone to update their KYC records to ensure government grain subsidies reach their accounts. Many villagers are suspicious.",
        image_ref: "kyc_illustration",
        type: 'DECISION',
        choices: [
            { label: "Link Aadhaar", action_id: "kyc_success", ui_feedback: "Right! Your identity is now verified, ensuring you receive every rupee of govt support." },
            { label: "Ignore the Van", action_id: "ignore_kyc", ui_feedback: "Wrong! Without verification, you missed out on the farming subsidy! -₹500.", isWrong: true }
        ]
    },
    2: {
        card_id: 2,
        title: "The Buried Pot",
        story: "While digging a new irrigation channel, your shovel hits something hard. It's a rusted tin pot containing ₹2000 from your grandfather's time. The soil has kept it hidden for decades. What will you do with this ancestral gift?",
        image_ref: "treasure_illustration",
        type: 'DECISION',
        choices: [
            { label: "Deposit in Bank", action_id: "stash_bank", ui_feedback: "Right! The bank will protect this legacy and help it grow through interest." },
            { label: "Keep in House", action_id: "stash_home", ui_feedback: "Wrong! Keeping large amounts of cash at home invites danger. -₹500 as penalty for risk.", isWrong: true }
        ]
    },
    3: {
        card_id: 3,
        title: "Flash Sale in Town",
        story: "You traveled to the nearby town and saw a banner for a 'SuperPhone X.' It looks much better than your current phone with the cracked screen. The shopkeeper offers a flashy EMI plan that seems very cheap per month.",
        image_ref: "phone_illustration",
        type: 'DECISION',
        choices: [
            { label: "Pay Full Cash (₹6k)", action_id: "buy_cash", ui_feedback: "Right! You only spend what you have. No interest, no debt, no worries." },
            { label: "High Interest EMI", action_id: "buy_emi", ui_feedback: "Wrong! The low monthly cost hides a massive debt trap. -₹500 as interest penalty.", isWrong: true }
        ]
    },
    4: {
        card_id: 4,
        title: "Elder's Advice",
        story: "Old Man Hira, the village's oldest teacher, sits under the Banyan tree. He tells you that 'Money left idle is like grain left in the rain—it rots.' He is warning you about the rising prices of fertilizer and fuel (Inflation).",
        image_ref: "tip_illustration",
        type: 'DECISION',
        choices: [
            { label: "Invest in Bank", action_id: "stash_bank", ui_feedback: "Right! Putting money in assets or banks helps fight the rising cost of living." },
            { label: "Hide as Cash", action_id: "apply_inflation", ui_feedback: "Wrong! While you held the cash, its buying power vanished! -₹500 lost to inflation.", isWrong: true }
        ]
    },
    5: {
        card_id: 5,
        title: "Irrigation Crisis",
        story: "The motor of your borewell has suddenly stopped humming. Without water, your crops will wilt under the midday sun. The repairman from the town demands ₹500 to fix it immediately. It's an emergency.",
        image_ref: "repair_illustration",
        type: 'DECISION',
        choices: [
            { label: "Pay Repair Fee", action_id: "pay_repair", ui_feedback: "Right! Protecting your crops is your first duty. The water flows again!" },
            { label: "Try Fake Fix", action_id: "repair_fail", ui_feedback: "Wrong! Your 'jugaad' failed and the pump burned out! -₹500 extra for parts.", isWrong: true }
        ]
    },
    6: {
        card_id: 6,
        title: "The Digital Key",
        story: "To use the new govt payment app, you must set a 6-digit Secret PIN. A neighbor suggests using your birthday because it's easy to remember. But you know that a weak key invites the village pranksters or worse.",
        image_ref: "upi_illustration",
        type: 'MINIGAME',
        choices: []
    },
    7: {
        card_id: 7,
        title: "Raju's Wedding",
        story: "Your friend Raju from the neighboring farm is at your doorstep. His daughter is getting married, and he is short of ₹500 for the decorations.",
        image_ref: "friend_illustration",
        type: 'DECISION',
        choices: [
            { label: "Politely Decline", action_id: "decline_lend", ui_feedback: "Right! You must secure your own family's survival before lending." },
            { label: "Lend Money", action_id: "lend_money", ui_feedback: "Wrong! Raju couldn't pay back, and now your own family is short. -₹500.", isWrong: true }
        ]
    },
    8: {
        card_id: 8,
        title: "Agricultural Exam",
        story: "The District Cyber Cafe has a notice: 'Applications open for Agricultural Officer.' This job would mean a steady salary for your family. The fee is ₹200, but the deadline is tomorrow. This is your chance to escape manual labor.",
        image_ref: "cafe_illustration",
        type: 'DECISION',
        choices: [
            { label: "Pay Fee & Apply", action_id: "pay_service", ui_feedback: "Right! You've taken the first step toward a bright digital future for your lineage." },
            { label: "Save the ₹200", action_id: "ignore_asset_fail", ui_feedback: "Wrong! You saved a small coin but lost a massive opportunity. -₹500 for lost potential.", isWrong: true }
        ]
    },
    9: {
        card_id: 9,
        title: "The Magic Link",
        story: "A stranger on a motorcycle stops you. He shows you a message on his phone: 'YOU HAVE WON 1 CRORE IN GOVT LOTTERY!' He says if you just click the link and pay a small 'processing fee,' you will be a millionaire.",
        image_ref: "scam_illustration",
        type: 'MINIGAME',
        choices: []
    },
    10: {
        card_id: 10,
        title: "The Sahukar's Trap",
        story: "You took a loan from the local moneylender (Sahukar) instead of the bank. Now his men are outside your hut, demanding three times the amount. You are stuck in his 'Debt Trap.' You must spend a day in quiet reflection to find a way out.",
        image_ref: "jail_illustration",
        type: 'DECISION',
        choices: [
            { label: "Reflect & Repay", action_id: "visit_jail", ui_feedback: "Right! You have learned the bitter cost of unorganized credit." },
            { label: "Argue with Sahukar", action_id: "jail_argue", ui_feedback: "Wrong! Your anger only made him increase the fine. -₹500.", isWrong: true }
        ]
    },
    11: {
        card_id: 11,
        title: "The Tractor Workshop",
        story: "The new community center is holding a workshop on modern tractor maintenance. Knowing how to fix your own machine could save you thousands in city repair bills. The registration fee is ₹3000.",
        image_ref: "skill_center_illustration",
        type: 'DECISION',
        choices: [
            { label: "Enroll in Class", action_id: "enroll_skill", ui_feedback: "Right! Learning a technical skill is the best way to cut your future farming costs." },
            { label: "Stay at Home", action_id: "ignore_asset_fail", ui_feedback: "Wrong! You passed on critical knowledge and will stay dependent on expensive mechanics. -₹500.", isWrong: true }
        ]
    },
    12: {
        card_id: 12,
        title: "Market Price Check",
        story: "Your phone's internet data has expired. Without it, you can't check the current grain prices at the city Mandi. A local dealer offers to buy your crop cheap. Will you recharge and check the real prices?",
        image_ref: "recharge_illustration",
        type: 'DECISION',
        choices: [
            { label: "Data Recharge (₹300)", action_id: "sub_basic", ui_feedback: "Right! Information is wealth. You saw the prices were actually higher!" },
            { label: "Watch Movies (₹800)", action_id: "sub_premium", ui_feedback: "Wrong! You wasted limited cash on entertainment while your business suffered. -₹500.", isWrong: true }
        ]
    },
    13: {
        card_id: 13,
        title: "Mandi Hauling Gig",
        story: "Hard labor brings hard cash. Help the village haul the harvest to the Mandi truck. Success brings ₹1500, but laziness costs you the day's wage.",
        image_ref: "gig_task_illustration",
        type: 'MINIGAME',
        choices: []
    },
    14: {
        card_id: 14,
        title: "The Community Harvester",
        story: "A cooperative is selling a refurbished harvesting machine. It's expensive (₹5000), but it would allow you to harvest twice as fast and rent it out to others. It's a huge decision for your small farm.",
        image_ref: "laptop_illustration",
        type: 'DECISION',
        choices: [
            { label: "Buy Harvester", action_id: "buy_asset_laptop", ui_feedback: "Right! You now own a productive asset that will pay for itself in two seasons." },
            { label: "Buy Fancy Clothes", action_id: "ignore_asset_fail", ui_feedback: "Wrong! You wasted your savings on appearance instead of productivity. -₹500.", isWrong: true }
        ]
    },
    15: {
        card_id: 15,
        title: "The Milk Coop Pass",
        story: "You need to transport your milk to the cooperative every morning. A monthly transport pass is cheaper (₹300), but buying daily tickets feels easier right now. Which farmer are you?",
        image_ref: "bus_pass_illustration",
        type: 'DECISION',
        choices: [
            { label: "Monthly Pass (₹300)", action_id: "pay_commute", ui_feedback: "Right! Planning your transport budget is the first step to successful trade." },
            { label: "Pay Daily (High)", action_id: "pay_inflation_penalty", ui_feedback: "Wrong! Those daily small costs added up to a big loss. -₹500.", isWrong: true }
        ]
    },
    16: {
        card_id: 16,
        title: "Predatory Agent",
        story: "A well-dressed man at the tea stall claims to be a govt agent. He says he can get you a 'special' tractor loan if you pay him ₹2000 under the table. He seems very convincing and knows all the bank names.",
        image_ref: "scam_agent_illustration",
        type: 'MINIGAME',
        choices: []
    },
    17: {
        card_id: 17,
        title: "The PM-Kisan Grant",
        story: "The government grant of ₹2000 is waiting. Submit your verified ID to the Panchayat officer to claim your support.",
        image_ref: "grant_illustration",
        type: 'MINIGAME',
        choices: []
    },
    18: {
        card_id: 18,
        title: "Dairy Internship",
        story: "The large dairy plant in the town offers an 'Apprentice' role. The pay is low today, but you'll get a certificate that lets you become a Quality Manager later. Will you take the trade?",
        image_ref: "internship_illustration",
        type: 'DECISION',
        choices: [
            { label: "Accept Training", action_id: "accept_internship", ui_feedback: "Right! You are building the foundation for a life outside the fields." },
            { label: "Reject (Want Cash)", action_id: "reject_internship_fail", ui_feedback: "Wrong! You chose a quick dollar over a lasting career. -₹500.", isWrong: true }
        ]
    },
    19: {
        card_id: 19,
        title: "Soil Testing Project",
        story: "If you have your Harvester/Device, you can help the village council digitize the new soil health records for a major fee. If not, you'll have to watch others get paid.",
        image_ref: "project_illustration",
        type: 'DECISION',
        choices: [
            { label: "Run Soil Tests", action_id: "check_asset_hustle", ui_feedback: "Right! Your harvester's digital tools just earned you a windfall!" },
            { label: "No Equipment", action_id: "ignore_asset_fail", ui_feedback: "Wrong! Your lack of modern tools cost you the biggest gig of the season. -₹500.", isWrong: true }
        ]
    },
    20: {
        card_id: 20,
        title: "Panchayat Education",
        story: "The Panchayat is showing a film about 'The Silent Sharks'—predatory lenders who use high interest to steal land. Will you join the screening or go to the village fair instead?",
        image_ref: "credit_shield_illustration",
        type: 'DECISION',
        choices: [
            { label: "Join Screening", action_id: "watch_video_shield", ui_feedback: "Right! You now have the knowledge to protect your ancestral land from sharks." },
            { label: "Go to Fair", action_id: "skip_video_fail", ui_feedback: "Wrong! You had fun, but you remain vulnerable to the shadows. -₹500.", isWrong: true }
        ]
    },
    21: {
        card_id: 21,
        title: "The Sahukar's Trap",
        story: "You need cash for seeds. The village Sahukar (moneylender) offers ₹5000 instantly with no paperwork, but the interest is a massive 5% per month.",
        image_ref: "loan_shark_illustration",
        type: 'DECISION',
        choices: [
            { label: "Reject Sahukar", action_id: "report_scam", ui_feedback: "Right! Predatory loans are the fastest way to lose your land." },
            { label: "Take the Cash", action_id: "take_shark_loan", ui_feedback: "Wrong! You are now trapped in a cycle of high-interest debt. -₹500.", isWrong: true }
        ]
    },
    22: {
        card_id: 22,
        title: "Medical Crisis",
        story: "A family member has fallen ill with fever. You need ₹5000 for treatment. If you have insurance or an emergency fund, you are safe.",
        image_ref: "medical_emergency_illustration",
        type: 'DECISION',
        choices: [
            { label: "Use Safety Net", action_id: "check_emergency_fund", ui_feedback: "Right! Your planning saved your family and your wallet." },
            { label: "No Savings", action_id: "ignore_asset_fail", ui_feedback: "Wrong! Without savings, you had to borrow at a loss. -₹500.", isWrong: true }
        ]
    },
    23: {
        card_id: 23,
        title: "Kisan Credit Card",
        story: "The local bank is processing KCC (Kisan Credit Card) applications. This provides low-interest loans for farmers. Will you apply or stick to informal borrowing?",
        image_ref: "bank_loan_illustration",
        type: 'DECISION',
        choices: [
            { label: "Apply for KCC", action_id: "apply_bank_loan", ui_feedback: "Right! Formal credit is the key to sustainable farming growth." },
            { label: "Skip (Too much paper)", action_id: "ignore_kyc_fail", ui_feedback: "Wrong! You missed out on the cheapest capital available. -₹500.", isWrong: true }
        ]
    },
    24: {
        card_id: 24,
        title: "Crop Insurance (PMFBY)",
        story: "The monsoons are unpredictable this year. For just ₹500, you can insure your entire harvest under the Govt scheme.",
        image_ref: "insurance_illustration",
        type: 'DECISION',
        choices: [
            { label: "Buy Insurance", action_id: "buy_insurance", ui_feedback: "Right! Peace of mind is worth every rupee in farming." },
            { label: "Safe Without It", action_id: "ignore_asset_fail", ui_feedback: "Wrong! One bad storm could ruin your entire year's work. -₹500.", isWrong: true }
        ]
    },
    25: {
        card_id: 25,
        title: "Fertilizer Price Hike",
        story: "Prices for chemical urea have shot up. The Cooperative suggests a quiz on organic compost to help you save ₹800 on costs.",
        image_ref: "fuel_price_illustration",
        type: 'MINIGAME',
        choices: []
    },
    26: {
        card_id: 26,
        title: "The Family Gold",
        story: "You need 3000 for harvester repairs. Will you take a formal Gold Loan at the bank or sell a small piece to the local jeweler?",
        image_ref: "gold_loan_illustration",
        type: 'DECISION',
        choices: [
            { label: "Bank Gold Loan", action_id: "pledge_gold", ui_feedback: "Right! You get the cash and keep your asset safe at low interest." },
            { label: "Sell cheap to Jeweler", action_id: "ignore_asset_fail", ui_feedback: "Wrong! You sold an appreciating asset for a quick loss. -₹500.", isWrong: true }
        ]
    },
    27: {
        card_id: 27,
        title: "Electricity Bill",
        story: "The tube-well electricity bill is due. Paying on time through the new mobile app builds your credit score (CIBIL).",
        image_ref: "cibil_score_illustration",
        type: 'MINIGAME',
        choices: []
    },
    28: {
        card_id: 28,
        title: "Water Contamination",
        story: "The village well water has turned brackish. Using a water filter (₹400) can prevent medicine bills next month.",
        image_ref: "utility_bill_illustration",
        type: 'DECISION',
        choices: [
            { label: "Buy Filter (₹400)", action_id: "pay_utility", ui_feedback: "Right! Prevention is cheaper than the hospital bill." },
            { label: "Drink as is", action_id: "ignore_asset_fail", ui_feedback: "Wrong! You got sick and spent ₹1000 on medicines. -₹500 penalty.", isWrong: true }
        ]
    },
    29: {
        card_id: 29,
        title: "Village Wedding",
        story: "Social pressure is high to spend ₹3000 on a big wedding gift. Should you stay within budget or borrow to look 'grand'?",
        image_ref: "wedding_inv_illustration",
        type: 'DECISION',
        choices: [
            { label: "Simple Gift (₹500)", action_id: "gift_cheap", ui_feedback: "Right! True friends understand financial discipline." },
            { label: "Borrow for Grand Gift", action_id: "gift_expensive", ui_feedback: "Wrong! Borrowing for social status is a path to ruin. -₹500.", isWrong: true }
        ]
    },
    30: {
        card_id: 30,
        title: "The Debt Cycle",
        story: "Your informal loans are piling up. The shadows of the Debt Trap are closing in. You must decide your escape path.",
        image_ref: "jail_illustration",
        type: 'DECISION',
        choices: [
            { label: "Debt Restructuring", action_id: "pay_debt_penalty", ui_feedback: "Right! Admitting the problem and paying the penalty is the first step out." },
            { label: "Argue with Lender", action_id: "jail_argue", ui_feedback: "Wrong! Defiance won't solve the math. The debt trap tightens. -₹500.", isWrong: true }
        ]
    },
    31: {
        card_id: 31,
        title: "The Price Hike",
        story: "The price of diesel and seeds has surged. If you kept your money in cash, its value has dropped. Will you invest in a grain silo or keep cash?",
        image_ref: "inflation_illustration",
        type: 'DECISION',
        choices: [
            { label: "Buy Grain Silo", action_id: "apply_inflation", ui_feedback: "Right! physical assets protect your wealth from rising prices." },
            { label: "Keep Under Mattress", action_id: "ignore_asset_fail", ui_feedback: "Wrong! Inflation ate your buying power while you slept. -₹500.", isWrong: true }
        ]
    },
    32: {
        card_id: 32,
        title: "Post Office Savings",
        story: "The Post Office offers a Recurring Deposit (RD). Contributing ₹500 every month builds a large lump sum. Will you set your PIN to start?",
        image_ref: "rd_illustration",
        type: 'MINIGAME',
        choices: []
    },
    33: {
        card_id: 33,
        title: "The Golden Grain",
        story: "It's a bumper harvest! You've earned a massive ₹5000 windfall. The village celebrates. Should you reinvest in soil health or throw a grand feast?",
        image_ref: "harvest_bonus_illustration",
        type: 'DECISION',
        choices: [
            { label: "Reinvest in Soil", action_id: "invest_windfall", ui_feedback: "Right! Prosperous farmers invest in their future harvests." },
            { label: "Grand Feast", action_id: "keep_windfall", ui_feedback: "Wrong! You spent your windfall on one night while the soil stayed hungry. -₹500.", isWrong: true }
        ]
    },
    34: {
        card_id: 34,
        title: "The Ancestral Home",
        story: "Your family home needs a new roof. It costs ₹5000. Do you have the savings, or will you take a high-interest loan?",
        image_ref: "house_illustration",
        type: 'DECISION',
        choices: [
            { label: "Repair with Savings", action_id: "buy_house_check", ui_feedback: "Right! Avoiding debt for maintenance is the mark of a wise owner." },
            { label: "Borrow at 20%", action_id: "ignore_asset_fail", ui_feedback: "Wrong! borrowing for maintenance without a plan is risky. -₹500.", isWrong: true }
        ]
    },
    35: {
        card_id: 35,
        title: "The Job Fair Trip",
        story: "A major job fair is happening in the big city. Travel costs ₹1500. Will you take a quiz on travel budgets to win a discount?",
        image_ref: "travel_illustration",
        type: 'MINIGAME',
        choices: []
    },
    36: {
        card_id: 36,
        title: "Crop Price Gamble",
        story: "The market prices are fluctuating wildly. Will you sell your crop now or roll the dice to wait for a better price?",
        image_ref: "market_risk_illustration",
        type: 'MINIGAME',
        choices: []
    },
    37: {
        card_id: 37,
        title: "Bachhat Gat Meeting",
        story: "The SHG (Self Help Group) meeting is here. Contributing ₹1000 builds collective strength. Will you join the pool?",
        image_ref: "shg_illustration",
        type: 'DECISION',
        choices: [
            { label: "Join the SHG", action_id: "join_shg", ui_feedback: "Right! Collective saving is the village's strongest shield." },
            { label: "Save Alone", action_id: "ignore_asset_fail", ui_feedback: "Wrong! Isolated farmers have no one to catch them when they fall. -₹500.", isWrong: true }
        ]
    },
    38: {
        card_id: 38,
        title: "Panchayat Duty",
        story: "The village council needs its development tax for new roads. Will you answer a fiscal quiz to see if you can get a rebate?",
        image_ref: "tax_illustration",
        type: 'MINIGAME',
        choices: []
    },
    39: {
        card_id: 39,
        title: "Financial Freedom",
        story: "The journey is long, but your net worth is growing. If your assets minus your loans are positive, you have earned your stripes.",
        image_ref: "freedom_illustration",
        type: 'DECISION',
        choices: [
            { label: "Calculate Net Worth", action_id: "calc_net_worth", ui_feedback: "Right! Knowing your true value is the final step to freedom." },
            { label: "Ignore the Math", action_id: "ignore_asset_fail", ui_feedback: "Wrong! Blissful ignorance won't pay the bills. -₹500.", isWrong: true }
        ]
    }
};
