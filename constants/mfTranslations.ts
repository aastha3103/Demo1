export const MF_TRANSLATIONS: Record<string, any> = {
    en: {
        common: {
            back: "Back",
            next: "Next",
            start: "Start",
            finish: "Finish",
            loading: "Loading...",
            error: "Error",
            success: "Success",
            cancel: "Cancel",
            confirm: "Confirm",
            continue: "Continue",
            gotIt: "Got it",
            lakhs: "Lakhs",
            crores: "Crores",
            min: "min",
            completed: "Completed",
            premium: "Premium",
            en: "English",
            hi: "Hindi"
        },
        learnMode: {
            finish: "Finish Lesson",
            continue: "Continue",
            cardProgress: "Card {current} of {total}",
        },
        entry: {
            title: "Wealth Builder Lab",
            subtitle: "20+ Lessons to build your wealth",
            startLearning: "Start Learning",
            branding: "FinLearn",
            reassurance: "No real money involved",
        },
        tabs: {
            home: "Home",
            explore: "Explore",
            calculator: "Calculator",
            learn: "Learn",
        },
        explore: {
            title: "Learning Hub",
            subtitle: "20 Essential Wellness Lessons",
            bannerTitle: "Plan your harvest",
            bannerDesc: "Completed lessons help you unlock new simulation levels!",
            practiceButton: "Practice Simulation 🚀",
        },
        home: {
            greeting: "Start Building Wealth! 👋",
            title: "Learning Center",
            overallProgress: "Overall Wisdom Progress",
            lessonsMastered: "{current} of {total} lessons mastered",
            categories: {
                all: "All",
                basics: "Basics",
                concepts: "Concepts",
                growth: "Growth",
                risks: "Risks",
                equity: "Equity"
            },
            lessonHeader: "{category} Lessons",
            available: "{count} available",
            cardsInLesson: "{count} cards in this lesson",
            completed: "Completed ✓",
            practiceTitle: "Practice What You Learn",
            practiceText: "Ready to grow your money? Try the Wealth Simulator and see your investments multiply!",
        },
        calculator: {
            title: "Wealth Calculator",
            subtitle: "Plan your future with precision",
            maturityLabel: "ESTIMATED MATURITY VALUE",
            totalInvested: "TOTAL INVESTED",
            estProfit: "EST. PROFIT",
            returnLabel: "{percent}% Return",
            sip: "SIP",
            lumpsum: "Lump sum",
            monthlyLabel: "Monthly Investment Amount",
            onetimeLabel: "One-time Investment Amount",
            periodLabel: "Time Period (Years)",
            expectedReturn: "Expected Return (%)",
            investorInsight: "Investor Insight",
            insightText: "Increasing your {type} by just 10% every year can lead to a significantly higher maturity amount due to the power of compounding.",
        },
        simulator: {
            title: "SIP Simulator",
            subtitle: "See the power of time",
            monthlySIP: "Monthly SIP",
            oneTime: "One-time",
            timeHorizon: "Time Horizon",
            calculate: "Calculate",
            invested: "Invested",
            became: "It Became",
            growth: "Your money grew by",
            practiceAmount: "PRACTICE AMOUNT",
            demoBudget: "🎮 Demo Budget",
            simulatedUsage: "Simulated Usage",
            allocatedLabel: "{percent}% Allocated",
            remainingLabel: "₹{amount} remaining",
            overBudget: "Over Budget",
            simulationOutcome: "Simulation Outcome",
            totalInvested: "Total Invested",
            maturityValue: "Maturity Value",
            live: "LIVE",
            estProfit: "ESTIMATED PROFIT",
            tempDip: "TEMPORARY DIP",
            growthTrend: "Wealth Growth Trend",
            keyHighlights: "Key Highlights",
            addNewFund: "Add New Fund",
            fundsCount: "{current}/{max} funds",
            editErrorBudget: "Amount exceeds wallet balance",
            editErrorInvalid: "Invalid amount",
            profileTitle: "User Profile & Income",
            profileSubtitle: "Income can vary by profile. Update yours to see custom guidance.",
            profiles: {
                student: "Student",
                job: "Job",
                business: "Business",
                custom: "Custom"
            },
            monthlyIncomeLabel: "Monthly Income",
            suggestedNote: "Suggested: 10-30% of this should go to SIP",
            portfolioTitle: "Your SIP Portfolio",
            reset: "Reset",
            monthlyTotal: "Monthly investment: ₹{amount}",
            tipTitle: "Tip",
            pauseTip: "Pausing a SIP doesn't sell your investment. It just stops new monthly additions temporarily.",
            analyzeCTA: "Analyze My Portfolio 📊",
            footerTitle: "Keep Learning",
            footerText: "Want to understand how your money grows? Explore more lessons.",
            viewLessons: "View Lessons",
            updateInvestment: "Update Investment",
            changeSipAmount: "Change your monthly SIP amount",
            sipAmountLabel: "SIP Amount (₹)",
            applyChange: "Apply Change",
            saveChanges: "Save Changes",
            cancel: "Cancel",
            guidance: {
                start: "💡 Start with ₹{min} - ₹{max}/month (10-30% of income).",
                low: "💡 You're investing {percent}% of income. Consider increasing to at least 10% (₹{min}/month) for better growth.",
                high: "⚠️ You're investing {percent}% of income. This exceeds the recommended 30%. Ensure you have sufficient funds for emergencies and expenses.",
                good: "✅ Great! You're investing {percent}% of income — within the healthy 10-30% range."
            },
            marketStatus: {
                positive: "📈 Markets are doing well! Your investments are growing steadily. This is normal — stay patient.",
                neutral: "📊 Markets are calm today. Small ups and downs are normal. Keep investing regularly.",
                negative: "📉 Markets dipped a little. Don't worry — this is temporary. SIP helps you buy more when prices are low.",
            },
            placeholder: "e.g. {value}"
        },
        insights: {
            title: "Your Insights",
            subtitle: "See how your simulation went",
            tabs: {
                growth: "Growth",
                compare: "Compare",
                behavior: "Behavior",
            },
            summary: {
                invested: "You Invested",
                became: "It Became",
                growthHighlight: "Your money grew by",
                growthNote: "That's almost 2x your investment! 🎉",
            },
            growth: {
                chartTitle: "📊 Your 10-Year Journey",
                explanationTitle: "🌱 What happened here?",
                explanationText: "Your monthly SIP kept growing because of compounding — your returns started earning their own returns! The longer you stay invested, the faster this growth becomes.",
            },
            compare: {
                sipVsLumpsum: "📊 SIP vs One-Time Investment",
                sipVsLumpsumSub: "What if you invested ₹60,000 all at once vs ₹5,000 monthly?",
                earlyVsLate: "⏰ The Power of Starting Early",
                earlyVsLateSub: "Same ₹5,000/month, but starting 10 years apart",
                takeawayTitle: "Key Takeaway",
                takeawayText: "Don't wait to start. Don't try to time the market. Just start and stay consistent — that's the real secret to building wealth.",
            },
            behavior: {
                title: "Your Investor Journey",
                subtitle: "Here's how you did in the simulation. Remember, there's no right or wrong — it's all about learning!",
                wisdomTitle: "📖 Words of Wisdom",
                wisdomQuote: "\"The stock market is a device for transferring money from the impatient to the patient.\"",
                wisdomAuthor: "— Warren Buffett",
                consistency: {
                    title: "Consistency",
                    value: "{invested} of {total} months invested",
                    feedback: "Great job staying consistent! Regular investing, even small amounts, builds wealth over time.",
                },
                pause: {
                    title: "Pause Usage",
                    value: "{count} fund paused briefly",
                    feedback: "You paused once — that's okay! Life happens. The key is that you resumed. That shows commitment.",
                },
                marketDips: {
                    title: "Market Dips",
                    value: "Stayed invested during {count} dips",
                    feedback: "You didn't panic during market dips. That's exactly what successful long-term investors do!",
                },
                learning: {
                    title: "Learning",
                    value: "{count} lessons completed",
                    feedback: "You're building knowledge alongside wealth. Understanding what you're doing makes you a confident investor.",
                }
            },
            cta: {
                back: "Return to FinLearn",
                hint: "Continue your learning journey 🚀",
            }
        },
        lessons: {
            l1: {
                title: "The Seed & The Tree",
                shortDesc: "How small amounts grow into big wealth.",
                cards: [
                    { title: "Small Starts", desc: "Just like a huge Banyan tree starts from a tiny seed, your wealth starts with a small monthly amount." },
                    { title: "Regular Watering", desc: "If you water a plant once a year, it dies. If you water it every day, it thrives. SIP is regular watering for your money." },
                    { title: "Time is Magic", desc: "A tree takes years to grow. Similarly, money needs time to show its true power. Patience is your best friend in building wealth." },
                    { title: "Weathering Storms", desc: "Trees face rain and wind but stay rooted. Markets will go up and down, but stay invested to see the fruit of your labor." },
                    { title: "The Fruit of Labor", desc: "Eventually, the tree gives shade and fruit. Your investments will eventually provide for your family’s big needs." },
                    { title: "Rural Wisdom", desc: "Think of SIP like a \"Grain Bank\". You put a handful of grain aside every harvest; by the end of the year, you have a full sack for emergencies." }
                ]
            },
            l2: {
                title: "Mutual Funds: The Village Pool",
                shortDesc: "How people come together to invest.",
                cards: [
                    { title: "Coming Together", desc: "A Mutual Fund is like a village committee where everyone contributes a little money into a common pool." },
                    { title: "The Expert Head", desc: "Just as a village elder manages the community fund, a \"Fund Manager\" manages this pooled money professionally." },
                    { title: "Many Paths", desc: "The money isn't put in one place. It's spread across many big companies to reduce risk and maximize growth." },
                    { title: "Small Entry", desc: "You don't need thousands of rupees. You can start with as little as ₹500, just like everyone else in the group." },
                    { title: "Transparency", desc: "You can see exactly where your money is going, just like a clear village account book maintained by the elder." },
                    { title: "Rural Wisdom", desc: "It's like \"Bachat Gat\" (Self Help Groups). When people pool their small savings, they can afford bigger things that one person couldn't." }
                ]
            },
            l3: {
                title: "The Silent Thief (Inflation)",
                shortDesc: "Why keeping cash under the mattress is risky.",
                cards: [
                    { title: "The Hidden Robber", desc: "There is a thief called \"Inflation\". It doesn't steal your notes, it steals what those notes can buy over time." },
                    { title: "Price Hikes", desc: "Remember when a cup of tea was ₹2? Now it is ₹10. That is the thief (Inflation) at work in our daily lives." },
                    { title: "Cash Loses Power", desc: "If you keep ₹1000 in a box today, 10 years later it might only buy what ₹500 buys today. It loses its value." },
                    { title: "Growing Faster", desc: "To beat this thief, your money must grow faster than the prices of goods are rising every year." },
                    { title: "The Solution", desc: "Investing in Mutual Funds helps your money grow at a pace that keeps you ahead of rising costs and inflation." },
                    { title: "Rural Wisdom", desc: "Think of 10 years ago. One goat cost much less than it does today. If you saved only cash, you can't buy that same goat now!" }
                ]
            },
            l4: {
                title: "Compounding: The Magic Pot",
                shortDesc: "Watching your money earn its own money.",
                cards: [
                    { title: "The Magic Pot", desc: "Compounding is like a magic pot. You put one coin in, it becomes two. Those two then make four on their own!" },
                    { title: "Earnings on Earnings", desc: "You don't just earn profit on your original money, but also on the profit you already made previously. It adds up!" },
                    { title: "Slow then Fast", desc: "In the first few years, it looks slow. But after 10-15 years, it starts growing very rapidly like a downhill snowball." },
                    { title: "Don't Disturb", desc: "The magic only works if you don't take the money out too early. Let it sit and cook until it is ready." },
                    { title: "The Snowball", desc: "It's like a small ball of snow rolling down a mountain. It picks up more snow and gets bigger and bigger as it goes." },
                    { title: "Rural Wisdom", desc: "It's like a cow giving birth to a calf. Then that calf grows up and gives birth to another calf. Soon, you have a whole herd!" }
                ]
            },
            l5: {
                title: "Goal: Child's Education",
                shortDesc: "Planning for your children's bright future.",
                cards: [
                    { title: "Big Dreams", desc: "Every parent wants their child to be a doctor, engineer, or officer. But quality college education is expensive." },
                    { title: "The Cost Trap", desc: "A degree that costs ₹5 Lakhs today will likely cost ₹15 Lakhs by the time your young child is 18." },
                    { title: "Starting Small", desc: "If you start a SIP when the child is born, you only need to save a little every month to reach that big goal." },
                    { title: "The Power of 18 Years", desc: "With 18 years of growth, your small monthly steps can become a massive fund that pays for everything." },
                    { title: "Stay Disciplined", desc: "Don't use this specific money for other things. Keep it strictly for their future and their dreams." },
                    { title: "Rural Wisdom", desc: "It's like planting a fruit orchard when your child is born. By the time they are adults, the trees are ready to bear fruit." }
                ]
            },
            l6: {
                title: "Goal: Worry-free Marriage",
                shortDesc: "Saving for the big family celebration.",
                cards: [
                    { title: "Family Pride", desc: "A wedding is a moment of great joy, but it can also be a heavy burden if not planned years in advance." },
                    { title: "Avoid Loans", desc: "Most people take high-interest loans for weddings. This puts them in debt for many years after the event." },
                    { title: "SIP is the Answer", desc: "Instead of paying interest to a moneylender later, start a SIP now and let the market pay you interest!" },
                    { title: "Small Steps", desc: "Even ₹1,000 a month for 10 years can grow to a significant amount for jewelry, clothes, and catering." },
                    { title: "Compound Help", desc: "Let the growth of your investments help you pay for the grand wedding expenses without any stress." },
                    { title: "Rural Wisdom", desc: "It's like buying one small piece of gold every year so that there's no pressure at the time of the wedding." }
                ]
            },
            l7: {
                title: "The Risk Myth: Is it Gambling?",
                shortDesc: "Understanding the reality of market risk.",
                cards: [
                    { title: "Safe vs Risky", desc: "Many people think the market is like gambling. But gambling is pure chance; investing is participating in growth." },
                    { title: "Big Companies", desc: "Mutual funds invest in companies like Tata, Reliance, and Banks. These companies grow as India grows." },
                    { title: "Ups and Downs", desc: "Yes, prices go up and down daily. But over 5-10 years, the direction of growth is usually upwards." },
                    { title: "Safety in Numbers", desc: "Since your money is in 50+ different companies, even if one fails, the others keep your overall money safe." },
                    { title: "Your Control", desc: "You can stop or withdraw your money whenever you want. You are always in the driver's seat of your wealth." },
                    { title: "Rural Wisdom", desc: "It's like the Monsoon. Some years it's too much rain, some years too little. But over long years, the farm provides." }
                ]
            },
            l8: {
                title: "SIP vs Fixed Deposit (FD)",
                shortDesc: "Why FD is not enough for building wealth.",
                cards: [
                    { title: "The Old Way", desc: "Fixed Deposits are safe and familiar. But today, the returns they give are very low after taxes." },
                    { title: "Inflation Trap", desc: "If FD gives 6% and prices rise by 6% (Inflation), you are actually making ZERO real profit on your money!" },
                    { title: "Wealth Gap", desc: "Over 10 years, a well-chosen SIP can grow significantly more than a traditional bank fixed deposit." },
                    { title: "Flexibility", desc: "Unlike FD, SIP lets you invest small amounts monthly, making it easier for people with regular monthly income." },
                    { title: "Tax Benefits", desc: "Some special mutual funds also help you save on income tax, something standard FDs often don't offer." },
                    { title: "Rural Wisdom", desc: "FD is like keeping your grain in a dry room. SIP is like planting that same grain in a fertile field to multiply." }
                ]
            },
            l9: {
                title: "SIP vs Gold: Changing Habits",
                shortDesc: "Is jewelry the only way to save for Indians?",
                cards: [
                    { title: "The Gold Love", desc: "Indians love gold. It is beautiful and feels safe. But it has its own problems like storage and purity." },
                    { title: "Safety Issues", desc: "Storing gold at home is very risky. It can be stolen or lost. Mutual funds are digital and perfectly safe." },
                    { title: "Purity & Waste", desc: "When you sell jewelry, you lose money on making charges and purity. You have no such \"wastage\" in a SIP." },
                    { title: "Growth Factor", desc: "Historically, well-managed equity mutual funds have often outperformed gold price growth over long periods." },
                    { title: "No Storage Cost", desc: "You don't need a bank locker for mutual funds. It costs zero rupees to keep them safe in your digital folio." },
                    { title: "Rural Wisdom", desc: "Gold is like keeping a cow that doesn't give milk but its skin is valuable. SIP is like a cow that gives milk every day." }
                ]
            },
            l10: {
                title: "The Emergency Fund: Safety Net",
                shortDesc: "Preparing for life's unexpected surprises.",
                cards: [
                    { title: "Life Happens", desc: "Suddenly the tractor breaks, or a family member falls ill. You need cash immediately without warning." },
                    { title: "Don't Break SIP", desc: "If you don't have emergency cash, you will be forced to stop your long-term SIP and lose future growth." },
                    { title: "The 6-Month Rule", desc: "A good rule is to keep 6 months of your basic expenses in a simple savings account first as a buffer." },
                    { title: "Stay Calm", desc: "Knowing you have emergency cash allows you to keep your SIP running even during tough months." },
                    { title: "Liquid Funds", desc: "You can even use special mutual funds called \"Liquid Funds\" that are very safe and can be withdrawn quickly." },
                    { title: "Rural Wisdom", desc: "It's like keeping a separate pile of hay for the summer. You don't touch it until the fresh grass is completely gone." }
                ]
            },
            l11: {
                title: "Diversification: The Thali Principle",
                shortDesc: "Why you should never put all eggs in one basket.",
                cards: [
                    { title: "One is Risky", desc: "If you put all your money in just one company and it fails, you could lose everything overnight." },
                    { title: "The Power of Many", desc: "Mutual funds invest in 50-100 different companies. This powerful shield is called \"Diversification\"." },
                    { title: "Winners & Losers", desc: "If 2 companies do badly, but 48 others do well, you still make a great overall profit on your total money." },
                    { title: "Different Types", desc: "Funds invest in many sectors like IT, Banks, Pharma, and Factories. They don't all face trouble at once." },
                    { title: "Peace of Mind", desc: "Diversification is the best way to sleep peacefully at night while your money grows steadily in the background." },
                    { title: "Rural Wisdom", desc: "A Thali has rice, dal, veg, and curd. If the dal is too spicy, the curd cools you down. It's balanced!" }
                ]
            },
            l12: {
                title: "Market Cycles: Monsoons & Seasons",
                shortDesc: "Understanding the natural ups and downs.",
                cards: [
                    { title: "Everything Changes", desc: "Markets have seasons. Sometimes it's a \"Bull Market\" where everything grows like green fields after rain." },
                    { title: "The Bear Cold", desc: "Sometimes it's a \"Bear Market\" where everything looks frozen or falling. This is also natural." },
                    { title: "Don't Panic", desc: "Just as Winter always leads to Spring, market dips always lead to future growth. Dips are journeys." },
                    { title: "Buying Cheap", desc: "When markets are down, your monthly SIP buys MORE units of the fund. This is actually a discount for you!" },
                    { title: "Look Far Ahead", desc: "Don't check the price every day and worry. Look at where the market and India will be in 10-20 years." },
                    { title: "Rural Wisdom", desc: "No one sells their farm just because it didn't rain this month. They wait and prepare for the next season!" }
                ]
            },
            l13: {
                title: "Avoiding Easy Money Scams",
                shortDesc: "Identifying \"Double your money\" traps early.",
                cards: [
                    { title: "Too Good to be True", desc: "If someone says they will double your money in just a month or two, they are likely lying. Stay away!" },
                    { title: "The Fly-by-Night", desc: "Many \"local schemes\" take village money and disappear in the night. Always stay with regulated funds." },
                    { title: "SEBI Protection", desc: "Mutual funds are strictly watched by the government (SEBI). It is very hard for them to mistreat your money." },
                    { title: "Real Growth", desc: "Real wealth takes time and participation in business growth. There are no safe shortcuts to becoming rich." },
                    { title: "Ask Questions", desc: "Always ask \"How will you make this profit?\". If there is no clear business answer, your money is at risk." },
                    { title: "Rural Wisdom", desc: "A person promising to turn one bag of seeds into 100 bags overnight is a magician or a thief, not a true farmer." }
                ]
            },
            l14: {
                title: "Retirement: Your Second Innings",
                shortDesc: "Being independent and proud in your old age.",
                cards: [
                    { title: "The Sunset Years", desc: "One day you will want to rest and enjoy time with grandkids. But your daily expenses won't stop." },
                    { title: "Don't Depend", desc: "Children have their own lives and struggles. Being financially independent is the greatest dignity for a senior." },
                    { title: "The Inflation Ghost", desc: "Healthcare and food costs rise fast for seniors. You need a large fund to cover these comfortably." },
                    { title: "Monthly Pension", desc: "You can create your own \"pension\" by withdrawing a fixed amount slowly from your SIP fund every month." },
                    { title: "Start at 30", desc: "If you start saving for retirement early, you only need a small amount to reach a very large corpus by age 60." },
                    { title: "Rural Wisdom", desc: "It's like building a solid stone house during your working years so you don't have to repair the roof at age 70." }
                ]
            },
            l15: {
                title: "The Power of Starting Early",
                shortDesc: "Why even 5 years make a massive difference.",
                cards: [
                    { title: "The Early Bird", desc: "If Rahul starts at 20 and Amit starts at 30, Rahul can end up with DOUBLE the wealth with the same investment." },
                    { title: "Compound Power", desc: "The more time your money has to grow, the more it multiplies itself. Time is more important than the amount." },
                    { title: "Don't Wait for \"Perfect\"", desc: "People wait for more salary to start. It's better to start with ₹500 now than ₹5000 five years later." },
                    { title: "Lost Opportunity", desc: "Every year you delay starting is a year of \"magic growth\" that you can never get back. Start today." },
                    { title: "Youth Advantage", desc: "Young people have the most valuable asset in the world: plenty of TIME for their money to grow." },
                    { title: "Rural Wisdom", desc: "Planting a tree today means your children get fruit. Planting it 10 years later means only your grandkids do." }
                ]
            },
            l16: {
                title: "Asset Allocation: The Balance",
                shortDesc: "Mixing Gold, Cash, and Mutual Funds correctly.",
                cards: [
                    { title: "The Balance", desc: "Don't put all your money in just Mutual Funds. Keep some in the bank, and some in Gold for a mix." },
                    { title: "The Winning Mix", desc: "A good mix keeps your life stable during all times. Mutual Funds are for growth, Cash is for immediate safety." },
                    { title: "Risk Appetite", desc: "If you are young, you can take more growth risk. As you get older, you should shift toward more safety." },
                    { title: "Rebalancing", desc: "Once a year, check if your mix is still correct according to your life goals and your age." },
                    { title: "Diversified Life", desc: "Being \"Rich\" is not about one lucky fund; it's about having a strong, balanced overall financial thali." },
                    { title: "Rural Wisdom", desc: "A wise farmer has some cows, some goats, some land, and some grain. If the crop fails, the cow still provides milk." }
                ]
            },
            l17: {
                title: "The Discipline of the Farmer",
                shortDesc: "Learning the virtue of patience from the land.",
                cards: [
                    { title: "The Sowing Season", desc: "You sow seeds and then you wait. You don't dig them up every single day to check if they have grown." },
                    { title: "Nature's True Pace", desc: "Wealth, like your crops, has its own natural pace. You cannot force it to be faster through worry." },
                    { title: "Pests & Climate", desc: "Market dips are like pests or bad weather. You deal with them calmly, you don't burn the whole farm down." },
                    { title: "Consistency is Key", desc: "A farmer works his land every day. You must invest your SIP every single month. No excuses allowed." },
                    { title: "The Joy of Harvest", desc: "The deep joy of a rich harvest only comes to those who stayed and worked during the heat of summer." },
                    { title: "Rural Wisdom", desc: "Investing is not a lottery ticket. It is long-term farming of your hard-earned money. Be a patient farmer." }
                ]
            },
            l18: {
                title: "Tax Saving (ELSS) Secret",
                shortDesc: "How to save your tax while growing your money.",
                cards: [
                    { title: "The Tax Burden", desc: "Income tax can eat up a lot of your hard-earned monthly salary if you don't plan it well." },
                    { title: "The ELSS Hero", desc: "Special funds called ELSS allow you to deduct up to ₹1.5 Lakhs from your taxable income every year." },
                    { title: "The Dual Benefit", desc: "You save your tax money today AND that same money grows like a regular, high-growth mutual fund." },
                    { title: "The 3-Year Lock-in", desc: "Your money is locked for 3 years. This is actually good because it forces you to be a patient investor." },
                    { title: "Wealth vs PPF", desc: "Historically, ELSS has given much higher returns than traditional tax-saving bank options like PPF." },
                    { title: "Rural Wisdom", desc: "It's like getting a government subsidy on your seeds. You pay less now, and you get a better crop later." }
                ]
            },
            l19: {
                title: "Goal: Buying Land or a House",
                shortDesc: "Building your own shelter and legacy.",
                cards: [
                    { title: "The Foundation", desc: "A house is the biggest dream for most families. It requires a lot of saved capital to start." },
                    { title: "The Down Payment", desc: "SIP can help you build the \"down payment\" so your future bank loan is much smaller and easier to pay." },
                    { title: "Long Timeline", desc: "Since you usually plan for a house over 5-10 years, equity mutual funds are the perfect choice." },
                    { title: "Land Inflation", desc: "Land prices rise very fast. Your savings MUST rise faster than land prices to afford that dream plot." },
                    { title: "Steady Building", desc: "Consistent monthly SIPs provide a stable and sure path toward the brick and mortar of your own home." },
                    { title: "Rural Wisdom", desc: "It's like collecting bricks one by one every month. Eventually, you have enough to build the whole wall." }
                ]
            },
            l20: {
                title: "Your First Step: Start Today",
                shortDesc: "A practical guide on how to actually start.",
                cards: [
                    { title: "The Simple KYC", desc: "All you need is your Aadhaar card and PAN card to get your \"Know Your Customer\" (KYC) check done." },
                    { title: "Direct or Assisted", desc: "You can invest directly through an app or through a local expert distributor who can guide you." },
                    { title: "Set and Forget", desc: "The best way is to set up \"Auto-debit\" from your bank account on the 5th of every month automatically." },
                    { title: "Start with ₹500", desc: "Don't wait for a huge amount. Start with just ₹500 today to build the powerful habit of investing." },
                    { title: "Stay Informed", desc: "Keep checking your growth every few months, but don't panic over daily news or market noise." },
                    { title: "Rural Wisdom", desc: "The journey of a thousand miles starts with a single small step. Today, take that first step with confidence!" }
                ]
            }
        },
        ruralExampleTitle: "Relatable Example"
    },
    hi: {
        common: {
            back: "पीछे",
            next: "आगे",
            start: "शुरू करें",
            finish: "समाप्त",
            loading: "लोड हो रहा है...",
            error: "त्रुटि",
            success: "सफलता",
            cancel: "रद्द करें",
            confirm: "पुष्टि करें",
            continue: "आगे बढ़ें",
            gotIt: "समझ गया",
            lakhs: "लाख",
            crores: "करोड़",
            min: "मिनट",
            completed: "पूरा हुआ",
            premium: "प्रीमियम",
            en: "अंग्रेजी",
            hi: "हिंदी"
        },
        learnMode: {
            finish: "पाठ समाप्त करें",
            continue: "जारी रखें",
            cardProgress: "कार्ड {total} में से {current}",
        },
        entry: {
            title: "वेल्थ बिल्डर लैब",
            subtitle: "अपनी संपत्ति बनाने के लिए 20+ पाठ",
            startLearning: "सीखना शुरू करें",
            branding: "फिन-लर्न",
            reassurance: "कोई वास्तविक पैसा शामिल नहीं है",
        },
        tabs: {
            home: "मुख्य पृष्ठ",
            explore: "खोजें",
            calculator: "कैलकुलेटर",
            learn: "सीखें",
        },
        explore: {
            title: "लर्निंग हब",
            subtitle: "20 आवश्यक वित्तीय पाठ",
            bannerTitle: "अपनी फसल की योजना बनाएं",
            bannerDesc: "पूरे किए गए पाठ नए सिमुलेशन स्तरों को अनलॉक करने में मदद करते हैं!",
            practiceButton: "अभ्यास सिमुलेशन 🚀",
        },
        home: {
            greeting: "संपत्ति बनाना शुरू करें! 👋",
            title: "लर्निंग सेंटर (सीखने का केंद्र)",
            overallProgress: "कुल ज्ञान की प्रगति",
            lessonsMastered: "{total} में से {current} पाठ पूरे हुए",
            categories: {
                all: "सभी",
                basics: "मूल बातें",
                concepts: "कॉन्सेप्ट",
                growth: "वृद्धि",
                risks: "जोखिम",
                equity: "इक्विटी"
            },
            lessonHeader: "{category} पाठ",
            available: "{count} उपलब्ध",
            cardsInLesson: "इस पाठ में {count} कार्ड हैं",
            completed: "पूर्ण ✓",
            practiceTitle: "जो सीखा है उसका अभ्यास करें",
            practiceText: "अपना पैसा बढ़ाने के लिए तैयार हैं? वेल्थ सिम्युलेटर आजमाएं और अपने निवेश को बढ़ता हुआ देखें!",
        },
        calculator: {
            title: "वेल्थ कैलकुलेटर",
            subtitle: "सटीकता के साथ अपने भविष्य की योजना बनाएं",
            maturityLabel: "अनुमानित मैच्योरिटी मूल्य",
            totalInvested: "कुल निवेश",
            estProfit: "अनुमानित लाभ",
            returnLabel: "{percent}% रिटर्न",
            sip: "SIP",
            lumpsum: "एकमुश्त (Lump sum)",
            monthlyLabel: "मासिक निवेश राशि",
            onetimeLabel: "एकमुश्त निवेश राशि",
            periodLabel: "समय अवधि (वर्ष)",
            expectedReturn: "अपेक्षित रिटर्न (%)",
            investorInsight: "निवेशक अंतर्दृष्टि",
            insightText: "हर साल अपने {type} को केवल 10% बढ़ाने से कंपाउंडिंग की शक्ति के कारण मैच्योरिटी राशि काफी अधिक हो सकती है।",
        },
        simulator: {
            title: "SIP सिम्युलेटर",
            subtitle: "समय की शक्ति देखें",
            monthlySIP: "मासिक SIP",
            oneTime: "एकमुश्त (One-time)",
            timeHorizon: "समय सीमा",
            calculate: "गणना करें",
            invested: "निवेश किया",
            became: "यह बन गया",
            growth: "आपका पैसा इतना बढ़ा",
            practiceAmount: "अभ्यास राशि",
            demoBudget: "🎮 डेमो बजट",
            simulatedUsage: "सिम्युलेटेड उपयोग",
            allocatedLabel: "{percent}% आवंटित",
            remainingLabel: "₹{amount} शेष",
            overBudget: "बजट से अधिक",
            simulationOutcome: "सिमुलेशन परिणाम",
            totalInvested: "कुल निवेश",
            maturityValue: "मैच्योरिटी मूल्य",
            live: "लाइव",
            estProfit: "अनुमानित लाभ",
            tempDip: "अस्थायी गिरावट",
            growthTrend: "संपत्ति वृद्धि का रुझान",
            keyHighlights: "मुख्य विशेषताएं",
            addNewFund: "नया फंड जोड़ें",
            fundsCount: "{current}/{max} फंड",
            editErrorBudget: "राशि वॉलेट बैलेंस से अधिक है",
            editErrorInvalid: "अमान्य राशि",
            profileTitle: "यूजर प्रोफाइल और आय",
            profileSubtitle: "प्रोफ़ाइल के अनुसार आय भिन्न हो सकती है। अपनी प्रोफ़ाइल अपडेट करें।",
            profiles: {
                student: "छात्र",
                job: "नौकरी",
                business: "व्यवसाय",
                custom: "कस्टम"
            },
            monthlyIncomeLabel: "मासिक आय",
            suggestedNote: "सुझाव: इसका 10-30% SIP में जाना चाहिए",
            portfolioTitle: "आपका SIP पोर्टफोलियो",
            reset: "रीसेट करें",
            monthlyTotal: "मासिक निवेश: ₹{amount}",
            tipTitle: "सुझाव",
            pauseTip: "SIP को रोकने का मतलब आपका निवेश बेचना नहीं है। यह सिर्फ नए मासिक निवेश को कुछ समय के लिए रोकता है।",
            analyzeCTA: "मेरे पोर्टफोलियो का विश्लेषण करें 📊",
            footerTitle: "सीखते रहें",
            footerText: "समझना चाहते हैं कि आपका पैसा कैसे बढ़ता है? और पाठ देखें।",
            viewLessons: "पाठ देखें",
            updateInvestment: "निवेश अपडेट करें",
            changeSipAmount: "अपनी मासिक SIP राशि बदलें",
            sipAmountLabel: "SIP राशि (₹)",
            applyChange: "परिवर्तन लागू करें",
            saveChanges: "परिवर्तन सहेजें",
            cancel: "रद्द करें",
            guidance: {
                start: "💡 ₹{min} - ₹{max}/माह से शुरू करें (आय का 10-30%)।",
                low: "💡 आप आय का {percent}% निवेश कर रहे हैं। बेहतर वृद्धि के लिए इसे कम से कम 10% (₹{min}/माह) तक बढ़ाने पर विचार करें।",
                high: "⚠️ आप आय का {percent}% निवेश कर रहे हैं। यह अनुशंसित 30% से अधिक है। सुनिश्चित करें कि आपके पास आपात स्थिति और खर्चों के लिए पर्याप्त धन है।",
                good: "✅ बहुत बढ़िया! आप आय का {percent}% निवेश कर रहे हैं — जो 10-30% की स्वस्थ सीमा के भीतर है।"
            },
            marketStatus: {
                positive: "📈 बाजार अच्छा कर रहा है! आपके निवेश लगातार बढ़ रहे हैं। यह सामान्य है - धैर्य रखें।",
                neutral: "📊 बाजार आज शांत है। छोटे उतार-चढ़ाव सामान्य हैं। नियमित रूप से निवेश करते रहें।",
                negative: "📉 बाजार में थोड़ी गिरावट आई है। चिंता न करें - यह अस्थायी है। SIP आपको कम कीमतों पर अधिक खरीदने में मदद करता है।",
            },
            placeholder: "जैसे {value}"
        },
        insights: {
            title: "आपकी अंतर्दृष्टि",
            subtitle: "देखें कि आपका सिमुलेशन कैसे रहा",
            tabs: {
                growth: "वृद्धि",
                compare: "तुलना",
                behavior: "व्यवहार",
            },
            summary: {
                invested: "आपने निवेश किया",
                became: "यह बन गया",
                growthHighlight: "आपका पैसा इतना बढ़ा",
                growthNote: "यह आपके निवेश का लगभग 2 गुना है! 🎉",
            },
            growth: {
                chartTitle: "📊 आपकी 10 साल की यात्रा",
                explanationTitle: "🌱 यहाँ क्या हुआ?",
                explanationText: "आपका मासिक SIP कंपाउंडिंग के कारण बढ़ता रहा - आपके रिटर्न ने अपना खुद का रिटर्न कमाना शुरू कर दिया! आप जितनी देर तक निवेशित रहेंगे, यह वृद्धि उतनी ही तेज होगी।",
            },
            compare: {
                sipVsLumpsum: "📊 SIP बनाम एकमुश्त निवेश",
                sipVsLumpsumSub: "क्या होगा यदि आप एक साथ ₹60,000 निवेश करते हैं बनाम ₹5,000 मासिक?",
                earlyVsLate: "⏰ जल्दी शुरू करने की शक्ति",
                earlyVsLateSub: "वही ₹5,000/माह, लेकिन 10 साल के अंतराल पर शुरू करना",
                takeawayTitle: "मुख्य बात",
                takeawayText: "शुरू करने के लिए इंतजार न करें। बाजार के समय (Timing) का अनुमान लगाने की कोशिश न करें। बस शुरू करें और निरंतर बने रहें - संपत्ति बनाने का असली रहस्य यही है।",
            },
            behavior: {
                title: "आपकी निवेशक यात्रा",
                subtitle: "यहाँ बताया गया है कि आपने सिमुलेशन में कैसा प्रदर्शन किया। याद रखें, कोई सही या गलत नहीं है - यह सब सीखने के बारे में है!",
                wisdomTitle: "📖 ज्ञान की बातें",
                wisdomQuote: "\"शेयर बाजार अधीर लोगों से धैर्यवान लोगों को पैसा ट्रांसफर करने का एक साधन है।\"",
                wisdomAuthor: "— वॉरेन बफे",
                consistency: {
                    title: "निरंतरता",
                    value: "{total} में से {invested} महीनों में निवेश किया",
                    feedback: "निरंतर बने रहने के लिए बहुत अच्छा! नियमित निवेश, चाहे वह छोटी राशि ही क्यों न हो, समय के साथ संपत्ति बनाता है।",
                },
                pause: {
                    title: "पॉज (विशेषता) का उपयोग",
                    value: "{count} फंड को थोड़े समय के लिए रोका गया",
                    feedback: "आपने एक बार रोका - यह ठीक है! जीवन में ऐसा होता है। मुख्य बात यह है कि आपने फिर से शुरू किया। यह आपकी प्रतिबद्धता को दर्शाता है।",
                },
                marketDips: {
                    title: "बाजार में गिरावट",
                    value: "{count} गिरावट के दौरान निवेशित रहे",
                    feedback: "आपने बाजार की गिरावट के दौरान घबराहट नहीं दिखाई। सफल दीर्घकालिक निवेशक बिल्कुल यही करते हैं!",
                },
                learning: {
                    title: "सीखना",
                    value: "{count} पाठ पूरे हुए",
                    feedback: "आप संपत्ति के साथ-साथ ज्ञान भी बढ़ा रहे हैं। आप जो कर रहे हैं उसे समझना आपको एक आत्मविश्वासी निवेशक बनाता है।",
                }
            },
            cta: {
                back: "फिन-लर्न पर वापस लौटें",
                hint: "अपनी सीखने की यात्रा जारी रखें 🚀",
            }
        },
        lessons: {
            l1: {
                title: "बीज और पेड़",
                shortDesc: "कैसे छोटी राशि बड़ी संपत्ति में बदलती है।",
                cards: [
                    { title: "छोटी शुरुआत", desc: "जैसे एक विशाल बरगद का पेड़ एक छोटे से बीज से शुरू होता है, वैसे ही आपकी संपत्ति एक छोटी मासिक राशि से शुरू होती है।" },
                    { title: "नियमित सिंचाई", desc: "यदि आप किसी पौधे को साल में एक बार पानी देते हैं, तो वह मर जाता है। यदि आप उसे हर दिन पानी देते हैं, तो वह फलता-फूलता है। SIP आपके पैसे के लिए नियमित सिंचाई है।" },
                    { title: "समय का जादू", desc: "एक पेड़ को बड़ा होने में सालों लगते हैं। इसी तरह, पैसे को अपनी असली ताकत दिखाने के लिए समय चाहिए। संपत्ति बनाने में धैर्य आपका सबसे अच्छा दोस्त है।" },
                    { title: "तूफानों का सामना", desc: "पेड़ बारिश और हवा का सामना करते हैं लेकिन जमे रहते हैं। बाजार ऊपर और नीचे जाएगा, लेकिन अपनी मेहनत का फल देखने के लिए निवेशित बने रहें।" },
                    { title: "मेहनत का फल", desc: "अंततः, पेड़ छाया और फल देता है। आपके निवेश अंततः आपके परिवार की बड़ी जरूरतों को पूरा करेंगे।" },
                    { title: "ग्रामीण ज्ञान", desc: "SIP को 'अनाज बैंक' की तरह समझें। आप प्रत्येक फसल पर एक मुट्ठी अनाज अलग रखते हैं; वर्ष के अंत तक, आपके पास आपात स्थिति के लिए एक पूरी बोरी होती है।" }
                ]
            },
            l2: {
                title: "म्यूचुअल फंड: गांव का साझा पूल",
                shortDesc: "कैसे लोग एक साथ मिलकर निवेश करते हैं।",
                cards: [
                    { title: "एक साथ आना", desc: "म्यूचुअल फंड एक ग्राम समिति की तरह है जहां हर कोई एक साझा पूल में थोड़ा पैसा योगदान देता है।" },
                    { title: "विशेषज्ञ मुखिया", desc: "जैसे एक गांव का बुजुर्ग समुदाय निधि का प्रबंधन करता है, वैसे ही एक 'फंड मैनेजर' इस पूल किए गए धन का पेशेवर रूप से प्रबंधन करता है।" },
                    { title: "कई रास्ते", desc: "पैसे को एक जगह नहीं रखा जाता है। जोखिम कम करने और वृद्धि को बढ़ाने के लिए इसे कई बड़ी कंपनियों में फैलाया जाता है।" },
                    { title: "छोटी शुरुआत", desc: "आपको हजारों रुपये की जरूरत नहीं है। आप ₹500 जैसी छोटी राशि से शुरू कर सकते हैं, ठीक वैसे ही जैसे समूह में बाकी सभी लोग।" },
                    { title: "पारदर्शिता", desc: "आप ठीक-ठीक देख सकते हैं कि आपका पैसा कहां जा रहा है, ठीक वैसे ही जैसे बुजुर्ग द्वारा बनाए गए स्पष्ट ग्राम खाता बही में देखा जा सकता है।" },
                    { title: "ग्रामीण ज्ञान", desc: "यह 'बचत गट' (स्वयं सहायता समूह) की तरह है। जब लोग अपनी छोटी बचत को मिलाते हैं, तो वे बड़ी चीजें खरीद सकते हैं जो एक व्यक्ति अकेले नहीं कर सकता।" }
                ]
            },
            l3: {
                title: "मूक चोर (महंगाई)",
                shortDesc: "गद्दे के नीचे नकदी रखना क्यों जोखिम भरा है।",
                cards: [
                    { title: "छिपा हुआ डाकू", desc: "'महंगाई' नाम का एक चोर है। यह आपके नोट नहीं चुराता, यह चुराता है कि वे नोट समय के साथ क्या खरीद सकते हैं।" },
                    { title: "दाम बढ़ोतरी", desc: "याद करें जब एक कप चाय ₹2 की थी? अब यह ₹10 है। यह हमारे दैनिक जीवन में चोर (महंगाई) का काम है।" },
                    { title: "नकदी की ताकत कम होती है", desc: "यदि आप आज ₹1000 एक डिब्बे में रखते हैं, तो 10 साल बाद यह केवल वही खरीद पाएगा जो आज ₹500 खरीदता है। इसकी कीमत कम हो जाती है।" },
                    { title: "तेजी से बढ़ना", desc: "इस चोर को हराने के लिए, आपके पैसे को हर साल वस्तुओं की कीमतों से तेजी से बढ़ना चाहिए।" },
                    { title: "समाधान", desc: "म्यूचुअल फंड में निवेश करने से आपका पैसा ऐसी गति से बढ़ता है जो आपको बढ़ती लागत और महंगाई से आगे रखता है।" },
                    { title: "ग्रामीण ज्ञान", desc: "10 साल पहले के बारे में सोचें। एक बकरी की कीमत आज की तुलना में बहुत कम थी। यदि आपने केवल नकदी बचाई, तो आप अब वही बकरी नहीं खरीद सकते!" }
                ]
            },
            l4: {
                title: "चक्रवृद्धि: जादुई बर्तन",
                shortDesc: "अपने पैसे को अपना पैसा कमाते देखना।",
                cards: [
                    { title: "जादुई बर्तन", desc: "चक्रवृद्धि एक जादुई बर्तन की तरह है। आप एक सिक्का डालते हैं, वह दो बन जाता है। वे दो फिर अपने आप चार बन जाते हैं!" },
                    { title: "कमाई पर कमाई", desc: "आप सिर्फ अपने मूल पैसे पर लाभ नहीं कमाते, बल्कि उस लाभ पर भी जो आपने पहले कमाया था। यह बढ़ता जाता है!" },
                    { title: "धीमा फिर तेज", desc: "शुरुआती कुछ वर्षों में, यह धीमा लगता है। लेकिन 10-15 साल बाद, यह ढलान पर लुढ़कती बर्फ की गेंद की तरह बहुत तेजी से बढ़ने लगता है।" },
                    { title: "परेशान न करें", desc: "जादू तभी काम करता है जब आप पैसे को बहुत जल्दी नहीं निकालते। इसे बैठने दें और पकने दें जब तक यह तैयार न हो जाए।" },
                    { title: "बर्फ की गेंद", desc: "यह एक पहाड़ से लुढ़कती बर्फ की छोटी गेंद की तरह है। यह अधिक बर्फ उठाती है और आगे बढ़ते हुए बड़ी और बड़ी होती जाती है।" },
                    { title: "ग्रामीण ज्ञान", desc: "यह एक गाय की तरह है जो बछड़े को जन्म देती है। फिर वह बछड़ा बड़ा होकर दूसरे बछड़े को जन्म देता है। जल्द ही, आपके पास एक पूरा झुंड होता है!" }
                ]
            },
            l5: {
                title: "लक्ष्य: बच्चे की शिक्षा",
                shortDesc: "अपने बच्चों के उज्ज्वल भविष्य की योजना।",
                cards: [
                    { title: "बड़े सपने", desc: "हर माता-पिता चाहते हैं कि उनका बच्चा डॉक्टर, इंजीनियर या अधिकारी बने। लेकिन गुणवत्तापूर्ण कॉलेज शिक्षा महंगी है।" },
                    { title: "लागत का जाल", desc: "एक डिग्री जो आज ₹5 लाख की है, जब तक आपका छोटा बच्चा 18 साल का होगा, ₹15 लाख हो सकती है।" },
                    { title: "छोटी शुरुआत", desc: "यदि आप बच्चे के जन्म के समय SIP शुरू करते हैं, तो आपको उस बड़े लक्ष्य तक पहुंचने के लिए हर महीने बस थोड़ा सा बचाने की जरूरत है।" },
                    { title: "18 साल की ताकत", desc: "18 साल की वृद्धि के साथ, आपके छोटे मासिक कदम एक विशाल फंड बन सकते हैं जो सब कुछ चुका दे।" },
                    { title: "अनुशासित रहें", desc: "इस विशिष्ट पैसे को अन्य चीजों के लिए उपयोग न करें। इसे उनके भविष्य और उनके सपनों के लिए सख्ती से रखें।" },
                    { title: "ग्रामीण ज्ञान", desc: "यह आपके बच्चे के जन्म पर फलों का बगीचा लगाने जैसा है। जब तक वे वयस्क होते हैं, पेड़ फल देने के लिए तैयार होते हैं।" }
                ]
            },
            l6: {
                title: "लक्ष्य: चिंता-मुक्त शादी",
                shortDesc: "बड़े पारिवारिक उत्सव के लिए बचत।",
                cards: [
                    { title: "परिवार का गौरव", desc: "शादी बड़ी खुशी का क्षण है, लेकिन यदि वर्षों पहले से योजना नहीं बनाई गई तो यह भारी बोझ भी हो सकता है।" },
                    { title: "कर्ज से बचें", desc: "अधिकांश लोग शादी के लिए उच्च ब्याज वाले कर्ज लेते हैं। यह उन्हें कार्यक्रम के बाद कई वर्षों तक कर्ज में डाल देता है।" },
                    { title: "SIP है जवाब", desc: "बाद में साहूकार को ब्याज देने के बजाय, अभी SIP शुरू करें और बाजार को आपको ब्याज देने दें!" },
                    { title: "छोटे कदम", desc: "10 साल के लिए ₹1,000 प्रति माह भी गहने, कपड़े और खानपान के लिए एक महत्वपूर्ण राशि में बढ़ सकता है।" },
                    { title: "चक्रवृद्धि की मदद", desc: "अपने निवेश की वृद्धि को बिना किसी तनाव के भव्य शादी के खर्चों का भुगतान करने में मदद करने दें।" },
                    { title: "ग्रामीण ज्ञान", desc: "यह हर साल सोने का एक छोटा टुकड़ा खरीदने जैसा है ताकि शादी के समय कोई दबाव न हो।" }
                ]
            },
            l7: {
                title: "जोखिम का मिथक: क्या यह जुआ है?",
                shortDesc: "बाजार जोखिम की वास्तविकता को समझना।",
                cards: [
                    { title: "सुरक्षित बनाम जोखिम भरा", desc: "कई लोग सोचते हैं कि बाजार जुए जैसा है। लेकिन जुआ शुद्ध संयोग है; निवेश विकास में भागीदारी है।" },
                    { title: "बड़ी कंपनियां", desc: "म्यूचुअल फंड टाटा, रिलायंस और बैंकों जैसी कंपनियों में निवेश करते हैं। ये कंपनियां भारत के साथ बढ़ती हैं।" },
                    { title: "उतार-चढ़ाव", desc: "हां, कीमतें रोजाना ऊपर-नीचे होती हैं। लेकिन 5-10 वर्षों में, विकास की दिशा आमतौर पर ऊपर की ओर होती है।" },
                    { title: "संख्या में सुरक्षा", desc: "चूंकि आपका पैसा 50+ अलग-अलग कंपनियों में है, भले ही एक विफल हो जाए, अन्य आपके कुल पैसे को सुरक्षित रखते हैं।" },
                    { title: "आपका नियंत्रण", desc: "आप जब चाहें अपना पैसा रोक या निकाल सकते हैं। आप हमेशा अपनी संपत्ति के चालक की सीट पर होते हैं।" },
                    { title: "ग्रामीण ज्ञान", desc: "यह मानसून की तरह है। कुछ साल बहुत बारिश होती है, कुछ साल बहुत कम। लेकिन लंबे वर्षों में, खेत उपज देता है।" }
                ]
            },
            l8: {
                title: "SIP बनाम फिक्स्ड डिपॉजिट (FD)",
                shortDesc: "क्यों FD संपत्ति बनाने के लिए पर्याप्त नहीं है।",
                cards: [
                    { title: "पुराना तरीका", desc: "फिक्स्ड डिपॉजिट सुरक्षित और परिचित हैं। लेकिन आज, करों के बाद उनकी रिटर्न बहुत कम है।" },
                    { title: "महंगाई का जाल", desc: "यदि FD 6% देती है और कीमतें 6% (महंगाई) बढ़ती हैं, तो आप वास्तव में अपने पैसे पर शून्य वास्तविक लाभ कमा रहे हैं!" },
                    { title: "संपत्ति का अंतर", desc: "10 वर्षों में, एक अच्छी तरह से चुनी गई SIP पारंपरिक बैंक फिक्स्ड डिपॉजिट की तुलना में काफी अधिक बढ़ सकती है।" },
                    { title: "लचीलापन", desc: "FD के विपरीत, SIP आपको मासिक छोटी राशि निवेश करने देती है, जिससे नियमित मासिक आय वाले लोगों के लिए आसान हो जाता है।" },
                    { title: "कर लाभ", desc: "कुछ विशेष म्यूचुअल फंड आयकर बचाने में भी मदद करते हैं, जो मानक FD अक्सर नहीं देते।" },
                    { title: "ग्रामीण ज्ञान", desc: "FD सूखे कमरे में अनाज रखने जैसी है। SIP उसी अनाज को उपजाऊ खेत में बोने जैसी है ताकि वह बढ़े।" }
                ]
            },
            l9: {
                title: "SIP बनाम सोना: आदतें बदलना",
                shortDesc: "क्या भारतीयों के लिए गहने ही बचत का एकमात्र तरीका है?",
                cards: [
                    { title: "सोने का प्यार", desc: "भारतीय सोने से प्यार करते हैं। यह सुंदर है और सुरक्षित लगता है। लेकिन इसकी अपनी समस्याएं हैं जैसे भंडारण और शुद्धता।" },
                    { title: "सुरक्षा मुद्दे", desc: "घर पर सोना रखना बहुत जोखिम भरा है। यह चोरी या खो सकता है। म्यूचुअल फंड डिजिटल और पूरी तरह सुरक्षित हैं।" },
                    { title: "शुद्धता और बर्बादी", desc: "जब आप गहने बेचते हैं, तो आप मेकिंग चार्ज और शुद्धता पर पैसे खो देते हैं। SIP में ऐसी कोई 'बर्बादी' नहीं है।" },
                    { title: "विकास कारक", desc: "ऐतिहासिक रूप से, अच्छी तरह से प्रबंधित इक्विटी म्यूचुअल फंड ने लंबी अवधि में अक्सर सोने की कीमत वृद्धि से बेहतर प्रदर्शन किया है।" },
                    { title: "कोई भंडारण लागत नहीं", desc: "म्यूचुअल फंड के लिए बैंक लॉकर की जरूरत नहीं। उन्हें अपने डिजिटल फोलियो में सुरक्षित रखने की लागत शून्य रुपये है।" },
                    { title: "ग्रामीण ज्ञान", desc: "सोना एक ऐसी गाय रखने जैसा है जो दूध नहीं देती लेकिन उसकी खाल कीमती है। SIP एक ऐसी गाय की तरह है जो हर दिन दूध देती है।" }
                ]
            },
            l10: {
                title: "आपातकालीन फंड: सुरक्षा जाल",
                shortDesc: "जीवन के अप्रत्याशित आश्चर्यों की तैयारी।",
                cards: [
                    { title: "जीवन होता है", desc: "अचानक ट्रैक्टर खराब हो जाता है, या परिवार का कोई सदस्य बीमार पड़ जाता है। आपको बिना चेतावनी के तुरंत नकदी चाहिए।" },
                    { title: "SIP न तोड़ें", desc: "यदि आपके पास आपातकालीन नकदी नहीं है, तो आपको अपनी दीर्घकालिक SIP रोकने और भविष्य की वृद्धि खोने के लिए मजबूर होना पड़ेगा।" },
                    { title: "6 महीने का नियम", desc: "एक अच्छा नियम है कि पहले एक साधारण बचत खाते में अपने बुनियादी खर्चों के 6 महीने बफर के रूप में रखें।" },
                    { title: "शांत रहें", desc: "यह जानकर कि आपके पास आपातकालीन नकदी है, आप कठिन महीनों में भी अपनी SIP जारी रख सकते हैं।" },
                    { title: "लिक्विड फंड", desc: "आप 'लिक्विड फंड' नामक विशेष म्यूचुअल फंड भी उपयोग कर सकते हैं जो बहुत सुरक्षित हैं और जल्दी निकाले जा सकते हैं।" },
                    { title: "ग्रामीण ज्ञान", desc: "यह गर्मियों के लिए घास का एक अलग ढेर रखने जैसा है। आप तब तक इसे नहीं छूते जब तक हरी घास पूरी तरह खत्म न हो जाए।" }
                ]
            },
            l11: {
                title: "विविधीकरण: थाली सिद्धांत",
                shortDesc: "आपको सभी अंडे एक टोकरी में क्यों नहीं रखने चाहिए।",
                cards: [
                    { title: "एक जोखिम भरा है", desc: "यदि आप अपना सारा पैसा सिर्फ एक कंपनी में डालते हैं और वह विफल हो जाती है, तो आप रातोंरात सब कुछ खो सकते हैं।" },
                    { title: "बहुतों की ताकत", desc: "म्यूचुअल फंड 50-100 अलग-अलग कंपनियों में निवेश करते हैं। इस शक्तिशाली ढाल को 'विविधीकरण' कहा जाता है।" },
                    { title: "विजेता और हारने वाले", desc: "यदि 2 कंपनियां खराब प्रदर्शन करती हैं, लेकिन अन्य 48 अच्छा करती हैं, तो आप अभी भी अपने कुल पैसे पर एक बढ़िया समग्र लाभ कमाते हैं।" },
                    { title: "विभिन्न प्रकार", desc: "फंड IT, बैंक, फार्मा और फैक्ट्रियों जैसे कई क्षेत्रों में निवेश करते हैं। वे सभी एक साथ मुसीबत का सामना नहीं करते।" },
                    { title: "मन की शांति", desc: "विविधीकरण रात को शांति से सोने का सबसे अच्छा तरीका है जबकि आपका पैसा पृष्ठभूमि में लगातार बढ़ता रहता है।" },
                    { title: "ग्रामीण ज्ञान", desc: "थाली में चावल, दाल, सब्जी और दही होता है। यदि दाल बहुत मसालेदार है, तो दही आपको ठंडा करता है। यह संतुलित है!" }
                ]
            },
            l12: {
                title: "बाजार चक्र: मानसून और मौसम",
                shortDesc: "प्राकृतिक उतार-चढ़ाव को समझना।",
                cards: [
                    { title: "सब कुछ बदलता है", desc: "बाजार में मौसम होते हैं। कभी-कभी यह 'बुल मार्केट' होता है जहां सब कुछ बारिश के बाद हरे खेतों की तरह बढ़ता है।" },
                    { title: "बियर की ठंड", desc: "कभी-कभी यह 'बियर मार्केट' होता है जहां सब कुछ जमा या गिरता दिखता है। यह भी प्राकृतिक है।" },
                    { title: "घबराएं नहीं", desc: "जैसे सर्दी हमेशा वसंत का मार्ग प्रशस्त करती है, बाजार की गिरावट हमेशा भविष्य की वृद्धि का मार्ग प्रशस्त करती है। गिरावट यात्राएं हैं।" },
                    { title: "सस्ता खरीदना", desc: "जब बाजार नीचे होते हैं, तो आपकी मासिक SIP फंड की अधिक यूनिट खरीदती है। यह वास्तव में आपके लिए छूट है!" },
                    { title: "दूर देखें", desc: "हर दिन कीमत न देखें और चिंता न करें। देखें कि बाजार और भारत 10-20 वर्षों में कहां होगा।" },
                    { title: "ग्रामीण ज्ञान", desc: "कोई भी सिर्फ इसलिए अपना खेत नहीं बेचता कि इस महीने बारिश नहीं हुई। वे अगले मौसम के लिए इंतजार करते हैं और तैयारी करते हैं!" }
                ]
            },
            l13: {
                title: "आसान पैसे के घोटालों से बचना",
                shortDesc: "'अपना पैसा दोगुना करें' जाल की जल्दी पहचान।",
                cards: [
                    { title: "सच होने के लिए बहुत अच्छा", desc: "यदि कोई कहता है कि वे बस एक या दो महीने में आपका पैसा दोगुना कर देंगे, तो वे संभवतः झूठ बोल रहे हैं। दूर रहें!" },
                    { title: "रातोंरात गायब", desc: "कई 'स्थानीय योजनाएं' गांव का पैसा लेती हैं और रात में गायब हो जाती हैं। हमेशा विनियमित फंड के साथ रहें।" },
                    { title: "SEBI सुरक्षा", desc: "म्यूचुअल फंड सरकार (SEBI) द्वारा सख्ती से देखे जाते हैं। उनके लिए आपके पैसे का दुरुपयोग करना बहुत मुश्किल है।" },
                    { title: "वास्तविक विकास", desc: "वास्तविक संपत्ति में समय और व्यापार विकास में भागीदारी लगती है। अमीर बनने के लिए कोई सुरक्षित शॉर्टकट नहीं हैं।" },
                    { title: "सवाल पूछें", desc: "हमेशा पूछें 'आप यह लाभ कैसे कमाएंगे?'। यदि कोई स्पष्ट व्यावसायिक उत्तर नहीं है, तो आपका पैसा जोखिम में है।" },
                    { title: "ग्रामीण ज्ञान", desc: "एक व्यक्ति जो रातोंरात एक बोरी बीज को 100 बोरी में बदलने का वादा करता है, वह जादूगर या चोर है, असली किसान नहीं।" }
                ]
            },
            l14: {
                title: "सेवानिवृत्ति: आपकी दूसरी पारी",
                shortDesc: "बुढ़ापे में स्वतंत्र और गर्वित होना।",
                cards: [
                    { title: "सूर्यास्त के वर्ष", desc: "एक दिन आप आराम करना और पोते-पोतियों के साथ समय बिताना चाहेंगे। लेकिन आपके दैनिक खर्च नहीं रुकेंगे।" },
                    { title: "निर्भर न हों", desc: "बच्चों का अपना जीवन और संघर्ष होता है। आर्थिक रूप से स्वतंत्र होना एक वरिष्ठ के लिए सबसे बड़ी गरिमा है।" },
                    { title: "महंगाई का भूत", desc: "वरिष्ठों के लिए स्वास्थ्य देखभाल और भोजन की लागत तेजी से बढ़ती है। आपको इन्हें आराम से कवर करने के लिए एक बड़े फंड की जरूरत है।" },
                    { title: "मासिक पेंशन", desc: "आप अपने SIP फंड से हर महीने एक निश्चित राशि धीरे-धीरे निकालकर अपनी 'पेंशन' बना सकते हैं।" },
                    { title: "30 पर शुरू करें", desc: "यदि आप जल्दी सेवानिवृत्ति के लिए बचत शुरू करते हैं, तो आपको 60 वर्ष की आयु तक बहुत बड़ी राशि तक पहुंचने के लिए केवल छोटी राशि की जरूरत है।" },
                    { title: "ग्रामीण ज्ञान", desc: "यह अपने काम के वर्षों के दौरान एक मजबूत पत्थर का घर बनाने जैसा है ताकि आपको 70 की उम्र में छत की मरम्मत न करनी पड़े।" }
                ]
            },
            l15: {
                title: "जल्दी शुरू करने की ताकत",
                shortDesc: "क्यों 5 साल भी भारी अंतर बनाते हैं।",
                cards: [
                    { title: "जल्दी उठने वाला पक्षी", desc: "यदि राहुल 20 पर शुरू करता है और अमित 30 पर, तो राहुल समान निवेश के साथ दोगुनी संपत्ति पा सकता है।" },
                    { title: "चक्रवृद्dhि की ताकत", desc: "आपके पैसे को बढ़ने के लिए जितना अधिक समय मिलता है, उतना ही यह अपने आप बढ़ता है। समय राशि से अधिक महत्वपूर्ण है।" },
                    { title: "'परफेक्ट' का इंतजार न करें", desc: "लोग शुरू करने के लिए अधिक वेतन का इंतजार करते हैं। पांच साल बाद ₹5000 की तुलना में अब ₹500 से शुरू करना बेहतर है।" },
                    { title: "खोया अवसर", desc: "हर साल जो आप शुरू करने में देरी करते हैं वह 'जादुई विकास' का एक वर्ष है जो आप कभी वापस नहीं पा सकते। आज शुरू करें।" },
                    { title: "युवा लाभ", desc: "युवाओं के पास दुनिया की सबसे कीमती संपत्ति है: उनके पैसे को बढ़ने के लिए भरपूर समय।" },
                    { title: "ग्रामीण ज्ञान", desc: "आज पेड़ लगाने का मतलब है कि आपके बच्चों को फल मिलेगा। 10 साल बाद लगाने का मतलब है कि केवल आपके पोते-पोतियों को मिलेगा।" }
                ]
            },
            l16: {
                title: "एसेट एलोकेशन: संतुलन",
                shortDesc: "सोना, नकद और म्यूचुअल फंड को सही तरीके से मिलाना।",
                cards: [
                    { title: "संतुलन", desc: "अपना सारा पैसा सिर्फ म्यूचुअल फंड में न डालें। कुछ बैंक में रखें, और मिश्रण के लिए कुछ सोने में।" },
                    { title: "जीतने वाला मिश्रण", desc: "एक अच्छा मिश्रण आपके जीवन को हर समय स्थिर रखता है। म्यूचुअल फंड विकास के लिए हैं, नकद तत्काल सुरक्षा के लिए है।" },
                    { title: "जोखिम की भूख", desc: "यदि आप युवा हैं, तो आप अधिक विकास जोखिम ले सकते हैं। जैसे-जैसे आप बड़े होते हैं, आपको अधिक सुरक्षा की ओर जाना चाहिए।" },
                    { title: "पुनर्संतुलन", desc: "साल में एक बार, जांचें कि क्या आपका मिश्रण अभी भी आपके जीवन लक्ष्यों और उम्र के अनुसार सही है।" },
                    { title: "विविध जीवन", desc: "'अमीर' होना एक भाग्यशाली फंड के बारे में नहीं है; यह एक मजबूत, संतुलित समग्र वित्तीय थाली रखने के बारे में है।" },
                    { title: "ग्रामीण ज्ञान", desc: "एक बुद्धिमान किसान के पास कुछ गाय, कुछ बकरियां, कुछ जमीन और कुछ अनाज होता है। यदि फसल खराब हो जाती है, तो गाय अभी भी दूध देती है।" }
                ]
            },
            l17: {
                title: "किसान का अनुशासन",
                shortDesc: "भूमि से धैर्य का गुण सीखना।",
                cards: [
                    { title: "बुवाई का मौसम", desc: "आप बीज बोते हैं और फिर इंतजार करते हैं। आप हर दिन उन्हें खोदकर नहीं देखते कि वे बढ़े हैं या नहीं।" },
                    { title: "प्रकृति की असली गति", desc: "संपत्ति, आपकी फसलों की तरह, अपनी प्राकृतिक गति होती है। आप चिंता से इसे तेज नहीं कर सकते।" },
                    { title: "कीट और जलवायु", desc: "बाजार की गिरावट कीटों या खराब मौसम की तरह है। आप उनसे शांति से निपटते हैं, आप पूरा खेत नहीं जलाते।" },
                    { title: "निरंतरता कुंजी है", desc: "एक किसान हर दिन अपनी जमीन पर काम करता है। आपको हर महीने अपनी SIP निवेश करनी चाहिए। कोई बहाना नहीं।" },
                    { title: "फसल की खुशी", desc: "समृद्ध फसल की गहरी खुशी केवल उन्हें मिलती है जो गर्मी की तपिश में रुके और काम किया।" },
                    { title: "ग्रामीण ज्ञान", desc: "निवेश लॉटरी टिकट नहीं है। यह आपकी मेहनत की कमाई की दीर्घकालिक खेती है। धैर्यवान किसान बनें।" }
                ]
            },
            l18: {
                title: "कर बचत (ELSS) का रहस्य",
                shortDesc: "अपना पैसा बढ़ाते हुए अपना कर कैसे बचाएं।",
                cards: [
                    { title: "कर का बोझ", desc: "यदि आप अच्छी योजना नहीं बनाते तो आयकर आपकी मेहनत की मासिक सैलरी का बड़ा हिस्सा खा सकता है।" },
                    { title: "ELSS हीरो", desc: "ELSS नामक विशेष फंड आपको हर साल अपनी कर योग्य आय से ₹1.5 लाख तक कटौती करने की अनुमति देते हैं।" },
                    { title: "दोहरा लाभ", desc: "आप आज अपना कर पैसा बचाते हैं और वही पैसा एक नियमित, उच्च-विकास म्यूचुअल फंड की तरह बढ़ता है।" },
                    { title: "3 साल का लॉक-इन", desc: "आपका पैसा 3 साल के लिए लॉक है। यह वास्तव में अच्छा है क्योंकि यह आपको एक धैर्यवान निवेशक बनने के लिए मजबूर करता है।" },
                    { title: "संपत्ति बनाम PPF", desc: "ऐतिहासिक रूप से, ELSS ने PPF जैसे पारंपरिक कर-बचत बैंक विकल्पों की तुलना में बहुत अधिक रिटर्न दिया है।" },
                    { title: "ग्रामीण ज्ञान", desc: "यह अपने बीजों पर सरकारी सब्सिडी पाने जैसा है। आप अब कम भुगतान करते हैं, और बाद में बेहतर फसल पाते हैं।" }
                ]
            },
            l19: {
                title: "लक्ष्य: जमीन या घर खरीदना",
                shortDesc: "अपना आश्रय और विरासत बनाना।",
                cards: [
                    { title: "नींव", desc: "घर अधिकांश परिवारों का सबसे बड़ा सपना है। इसे शुरू करने के लिए बहुत बचाई हुई पूंजी चाहिए।" },
                    { title: "डाउन पेमेंट", desc: "SIP आपको 'डाउन पेमेंट' बनाने में मदद कर सकती है ताकि आपका भविष्य का बैंक लोन बहुत छोटा और भुगतान करने में आसान हो।" },
                    { title: "लंबी समयरेखा", desc: "चूंकि आप आमतौर पर 5-10 वर्षों में घर की योजना बनाते हैं, इक्विटी म्यूचुअल फंड सही विकल्प हैं।" },
                    { title: "जमीन की महंगाई", desc: "जमीन की कीमतें बहुत तेजी से बढ़ती हैं। उस सपने के प्लॉट को वहन करने के लिए आपकी बचत को जमीन की कीमतों से तेज बढ़ना चाहिए।" },
                    { title: "स्थिर निर्माण", desc: "लगातार मासिक SIP आपके अपने घर की ईंट और मोर्टार की ओर एक स्थिर और निश्चित पथ प्रदान करती है।" },
                    { title: "ग्रामीण ज्ञान", desc: "यह हर महीने एक-एक ईंट इकट्ठा करने जैसा है। अंततः, आपके पास पूरी दीवार बनाने के लिए पर्याप्त होती है।" }
                ]
            },
            l20: {
                title: "आपका पहला कदम: आज शुरू करें",
                shortDesc: "वास्तव में कैसे शुरू करें इसकी व्यावहारिक मार्गदर्शिका।",
                cards: [
                    { title: "सरल KYC", desc: "आपको बस अपना आधार कार्ड और पैन कार्ड चाहिए अपना 'Know Your Customer' (KYC) चेक करवाने के लिए।" },
                    { title: "सीधे या सहायता से", desc: "आप सीधे ऐप के माध्यम से या स्थानीय विशेषज्ञ वितरक के माध्यम से निवेश कर सकते हैं जो आपका मार्गदर्शन कर सकता है।" },
                    { title: "सेट करें और भूल जाएं", desc: "सबसे अच्छा तरीका है कि हर महीने की 5 तारीख को अपने बैंक खाते से 'ऑटो-डेबिट' सेट करें स्वचालित रूप से।" },
                    { title: "₹500 से शुरू करें", desc: "बड़ी राशि का इंतजार न करें। निवेश की शक्तिशाली आदत बनाने के लिए आज ही ₹500 से शुरू करें।" },
                    { title: "जानकारी रखें", desc: "हर कुछ महीनों में अपनी वृद्धि देखते रहें, लेकिन दैनिक समाचार या बाजार के शोर पर घबराएं नहीं।" },
                    { title: "ग्रामीण ज्ञान", desc: "हजारों मील की यात्रा एक छोटे कदम से शुरू होती है। आज, आत्मविश्वास के साथ वह पहला कदम उठाएं!" }
                ]
            }
        },
        ruralExampleTitle: "संबंधित उदाहरण"
    }
};
