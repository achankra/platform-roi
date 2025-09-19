        let __chartsInitialized = false;
        let roiOverTimeChart, investmentsReturnsChart, netValueChart;

        function syncChartsColspan() {
            const chartsSection = document.getElementById('charts');
            if (!chartsSection) return;
            const allTables = Array.from(document.querySelectorAll('table'));
            let referenceTable = null;
            for (let i = allTables.length - 1; i >= 0; i--) {
                if (allTables[i].compareDocumentPosition(chartsSection) & Node.DOCUMENT_POSITION_FOLLOWING) {
                    referenceTable = allTables[i];
                    break;
                }
            }
            if (!referenceTable) return;
            const firstRow = referenceTable.tHead?.rows?.[0] || referenceTable.tBodies?.[0]?.rows?.[0];
            let colCount = 3;
            if (firstRow) {
                colCount = Array.from(firstRow.cells).reduce((sum, cell) => sum + (parseInt(cell.colSpan) || 1), 0) || 3;
            }
            ['charts-col-1','charts-col-2','charts-col-3'].forEach(id => {
                const cell = document.getElementById(id);
                if (cell) cell.colSpan = colCount;
            });
        }

        function computeYearlySeries(stackKey) {
            const r = calculateROI(stackKey);
            const years = parseInt(config.timeHorizon) || 3;
            const yearly = {
                yearLabels: Array.from({length: years}, (_, i) => `Year ${i+1}`),
                benefits: [], costs: [],
                cumBenefits: [], cumCosts: [],
                cumROI: [], cumNet: []
            };
            let cumB = 0, cumC = 0;
            for (let y = 1; y <= years; y++) {
                const monthsElapsed = y * 12;
                let ramp = 0;
                if (monthsElapsed >= r.timeToValue) {
                    ramp = Math.min(1.0, (monthsElapsed - r.timeToValue + 6) / 12);
                }
                const yearBenefits = r.annualBenefits * ramp;
                const yearCosts = (y === 1 ? r.implementationCost : 0) + r.annualCosts;
                cumB += yearBenefits;
                cumC += yearCosts;
                yearly.benefits.push(yearBenefits);
                yearly.costs.push(yearCosts);
                yearly.cumBenefits.push(cumB);
                yearly.cumCosts.push(cumC);
                const net = cumB - cumC;
                yearly.cumNet.push(net);
                yearly.cumROI.push(cumC > 0 ? (net / cumC) * 100 : 0);
            }
            return { r, yearly };
        }

        function initCharts() {
            if (__chartsInitialized) return;
            __chartsInitialized = true;
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js';
            script.onload = () => {
                const ctx1 = document.getElementById('roiOverTimeChart').getContext('2d');
                const ctx2 = document.getElementById('investmentsReturnsChart').getContext('2d');
                const ctx3 = document.getElementById('netValueChart').getContext('2d');

                roiOverTimeChart = new Chart(ctx1, {
                    type: 'line',
                    data: { labels: [], datasets: [] },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        interaction: { mode: 'index', intersect: false },
                        plugins: { legend: { position: 'bottom' } },
                        scales: { y: { title: { display: true, text: 'ROI % (Cumulative)' } } }
                    }
                });
                investmentsReturnsChart = new Chart(ctx2, {
                    type: 'bar',
                    data: { labels: [], datasets: [] },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { position: 'bottom' } },
                        scales: {
                            y: { title: { display: true, text: 'USD (Cumulative)' },
                                 ticks: { callback: (v) => new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(v) } }
                        }
                    }
                });
                netValueChart = new Chart(ctx3, {
                    type: 'line',
                    data: { labels: [], datasets: [] },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        interaction: { mode: 'index', intersect: false },
                        plugins: { legend: { position: 'bottom' } },
                        elements: { line: { fill: true } },
                        scales: {
                            y: { title: { display: true, text: 'Net Value (Cumulative USD)' },
                                 ticks: { callback: (v) => new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(v) } }
                        }
                    }
                });
                syncChartsColspan();
                updateCharts();
            };
            document.head.appendChild(script);
        }

        function updateCharts() {
            if (!__chartsInitialized) return;
            const os = computeYearlySeries('open-source');
            const hy = computeYearlySeries('ai-hybrid');
            const na = computeYearlySeries('ai-native');
            const labels = os.yearly.yearLabels;

            roiOverTimeChart.data.labels = labels;
            roiOverTimeChart.data.datasets = [
                { label: 'Open Source Foundation', data: os.yearly.cumROI.map(x=>Math.round(x)), borderColor: 'rgba(0,123,255,1)', backgroundColor: 'rgba(0,123,255,0.15)', tension: 0.25 },
                { label: 'AI-Enhanced Hybrid', data: hy.yearly.cumROI.map(x=>Math.round(x)), borderColor: 'rgba(102,102,102,1)', backgroundColor: 'rgba(102,102,102,0.15)', tension: 0.25 },
                { label: 'AI-Native Platform', data: na.yearly.cumROI.map(x=>Math.round(x)), borderColor: 'rgba(40,167,69,1)', backgroundColor: 'rgba(40,167,69,0.15)', tension: 0.25 }
            ];
            roiOverTimeChart.update();

            const stacksLabels = ['Open Source', 'AI-Enhanced Hybrid', 'AI-Native'];
            investmentsReturnsChart.data.labels = stacksLabels;
            investmentsReturnsChart.data.datasets = [
                { label: 'Total Investment', data: [os.yearly.cumCosts.at(-1), hy.yearly.cumCosts.at(-1), na.yearly.cumCosts.at(-1)], backgroundColor: 'rgba(108,117,125,0.25)', borderColor: 'rgba(108,117,125,0.6)', borderWidth: 1 },
                { label: 'Total Returns', data: [os.yearly.cumBenefits.at(-1), hy.yearly.cumBenefits.at(-1), na.yearly.cumBenefits.at(-1)], backgroundColor: 'rgba(40,167,69,0.25)', borderColor: 'rgba(40,167,69,0.6)', borderWidth: 1 }
            ];
            investmentsReturnsChart.update();

            netValueChart.data.labels = labels;
            netValueChart.data.datasets = [
                { label: 'Open Source Foundation', data: os.yearly.cumNet, borderColor: 'rgba(0,123,255,1)', backgroundColor: 'rgba(0,123,255,0.10)', tension: 0.25, fill: true },
                { label: 'AI-Enhanced Hybrid', data: hy.yearly.cumNet, borderColor: 'rgba(102,102,102,1)', backgroundColor: 'rgba(102,102,102,0.10)', tension: 0.25, fill: true },
                { label: 'AI-Native Platform', data: na.yearly.cumNet, borderColor: 'rgba(40,167,69,1)', backgroundColor: 'rgba(40,167,69,0.10)', tension: 0.25, fill: true }
            ];
            netValueChart.update();

            const h = parseInt(config.timeHorizon) || 3;
            const lbl = document.getElementById('horizonLabel');
            if (lbl) lbl.textContent = h;
        }

        document.addEventListener('DOMContentLoaded', () => {
            const chartsSection = document.getElementById('charts');
            if (!chartsSection) return;
            if (!('IntersectionObserver' in window)) { initCharts(); return; }
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        initCharts();
                        observer.disconnect();
                    }
                });
            }, { rootMargin: '200px 0px' });
            observer.observe(chartsSection);
            window.addEventListener('resize', syncChartsColspan);
            syncChartsColspan();
        });

        (function() {
            if (typeof updateResults === 'function') {
                const original = updateResults;
                window.updateResults = function() {
                    original();
                    updateCharts();
                };
            }
        })();


