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
import { companies } from "../../../../public/data";
import MultiSelectDropdown from "@/components/ui/MultiSelectDropdown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const graphTypes = [
  "Revenue Trend",
  "Net Income Comparison",
  "Asset Composition",
  "Debt-to-Equity Ratio",
  "Loan Portfolio Growth",
  "Interest Income vs Expense",
  "Operating Cash Flow",
  "EPS Comparison",
  "Efficiency Ratio",
  "Deposit Growth",
];

const FinancialAnalysisDashboard = () => {
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedGraph, setSelectedGraph] = useState("");
  const [graphPrompt, setGraphPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [graphData, setGraphData] = useState(null);
  const [companyData, setCompanyData] = useState({});
  const [userNotes, setUserNotes] = useState("");

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

      const data = await response.json();

      return data.data;
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  const generateGraph = async () => {
    if (!selectedGraph || selectedCompanies.length === 0) return;

    setIsLoading(true);

    // Prepare data only for selected companies
    const filteredCompanyData = {};
    for (const ticker of selectedCompanies) {
      if (companyData[ticker]) {
        filteredCompanyData[ticker] = companyData[ticker];
      }
    }

    try {
      const response = await fetch("/api/generate-chart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companies: selectedCompanies,
          graphType: selectedGraph,
          prompt: graphPrompt,
          companyData: filteredCompanyData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate chart");
      }

      const result = await response.json();
      setGraphData(result);
    } catch (error) {
      console.error("Error generating graph:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompanySelect = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedCompanies(selected);
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
        {/* Company Selection */}
        <div className="bg-white p-4 rounded shadow w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Companies
          </label>
          <MultiSelectDropdown
            items={companies}
            selectedKeys={selectedCompanies}
            setSelectedKeys={setSelectedCompanies}
            getKey={(company) => company.ticker}
            getLabel={(company) => company.name}
            getImage={(company) => company.logo}
          />
        </div>
        {/* Graph Selection */}
        <div className="bg-white p-4 rounded shadow w-full">
          <h2 className="text-lg font-semibold mb-2">Select Graph Type</h2>
          <Select value={selectedGraph} onValueChange={setSelectedGraph}>
            <SelectTrigger className="w-full mb-4">
              <SelectValue placeholder="-- Select a graph type --" />
            </SelectTrigger>
            <SelectContent>
              {graphTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedGraph && (
            <div className="mt-4">
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

            <div>
              <label className="block text-sm font-medium mb-1">
                Add your notes:
              </label>
              <textarea
                className="w-full border rounded p-2 h-24"
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="Add your analysis or observations here..."
              />
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
