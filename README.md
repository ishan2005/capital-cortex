# Capital Cortex 🚀  
AI-Powered Option Risk, Hedging & Stock Analysis Platform

Capital Cortex is a full-stack fintech prototype built for hackathons, designed to help traders, analysts, and funds **understand option pricing, risk exposure, and hedging strategies** in a clear, visual, and intuitive way.

---

## 🧠 Problem Statement
Options pricing is influenced not only by stock price movement, but also by **time decay (Theta)** and **volatility (Vega)**.  
Retail traders and junior analysts often struggle to:
- Interpret option Greeks intuitively
- Understand real risk exposure
- Decide how to hedge positions

Capital Cortex solves this by combining **quant models + real-time market data + AI insights** into a single dashboard.

---

## ✨ Key Features

### 📊 Dashboard
- Black-Scholes option pricing (Call options)
- Greeks visualization (Delta, Theta, Vega)
- Risk sensitivity bar chart
- Trading signals (BUY / HOLD / SELL)

### 📈 Stock Analysis
- Live stock price (based on selected symbol)
- Historical price chart (12 months)
- Volatility estimation from real market data

### ⚠️ Risk Metrics
- Directional risk (Delta)
- Time decay impact (Theta)
- Volatility sensitivity (Vega)

### 🛡️ Hedging Insights
- Suggested hedging strategy (Protective PUT)
- Risk reduction estimate
- Intuitive explanation for non-technical users

### 🤖 AI Assistant (Prototype)
- Floating AI assistant UI
- Designed to explain risk, Greeks, and strategies in plain language
- Future-ready for LLM integration

---

## 🧩 Tech Stack

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- Charting for price & risk visualization

### Backend
- Node.js + Express
- TypeScript
- Black-Scholes pricing model
- Volatility estimation using historical prices
- External market data APIs (Twelve Data – planned)

---

## 🔄 Application Workflow

1. User selects a stock (e.g., AAPL, MSFT)
2. Backend fetches:
   - Latest stock price
   - 12-month historical data
3. System calculates:
   - Annualized volatility
   - Option price (Black-Scholes)
   - Greeks (Delta, Theta, Vega)
4. Frontend visualizes:
   - KPIs
   - Risk sensitivity charts
   - Trading & hedging insights
5. AI Assistant layer explains results contextually

---

## 🧪 Prototype Notes (Hackathon Scope)
- Backend APIs are modular and scalable
- Real-time recalculation per selected stock is supported
- AI assistant currently UI-based (logic ready for expansion)
- Designed to be **industry-ready**, not just academic

---

## 🚀 Future Enhancements
- Live WebSocket price streaming
- Put option comparison
- Volatility scenario simulation
- Full AI chat with natural language queries
- Portfolio-level risk aggregation

---

## 👨‍💻 Author
**Ishan Agrawal**  
Hackathon Project — Capital Cortex

---

## ⚠️ Disclaimer
This project is for educational and hackathon purposes only.  
It does not constitute financial advice.
