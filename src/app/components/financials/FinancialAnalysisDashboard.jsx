// components/FinancialAnalysisDashboard.jsx
import React, { useState, useEffect } from "react";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import {
  calculateFinancialMetricsFromRaw,
  generateChartJsFromTrendData,
} from "@/lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
);

// Define required statements for each graph type
const graphRequirements = {
  "Revenue Trend": {
    statements: ["incomeStatement"],
    metrics: ["Total Revenue"],
  },
  "Net Income Comparison": {
    statements: ["incomeStatement"],
    metrics: ["Net Income Common Stockholders"],
  },
  "Asset Composition": {
    statements: ["balanceSheet"],
    metrics: [
      "Cash, Cash Equivalents & Federal Funds Sold",
      "Net Loan",
      "Securities and Investments",
      "Net PPE",
    ],
  },
  "Debt-to-Equity Ratio": {
    statements: ["balanceSheet"],
    metrics: ["Total Debt", "Total Equity Gross Minority Interest"],
  },
  "Loan Portfolio Growth": {
    statements: ["balanceSheet"],
    metrics: ["Gross Loan"],
  },
  "Interest Income vs Expense": {
    statements: ["incomeStatement"],
    metrics: ["Interest Income", "Interest Expense"],
  },
  "Operating Cash Flow": {
    statements: ["cashFlow"],
    metrics: ["Operating Cash Flow"],
  },
  "EPS Comparison": {
    statements: ["incomeStatement"],
    metrics: ["Basic EPS", "Diluted EPS"],
  },
  "Efficiency Ratio": {
    statements: ["incomeStatement"],
    metrics: ["Non Interest Expense", "Total Revenue"],
  },
  "Deposit Growth": {
    statements: ["balanceSheet"],
    metrics: ["Total Deposits"],
  },
};

const FinancialAnalysisDashboard = () => {
  const [selectedGraph, setSelectedGraph] = useState("");
  const [graphPrompt, setGraphPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [graphData, setGraphData] = useState(null);
  const [companyData, setCompanyData] = useState({});
  const [periodType, setPeriodType] = useState("annual"); // New state for report type

  const selectedCompanies = useSelector(
    (state) => state.sidebar.selectedCompanies,
  );
  const selectedYear = useSelector((state) => state.sidebar.selectedYear);
  const selectedQuarter = useSelector((state) => state.sidebar.selectedQuarter);

  // Load data for selected companies
  useEffect(() => {
    const loadData = async () => {
      const newData = {};
      for (const ticker of selectedCompanies) {
        if (!companyData[ticker]) {
          const data = await fetchCompanyData(ticker);
          newData[ticker] = data;
        }
      }
      setCompanyData((prev) => ({ ...prev, ...newData }));
    };

    if (selectedCompanies.length > 0) {
      loadData();
    }
  }, [selectedCompanies]);

  const fetchCompanyData = async (ticker) => {
    try {
      const response = await fetch(`/api/scrape-yf?ticker=${ticker}`);
      if (!response.ok) throw new Error("Failed to fetch data");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  // Extract only the required data for the selected graph type
  const prepareCompanyDataForGraph = (ticker) => {
    if (!selectedGraph || !companyData[ticker] || !companyData[ticker].data) {
      return null;
    }

    const requirements = graphRequirements[selectedGraph];
    const preparedData = {};

    requirements.statements.forEach((statementType) => {
      if (companyData[ticker].data[statementType]?.[periodType]) {
        preparedData[statementType] = {
          [periodType]: {
            // Keep the same structure expected by calculateFinancialMetricsFromRaw
            headers:
              companyData[ticker].data[statementType][periodType].headers,
            rows: companyData[ticker].data[statementType][
              periodType
            ].rows.filter((row) =>
              requirements.metrics.some((metric) =>
                row.metric.includes(metric),
              ),
            ),
          },
        };
      }
    });

    return preparedData;
  };

  const generateGraph = async () => {
    if (!selectedGraph || selectedCompanies.length === 0) return;

    setIsLoading(true);

    try {
      // Prepare filtered data for each company
      const filteredCompanyData = {};
      for (const ticker of selectedCompanies) {
        const preparedData = prepareCompanyDataForGraph(ticker);
        if (preparedData) {
          filteredCompanyData[ticker] = preparedData;
        }
      }

      //   const response = await fetch("/api/generate-chart", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       companies: selectedCompanies,
      //       graphType: selectedGraph,
      //       prompt: graphPrompt,
      //       companyData: filteredCompanyData,
      //     }),
      //   });

      //   if (!response.ok) throw new Error("Failed to generate chart");
      //   const result = await response.json();
      //   setGraphData(result);
      console.log("filteredCompanyData", filteredCompanyData);

      const result = calculateFinancialMetricsFromRaw(
        filteredCompanyData,
        periodType,
      );
      console.log("result", result);
      const chartData = generateChartJsFromTrendData(result);
      console.log("chartData", chartData);

      setGraphData(chartData);
    } catch (error) {
      console.error("Error generating graph:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderGraph = () => {
    if (!graphData) return null;

    switch (graphData.chartType) {
      case "bar":
        return <Bar data={graphData.data} options={graphData.options} />;
      case "line":
        return <Line data={graphData.data} options={graphData.options} />;
      case "pie":
        return <Pie data={graphData.data} options={graphData.options} />;
      case "doughnut":
        return <Doughnut data={graphData.data} options={graphData.options} />;
      default:
        return <Bar data={graphData.data} options={graphData.options} />;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Graph Selection */}
        <div className="p-4 rounded w-full">
          <div className="flex gap-4 mb-4">
            <label className="text-lg font-semibold mb-2">
              Select Graph Type
            </label>
            <Select value={selectedGraph} onValueChange={setSelectedGraph}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a graph type" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(graphRequirements).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4 mb-4">
            <label className="text-lg font-semibold mb-2">
              Select Period Type
            </label>
            <Select value={periodType} onValueChange={setPeriodType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Period Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="annual">Annual</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedGraph && (
            <div className="mt-4">
              <div className="mb-3 p-3 bg-blue-50 rounded">
                <h3 className="font-medium text-sm mb-1">Required Data:</h3>
                <div className="flex flex-wrap gap-1">
                  {graphRequirements[selectedGraph].statements.map(
                    (statement) => (
                      <span
                        key={statement}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                      >
                        {statement}
                      </span>
                    ),
                  )}
                </div>
              </div>
              <label className="block text-sm font-medium mb-1">
                Customize your graph request:
              </label>
              <input
                type="text"
                className="w-full border rounded p-2 mb-2"
                placeholder="E.g., 'Compare quarterly revenue growth'"
                value={graphPrompt}
                onChange={(e) => setGraphPrompt(e.target.value)}
              />
              <button
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:bg-gray-400"
                onClick={generateGraph}
                disabled={isLoading || selectedCompanies.length === 0}
              >
                {isLoading ? "Generating..." : "Generate Graph"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Graph Display Area */}
      {isLoading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2">Generating your visualization...</p>
        </div>
      ) : graphData ? (
        <div className="bg-white p-6 rounded shadow mb-8">
          <div className="h-96 mb-4">{renderGraph()}</div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">LLM Analysis</h3>
            <div className="bg-gray-50 p-4 rounded mb-4">
              <p>{graphData.analysis}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">
            Select companies and a graph type to generate visualizations
          </p>
        </div>
      )}
    </div>
  );
};

export default FinancialAnalysisDashboard;
