export const STOCK_TRANSLATIONS: Record<string, any> = {
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
            completed: "Completed",
            min: "min",
            learning: {
                lesson: "LESSON",
                quiz: "QUIZ",
                concept: "CONCEPT",
                compare: "COMPARE",
                simulate: "SIMULATE"
            }
        },
        entry: {
            title: "Market Lab",
            subtitle: "Learn how stock markets work",
            startLearning: "Start Learning",
            branding: "FinLearn",
            features: {
                charts: "Read Charts",
                basics: "Learn Basics",
                compare: "Compare stocks",
            },
            disclaimer: {
                title: "Educational Simulator",
                text: "This is a learning tool, not real trading. No actual money is involved.",
            },
            reassurance: "Safe learning environment",
        },
        learn: {
            title: "Learn Mode",
            progress: "{current} of {total}",
            sections: [
                { title: 'What is a Stock?', icon: '🏢' },
                { title: 'Trading vs Investing', icon: '⚖️' },
                { title: 'How Prices Move', icon: '📈' },
            ],
            s1: {
                concept: "A stock = A tiny piece of a company",
                company: "COMPANY",
                pieces: "Each piece = 1 Share",
                you: "YOU",
                insight: "When you buy a share, you own a small part of that company.",
                qTitle: "Why do stock prices change?",
                reasons: [
                    { title: "Demand & Supply", desc: "More buyers → price goes up" },
                    { title: "News & Events", desc: "Good news → price rises" },
                    { title: "Performance", desc: "Profits up → price up" },
                    { title: "Market Mood", desc: "Emotion affects all stocks" }
                ],
                takeaway: "Stock prices reflect what people think a company is worth."
            },
            s2: {
                trading: "Stock Trading",
                tTips: [
                    "Buy and sell quickly (days/weeks)",
                    "Needs constant watching",
                    "High risk, high stress"
                ],
                tExpert: "Requires expertise",
                investing: "Mutual Fund Investing",
                iTips: [
                    "Hold for years (SIP monthly)",
                    "Experts manage your money",
                    "Lower risk, steady growth"
                ],
                iBeginner: "Better for beginners",
                takeaway: "Trading needs skill & time. Investing builds wealth slowly but safely."
            },
            s3: {
                movements: "3 Types of Price Movement",
                rising: "Rising",
                risingDesc: "Buyers dominate",
                falling: "Falling",
                fallingDesc: "Sellers dominate",
                sideways: "Sideways",
                sidewaysDesc: "Balanced",
                volatility: "What is Volatility?",
                calm: "Calm",
                wild: "Wild",
                lowV: "Low Volatility",
                highV: "High Volatility",
                vInsight: "High volatility = bigger price swings = more risk",
                takeaway: "Focus on long-term trends, not daily ups and downs.",
                ready: "You're Ready!",
                readyDesc: "Practice trading with ₹1,00,000 virtual money",
                startSim: "Start Simulator"
            }
        },
        simulator: {
            title: "Trading Simulator",
            subtitle: "Virtual Practice",
            virtualBadge: "🎮 VIRTUAL MONEY - NO REAL TRADING",
            portfolioValue: "Portfolio Value",
            cash: "Available Cash",
            holdingsValue: "Holdings Value",
            realizedPnL: "Realized P&L",
            unrealizedPnL: "Unrealized P&L",
            yourHoldings: "Your Holdings",
            avgPrice: "Avg. Buy Price",
            makeTrade: "Make a Trade",
            quantity: "Quantity",
            tradeValue: "Trade Value",
            buy: "BUY",
            sell: "SELL",
            shares: "shares",
            recentTrades: "Recent Trades",
            reminder: "Stock trading requires understanding and discipline. This is practice - learn before investing real money.",
            feedback: {
                buyHigh: {
                    title: "⚠️ Buying After Rise",
                    message: "You bought after a sharp price increase. This is risky! Prices often correct after rapid rises. Consider waiting for dips."
                },
                panicSell: {
                    title: "😰 Panic Selling?",
                    message: "Selling quickly after a drop locks in losses. Successful investors often hold through volatility and wait for recovery."
                },
                holdStrong: {
                    title: "💪 Great Patience!",
                    message: "Holding through volatility shows discipline. Many gains come from staying invested during uncertain times."
                },
                discipline: {
                    title: "🎓 Trading Discipline",
                    message: "Stock trading requires research, patience, and discipline. Never invest money you cannot afford to lose."
                }
            }
        },
        charts: {
            title: "Read the Chart",
            intro: {
                title: "Chart Reading 101",
                message: "This chart shows how the stock price changes over time. Use the lessons below to understand patterns."
            },
            quickRef: "📖 Quick Reference",
            rising: "Rising",
            risingDesc: "Buyers winning",
            falling: "Falling",
            fallingDesc: "Sellers winning",
            sideways: "Sideways",
            sidewaysDesc: "Balanced",
            volatile: "Volatile",
            volatileDesc: "Risky",
            insight: "Focus on long-term trends, not daily ups and downs!",
            startPractice: "Start Trading Practice",
            component: {
                learningOn: "🎓 Learning ON",
                learningOff: "🎓 Learning OFF",
                start: "Start",
                now: "Now",
                labels: {
                    mid: "Mid",
                    m15: "15th",
                    m3: "3M"
                },
                lessons: [
                    { title: 'Upward Trend', desc: 'Price rising over time - buyers dominate' },
                    { title: 'Downward Trend', desc: 'Price falling - sellers dominate' },
                    { title: 'High Volatility', desc: 'Big swings - uncertain market' }
                ],
                explanations: {
                    up: "Green movement = Price is going UP\nMore people want to BUY the stock",
                    down: "Red movement = Price is going DOWN\nMore people want to SELL the stock",
                    volatile: "High volatility = Big price swings\nMarket is uncertain - news, events, or emotions driving trades"
                },
                whyTitle: "💡 Why do prices fluctuate?",
                whyList: [
                    "Supply & Demand - more buyers = price up",
                    "Company news - good results = price up",
                    "Market mood - fear or excitement spreads",
                    "Global events - affects all stocks"
                ]
            }
        },
        insights: {
            title: "Insights",
            subtitle: "Your Learning Progress",
            progress: "📚 Learning Progress",
            progressItems: {
                basics: "Stock Basics",
                charts: "Reading Charts",
                vsi: "Trading vs Investing",
                practice: "Practice Trading"
            },
            keyInsight: {
                title: "Key Insight",
                message: "Stock trading requires constant monitoring and carries higher risk. Mutual fund investing (like SIPs) is more suitable for long-term wealth building."
            },
            riskReward: "📊 Risk vs Reward Comparison",
            riskRewardSub: "Understanding the difference",
            yAxisLabel: "Returns / Risk",
            xAxisLabel: "Time Horizon",
            short: "Short",
            medium: "Medium",
            long: "Long",
            trading: "Stock Trading",
            mfInvesting: "MF Investing",
            legendTrading: "Trading: High volatility, requires expertise",
            legendInvesting: "Investing: Steady growth over time",
            mistakesTitle: "⚠️ Common Beginner Mistakes",
            mistakes: [
                { title: "Treating trading like gambling", desc: "Stock prices follow patterns based on company performance, not luck." },
                { title: "Panic selling on small dips", desc: "Short-term drops are normal. Focus on long-term trends." },
                { title: "Following tips without research", desc: "Always understand WHY a stock might be worth buying." },
                { title: "Confusing trading with investing", desc: "Day trading ≠ Long-term wealth building. Know the difference." }
            ],
            recTitle: "Our Recommendation",
            recText: "For beginners, we recommend starting with Mutual Fund SIPs in the Wealth Builder Lab module. It's a safer way to build wealth over time.",
            exploreRec: "Explore Wealth Builder Lab",
            takeawaysTitle: "💡 Key Takeaways",
            takeaways: [
                { title: "Charts show history, not future", desc: "Past performance doesn't guarantee future results." },
                { title: "Time in market > Timing the market", desc: "Long-term holding usually beats trying to pick perfect moments." },
                { title: "Diversification reduces risk", desc: "Don't put all eggs in one basket. Spread investments." },
                { title: "Keep learning", desc: "The more you understand, the better decisions you'll make." }
            ]
        },
        selection: {
            title: "Choose a Stock",
            subtitle: "Select one to practice",
            tip: {
                title: "Stock Categories",
                message: "Stocks are grouped by company size. Larger companies are usually more stable, smaller ones carry more risk."
            },
            categories: {
                largeCap: { title: "Large-Cap Stocks", subtitle: "Stable, established companies", label: "Large" },
                midCap: { title: "Mid-Cap Stocks", subtitle: "Growing companies with potential", label: "Mid" },
                smallCap: { title: "Small-Cap Stocks", subtitle: "Newer, riskier investments", label: "Small" }
            },
            risk: "Risk",
            understandRisk: "Understanding Risk Levels",
            riskLevels: {
                low: "Low",
                lowDesc: "Price changes slowly, safer",
                medium: "Medium",
                mediumDesc: "Moderate price swings",
                high: "High",
                highDesc: "Big ups and downs, risky"
            },
            volatility: "Volatility",
            selectStock: "Select a stock",
            practiceWith: "Practice with {stock}"
        },
        tabs: {
            learn: {
                title: "Learn",
                subtitle: "Stock Market Education",
                yourProgress: "Your Progress",
                lessonsCompleted: "{current} of {total} lessons completed",
                pathTitle: "📚 Learning Path",
                quickTips: "💡 Quick Tips",
                tipTitle: "📊 Charts show patterns",
                tipText: "Look for trends over weeks and months, not minutes. Daily fluctuations are normal.",
                continue: "Continue Learning",
                lessons: {
                    basics: { title: "What is a Stock?", subtitle: "Understanding company ownership" },
                    charts: { title: "Reading Price Charts", subtitle: "How to analyze stock movements" },
                    vsi: { title: "Trading vs Investing", subtitle: "Know the key differences" },
                    practice: { title: "Practice Trading", subtitle: "Try the simulator with virtual money" },
                    quiz: { title: "Knowledge Check", subtitle: "Test what you've learned" }
                }
            },
            practice: {
                title: "Practice",
                subtitle: "Virtual Trading Experience",
                dashboard: "Dashboard",
                startPractice: "Start Practicing",
                pickStock: "Pick a stock to start simulated trading"
            },
            insights: {
                title: "Insights",
                subtitle: "Analysis & Feedback"
            }
        }
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
            completed: "पूरा हुआ",
            min: "मिनट",
            learning: {
                lesson: "पाठ",
                quiz: "क्विज",
                concept: "कॉन्सेप्ट",
                compare: "तुलना",
                simulate: "अभ्यास"
            }
        },
        entry: {
            title: "मार्केट लैब",
            subtitle: "शेयर बाजार कैसे काम करता है, यह सीखें",
            startLearning: "सीखना शुरू करें",
            branding: "फिन-लर्न",
            features: {
                charts: "चार्ट पढ़ें",
                basics: "मूल बातें सीखें",
                compare: "शेयरों की तुलना करें",
            },
            disclaimer: {
                title: "शैक्षिक सिम्युलेटर",
                text: "यह एक सीखने का उपकरण है, वास्तविक ट्रेडिंग नहीं। इसमें कोई वास्तविक पैसा शामिल नहीं है।",
            },
            reassurance: "सुरक्षित सीखने का माहौल",
        },
        learn: {
            title: "लर्न मोड",
            progress: "{total} में से {current}",
            sections: [
                { title: 'शेयर क्या है?', icon: '🏢' },
                { title: 'ट्रेडिंग बनाम निवेश', icon: '⚖️' },
                { title: 'कीमतें कैसे बढ़ती हैं', icon: '📈' },
            ],
            s1: {
                concept: "एक शेयर = कंपनी का एक छोटा हिस्सा",
                company: "कंपनी",
                pieces: "प्रत्येक हिस्सा = 1 शेयर",
                you: "आप",
                insight: "जब आप एक शेयर खरीदते हैं, तो आप उस कंपनी के एक छोटे हिस्से के मालिक होते हैं।",
                qTitle: "शेयरों की कीमतें क्यों बदलती हैं?",
                reasons: [
                    { title: "मांग और आपूर्ति", desc: "अधिक खरीडर → कीमत बढ़ती है" },
                    { title: "समाचार और घटनाएं", desc: "अच्छी खबर → कीमत बढ़ती है" },
                    { title: "कंपनी का प्रदर्शन", desc: "लाभ बढ़ा → कीमत बढ़ी" },
                    { title: "बाजार का मूड", desc: "भावनाएं सभी शेयरों को प्रभावित करती हैं" }
                ],
                takeaway: "शेयर की कीमतें बताती हैं कि लोग कंपनी की क्या कीमत समझते हैं।"
            },
            s2: {
                trading: "स्टॉक ट्रेडिंग",
                tTips: [
                    "जल्दी खरीदें और बेचें (दिन/सप्ताह)",
                    "लगातार नजर रखने की जरूरत है",
                    "उच्च जोखिम, उच्च तनाव"
                ],
                tExpert: "विशेषज्ञता की आवश्यकता है",
                investing: "म्यूचुअल फंड निवेश",
                iTips: [
                    "वर्षों तक रखें (मासिक SIP)",
                    "विशेषज्ञ आपके पैसे का प्रबंधन करते हैं",
                    "कम जोखिम, स्थिर विकास"
                ],
                iBeginner: "शुरुआती लोगों के लिए बेहतर",
                takeaway: "ट्रेडिंग के लिए कौशल और समय चाहिए। निवेश धीरे लेकिन सुरक्षित रूप से संपत्ति बनाता है।"
            },
            s3: {
                movements: "मूल्य आंदोलन के 3 प्रकार",
                rising: "बढ़ता हुआ",
                risingDesc: "खरीदार हावी हैं",
                falling: "गिरता हुआ",
                fallingDesc: "विक्रेता हावी हैं",
                sideways: "स्थिर (Sideways)",
                sidewaysDesc: "संतुलित",
                volatility: "अस्थिरता (Volatility) क्या है?",
                calm: "शांत",
                wild: "तेज",
                lowV: "कम अस्थिरता",
                highV: "अधिक अस्थिरता",
                vInsight: "अधिक अस्थिरता = बड़े उतार-चढ़ाव = अधिक जोखिम",
                takeaway: "लंबे समय के रुझानों पर ध्यान दें, दैनिक उतार-चढ़ाव पर नहीं।",
                ready: "आप तैयार हैं!",
                readyDesc: "₹1,00,000 वर्चुअल मनी के साथ ट्रेडिंग का अभ्यास करें",
                startSim: "सिम्युलेटर शुरू करें"
            }
        },
        simulator: {
            title: "ट्रेडिंग सिम्युलेटर",
            subtitle: "वर्चुअल अभ्यास",
            virtualBadge: "🎮 वर्चुअल मनी - कोई वास्तविक ट्रेडिंग नहीं",
            portfolioValue: "पोर्टफोलियो मूल्य",
            cash: "उपलब्ध नकद",
            holdingsValue: "होल्डिंग्स मूल्य",
            realizedPnL: "प्राप्त लाभ/हानि",
            unrealizedPnL: "अप्राप्त लाभ/हानि",
            yourHoldings: "आपकी होल्डिंग्स",
            avgPrice: "औसत खरीद मूल्य",
            makeTrade: "एक ट्रेड करें",
            quantity: "मात्रा",
            tradeValue: "ट्रेड मूल्य",
            buy: "खरीदें",
            sell: "बेचें",
            shares: "शेयर",
            recentTrades: "हाल के ट्रेड",
            reminder: "स्टॉक ट्रेडिंग के लिए समझ और अनुशासन की आवश्यकता होती है। यह अभ्यास है - वास्तविक पैसा निवेश करने से पहले सीखें।",
            feedback: {
                buyHigh: {
                    title: "⚠️ बढ़ने के बाद खरीदना",
                    message: "आपने कीमत में तेज वृद्धि के बाद खरीदा। यह जोखिम भरा है! कीमतों में अक्सर तेजी के बाद सुधार होता है। गिरावट का इंतजार करने पर विचार करें।"
                },
                panicSell: {
                    title: "😰 घबराहट में बेचना?",
                    message: "गिरावट के ठीक बाद बेचना नुकसान को पक्का कर देता है। सफल निवेशक अक्सर अस्थिरता में बने रहते हैं और सुधार का इंतजार करते हैं।"
                },
                holdStrong: {
                    title: "💪 महान धैर्य!",
                    message: "अस्थिरता के बावजूद बने रहना अनुशासन दिखाता है। कई लाभ अनिश्चित समय के दौरान निवेशित रहने से मिलते हैं।"
                },
                discipline: {
                    title: "🎓 ट्रेडिंग अनुशासन",
                    message: "स्टॉक ट्रेडिंग के लिए शोध, धैर्य और अनुशासन की आवश्यकता होती है। कभी भी वह पैसा निवेश न करें जिसे आप खोने का जोखिम नहीं उठा सकते।"
                }
            }
        },
        charts: {
            title: "चार्ट पढ़ें",
            intro: {
                title: "चार्ट पढ़ने की मूल बातें",
                message: "यह चार्ट दिखाता है कि समय के साथ शेयर की कीमत कैसे बदलती है। पैटर्न समझने के लिए नीचे दिए गए पाठों का उपयोग करें।"
            },
            quickRef: "📖 त्वरित संदर्भ",
            rising: "बढ़ता हुआ",
            risingDesc: "खरीदार जीत रहे हैं",
            falling: "गिरता हुआ",
            fallingDesc: "विक्रेता जीत रहे हैं",
            sideways: "स्थिर",
            sidewaysDesc: "संतुलित",
            volatile: "अस्थिर",
            volatileDesc: "जोखिम भरा",
            insight: "लंबे समय के रुझानों पर ध्यान दें, दैनिक उतार-चढ़ाव पर नहीं!",
            startPractice: "ट्रेडिंग अभ्यास शुरू करें",
            component: {
                learningOn: "🎓 सीखना चालू (ON)",
                learningOff: "🎓 सीखना बंद (OFF)",
                start: "शुरू",
                now: "अब",
                labels: {
                    mid: "मध्य",
                    m15: "15 तारीख",
                    m3: "3 माह"
                },
                lessons: [
                    { title: 'ऊपर का रुझान', desc: 'समय के साथ कीमत बढ़ रही है - खरीदार हावी हैं' },
                    { title: 'नीचे का रुझान', desc: 'कीमत गिर रही है - विक्रेता हावी हैं' },
                    { title: 'अधिक अस्थिरता', desc: 'बड़े उतार-चढ़ाव - अनिश्चित बाजार' }
                ],
                explanations: {
                    up: "हरा रंग = कीमत बढ़ रही है\nअधिक लोग शेयर खरीदना (BUY) चाहते हैं",
                    down: "लाल रंग = कीमत गिर रही है\nअधिक लोग शेयर बेचना (SELL) चाहते हैं",
                    volatile: "अधिक अस्थिरता = बड़े उतार-चढ़ाव\nबाजार अनिश्चित है - समाचार या भावनाएं ट्रेडों को प्रभावित कर रही हैं"
                },
                whyTitle: "💡 कीमतें क्यों बदलती हैं?",
                whyList: [
                    "मांग और आपूर्ति - अधिक खरीदार = कीमत ऊपर",
                    "कंपनी समाचार - अच्छे परिणाम = कीमत ऊपर",
                    "बाजार का मूड - डर या उत्साह फैलता है",
                    "वैश्विक घटनाएं - सभी शेयरों को प्रभावित करती हैं"
                ]
            }
        },
        insights: {
            title: "अंतर्दृष्टि (Insights)",
            subtitle: "आपकी सीखने की प्रगति",
            progress: "📚 सीखने की प्रगति",
            progressItems: {
                basics: "शेयर की मूल बातें",
                charts: "चार्ट पढ़ना",
                vsi: "ट्रेडिंग बनाम निवेश",
                practice: "ट्रेडिंग अभ्यास"
            },
            keyInsight: {
                title: "मुख्य अंतर्दृष्टि",
                message: "शेयर ट्रेडिंग के लिए निरंतर निगरानी की आवश्यकता होती है और इसमें जोखिम अधिक होता है। म्यूचुअल फंड निवेश (जैसे SIP) लंबी अवधि की संपत्ति बनाने के लिए अधिक उपयुक्त है।"
            },
            riskReward: "📊 जोखिम बनाम लाभ तुलना",
            riskRewardSub: "अंतर को समझना",
            yAxisLabel: "रिटर्न / जोखिम",
            xAxisLabel: "समय सीमा",
            short: "कम",
            medium: "मध्यम",
            long: "लंबी",
            trading: "स्टॉक ट्रेडिंग",
            mfInvesting: "MF निवेश",
            legendTrading: "ट्रेडिंग: अधिक अस्थिरता, विशेषज्ञता चाहिए",
            legendInvesting: "निवेश: समय के साथ स्थिर विकास",
            mistakesTitle: "⚠️ शुरुआती लोगों की सामान्य गलतियां",
            mistakes: [
                { title: "ट्रेडिंग को जुआ समझना", desc: "शेयर की कीमतें कंपनी के प्रदर्शन पर आधारित होती हैं, किस्मत पर नहीं।" },
                { title: "छोटी गिरावट पर घबराहट में बेचना", desc: "अल्पकालिक गिरावट सामान्य है। लंबे समय के रुझानों पर ध्यान दें।" },
                { title: "शोध के बिना टिप्स का पालन करना", desc: "हमेशा समझें कि कोई शेयर खरीदने लायक क्यों हो सकता है।" },
                { title: "ट्रेडिंग और निवेश में भ्रमित होना", desc: "डे ट्रेडिंग ≠ लंबी अवधि की संपत्ति बनाना। अंतर जानें।" }
            ],
            recTitle: "हमारी सिफारिश",
            recText: "शुरुआती लोगों के लिए, हम वेल्थ बिल्डर लैब मॉड्यूल में म्यूचुअल फंड SIP के साथ शुरुआत करने की सलाह देते हैं। यह समय के साथ संपत्ति बनाने का एक सुरक्षित तरीका है।",
            exploreRec: "वेल्थ बिल्डर लैब देखें",
            takeawaysTitle: "💡 मुख्य बातें",
            takeaways: [
                { title: "चार्ट इतिहास दिखाते हैं, भविष्य नहीं", desc: "पिछला प्रदर्शन भविष्य के परिणामों की गारंटी नहीं देता है।" },
                { title: "बाजार में समय > बाजार को समय देना", desc: "सही समय चुनने की कोशिश करने से बेहतर है लंबे समय तक बने रहना।" },
                { title: "विविधीकरण (Diversification) जोखिम कम करता है", desc: "सभी अंडे एक टोकरी में न रखें। निवेश को फैलाएं।" },
                { title: "सीखते रहें", desc: "जितना अधिक आप समझेंगे, उतने ही बेहतर निर्णय आप लेंगे।" }
            ]
        },
        selection: {
            title: "शेयर चुनें",
            subtitle: "अभ्यास के लिए एक चुनें",
            tip: {
                title: "शेयरों की श्रेणियां",
                message: "शेयरों को कंपनी के आकार के अनुसार बांटा गया है। बड़ी कंपनियां आमतौर पर अधिक स्थिर होती हैं, छोटी कंपनियों में अधिक जोखिम होता है।"
            },
            categories: {
                largeCap: { title: "लार्ज-कैप स्टॉक्स", subtitle: "स्थिर, स्थापित कंपनियां", label: "लार्ज" },
                midCap: { title: "मिड-कैप स्टॉक्स", subtitle: "क्षमता वाली बढ़ती कंपनियां", label: "मिड" },
                smallCap: { title: "स्मॉल-कैप स्टॉक्स", subtitle: "नए, अधिक जोखिम वाले निवेश", label: "स्मॉल" }
            },
            risk: "जोखिम",
            understandRisk: "जोखिम स्तर को समझना",
            riskLevels: {
                low: "कम",
                lowDesc: "कीमत धीरे बदलती है, सुरक्षित",
                medium: "मध्यम",
                mediumDesc: "मध्यम मूल्य उतार-चढ़ाव",
                high: "उच्च",
                highDesc: "बड़े उतार-चढ़ाव, जोखिम भरा"
            },
            volatility: "अस्थिरता",
            selectStock: "एक शेयर चुनें",
            practiceWith: "{stock} के साथ अभ्यास करें"
        },
        tabs: {
            learn: {
                title: "सीखें",
                subtitle: "शेयर बाजार की शिक्षा",
                yourProgress: "आपकी प्रगति",
                lessonsCompleted: "{total} में से {current} पाठ पूरे हुए",
                pathTitle: "📚 सीखने का मार्ग",
                quickTips: "💡 त्वरित सुझाव",
                tipTitle: "📊 चार्ट पैटर्न दिखाते हैं",
                tipText: "हफ्तों और महीनों के रुझान देखें, मिनटों के नहीं। दैनिक उतार-चढ़ाव सामान्य हैं।",
                continue: "सीखना जारी रखें",
                lessons: {
                    basics: { title: "शेयर क्या है?", subtitle: "कंपनी के स्वामित्व को समझना" },
                    charts: { title: "मूल्य चार्ट पढ़ना", subtitle: "शेयर आंदोलनों का विश्लेषण कैसे करें" },
                    vsi: { title: "ट्रेडिंग बनाम निवेश", subtitle: "मुख्य अंतर जानें" },
                    practice: { title: "ट्रेडिंग अभ्यास", subtitle: "वर्चुअल मनी के साथ सिम्युलेटर आजमाएं" },
                    quiz: { title: "ज्ञान की जांच", subtitle: "आपने जो सीखा है का परीक्षण करें" }
                }
            },
            practice: {
                title: "अभ्यास",
                subtitle: "वर्चुअल ट्रेडिंग अनुभव",
                dashboard: "डैशबोर्ड",
                startPractice: "अभ्यास शुरू करें",
                pickStock: "सिम्युलेटेड ट्रेडिंग शुरू करने के लिए एक शेयर चुनें"
            },
            insights: {
                title: "अंतर्दृष्टि",
                subtitle: "विश्लेषण और प्रतिक्रिया"
            }
        }
    }
};
