# Platform Engineering ROI Calculator  

This project provides an **interactive ROI calculator** for Platform Engineering investments, built by **Platformetrics**.  
It allows organizations to model different platform strategies (Open Source, AI-Enhanced Hybrid, AI-Native) and compare their **costs, benefits, risks, and ROI** over multiple years.  

The calculator is based on methodologies from the book *Effective Platform Engineering* and real-world implementation data from Platformetrics.  

---

## 📂 Project Structure  

```text
.
├── model.html          # Main entry point – ROI calculator UI
├── css/model.css       # Styling for the calculator
├── js/model.js         # Core logic: ROI calculations & dynamic updates
├── js/charts.js        # Chart rendering using Chart.js (lazy-loaded)
├── xx/header.html      # Placeholder for site header (loaded dynamically)
├── xx/footer.html      # Placeholder for site footer (loaded dynamically)
```

---

## 🚀 Features  

- **Dynamic Inputs**  
  - Team size, salary, toil hours  
  - Industry, AI readiness, technical debt  
  - Deployment frequency, analysis period  

- **Real-Time ROI Results**  
  - Annual productivity loss, efficiency gap, and AI opportunity  
  - 3 platform strategy comparisons with detailed cost/benefit metrics  
  - AI-driven features for Hybrid and Native stacks  

- **Visualizations (auto-updated)**  
  - ROI % over time (cumulative)  
  - Investments vs Returns  
  - Net Value Accumulation  

- **Methodology Transparency**  
  - Derived from *Effective Platform Engineering*  
  - Incorporates industry multipliers and AI-readiness factors  

---

## 🧭 Architecture 

```text
                 ┌────────────────────────────────────────────────┐
                 │                    model.html                  │
                 │  - Loads layout & inputs (form controls)       │
                 │  - Links CSS (model.css)                       │
                 │  - Loads JS (model.js, charts.js)              │
                 └───────────────┬────────────────────────────────┘
                                 │
                fetch()          │                fetch()
        ┌────────────────────────┘──────────────────────────┐
        │                                                   │
┌───────▼────────┐                                   ┌──────▼────────┐
│  header.html   │                                   │  footer.html  │
│ (dynamic slot) │                                   │ (dynamic slot)│
└────────────────┘                                   └───────────────┘

┌───────────────────────────────────────────────────────────────────┐
│                             model.css                             │
│  - Styles for layout, forms, cards, charts section, responsive    │
└───────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────┐
│                             model.js                              │
│  - Defines stacks (open-source | ai-hybrid | ai-native)           │
│  - Holds config (teamSize, salary, toilHours, etc.)               │
│  - calculateROI(stackKey):                                        │
│      • Computes implementation/annual costs                       │
│      • Computes productivity + AI gains + deployment value        │
│      • Multi-year totals, ROI %, net value                        │
│  - updateResults():                                                │
│      • Updates "Current Situation" metrics                        │
│      • Renders per-stack cards + ranks                            │
│  - setupEventListeners():                                          │
│      • On change/input → recompute → update DOM                   │
│  - Exposes updateResults (used by charts.js)                      │
└───────────────┬───────────────────────────────────────────────────┘
                │ calls/reads                                     
                │
┌───────────────▼───────────────────────────────────────────────────┐
│                             charts.js                             │
│  - Lazy-loads Chart.js (CDN) on intersection                      │
│  - computeYearlySeries(): uses calculateROI for each stack        │
│  - initCharts(): creates 3 charts                                 │
│  - updateCharts():                                                │
│      • ROI % over time (line)                                     │
│      • Total Investments vs Returns (bar)                         │
│      • Net Value Accumulation (line)                              │
│  - Hooks updateResults so charts refresh with inputs              │
└───────────────┬───────────────────────────────────────────────────┘
                │ loads
                │
        ┌───────▼───────────────────────────────────────────────────┐
        │            Chart.js (CDN: chart.umd.min.js)               │
        │   - Rendering engine for the canvas charts                │
        └───────────────────────────────────────────────────────────┘


User Flow:
1) User changes inputs in model.html
2) model.js updates config → calculateROI() → updateResults() updates DOM
3) charts.js listens and recomputes series → updates Chart.js charts
```

---

## 🛠️ Getting Started  

1. Clone the repo:
   ```bash
   git clone https://github.com/your-org/platformetrics-roi-model.git
   cd platformetrics-roi-model
   ```

2. Open `model.html` in a browser.  
   No build step is required – this is a **pure HTML/CSS/JS app**.  

3. Adjust configuration values in the UI and see real-time results.  

---

## 📊 Example Outputs  

- **ROI % Over Time (Cumulative)** – shows how ROI evolves over a 3–5 year horizon.  
- **Total Investments vs Returns** – compares platform costs with realized value.  
- **Net Value Accumulation** – visualizes cumulative financial impact.  
- **Current Situation Metrics**:  
  - Annual Productivity Loss  
  - Current Productivity  
  - AI Opportunity (as % improvement)  
  - Efficiency Gap  

---

## 📚 References  

- [Whitepaper () - Understanding the model, inside out.  
- [Effective Platform Engineering](https://effectiveplatformengineering.com) – methodologies and frameworks behind this calculator.  
- [Platformetrics](https://platformetrics.com) – ROI models, case studies, and consulting methodology.  

---

## ⚠️ Disclaimer  

This ROI calculator provides **estimates** based on industry benchmarks, assumptions, and real-world implementation data.  
Results are **directional** and intended for **exploratory analysis only**.  

Actual outcomes will depend on:  
- Your organization’s context  
- Execution quality  
- Industry and compliance constraints  
- Team readiness and adoption  

We recommend validating results through **pilot projects** before making significant financial or strategic decisions.  
