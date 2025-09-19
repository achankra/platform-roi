#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";

// Types matching your ROI calculator
interface Config {
  teamSize: number;
  avgSalary: number;
  toilHours: number;
  currentAI: 'none' | 'basic' | 'advanced' | 'expert';
  aiReadiness: 'low' | 'intermediate' | 'high' | 'expert';
  deployFreq: 'monthly' | 'weekly' | 'daily';
  industry: 'general' | 'financial' | 'healthcare' | 'startup';
  techDebt: 'low' | 'medium' | 'high' | 'very-high';
  timeHorizon: number;
}

interface StackConfig {
  name: string;
  description: string;
  cost: number;
  implementationWeeks: number;
  maintenanceFTE: number;
  aiMultiplier: number;
  aiSavings: number;
  features: string[];
}

interface ROIResult {
  stack: StackConfig;
  implementationCost: number;
  annualCosts: number;
  annualBenefits: number;
  netValue: number;
  roi: number;
  timeToValue: number;
  aiProductivityBoost: number;
  aiOperationalSavings: number;
}

// Stack configurations from your model.js
const stacks: Record<string, StackConfig> = {
  'open-source': {
    name: 'Open Source Foundation',
    description: 'Community-driven tools with maximum flexibility and control',
    cost: 0,
    implementationWeeks: 16,
    maintenanceFTE: 0.75,
    aiMultiplier: 1.0,
    aiSavings: 0,
    features: []
  },
  'ai-hybrid': {
    name: 'AI-Enhanced Hybrid',
    description: 'Strategic blend of AI tools with proven open source foundation',
    cost: 85000,
    implementationWeeks: 12,
    maintenanceFTE: 0.4,
    aiMultiplier: 1.5,
    aiSavings: 0.25,
    features: [
      'AI Code Generation & Review',
      'Intelligent Ticket Routing',
      'Predictive Monitoring',
      'Automated Documentation',
      'Smart Resource Optimization'
    ]
  },
  'ai-native': {
    name: 'AI-Native Platform',
    description: 'Autonomous operations with AI-first architecture and decision making',
    cost: 180000,
    implementationWeeks: 8,
    maintenanceFTE: 0.2,
    aiMultiplier: 1.75,
    aiSavings: 0.4,
    features: [
      'Autonomous Incident Response',
      'Self-Optimizing Infrastructure',
      'Natural Language Operations',
      'Predictive Scaling & Cost Control',
      'AI-Driven Security & Compliance',
      'Intelligent Developer Onboarding'
    ]
  }
};

// Multipliers from your model.js
const multipliers = {
  industry: { general: 1.0, financial: 1.3, healthcare: 1.4, startup: 0.8 },
  techDebt: { low: 0.9, medium: 1.0, high: 1.3, 'very-high': 1.6 },
  aiReadiness: { low: 1.3, intermediate: 1.0, high: 0.8, expert: 0.7 },
  currentAI: { none: 1.0, basic: 1.15, advanced: 1.35, expert: 1.5 },
  deployFreq: {
    monthly: { 'open-source': 2, 'ai-hybrid': 4, 'ai-native': 6 },
    weekly: { 'open-source': 3, 'ai-hybrid': 6, 'ai-native': 9 },
    daily: { 'open-source': 2, 'ai-hybrid': 4, 'ai-native': 6 }
  }
};

