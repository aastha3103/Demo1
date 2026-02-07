# 📈 Market Lab Design System

A dark-mode, analytical UI design system for stock market education, designed specifically for the **Market Lab** module within the FinLearn parent application.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Design Principles](#design-principles)
3. [Color Palette](#color-palette)
4. [Typography](#typography)
5. [Components](#components)
6. [Accessibility Guidelines](#accessibility-guidelines)

---

## Overview

### Purpose
This design system provides a consistent, reusable set of components and design tokens for building the Market Lab module focused on **stock market education** (not real trading).

### Target Users
- **First-time learners** with no trading experience
- **Students and beginners** (age 15+)
- Users who may **confuse trading with investing**

### Design Goals
| Goal | Description |
|------|-------------|
| 🎓 **Educational** | Feels like a learning lab, not a trading platform |
| 🧘 **Calm** | Dark, focused interface - no flashy trading visuals |
| 📊 **Analytical** | Clean charts and data displays for learning |
| 🛡️ **Safe** | Clearly communicates "this is practice, not real" |
| ⚖️ **Comparative** | Helps distinguish trading from long-term investing |

---

## Design Principles

### 1. Learning Lab, Not Trading Platform
- ❌ No flashy green/red profit/loss colors
- ❌ No urgency-inducing elements
- ✅ Calm, analytical color palette
- ✅ Educational tooltips everywhere

### 2. Dark Mode Only
- Enforced dark theme throughout
- Reduces eye strain for chart reading
- Professional, analytical appearance
- Clearly distinguishes from the MF_SIP (Wealth Builder Lab) module

### 3. Clear Educational Context
- Every screen emphasizes "this is for learning"
- Virtual money badges always visible
- Comparison with long-term investing encouraged

### 4. Mobile-First Accessibility
- Large touch targets (minimum 48dp)
- High contrast text on dark backgrounds
- Optimized for low-end Android devices

---

## Color Palette

### Primary Colors - Deep Indigo (Analysis & Focus)
| Token | Hex | Usage |
|-------|-----|-------|
| `primary.50` | `#1A1F3D` | Deepest backgrounds |
| `primary.500` | `#9BA5E0` | **Main primary** - interactive |
| `primary.600` | `#B8C0EB` | Light primary |

### Secondary Colors - Teal (Learning & Growth)
| Token | Hex | Usage |
|-------|-----|-------|
| `secondary.400` | `#32948E` | Main secondary |
| `secondary.500` | `#4DB6AC` | Bright teal - positive trends |

### Neutral Colors (Dark Mode)
| Token | Hex | Usage |
|-------|-----|-------|
| `neutral.0` | `#0A0C10` | Deepest background |
| `neutral.50` | `#0F1216` | Main background |
| `neutral.100` | `#161A21` | Card background |
| `neutral.900` | `#F5F6F8` | Bright text |

### Semantic Colors (Non-Aggressive)
| Type | Main | Usage |
|------|------|-------|
| Positive | `#4DB6AC` | Upward trends (soft teal) |
| Negative | `#E57373` | Downward trends (soft coral) |
| Warning | `#FFD54F` | Caution, attention |
| Learning | `#B39DDB` | Educational content |

### Chart Colors
```typescript
chart: {
  line: '#9BA5E0',        // Primary line
  lineFill: 'rgba(155, 165, 224, 0.15)',
  grid: '#2A313D',        // Grid lines
  candleUp: '#4DB6AC',    // Upward candle
  candleDown: '#E57373',  // Downward candle
}
```

---

## Typography

### Font Sizes (More Readable)
| Style | Size | Usage |
|-------|------|-------|
| Display Large | 40px | Hero sections |
| Headline Large | 26px | Page titles |
| Title Medium | 18px | Card titles |
| **Body Large** | **17px** | **Main content (minimum)** |
| Data Large | 28px | Stock prices |
| Caption | 12px | Helper text |

---

## Components

### Core Components

#### MLButton
Touch-friendly buttons with dark mode styling.

```tsx
import { MLButton } from '@/components/design-system';

// Variants: primary | secondary | outline | ghost | success | danger
<MLButton title="Start Learning" variant="primary" size="large" />
<MLButton title="Buy 1 Share" variant="success" />
```

#### MLCard
Content containers with glass effect option.

```tsx
import { MLCard } from '@/components/design-system';

// Variants: default | elevated | outlined | glass | accent | learning
<MLCard variant="glass" title="Price Chart">
  <Text>Content here...</Text>
</MLCard>
```

#### MLStockCard
Stock display card with mini chart.

```tsx
import { MLStockCard } from '@/components/design-system';

<MLStockCard
  symbol="TCS"
  name="Tata Consultancy Services"
  price={3834.20}
  change={-18.40}
  changePercent={-0.48}
  sector="technology"
  onPress={() => selectStock()}
/>
```

#### MLPriceChart
Interactive educational price chart.

```tsx
import { MLPriceChart } from '@/components/design-system';

<MLPriceChart
  data={priceHistory}
  symbol="RELIANCE"
  currentPrice={2456.75}
  change={32.50}
  changePercent={1.34}
  showEducation={true}  // Shows learning tips
/>
```

#### MLLearningCard
Educational content cards with progress.

```tsx
import { MLLearningCard } from '@/components/design-system';

// Types: lesson | quiz | concept | comparison | simulation
<MLLearningCard
  type="lesson"
  title="What is a Stock?"
  subtitle="Understanding ownership"
  duration="5 min"
  progress={30}
  onPress={() => navigateToLesson()}
/>
```

#### MLInfoBox
Educational tips and information.

```tsx
import { MLInfoBox } from '@/components/design-system';

// Variants: info | tip | warning | learn | compare
<MLInfoBox
  variant="learn"
  icon="🎓"
  title="Remember"
  message="This is a simulator with virtual money."
/>
```

---

## Accessibility Guidelines

### Color Contrast
- Minimum contrast ratio: **4.5:1** for normal text
- All text on dark backgrounds meets WCAG AA

### Touch Targets
- **Minimum size**: 48x48 dp
- Adequate spacing between interactive elements

### Educational Features
- All charts have explanatory captions
- "Virtual money" badges always visible
- Clear distinction from real trading apps

---

## File Structure

```
components/
└── design-system/
    ├── index.ts                 # Central exports
    ├── MLButton.tsx             # Button component
    ├── MLCard.tsx               # Card component
    ├── MLHeader.tsx             # Screen header
    ├── MLInfoBox.tsx            # Info box component
    ├── MLStockCard.tsx          # Stock display card
    ├── MLPriceChart.tsx         # Price chart component
    ├── MLLearningCard.tsx       # Learning card component
    └── StockChartIllustration.tsx # SVG illustration

constants/
└── design-system.ts             # Design tokens & configuration

hooks/
└── use-design-theme.ts          # Theme hook (dark mode only)
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Feb 2026 | Initial release with core components |

---

<div align="center">

**Market Lab Design System**  
Part of the FinLearn Ecosystem

📈 *Learn how stock markets work, safely.*

</div>
