        fetch('header.html')
            .then(response => response.text())
            .then(data => document.getElementById('header-placeholder').innerHTML = data);

        fetch('footer.html')
            .then(response => response.text())
            .then(data => document.getElementById('footer-placeholder').innerHTML = data);

        function toggleMenu() {
            const nav = document.querySelector("nav");
            if (nav) {
                nav.classList.toggle("active");
            }
        }

        // Stack configurations
        const stacks = {
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

        // Configuration
        let config = {
            teamSize: 5,
            avgSalary: 120000,
            toilHours: 8,
            currentAI: 'none',
            aiReadiness: 'intermediate',
            deployFreq: 'weekly',
            industry: 'general',
            techDebt: 'medium',
            timeHorizon: 3
        };

        // Risk and productivity multipliers
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

        function calculateROI(stackKey) {
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
            const deploymentValue = config.teamSize * 1500 * multipliers.deployFreq[config.deployFreq][stackKey];
            
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

        function formatCurrency(amount) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(amount);
        }

        function updateResults() {
            const results = Object.keys(stacks)
                .map(key => ({ key, ...calculateROI(key) }))
                .sort((a, b) => b.roi - a.roi);
            
            // Current situation
            const loadedSalary = config.avgSalary * 1.3;
            const totalEngCost = config.teamSize * loadedSalary;
            const toilLoss = (config.toilHours / 40) * totalEngCost;
            const currentProductivity = totalEngCost * multipliers.currentAI[config.currentAI];
            const aiOpportunity = Math.round(((1.75 - multipliers.currentAI[config.currentAI]) / multipliers.currentAI[config.currentAI]) * 100);
            
            document.getElementById('currentSituation').innerHTML = `
                <div class="metric-card loss">
                    <div class="value">${formatCurrency(toilLoss)}</div>
                    <div class="label">Annual Productivity Loss</div>
                </div>
                <div class="metric-card current">
                    <div class="value">${formatCurrency(currentProductivity)}</div>
                    <div class="label">Current Productivity</div>
                </div>
                <div class="metric-card gain">
                    <div class="value">+${aiOpportunity}%</div>
                    <div class="label">AI Opportunity</div>
                </div>
                <div class="metric-card opportunity">
                    <div class="value">${Math.round((toilLoss / totalEngCost) * 100)}%</div>
                    <div class="label">Efficiency Gap</div>
                </div>
            `;
            
            // Stack results
            document.getElementById('stackResults').innerHTML = results.map((result, index) => `
                <div class="stack-card rank-${index + 1}">
                    <div class="stack-header">
                        <div class="stack-title">
                            <h3>${result.stack.name}</h3>
                            <p>${result.stack.description}</p>
                        </div>
                        <div class="stack-roi">
                            <div class="value">${result.roi > 0 ? '+' : ''}${Math.round(result.roi)}%</div>
                            <div class="label">${config.timeHorizon}-Year ROI</div>
                        </div>
                    </div>
                    
                    <div class="stack-metrics">
                        <div class="stack-metric">
                            <div class="value">${formatCurrency(result.implementationCost)}</div>
                            <div class="label">Implementation</div>
                        </div>
                        <div class="stack-metric">
                            <div class="value">${formatCurrency(result.annualBenefits)}</div>
                            <div class="label">Annual Benefits</div>
                        </div>
                        <div class="stack-metric">
                            <div class="value">${formatCurrency(result.annualCosts)}</div>
                            <div class="label">Annual Costs</div>
                        </div>
                        <div class="stack-metric">
                            <div class="value">${result.timeToValue} mo</div>
                            <div class="label">Time to Value</div>
                        </div>
                        <div class="stack-metric">
                            <div class="value">${formatCurrency(result.netValue)}</div>
                            <div class="label">Net Value</div>
                        </div>
                    </div>
                    
                    ${result.stack.features.length > 0 ? `
                    <div class="ai-features">
                        <h4>AI-Enhanced Capabilities</h4>
                        <div class="features-grid">
                            ${result.stack.features.map(feature => `<div class="feature">${feature}</div>`).join('')}
                        </div>
                    </div>
                    ` : ''}
                </div>
            `).join('');
        }

        // Event listeners
        function setupEventListeners() {
            const inputs = ['teamSize', 'avgSalary', 'toilHours', 'timeHorizon'];
            const selects = ['currentAI', 'aiReadiness', 'deployFreq', 'industry', 'techDebt'];
            
            inputs.forEach(id => {
                document.getElementById(id).addEventListener('input', (e) => {
                    config[id] = parseInt(e.target.value) || 0;
                    updateResults();
                });
            });
            
            selects.forEach(id => {
                document.getElementById(id).addEventListener('change', (e) => {
                    config[id] = e.target.value;
                    updateResults();
                });
            });
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            setupEventListeners();
            updateResults();
        });

