# Platform Engineering ROI Calculator  

This project provides an **interactive ROI calculator** for Platform Engineering investments, built by **Platformetrics**.  
It allows organizations to model different platform strategies (Open Source, AI-Enhanced Hybrid, AI-Native) and compare their **costs, benefits, risks, and ROI** over multiple years.  

The calculator is based on methodologies from the book *Effective Platform Engineering* and real-world implementation data from Platformetrics.  

---

## 📂 Project Structure  
├── model.html # Main entry point – ROI calculator UI
├── css/model.css # Styling for the calculator
├── js/model.js # Core logic: ROI calculations & dynamic updates
├── js/harts.js # Chart rendering using Chart.js (lazy-loaded)
├── header.html # Placeholder for site header (loaded dynamically)
├── footer.html # Placeholder for site footer (loaded dynamically)

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

## 🛠️ Getting Started  

1. Clone the repo:
   ```bash
   git clone https://github.com/your-org/platformetrics-roi-model.git
   cd platformetrics-roi-model

Open model.html in a browser.
No build step is required – this is a pure HTML/CSS/JS app.

Adjust configuration values in the UI and see real-time results.


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

- [Effective Platform Engineering](https://effectiveplatformengineering.com) – methodologies and frameworks behind this calculator.  
- [Platformetrics](https://platformetrics.com) – ROI models, case studies, and consulting methodology.  
- Industry benchmarks for developer productivity, AI adoption, and platform engineering economics.  

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
