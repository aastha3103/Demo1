# 📈 Market Lab – Stock Trading Simulator

A child module of the **FinLearn** parent fintech learning app, focused on teaching how stock markets work.

> ⚠️ **Educational Only**: This is a learning simulator, NOT a real trading app. No actual money is involved.

---

## 🎯 Purpose

Market Lab teaches beginners:
- **How stock markets work** - Understanding stocks and ownership
- **How to read stock price charts** - Interpreting trends and patterns
- **The difference between trading and investing** - Why long-term investing is usually safer

---

## 👥 Target Users

- First-time learners
- Students and beginners (age 15+)
- Users who may confuse trading with investing

---

## 🎨 Design Philosophy

| Principle | Description |
|-----------|-------------|
| 🌙 **Dark Mode Only** | Calm, focused, analytical appearance |
| 🎓 **Learning Lab Feel** | Educational, not gambling/excitement-based |
| ⚖️ **Clear Comparisons** | Trading vs long-term investing |
| 🛡️ **Safety First** | Always shows "Practice Mode" / "Virtual Money" badges |

---

## 📱 Screens

### 1. Module Entry (`/module-entry`)
Welcome screen introducing Market Lab with:
- Stock chart illustration
- Feature pills (Read Charts, Learn Basics, Compare)
- Educational disclaimer
- "Start Learning" CTA

### 2. Learn Mode (`/learn-mode`)
3-step educational onboarding:
1. **What is a Stock?** - Understanding company ownership
2. **Reading Price Charts** - How to interpret stock movements
3. **Trading vs Investing** - The key differences

### 3. Stock Simulator (`/simulator`)
Practice trading with virtual money:
- Virtual balance tracker (₹1,00,000)
- Interactive price charts with educational tooltips
- Buy/Sell simulation with stock cards
- Learning tips throughout

### 4. Insights (`/insights`)
Educational insights and progress:
- Learning progress tracker
- Risk vs Reward visualization
- Common beginner mistakes
- Key takeaways

---

## 🧩 Components

The module uses a custom design system (`MLButton`, `MLCard`, `MLStockCard`, etc.) that follows the same patterns as the MF_SIP (Wealth Builder Lab) module but with:
- Dark mode only styling
- Analytical color palette (indigo + teal)
- Non-aggressive trend colors (soft teal/coral instead of bright green/red)

See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for full documentation.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on web
npx expo start --web
```

---

## 📁 Project Structure

```
Stocks/
├── app/
│   ├── (tabs)/              # Tab navigation
│   │   ├── index.tsx        # Home (redirects to module-entry)
│   │   ├── learn.tsx        # Learning content
│   │   └── practice.tsx     # Practice (redirects to simulator)
│   ├── _layout.tsx          # Root layout
│   ├── module-entry.tsx     # Welcome screen
│   ├── learn-mode.tsx       # 3-step education
│   ├── simulator.tsx        # Stock simulator
│   └── insights.tsx         # Educational insights
├── components/
│   └── design-system/       # UI components
├── constants/
│   └── design-system.ts     # Design tokens
├── hooks/
│   └── use-design-theme.ts  # Theme hook
├── DESIGN_SYSTEM.md         # Component docs
└── README.md                # This file
```

---

## 🔗 Integration with FinLearn

This module is designed to complement the **Wealth Builder Lab** (MF_SIP) module:

| Module | Focus | Theme |
|--------|-------|-------|
| Wealth Builder Lab | Long-term investing (SIPs, Mutual Funds) | Light mode, calm |
| **Market Lab** | Stock market education | Dark mode, analytical |

Users are encouraged to learn about stocks here, then transition to Wealth Builder Lab for actual investing education.

---

## 📝 License

Part of the FinLearn educational platform.

---

<div align="center">

**Market Lab** – *Learn how stock markets work, safely.*

🎓 Education First | 📈 Practice Trading | ⚖️ Compare Wisely

</div>