// ROI calculation function from your model.js
function calculateROI(stackKey: string, config: Config): ROIResult {
  const stack = stacks[stackKey];
  const loadedSalary = config.avgSalary * 1.3; // Include benefits
  const totalEngCost = config.teamSize * loadedSalary;
  
  // Risk calculation
  const riskFactor = multipliers.industry[config.industry] * 
                    multipliers.techDebt[config.techDebt] * 
                    multipliers.aiReadiness[config.aiReadiness];
  
  // Implementation cost
  const implementationCost = stack.cost + 
      (stack.implementationWeeks * 2 * (config.avgSalary / 50)) * riskFactor;
  
  // Annual costs
  const annualLicensing = stack.cost * 0.2;
  const maintenanceCost = stack.maintenanceFTE * loadedSalary;
  const annualCosts = annualLicensing + maintenanceCost;
  
  // Benefits calculation
  const toilLoss = (config.toilHours / 40) * totalEngCost;
  const toilReduction = stackKey === 'open-source' ? 0.5 : stackKey === 'ai-hybrid' ? 0.7 : 0.8;
  const productivityGain = toilLoss * toilReduction;
  
  // AI benefits
  const currentAIGain = multipliers.currentAI[config.currentAI];
  const aiProductivityBoost = (totalEngCost * (stack.aiMultiplier - currentAIGain)) * 0.8;
  const aiOperationalSavings = totalEngCost * stack.aiSavings;
  
  // Deployment value
  const deploymentValue = config.teamSize * 1500 * multipliers.deployFreq[config.deployFreq][stackKey as keyof typeof multipliers.deployFreq.weekly];
  
  const annualBenefits = Math.max(0, productivityGain + aiProductivityBoost + aiOperationalSavings + deploymentValue);
  
  // Multi-year calculation
  let totalCosts = implementationCost;
  let totalBenefits = 0;
  const timeToValue = stackKey === 'ai-native' ? 6 : stackKey === 'ai-hybrid' ? 9 : 12; // months
  
  for (let year = 1; year <= config.timeHorizon; year++) {
      totalCosts += annualCosts;
      if (year * 12 >= timeToValue) {
          const rampFactor = Math.min(1.0, (year * 12 - timeToValue + 6) / 12);
          totalBenefits += annualBenefits * rampFactor;
      }
  }
  
  const netValue = totalBenefits - totalCosts;
  const roi = totalCosts > 0 ? (netValue / totalCosts) * 100 : 0;
  
  return {
      stack,
      implementationCost,
      annualCosts,
      annualBenefits,
      netValue,
      roi,
      timeToValue: Math.ceil(timeToValue),
      aiProductivityBoost,
      aiOperationalSavings
  };
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
  }).format(amount);
}

