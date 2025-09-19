# MCP Tools Reference

Complete reference for all available tools in the Platform ROI MCP Server.

## Available Tools

The Platform ROI MCP Server provides three main tools for calculating and analyzing platform engineering ROI:

1. [`calculate_platform_roi`](#calculate_platform_roi) - Full ROI calculation for all strategies
2. [`compare_platform_strategies`](#compare_platform_strategies) - Comprehensive strategy comparison
3. [`get_current_situation_analysis`](#get_current_situation_analysis) - Current productivity analysis

---

## `calculate_platform_roi`

Calculate ROI for all three platform engineering strategies with detailed financial breakdown.

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `teamSize` | number | No | 5 | Number of engineers (1-1000) |
| `avgSalary` | number | No | 120000 | Average salary including benefits (USD) |
| `toilHours` | number | No | 8 | Weekly hours spent on manual ops work (0-40) |
| `currentAI` | string | No | "none" | Current AI adoption level |
| `aiReadiness` | string | No | "intermediate" | Team's AI adoption capability |
| `deployFreq` | string | No | "weekly" | Current deployment frequency |
| `industry` | string | No | "general" | Industry type for compliance multipliers |
| `techDebt` | string | No | "medium" | Technical debt level |
| `timeHorizon` | number | No | 3 | Analysis period in years (1-5) |

### Parameter Values

#### `currentAI` Options
- `"none"` - No AI tools in use
- `"basic"` - Basic tools like GitHub Copilot
- `"advanced"` - Advanced tools like Cursor, Windsurf
- `"expert"` - AI-native workflow with multiple tools

#### `aiReadiness` Options
- `"low"` - Limited experience with AI tools
- `"intermediate"` - Some AI experience and willingness
- `"high"` - Good AI experience and adoption capability
- `"expert"` - Advanced AI users and early adopters

#### `deployFreq` Options
- `"monthly"` - Deploy once per month
- `"weekly"` - Deploy weekly (typical)
- `"daily"` - Daily deployments

#### `industry` Options
- `"general"` - General technology (1.0x risk multiplier)
- `"financial"` - Financial services (1.3x - regulatory complexity)
- `"healthcare"` - Healthcare (1.4x - compliance requirements)
- `"startup"` - Early stage startup (0.8x - agility advantage)

#### `techDebt` Options
- `"low"` - Well-maintained codebase (0.9x implementation cost)
- `"medium"` - Typical technical debt (1.0x baseline)
- `"high"` - Significant legacy issues (1.3x increased complexity)
- `"very-high"` - Major technical debt (1.6x significant overhead)

### Output Format

Returns JSON with comprehensive ROI analysis for all three platform strategies:

```json
{
  "message": "Platform Engineering ROI Analysis Complete",
  "configuration": {
    "teamSize": 10,
    "avgSalary": 130000,
    // ... all input parameters
  },
  "results": [
    {
      "strategy": "ai-native",
      "name": "AI-Native Platform",
      "roi": "+540%",
      "implementationCost": "$258,000",
      "annualBenefits": "$896,640",
      "annualCosts": "$31,200",
      "netValue": "$2,258,720",
      "timeToValue": "6 months",
      "features": ["Autonomous Incident Response", "..."]
    }
    // ... other strategies
  ]
}
```

---

## `compare_platform_strategies`

Get a comprehensive comparison of all platform strategies with recommendations formatted for easy reading.

### Parameters

Same parameters as `calculate_platform_roi`.

### Output Format

Returns formatted markdown analysis with:

- Current situation overview
- Strategy rankings by ROI
- Detailed recommendations
- Key decision factors

Example output structure:

```markdown
# Platform Engineering Strategy Comparison

## Current Situation Analysis
- Team Size: 15 engineers
- Annual Team Cost: $2,340,000
- Annual Productivity Loss: $468,000 (20% toil)
- AI Opportunity: +75% potential improvement

## Strategy Rankings (3-Year Analysis)

### 1. AI-Native Platform
- ROI: +540%
- Implementation: $387,000
- Net Value: $3,388,080
- Time to Value: 6 months

### 2. AI-Enhanced Hybrid
...

## Recommendation
Based on your configuration, **AI-Native Platform** offers the best ROI...
```

---

## `get_current_situation_analysis`

Analyze current team productivity, identify toil impact, and quantify improvement opportunities without platform investment details.

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `teamSize` | number | No | 5 | Number of engineers |
| `avgSalary` | number | No | 120000 | Average salary including benefits |
| `toilHours` | number | No | 8 | Weekly toil hours |
| `currentAI` | string | No | "none" | Current AI usage level |

### Output Format

Returns formatted analysis of current state:

```markdown
# Current Situation Analysis

## Team Metrics
- Team Size: 12 engineers
- Total Annual Cost: $1,872,000
- Current Productivity Level: $1,872,000

## Productivity Analysis
- Annual Productivity Loss: $374,400
- Efficiency Gap: 20%
- AI Opportunity: +75% potential improvement

## Weekly Toil Impact
- Toil Hours: 8 hours/week (20% of capacity)
- Toil Cost: $7,200/week

## Recommendations
🚀 High AI Opportunity: Consider AI-Native platform
⚠️ High Toil: Platform engineering investment recommended
```

---

## Calculation Methodology

### Cost Components

#### Implementation Cost
- Base platform cost (varies by strategy)
- Team implementation effort (weeks × 2 FTE × loaded salary / 50 weeks)
- Risk multiplier based on industry, technical debt, AI readiness

#### Annual Costs
- Licensing fees (20% of base platform cost)
- Maintenance effort (FTE × loaded salary)

### Benefit Components

#### Productivity Gains
- Toil reduction: (toil hours / 40) × total team cost × reduction factor
- Reduction factors: Open Source (50%), AI-Hybrid (70%), AI-Native (80%)

#### AI Benefits
- Productivity boost: team cost × (AI multiplier - current AI gain) × 0.8
- Operational savings: team cost × AI savings percentage

#### Deployment Value
- Team size × $1,500 × deployment frequency multiplier

### Multipliers

#### Industry Risk
- General: 1.0x
- Financial: 1.3x
- Healthcare: 1.4x
- Startup: 0.8x

#### Technical Debt Impact
- Low: 0.9x
- Medium: 1.0x
- High: 1.3x
- Very High: 1.6x

#### AI Readiness
- Low: 1.3x
- Intermediate: 1.0x
- High: 0.8x
- Expert: 0.7x

#### Current AI Multiplier
- None: 1.0x
- Basic: 1.15x
- Advanced: 1.35x
- Expert: 1.5x

#### Platform AI Multipliers
- Open Source: 1.0x (no AI enhancement)
- AI-Hybrid: 1.5x productivity multiplier
- AI-Native: 1.75x productivity multiplier

### Time to Value

Time in months before benefits exceed ongoing costs:
- Open Source: 12 months
- AI-Hybrid: 9 months
- AI-Native: 6 months

Benefits ramp up over 12 months starting from time-to-value milestone.

---

## Error Handling

All tools include comprehensive error handling:

- **Invalid Parameters**: Returns error message with valid parameter ranges
- **Calculation Errors**: Provides diagnostic information
- **Missing Data**: Uses documented default values

Example error response:
```json
{
  "content": [
    {
      "type": "text",
      "text": "Error: teamSize must be between 1 and 1000"
    }
  ],
  "isError": true
}
```

---

## Data Sources

Calculations are based on:

- Industry benchmarks from platform engineering implementations
- DORA metrics research and productivity studies  
- "Effective Platform Engineering" methodologies
- AI productivity research (15-75% improvement ranges)
- Real-world case study data from Platformetrics

---

## Limitations

- Results are estimates based on industry averages
- Individual outcomes depend on execution quality and context
- Recommend validation through pilot projects
- Regular updates needed as AI productivity research evolves

For detailed setup instructions, see [MCP Setup Guide](mcp-setup.md).