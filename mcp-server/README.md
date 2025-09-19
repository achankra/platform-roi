# Platform ROI MCP Server

An MCP (Model Context Protocol) server for the Platform Engineering ROI Calculator, enabling AI assistants to calculate ROI for different platform engineering strategies.

## Features

- **Calculate Platform ROI**: Get ROI calculations for Open Source, AI-Hybrid, and AI-Native platform strategies
- **Strategy Comparison**: Compare all three approaches with detailed analysis and recommendations  
- **Current Situation Analysis**: Analyze productivity loss, toil impact, and AI opportunities
- **Industry-Specific Calculations**: Accounts for industry multipliers (financial, healthcare, startup, general)
- **AI Readiness Assessment**: Factors in team AI adoption capabilities

## Installation

1. **Create the MCP server directory:**
```bash
mkdir platform-roi-mcp-server
cd platform-roi-mcp-server
```

2. **Initialize the project:**
```bash
npm init -y
```

3. **Install dependencies:**
```bash
npm install @modelcontextprotocol/sdk
npm install --save-dev typescript @types/node
```

4. **Create the source directory and files:**
```bash
mkdir src
# Copy the TypeScript files from the artifacts above
```

5. **Build the project:**
```bash
npm run build
```

## Configuration

### For Claude Desktop

Add this to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "platform-roi": {
      "command": "node",
      "args": ["./dist/index.js"],
      "cwd": "/absolute/path/to/your/platform-roi-mcp-server"
    }
  }
}
```

### For Other MCP Clients

Use the `stdio` transport with the command:
```bash
node /path/to/platform-roi-mcp-server/dist/index.js
```

## Available Tools

### 1. `calculate_platform_roi`
Calculate ROI for all three platform strategies with detailed breakdown.

**Parameters:**
- `teamSize` (number): Engineering team size (1-1000, default: 5)
- `avgSalary` (number): Average salary including benefits (50k-300k, default: 120k)  
- `toilHours` (number): Weekly toil hours (0-40, default: 8)
- `currentAI` (string): Current AI usage level (none/basic/advanced/expert)
- `aiReadiness` (string): Team AI readiness (low/intermediate/high/expert)
- `deployFreq` (string): Deployment frequency (monthly/weekly/daily)
- `industry` (string): Industry type (general/financial/healthcare/startup)
- `techDebt` (string): Technical debt level (low/medium/high/very-high)
- `timeHorizon` (number): Analysis period in years (1-5, default: 3)

### 2. `compare_platform_strategies`
Get a comprehensive comparison with recommendations.

Same parameters as above, returns formatted analysis with:
- Current situation metrics
- Strategy rankings by ROI
- Detailed recommendations based on your configuration

### 3. `get_current_situation_analysis`
Analyze current productivity and identify opportunities.

**Parameters:**
- `teamSize`, `avgSalary`, `toilHours`, `currentAI`

Returns analysis of productivity loss, toil impact, and improvement opportunities.

## Usage Examples

### Basic ROI Calculation
```
Calculate the platform engineering ROI for a team of 10 engineers with $130k average salary, spending 12 hours per week on toil, currently using basic AI tools, in the financial services industry.
```

### Strategy Comparison
```
Compare platform strategies for a healthcare startup with 8 engineers, high technical debt, intermediate AI readiness, and weekly deployments.
```

### Current Analysis
```
Analyze our current situation: 15 engineers at $140k average salary, 16 hours weekly toil, no current AI usage.
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Development mode with watch
npm run dev

# Test
npm test
```

## Architecture

The MCP server implements the core ROI calculation logic from your web calculator:

1. **Risk Calculation**: Industry, technical debt, and AI readiness multipliers
2. **Cost Modeling**: Implementation effort, licensing, maintenance costs
3. **Benefit Analysis**: Productivity gains, AI enhancements, deployment value
4. **Multi-year Projections**: Time-to-value calculations and ramp-up factors

## Methodology

Based on methodologies from "Effective Platform Engineering" and real-world implementation data, the calculations include:

- **7-Plane Architecture** considerations
- **DORA metrics** impact modeling  
- **AI productivity multipliers** (15-75% gains)
- **Industry-specific** risk factors
- **Technical debt** impact on implementation

## License

MIT License - Same as your existing ROI calculator project.

## Support

For questions about the MCP server implementation or ROI methodology, refer to:
- [Introduction to MCP Servers](https://dev.to/pavanbelagatti/model-context-protocol-mcp-101-a-hands-on-beginners-guide-47ho)
- [Introducing MCP](https://effectiveplatformengineering.com](https://www.anthropic.com/news/model-context-protocol))