// Create server instance
const server = new Server(
  {
    name: "platform-roi-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "calculate_platform_roi",
        description: "Calculate ROI for different platform engineering strategies (Open Source, AI-Hybrid, AI-Native)",
        inputSchema: {
          type: "object",
          properties: {
            teamSize: { type: "number", description: "Number of engineers on the team", minimum: 1, maximum: 1000, default: 5 },
            avgSalary: { type: "number", description: "Average engineer salary including benefits (USD)", minimum: 50000, maximum: 300000, default: 120000 },
            toilHours: { type: "number", description: "Weekly hours spent on manual operational work", minimum: 0, maximum: 40, default: 8 },
            currentAI: { 
              type: "string", 
              enum: ["none", "basic", "advanced", "expert"],
              description: "Current level of AI tool adoption",
              default: "none"
            },
            aiReadiness: { 
              type: "string", 
              enum: ["low", "intermediate", "high", "expert"],
              description: "Team's ability to adopt new AI tools",
              default: "intermediate"
            },
            deployFreq: { 
              type: "string", 
              enum: ["monthly", "weekly", "daily"],
              description: "Current deployment frequency",
              default: "weekly"
            },
            industry: { 
              type: "string", 
              enum: ["general", "financial", "healthcare", "startup"],
              description: "Industry affects compliance requirements",
              default: "general"
            },
            techDebt: { 
              type: "string", 
              enum: ["low", "medium", "high", "very-high"],
              description: "Level of legacy technical debt",
              default: "medium"
            },
            timeHorizon: { type: "number", description: "Time horizon for ROI analysis in years", minimum: 1, maximum: 5, default: 3 }
          },
          required: []
        }
      } as Tool,
      {
        name: "compare_platform_strategies",
        description: "Compare all three platform strategies and get recommendations",
        inputSchema: {
          type: "object",
          properties: {
            teamSize: { type: "number", default: 5 },
            avgSalary: { type: "number", default: 120000 },
            toilHours: { type: "number", default: 8 },
            currentAI: { type: "string", enum: ["none", "basic", "advanced", "expert"], default: "none" },
            aiReadiness: { type: "string", enum: ["low", "intermediate", "high", "expert"], default: "intermediate" },
            deployFreq: { type: "string", enum: ["monthly", "weekly", "daily"], default: "weekly" },
            industry: { type: "string", enum: ["general", "financial", "healthcare", "startup"], default: "general" },
            techDebt: { type: "string", enum: ["low", "medium", "high", "very-high"], default: "medium" },
            timeHorizon: { type: "number", default: 3 }
          },
          required: []
        }
      } as Tool,
      {
        name: "get_current_situation_analysis",
        description: "Analyze current productivity loss and AI opportunity",
        inputSchema: {
          type: "object",
          properties: {
            teamSize: { type: "number", default: 5 },
            avgSalary: { type: "number", default: 120000 },
            toilHours: { type: "number", default: 8 },
            currentAI: { type: "string", enum: ["none", "basic", "advanced", "expert"], default: "none" }
          },
          required: []
        }
      } as Tool
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "calculate_platform_roi": {
        const config: Config = {
          teamSize: (args?.teamSize as number) || 5,
          avgSalary: (args?.avgSalary as number) || 120000,
          toilHours: (args?.toilHours as number) || 8,
          currentAI: (args?.currentAI as Config['currentAI']) || 'none',
          aiReadiness: (args?.aiReadiness as Config['aiReadiness']) || 'intermediate',
          deployFreq: (args?.deployFreq as Config['deployFreq']) || 'weekly',
          industry: (args?.industry as Config['industry']) || 'general',
          techDebt: (args?.techDebt as Config['techDebt']) || 'medium',
          timeHorizon: (args?.timeHorizon as number) || 3
        };

        const results = Object.keys(stacks).map(stackKey => ({
          strategy: stackKey,
          ...calculateROI(stackKey, config)
        })).sort((a, b) => b.roi - a.roi);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                message: "Platform Engineering ROI Analysis Complete",
                configuration: config,
                results: results.map(result => ({
                  strategy: result.strategy,
                  name: result.stack.name,
                  roi: `${result.roi > 0 ? '+' : ''}${Math.round(result.roi)}%`,
                  implementationCost: formatCurrency(result.implementationCost),
                  annualBenefits: formatCurrency(result.annualBenefits),
                  annualCosts: formatCurrency(result.annualCosts),
                  netValue: formatCurrency(result.netValue),
                  timeToValue: `${result.timeToValue} months`,
                  features: result.stack.features
                }))
              }, null, 2)
            }
          ]
        };
      }

      case "compare_platform_strategies": {
        const config: Config = {
          teamSize: (args?.teamSize as number) || 5,
          avgSalary: (args?.avgSalary as number) || 120000,
          toilHours: (args?.toilHours as number) || 8,
          currentAI: (args?.currentAI as Config['currentAI']) || 'none',
          aiReadiness: (args?.aiReadiness as Config['aiReadiness']) || 'intermediate',
          deployFreq: (args?.deployFreq as Config['deployFreq']) || 'weekly',
          industry: (args?.industry as Config['industry']) || 'general',
          techDebt: (args?.techDebt as Config['techDebt']) || 'medium',
          timeHorizon: (args?.timeHorizon as number) || 3
        };

        const results = Object.keys(stacks)
          .map(key => ({ key, ...calculateROI(key, config) }))
          .sort((a, b) => b.roi - a.roi);

        const recommendation = results[0];
        const totalEngCost = config.teamSize * (config.avgSalary * 1.3);
        const toilLoss = (config.toilHours / 40) * totalEngCost;

        return {
          content: [
            {
              type: "text",
              text: `# Platform Engineering Strategy Comparison

## Current Situation Analysis
- **Team Size**: ${config.teamSize} engineers
- **Annual Team Cost**: ${formatCurrency(totalEngCost)}
- **Annual Productivity Loss**: ${formatCurrency(toilLoss)} (${Math.round((config.toilHours / 40) * 100)}% toil)
- **AI Opportunity**: +${Math.round(((1.75 - multipliers.currentAI[config.currentAI]) / multipliers.currentAI[config.currentAI]) * 100)}% potential improvement

## Strategy Rankings (${config.timeHorizon}-Year Analysis)

${results.map((result, index) => `
### ${index + 1}. ${result.stack.name}
- **ROI**: ${result.roi > 0 ? '+' : ''}${Math.round(result.roi)}%
- **Implementation**: ${formatCurrency(result.implementationCost)}
- **Annual Benefits**: ${formatCurrency(result.annualBenefits)}
- **Net Value**: ${formatCurrency(result.netValue)}
- **Time to Value**: ${result.timeToValue} months
${result.stack.features.length > 0 ? `- **AI Features**: ${result.stack.features.join(', ')}` : ''}
`).join('')}

## Recommendation
Based on your configuration, **${recommendation.stack.name}** offers the best ROI at ${recommendation.roi > 0 ? '+' : ''}${Math.round(recommendation.roi)}% over ${config.timeHorizon} years.

**Key Factors:**
- Industry: ${config.industry}
- Technical Debt: ${config.techDebt}
- AI Readiness: ${config.aiReadiness}
- Current AI Usage: ${config.currentAI}
`
            }
          ]
        };
      }

      case "get_current_situation_analysis": {
        const teamSize = (args?.teamSize as number) || 5;
        const avgSalary = (args?.avgSalary as number) || 120000;
        const toilHours = (args?.toilHours as number) || 8;
        const currentAI = (args?.currentAI as Config['currentAI']) || 'none';

        const loadedSalary = avgSalary * 1.3;
        const totalEngCost = teamSize * loadedSalary;
        const toilLoss = (toilHours / 40) * totalEngCost;
        const currentProductivity = totalEngCost * multipliers.currentAI[currentAI as keyof typeof multipliers.currentAI];
        const aiOpportunity = Math.round(((1.75 - multipliers.currentAI[currentAI as keyof typeof multipliers.currentAI]) / multipliers.currentAI[currentAI as keyof typeof multipliers.currentAI]) * 100);

        return {
          content: [
            {
              type: "text",
              text: `# Current Situation Analysis

## Team Metrics
- **Team Size**: ${teamSize} engineers
- **Average Salary**: ${formatCurrency(avgSalary)}
- **Total Annual Cost**: ${formatCurrency(totalEngCost)} (including benefits)

## Productivity Analysis
- **Annual Productivity Loss**: ${formatCurrency(toilLoss)}
- **Current Productivity Level**: ${formatCurrency(currentProductivity)}
- **Efficiency Gap**: ${Math.round((toilLoss / totalEngCost) * 100)}%
- **AI Opportunity**: +${aiOpportunity}% potential improvement

## Weekly Toil Impact
- **Toil Hours**: ${toilHours} hours/week (${Math.round((toilHours / 40) * 100)}% of capacity)
- **Toil Cost**: ${formatCurrency(toilLoss / 52)}/week

## Recommendations
${aiOpportunity > 50 ? '🚀 **High AI Opportunity**: Consider AI-Native platform for maximum gains' : ''}
${toilHours > 16 ? '⚠️ **High Toil**: Platform engineering investment strongly recommended' : ''}
${toilHours < 4 ? '✅ **Low Toil**: Focus on AI productivity enhancements' : ''}
`
            }
          ]
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`
        }
      ],
      isError: true,
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Platform ROI MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});