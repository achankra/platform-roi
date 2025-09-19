# Platform ROI Documentation

Comprehensive documentation for the Platform Engineering ROI Calculator Suite.

## Getting Started

### Web Calculator
The interactive browser-based ROI calculator provides real-time analysis and visualizations.

- **Quick Start**: Open `web/model.html` in your browser
- **Configuration**: Adjust team size, salaries, industry, and technical debt parameters
- **Analysis**: View real-time ROI calculations for three platform strategies
- **Visualizations**: Charts showing ROI over time, investments vs returns, and net value accumulation

### MCP Server
The Model Context Protocol server enables AI assistants to perform ROI calculations through natural language.

- **Setup Guide**: [MCP Configuration](mcp-setup.md)
- **Tools Reference**: [Available MCP Tools](mcp-tools.md)
- **Usage Examples**: [Common Queries](mcp-examples.md)

## Architecture

### Calculation Methodology
Both the web calculator and MCP server use identical ROI calculation logic based on:

- **Cost Modeling**: Implementation effort, licensing, maintenance costs
- **Benefit Analysis**: Productivity gains, AI enhancements, deployment value improvements
- **Risk Assessment**: Industry multipliers, technical debt, AI readiness factors
- **Multi-year Projections**: Time-to-value calculations and benefit ramp-up

### Platform Strategies

#### Open Source Foundation (OSF)
- Community-driven tools with maximum control
- Lower upfront costs, longer implementation timeline
- Best for teams with strong technical expertise

#### AI-Enhanced Hybrid
- Strategic blend of AI tools with proven open source foundation
- Balanced cost and complexity
- Optimal for gradual AI adoption

#### AI-Native Platform
- AI-first architecture with autonomous operations
- Highest ROI potential, fastest time-to-value
- Requires higher AI readiness and investment

## Configuration Parameters

### Team Metrics
- **Team Size**: Number of engineers (1-1000)
- **Average Salary**: Annual compensation including benefits
- **Toil Hours**: Weekly manual operational work

### Organizational Context
- **Industry**: General, Financial Services, Healthcare, Startup
- **Technical Debt**: Low, Medium, High, Very High
- **AI Readiness**: Low, Intermediate, High, Expert
- **Current AI Usage**: None, Basic, Advanced, Expert

### Analysis Settings
- **Deployment Frequency**: Monthly, Weekly, Daily
- **Time Horizon**: 1-5 years for ROI analysis

## Multipliers and Factors

### Industry Risk Multipliers
- **General Technology**: 1.0x baseline
- **Financial Services**: 1.3x (regulatory complexity)
- **Healthcare**: 1.4x (compliance requirements)
- **Startup**: 0.8x (agility advantage)

### Technical Debt Impact
- **Low**: 0.9x implementation cost
- **Medium**: 1.0x baseline
- **High**: 1.3x increased complexity
- **Very High**: 1.6x significant overhead

### AI Readiness Factors
- **Low**: 1.3x implementation risk
- **Intermediate**: 1.0x baseline
- **High**: 0.8x faster adoption
- **Expert**: 0.7x optimal conditions

## Output Metrics

### Current Situation Analysis
- **Annual Productivity Loss**: Cost of toil and inefficiencies
- **Efficiency Gap**: Percentage of capacity lost to manual work
- **AI Opportunity**: Potential productivity improvement percentage

### ROI Calculations
- **Implementation Cost**: Upfront investment including team time
- **Annual Benefits**: Productivity gains, AI enhancements, operational savings
- **Net Value**: Total benefits minus total costs over time horizon
- **ROI Percentage**: Return on investment as percentage
- **Time to Value**: Months until benefits exceed costs

## Validation and Accuracy

### Data Sources
- Industry benchmarks from platform engineering implementations
- DORA metrics research and productivity studies
- Real-world case studies from "Effective Platform Engineering"
- AI productivity research and adoption patterns

### Limitations
- Results are estimates based on industry averages
- Individual outcomes depend on execution quality and organizational context
- Recommend pilot projects to validate assumptions
- Regular model updates based on new research and implementations

## Integration Options

### Web Integration
- Embed calculator iframe in internal tools
- Customize styling and branding
- Export results for presentations

### AI Assistant Integration
- Claude Desktop MCP server connection
- Custom MCP client implementations
- API endpoints for programmatic access

## Support and Updates

### Community
- GitHub repository: [platform-roi](https://github.com/achankra/platform-roi)
- Issue tracking and feature requests
- Community contributions welcome

### Methodology Updates
- Based on "Effective Platform Engineering" framework
- Regular updates for new industry data
- AI productivity research integration

### Version History
- v1.0: Initial web calculator release
- v1.1: MCP server integration
- Future: API endpoints, advanced modeling

For specific implementation questions, see the individual guide files or create an issue in the GitHub repository.