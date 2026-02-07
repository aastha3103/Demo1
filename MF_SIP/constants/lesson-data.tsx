
import React from 'react';
import {
    SIPFlowIllustration,
    SIPvsTradingIllustration,
    MutualFundFlowIllustration
} from '../components/design-system/LearnModeIllustrations';

export interface LearnCard {
    title: string;
    description: string;
    illustration: React.ReactNode;
    ruralExample?: string;
}

export interface Lesson {
    id: string;
    title: string;
    category: string;
    shortDesc: string;
    icon: string;
    cards: LearnCard[];
}

export const LESSONS: Lesson[] = [
    {
        id: '1',
        title: 'The Seed & The Tree',
        category: 'Basics',
        shortDesc: 'How small amounts grow into big wealth.',
        icon: '🌱',
        cards: [
            {
                title: 'Small Starts',
                description: 'Just like a huge Banyan tree starts from a tiny seed, your wealth starts with a small monthly amount.',
                illustration: <SIPFlowIllustration size={220} />,
            },
            {
                title: 'Regular Watering',
                description: 'If you water a plant once a year, it dies. If you water it every day, it thrives. SIP is regular watering for your money.',
                illustration: <SIPFlowIllustration />,
            },
            {
                title: 'Time is Magic',
                description: 'A tree takes years to grow. Similarly, money needs time to show its true power. Patience is your best friend in building wealth.',
                illustration: <SIPvsTradingIllustration />,
            },
            {
                title: 'Weathering Storms',
                description: 'Trees face rain and wind but stay rooted. Markets will go up and down, but stay invested to see the fruit of your labor.',
                illustration: <SIPvsTradingIllustration />,
            },
            {
                title: 'The Fruit of Labor',
                description: 'Eventually, the tree gives shade and fruit. Your investments will eventually provide for your family’s big needs.',
                illustration: <MutualFundFlowIllustration />,
            },
            {
                title: 'Rural Wisdom',
                description: 'Think of SIP like a "Grain Bank". You put a handful of grain aside every harvest; by the end of the year, you have a full sack for emergencies.',
                illustration: <SIPFlowIllustration />,
                ruralExample: 'Like a farmer saving a small portion of every harvest to buy a new tractor eventually.',
            }
        ]
    },
    {
        id: '2',
        title: 'Mutual Funds: The Village Pool',
        category: 'Concepts',
        shortDesc: 'How people come together to invest.',
        icon: '🤝',
        cards: [
            {
                title: 'Coming Together',
                description: 'A Mutual Fund is like a village committee where everyone contributes a little money into a common pool.',
                illustration: <MutualFundFlowIllustration />,
            },
            {
                title: 'The Expert Head',
                description: 'Just as a village elder manages the community fund, a "Fund Manager" manages this pooled money professionally.',
                illustration: <MutualFundFlowIllustration />,
            },
            {
                title: 'Many Paths',
                description: 'The money isn\'t put in one place. It\'s spread across many big companies to reduce risk and maximize growth.',
                illustration: <MutualFundFlowIllustration />,
            },
            {
                title: 'Small Entry',
                description: 'You don\'t need thousands of rupees. You can start with as little as ₹500, just like everyone else in the group.',
                illustration: <SIPFlowIllustration />,
            },
            {
                title: 'Transparency',
                description: 'You can see exactly where your money is going, just like a clear village account book maintained by the elder.',
                illustration: <MutualFundFlowIllustration />,
            },
            {
                title: 'Rural Wisdom',
                description: 'It\'s like "Bachat Gat" (Self Help Groups). When people pool their small savings, they can afford bigger things that one person couldn\'t.',
                illustration: <MutualFundFlowIllustration />,
                ruralExample: 'Like a village milk cooperative where everyone brings their milk to one place to get a better market price.',
            }
        ]
    },
    {
        id: '3',
        title: 'The Silent Thief (Inflation)',
        category: 'Awareness',
        shortDesc: 'Why keeping cash under the mattress is risky.',
        icon: '🕵️‍♂️',
        cards: [
            {
                title: 'The Hidden Robber',
                description: 'There is a thief called "Inflation". It doesn\'t steal your notes, it steals what those notes can buy over time.',
                illustration: <SIPvsTradingIllustration />,
            },
            {
                title: 'Price Hikes',
                description: 'Remember when a cup of tea was ₹2? Now it is ₹10. That is the thief (Inflation) at work in our daily lives.',
                illustration: <SIPvsTradingIllustration />,
            },
            {
                title: 'Cash Loses Power',
                description: 'If you keep ₹1000 in a box today, 10 years later it might only buy what ₹500 buys today. It loses its value.',
                illustration: <SIPvsTradingIllustration />,
            },
            {
                title: 'Growing Faster',
                description: 'To beat this thief, your money must grow faster than the prices of goods are rising every year.',
                illustration: <SIPFlowIllustration />,
            },
            {
                title: 'The Solution',
                description: 'Investing in Mutual Funds helps your money grow at a pace that keeps you ahead of rising costs and inflation.',
                illustration: <SIPFlowIllustration />,
            },
            {
                title: 'Rural Wisdom',
                description: 'Think of 10 years ago. One goat cost much less than it does today. If you saved only cash, you can\'t buy that same goat now!',
                illustration: <SIPvsTradingIllustration />,
                ruralExample: 'The price of a bag of fertilizer increases every year. Your savings must grow more than that price hike to be useful.',
            }
        ]
    },
    {
        id: '4',
        title: 'Compounding: The Magic Pot',
        category: 'Growth',
        shortDesc: 'Watching your money earn its own money.',
        icon: '✨',
        cards: [
            {
                title: 'The Magic Pot',
                description: 'Compounding is like a magic pot. You put one coin in, it becomes two. Those two then make four on their own!',
                illustration: <SIPFlowIllustration />,
            },
            {
                title: 'Earnings on Earnings',
                description: 'You don\'t just earn profit on your original money, but also on the profit you already made previously. It adds up!',
                illustration: <SIPFlowIllustration />,
            },
            {
                title: 'Slow then Fast',
                description: 'In the first few years, it looks slow. But after 10-15 years, it starts growing very rapidly like a downhill snowball.',
                illustration: <SIPFlowIllustration />,
            },
            {
                title: 'Don\'t Disturb',
                description: 'The magic only works if you don\'t take the money out too early. Let it sit and cook until it is ready.',
                illustration: <SIPvsTradingIllustration />,
            },
            {
                title: 'The Snowball',
                description: 'It\'s like a small ball of snow rolling down a mountain. It picks up more snow and gets bigger and bigger as it goes.',
                illustration: <SIPFlowIllustration />,
            },
            {
                title: 'Rural Wisdom',
                description: 'It\'s like a cow giving birth to a calf. Then that calf grows up and gives birth to another calf. Soon, you have a whole herd!',
                illustration: <SIPFlowIllustration />,
                ruralExample: 'A single hen lays eggs, they hatch into more hens, which lay more eggs. Your original investment is the first hen.',
            }
        ]
    },
    {
        id: '5',
        title: 'Goal: Child’s Education',
        category: 'Goals',
        shortDesc: 'Planning for your children’s bright future.',
        icon: '🎓',
        cards: [
            { title: 'Big Dreams', description: 'Every parent wants their child to be a doctor, engineer, or officer. But quality college education is expensive.', illustration: <MutualFundFlowIllustration /> },
            { title: 'The Cost Trap', description: 'A degree that costs ₹5 Lakhs today will likely cost ₹15 Lakhs by the time your young child is 18.', illustration: <SIPvsTradingIllustration /> },
            { title: 'Starting Small', description: 'If you start a SIP when the child is born, you only need to save a little every month to reach that big goal.', illustration: <SIPFlowIllustration /> },
            { title: 'The Power of 18 Years', description: 'With 18 years of growth, your small monthly steps can become a massive fund that pays for everything.', illustration: <SIPFlowIllustration /> },
            { title: 'Stay Disciplined', description: 'Don\'t use this specific money for other things. Keep it strictly for their future and their dreams.', illustration: <SIPvsTradingIllustration /> },
            { title: 'Rural Wisdom', description: 'It’s like planting a fruit orchard when your child is born. By the time they are adults, the trees are ready to bear fruit.', illustration: <SIPFlowIllustration />, ruralExample: 'Saving slowly to pay for college fees without ever needing to take a high-interest loan.' }
        ]
    },
    {
        id: '6',
        title: 'Goal: Worry-free Marriage',
        category: 'Goals',
        shortDesc: 'Saving for the big family celebration.',
        icon: '💍',
        cards: [
            { title: 'Family Pride', description: 'A wedding is a moment of great joy, but it can also be a heavy burden if not planned years in advance.', illustration: <MutualFundFlowIllustration /> },
            { title: 'Avoid Loans', description: 'Most people take high-interest loans for weddings. This puts them in debt for many years after the event.', illustration: <SIPvsTradingIllustration /> },
            { title: 'SIP is the Answer', description: 'Instead of paying interest to a moneylender later, start a SIP now and let the market pay you interest!', illustration: <SIPFlowIllustration /> },
            { title: 'Small Steps', description: 'Even ₹1,000 a month for 10 years can grow to a significant amount for jewelry, clothes, and catering.', illustration: <SIPFlowIllustration /> },
            { title: 'Compound Help', description: 'Let the growth of your investments help you pay for the grand wedding expenses without any stress.', illustration: <SIPFlowIllustration /> },
            { title: 'Rural Wisdom', description: 'It’s like buying one small piece of gold every year so that there’s no pressure at the time of the wedding.', illustration: <SIPFlowIllustration />, ruralExample: 'Building a marriage fund slowly instead of being forced to sell land at the last moment.' }
        ]
    },
    {
        id: '7',
        title: 'The Risk Myth: Is it Gambling?',
        category: 'Awareness',
        shortDesc: 'Understanding the reality of market risk.',
        icon: '🎲',
        cards: [
            { title: 'Safe vs Risky', description: 'Many people think the market is like gambling. But gambling is pure chance; investing is participating in growth.', illustration: <SIPvsTradingIllustration /> },
            { title: 'Big Companies', description: 'Mutual funds invest in companies like Tata, Reliance, and Banks. These companies grow as India grows.', illustration: <MutualFundFlowIllustration /> },
            { title: 'Ups and Downs', description: 'Yes, prices go up and down daily. But over 5-10 years, the direction of growth is usually upwards.', illustration: <SIPvsTradingIllustration /> },
            { title: 'Safety in Numbers', description: 'Since your money is in 50+ different companies, even if one fails, the others keep your overall money safe.', illustration: <MutualFundFlowIllustration /> },
            { title: 'Your Control', description: 'You can stop or withdraw your money whenever you want. You are always in the driver\'s seat of your wealth.', illustration: <SIPFlowIllustration /> },
            { title: 'Rural Wisdom', description: 'It’s like the Monsoon. Some years it’s too much rain, some years too little. But over long years, the farm provides.', illustration: <SIPvsTradingIllustration />, ruralExample: 'Understanding that prices of crops fluctuate, but farming remains a solid and reliable profession.' }
        ]
    },
    {
        id: '8',
        title: 'SIP vs Fixed Deposit (FD)',
        category: 'Comparison',
        shortDesc: 'Why FD is not enough for building wealth.',
        icon: '🏦',
        cards: [
            { title: 'The Old Way', description: 'Fixed Deposits are safe and familiar. But today, the returns they give are very low after taxes.', illustration: <MutualFundFlowIllustration /> },
            { title: 'Inflation Trap', description: 'If FD gives 6% and prices rise by 6% (Inflation), you are actually making ZERO real profit on your money!', illustration: <SIPvsTradingIllustration /> },
            { title: 'Wealth Gap', description: 'Over 10 years, a well-chosen SIP can grow significantly more than a traditional bank fixed deposit.', illustration: <SIPFlowIllustration /> },
            { title: 'Flexibility', description: 'Unlike FD, SIP lets you invest small amounts monthly, making it easier for people with regular monthly income.', illustration: <SIPFlowIllustration /> },
            { title: 'Tax Benefits', description: 'Some special mutual funds also help you save on income tax, something standard FDs often don\'t offer.', illustration: <MutualFundFlowIllustration /> },
            { title: 'Rural Wisdom', description: 'FD is like keeping your grain in a dry room. SIP is like planting that same grain in a fertile field to multiply.', illustration: <SIPFlowIllustration />, ruralExample: 'Realizing that while a bank locker keeps money safe, it doesn\'t help it grow over time.' }
        ]
    },
    {
        id: '9',
        title: 'SIP vs Gold: Changing Habits',
        category: 'Comparison',
        shortDesc: 'Is jewelry the only way to save for Indians?',
        icon: '🟡',
        cards: [
            { title: 'The Gold Love', description: 'Indians love gold. It is beautiful and feels safe. But it has its own problems like storage and purity.', illustration: <MutualFundFlowIllustration /> },
            { title: 'Safety Issues', description: 'Storing gold at home is very risky. It can be stolen or lost. Mutual funds are digital and perfectly safe.', illustration: <SIPvsTradingIllustration /> },
            { title: 'Purity & Waste', description: 'When you sell jewelry, you lose money on making charges and purity. You have no such "wastage" in a SIP.', illustration: <SIPvsTradingIllustration /> },
            { title: 'Growth Factor', description: 'Historically, well-managed equity mutual funds have often outperformed gold price growth over long periods.', illustration: <SIPFlowIllustration /> },
            { title: 'No Storage Cost', description: 'You don\'t need a bank locker for mutual funds. It costs zero rupees to keep them safe in your digital folio.', illustration: <MutualFundFlowIllustration /> },
            { title: 'Rural Wisdom', description: 'Gold is like keeping a cow that doesn\'t give milk but its skin is valuable. SIP is like a cow that gives milk every day.', illustration: <SIPFlowIllustration />, ruralExample: 'Seeing investing as a way to generate regular income/wealth, not just storing value.' }
        ]
    },
    {
        id: '10',
        title: 'The Emergency Fund: Safety Net',
        category: 'Planning',
        shortDesc: 'Preparing for life’s unexpected surprises.',
        icon: '🚑',
        cards: [
            { title: 'Life Happens', description: 'Suddenly the tractor breaks, or a family member falls ill. You need cash immediately without warning.', illustration: <SIPvsTradingIllustration /> },
            { title: 'Don’t Break SIP', description: 'If you don\'t have emergency cash, you will be forced to stop your long-term SIP and lose future growth.', illustration: <SIPvsTradingIllustration /> },
            { title: 'The 6-Month Rule', description: 'A good rule is to keep 6 months of your basic expenses in a simple savings account first as a buffer.', illustration: <MutualFundFlowIllustration /> },
            { title: 'Stay Calm', description: 'Knowing you have emergency cash allows you to keep your SIP running even during tough months.', illustration: <SIPFlowIllustration /> },
            { title: 'Liquid Funds', description: 'You can even use special mutual funds called "Liquid Funds" that are very safe and can be withdrawn quickly.', illustration: <MutualFundFlowIllustration /> },
            { title: 'Rural Wisdom', description: 'It’s like keeping a separate pile of hay for the summer. You don’t touch it until the fresh grass is completely gone.', illustration: <SIPvsTradingIllustration />, ruralExample: 'Having a buffer so you never have to borrow from a moneylender at high interest rates.' }
        ]
    },
    {
        id: '11',
        title: 'Diversification: The Thali Principle',
        category: 'Strategy',
        shortDesc: 'Why you should never put all eggs in one basket.',
        icon: '🍱',
        cards: [
            { title: 'One is Risky', description: 'If you put all your money in just one company and it fails, you could lose everything overnight.', illustration: <SIPvsTradingIllustration /> },
            { title: 'The Power of Many', description: 'Mutual funds invest in 50-100 different companies. This powerful shield is called "Diversification".', illustration: <MutualFundFlowIllustration /> },
            { title: 'Winners & Losers', description: 'If 2 companies do badly, but 48 others do well, you still make a great overall profit on your total money.', illustration: <MutualFundFlowIllustration /> },
            { title: 'Different Types', description: 'Funds invest in many sectors like IT, Banks, Pharma, and Factories. They don\'t all face trouble at once.', illustration: <MutualFundFlowIllustration /> },
            { title: 'Peace of Mind', description: 'Diversification is the best way to sleep peacefully at night while your money grows steadily in the background.', illustration: <SIPFlowIllustration /> },
            { title: 'Rural Wisdom', description: 'A Thali has rice, dal, veg, and curd. If the dal is too spicy, the curd cools you down. It’s balanced!', illustration: <MutualFundFlowIllustration />, ruralExample: 'Like a farmer planting three different crops so that if one fails, the others ensure survival.' }
        ]
    },
    {
        id: '12',
        title: 'Market Cycles: Monsoons & Seasons',
        category: 'Strategy',
        shortDesc: 'Understanding the natural ups and downs.',
        icon: '🌦️',
        cards: [
            { title: 'Everything Changes', description: 'Markets have seasons. Sometimes it’s a "Bull Market" where everything grows like green fields after rain.', illustration: <SIPFlowIllustration /> },
            { title: 'The Bear Cold', description: 'Sometimes it’s a "Bear Market" where everything looks frozen or falling. This is also natural.', illustration: <SIPvsTradingIllustration /> },
            { title: 'Don’t Panic', description: 'Just as Winter always leads to Spring, market dips always lead to future growth. Dips are journeys.', illustration: <SIPvsTradingIllustration /> },
            { title: 'Buying Cheap', description: 'When markets are down, your monthly SIP buys MORE units of the fund. This is actually a discount for you!', illustration: <SIPFlowIllustration /> },
            { title: 'Look Far Ahead', description: 'Don\'t check the price every day and worry. Look at where the market and India will be in 10-20 years.', illustration: <SIPFlowIllustration /> },
            { title: 'Rural Wisdom', description: 'No one sells their farm just because it didn\'t rain this month. They wait and prepare for the next season!', illustration: <SIPvsTradingIllustration />, ruralExample: 'Knowing that low crop prices today don\'t mean you should quit farming forever.' }
        ]
    },
    {
        id: '13',
        title: 'Avoiding Easy Money Scams',
        category: 'Awareness',
        shortDesc: 'Identifying "Double your money" traps early.',
        icon: '🚫',
        cards: [
            { title: 'Too Good to be True', description: 'If someone says they will double your money in just a month or two, they are likely lying. Stay away!', illustration: <SIPvsTradingIllustration /> },
            { title: 'The Fly-by-Night', description: 'Many "local schemes" take village money and disappear in the night. Always stay with regulated funds.', illustration: <SIPvsTradingIllustration /> },
            { title: 'SEBI Protection', description: 'Mutual funds are strictly watched by the government (SEBI). It is very hard for them to mistreat your money.', illustration: <MutualFundFlowIllustration /> },
            { title: 'Real Growth', description: 'Real wealth takes time and participation in business growth. There are no safe shortcuts to becoming rich.', illustration: <SIPvsTradingIllustration /> },
            { title: 'Ask Questions', description: 'Always ask "How will you make this profit?". If there is no clear business answer, your money is at risk.', illustration: <SIPvsTradingIllustration /> },
            { title: 'Rural Wisdom', description: 'A person promising to turn one bag of seeds into 100 bags overnight is a magician or a thief, not a true farmer.', illustration: <SIPvsTradingIllustration />, ruralExample: 'Avoiding unregulated "Chit Funds" that offer returns that sound too high to be real.' }
        ]
    },
    {
        id: '14',
        title: 'Retirement: Your Second Innings',
        category: 'Goals',
        shortDesc: 'Being independent and proud in your old age.',
        icon: '👴',
        cards: [
            { title: 'The Sunset Years', description: 'One day you will want to rest and enjoy time with grandkids. But your daily expenses won\'t stop.', illustration: <MutualFundFlowIllustration /> },
            { title: 'Don’t Depend', description: 'Children have their own lives and struggles. Being financially independent is the greatest dignity for a senior.', illustration: <MutualFundFlowIllustration /> },
            { title: 'The Inflation Ghost', description: 'Healthcare and food costs rise fast for seniors. You need a large fund to cover these comfortably.', illustration: <SIPvsTradingIllustration /> },
            { title: 'Monthly Pension', description: 'You can create your own "pension" by withdrawing a fixed amount slowly from your SIP fund every month.', illustration: <SIPFlowIllustration /> },
            { title: 'Start at 30', description: 'If you start saving for retirement early, you only need a small amount to reach a very large corpus by age 60.', illustration: <SIPFlowIllustration /> },
            { title: 'Rural Wisdom', description: 'It’s like building a solid stone house during your working years so you don\'t have to repair the roof at age 70.', illustration: <MutualFundFlowIllustration />, ruralExample: 'Ensuring you have your own "Wealth" so you are always a source of strength, never a burden.' }
        ]
    },
    {
        id: '15',
        title: 'The Power of Starting Early',
        category: 'Growth',
        shortDesc: 'Why even 5 years make a massive difference.',
        icon: '⏰',
        cards: [
            { title: 'The Early Bird', description: 'If Rahul starts at 20 and Amit starts at 30, Rahul can end up with DOUBLE the wealth with the same investment.', illustration: <SIPFlowIllustration /> },
            { title: 'Compound Power', description: 'The more time your money has to grow, the more it multiplies itself. Time is more important than the amount.', illustration: <SIPFlowIllustration /> },
            { title: 'Don\'t Wait for "Perfect"', description: 'People wait for more salary to start. It\'s better to start with ₹500 now than ₹5000 five years later.', illustration: <SIPFlowIllustration /> },
            { title: 'Lost Opportunity', description: 'Every year you delay starting is a year of "magic growth" that you can never get back. Start today.', illustration: <SIPvsTradingIllustration /> },
            { title: 'Youth Advantage', description: 'Young people have the most valuable asset in the world: plenty of TIME for their money to grow.', illustration: <SIPFlowIllustration /> },
            { title: 'Rural Wisdom', description: 'Planting a tree today means your children get fruit. Planting it 10 years later means only your grandkids do.', illustration: <SIPFlowIllustration />, ruralExample: 'Starting to save a small portion from your very first paycheck or first harvest income.' }
        ]
    },
    {
        id: '16',
        title: 'Asset Allocation: The Balance',
        category: 'Strategy',
        shortDesc: 'Mixing Gold, Cash, and Mutual Funds correctly.',
        icon: '⚖️',
        cards: [
            { title: 'The Balance', description: 'Don\'t put all your money in just Mutual Funds. Keep some in the bank, and some in Gold for a mix.', illustration: <MutualFundFlowIllustration /> },
            { title: 'The Winning Mix', description: 'A good mix keeps your life stable during all times. Mutual Funds are for growth, Cash is for immediate safety.', illustration: <MutualFundFlowIllustration /> },
            { title: 'Risk Appetite', description: 'If you are young, you can take more growth risk. As you get older, you should shift toward more safety.', illustration: <SIPvsTradingIllustration /> },
            { title: 'Rebalancing', description: 'Once a year, check if your mix is still correct according to your life goals and your age.', illustration: <MutualFundFlowIllustration /> },
            { title: 'Diversified Life', description: 'Being "Rich" is not about one lucky fund; it\'s about having a strong, balanced overall financial thali.', illustration: <SIPFlowIllustration /> },
            { title: 'Rural Wisdom', description: 'A wise farmer has some cows, some goats, some land, and some grain. If the crop fails, the cow still provides milk.', illustration: <MutualFundFlowIllustration />, ruralExample: 'Not selling all your gold to buy land, or vice versa. Always keeping a healthy, helpful mix.' }
        ]
    },
    {
        id: '17',
        title: 'The Discipline of the Farmer',
        category: 'Psychology',
        shortDesc: 'Learning the virtue of patience from the land.',
        icon: '🏽‍🌾',
        cards: [
            { title: 'The Sowing Season', description: 'You sow seeds and then you wait. You don\'t dig them up every single day to check if they have grown.', illustration: <SIPFlowIllustration /> },
            { title: 'Nature’s True Pace', description: 'Wealth, like your crops, has its own natural pace. You cannot force it to be faster through worry.', illustration: <SIPFlowIllustration /> },
            { title: 'Pests & Climate', description: 'Market dips are like pests or bad weather. You deal with them calmly, you don\'t burn the whole farm down.', illustration: <SIPvsTradingIllustration /> },
            { title: 'Consistency is Key', description: 'A farmer works his land every day. You must invest your SIP every single month. No excuses allowed.', illustration: <SIPFlowIllustration /> },
            { title: 'The Joy of Harvest', description: 'The deep joy of a rich harvest only comes to those who stayed and worked during the heat of summer.', illustration: <SIPFlowIllustration /> },
            { title: 'Rural Wisdom', description: 'Investing is not a lottery ticket. It is long-term farming of your hard-earned money. Be a patient farmer.', illustration: <SIPFlowIllustration />, ruralExample: 'Respecting the time it takes for wealth to truly mature and become a blessing for your family.' }
        ]
    },
    {
        id: '18',
        title: 'Tax Saving (ELSS) Secret',
        category: 'Awareness',
        shortDesc: 'How to save your tax while growing your money.',
        icon: '📝',
        cards: [
            { title: 'The Tax Burden', description: 'Income tax can eat up a lot of your hard-earned monthly salary if you don\'t plan it well.', illustration: <SIPvsTradingIllustration /> },
            { title: 'The ELSS Hero', description: 'Special funds called ELSS allow you to deduct up to ₹1.5 Lakhs from your taxable income every year.', illustration: <MutualFundFlowIllustration /> },
            { title: 'The Dual Benefit', description: 'You save your tax money today AND that same money grows like a regular, high-growth mutual fund.', illustration: <SIPFlowIllustration /> },
            { title: 'The 3-Year Lock-in', description: 'Your money is locked for 3 years. This is actually good because it forces you to be a patient investor.', illustration: <SIPvsTradingIllustration /> },
            { title: 'Wealth vs PPF', description: 'Historically, ELSS has given much higher returns than traditional tax-saving bank options like PPF.', illustration: <SIPFlowIllustration /> },
            { title: 'Rural Wisdom', description: 'It\'s like getting a government subsidy on your seeds. You pay less now, and you get a better crop later.', illustration: <MutualFundFlowIllustration />, ruralExample: 'Making sure your hard-earned money is efficient and not wasted in unnecessary taxes.' }
        ]
    },
    {
        id: '19',
        title: 'Goal: Buying Land or a House',
        category: 'Goals',
        shortDesc: 'Building your own shelter and legacy.',
        icon: '🏡',
        cards: [
            { title: 'The Foundation', description: 'A house is the biggest dream for most families. It requires a lot of saved capital to start.', illustration: <MutualFundFlowIllustration /> },
            { title: 'The Down Payment', description: 'SIP can help you build the "down payment" so your future bank loan is much smaller and easier to pay.', illustration: <SIPFlowIllustration /> },
            { title: 'Long Timeline', description: 'Since you usually plan for a house over 5-10 years, equity mutual funds are the perfect choice.', illustration: <SIPFlowIllustration /> },
            { title: 'Land Inflation', description: 'Land prices rise very fast. Your savings MUST rise faster than land prices to afford that dream plot.', illustration: <SIPvsTradingIllustration /> },
            { title: 'Steady Building', description: 'Consistent monthly SIPs provide a stable and sure path toward the brick and mortar of your own home.', illustration: <SIPFlowIllustration /> },
            { title: 'Rural Wisdom', description: 'It\'s like collecting bricks one by one every month. Eventually, you have enough to build the whole wall.', illustration: <SIPFlowIllustration />, ruralExample: 'Planning specifically for land purchase without ever having to take desperate, high-interest loans.' }
        ]
    },
    {
        id: '20',
        title: 'Your First Step: Start Today',
        category: 'Action',
        shortDesc: 'A practical guide on how to actually start.',
        icon: '🚀',
        cards: [
            { title: 'The Simple KYC', description: 'All you need is your Aadhaar card and PAN card to get your "Know Your Customer" (KYC) check done.', illustration: <MutualFundFlowIllustration /> },
            { title: 'Direct or Assisted', description: 'You can invest directly through an app or through a local expert distributor who can guide you.', illustration: <MutualFundFlowIllustration /> },
            { title: 'Set and Forget', description: 'The best way is to set up "Auto-debit" from your bank account on the 5th of every month automatically.', illustration: <SIPFlowIllustration /> },
            { title: 'Start with ₹500', description: 'Don\'t wait for a huge amount. Start with just ₹500 today to build the powerful habit of investing.', illustration: <SIPFlowIllustration /> },
            { title: 'Stay Informed', description: 'Keep checking your growth every few months, but don\'t panic over daily news or market noise.', illustration: <MutualFundFlowIllustration /> },
            { title: 'Rural Wisdom', description: 'The journey of a thousand miles starts with a single small step. Today, take that first step with confidence!', illustration: <SIPFlowIllustration />, ruralExample: 'Starting your investment journey today with a clear mind and a bright future goal.' }
        ]
    }
];

export const CATEGORIES = ['All', 'Basics', 'Concepts', 'Growth', 'Awareness', 'Goals', 'Comparison', 'Strategy', 'Planning', 'Psychology', 'Action'];
