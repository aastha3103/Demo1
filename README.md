# FinCraft - Learn Money, Through Games 🎮💰

![Project Status](https://img.shields.io/badge/Status-Active%20Development-green)
![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android%20%7C%20Web-blue)
![License](https://img.shields.io/badge/License-MIT-purple)

**FinCraft** is a gamified financial education platform designed to make learning about money simple, engaging, and accessible for everyone—especially targeted towards rural users. By combining interactive games with real-world financial concepts, we help users understand economics, the stock market, and wealth building without the financial risk.

## 🌟 Key Features

### 🎮 Gamified Learning Modules
FinCraft features three core game modes, each targeting a specific area of financial literacy:

1.  **🏛️ Econopolis (Economics)**
    -   Build your own city and manage its economy.
    -   Learn how money flows, how taxes work, and the basics of supply and demand.
  
2.  **📈 Market Lab (Stock Market)**
    -   **Visual Learning Mode:** Interactive, visual-first lessons on what stocks are, how prices move, and trading vs. investing.
    -   **Risk-Free Simulator:** Practice buying and selling stocks with virtual currency using real market mechanics.
    -   **Technical Analysis:** Learn to read charts, understand trends (Uptrend, Downtrend, Sideways), and volatility.

3.  **🌱 Wealth Builder (Mutual Funds & SIPs)**
    -   Learn the power of compounding.
    -   Simulate Mutual Fund investments and Systematic Investment Plans (SIP).
    -   Visualize long-term wealth creation versus traditional saving methods.

### 🌏 Accessibility & Inclusivity
-   **Multilingual Support:** Full support for **English** and **Hindi** (हिंदी), with a scalable architecture for more regional languages.
-   **Rural-First Design:** A clean, high-contrast **Green-White theme** (`#22c55e`) designed for clarity and ease of use on all device types.
-   **Voice & Audio:** Integrated text-to-speech and audio feedback for a more immersive and accessible experience.

### 🏆 Engagement & Rewards
-   **Reward System:** Earn virtual coins and badges as you progress through lessons and make smart investment decisions.
-   **Progress Tracking:** Visual indicators of your learning journey across all modules.

## 🛠️ Tech Stack

This project is built using **React Native** with **Expo**, leveraging modern mobile development tools.

-   **Core:** [React Native](https://reactnative.dev/), [Expo SDK 52](https://expo.dev/)
-   **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** Native StyleSheet with a custom Design System
-   **Animations:** [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
-   **Graphics:** [React Native SVG](https://github.com/software-mansion/react-native-svg) for charts and visualizations
-   **State Management:** React Context API
-   **Storage:** Async Storage for local data persistence

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
-   [Node.js](https://nodejs.org/) (LTS version recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   [Expo Go](https://expo.dev/go) app on your Android/iOS device (optional, for physical device testing)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/fincraft.git
    cd fincraft
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server:**
    ```bash
    npx expo start
    ```

4.  **Run on your device:**
    -   **Physical Device:** Scan the QR code shown in the terminal with the **Expo Go** app (Android) or Camera app (iOS).
    -   **Emulator/Simulator:** Press `a` for Android Emulator or `i` for iOS Simulator.
    -   **Web:** Press `w` to run in the browser.

## 📂 Project Structure

The project follows a standard Expo Router structure:

```
Demo1/
├── app/                  # Application source code (Routes)
│   ├── (tabs)/           # Tab navigation layout
│   ├── econ/             # Econopolis game module
│   ├── mf_sip/           # Wealth Builder module
│   ├── stocks/           # Market Lab module
│   ├── index.tsx         # Home screen
│   └── _layout.tsx       # Root layout definition
├── components/           # Reusable UI components
├── constants/            # App constants (Colors, Theme, Config)
├── context/              # Global state (User, Language, etc.)
├── hooks/                # Custom React hooks
├── assets/               # Static assets (Images, Fonts)
└── utils/                # Helper functions
```

## 🤝 Contributing

We welcome contributions to make financial literacy accessible to everyone!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ for Financial Literacy
</p>
