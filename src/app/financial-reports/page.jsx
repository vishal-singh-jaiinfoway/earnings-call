"use client";
import axios from "axios";
import { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

// ✅ Company Data for Dropdown
const companies = [
  { name: "SoFi Technologies Inc.", ticker: "SOFI" },
  { name: "Morgan Stanley", ticker: "MS" },
  { name: "JPMorgan Chase & Co", ticker: "JPM" },
  { name: "Microsoft Corp", ticker: "MSFT" },
  { name: "Ameris Bancorp", ticker: "ABCB" },
  { name: "Bank of America Corporation", ticker: "BAC" },
  { name: "Citigroup Inc.", ticker: "C" },
  { name: "Wells Fargo & Company", ticker: "WFC" },
  { name: "U.S. Bancorp", ticker: "USB" },
  { name: "KeyCorp", ticker: "KEY" },
];

// ✅ Report Types
const reportTypes = [
  { name: "Annual", value: "annual" },
  { name: "Quarterly", value: "quarterly" },
];

export default function Home() {
  const [symbol, setSymbol] = useState("");
  const [reportType, setReportType] = useState("annual"); // ✅ Default to Annual
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔍 Fetch Data from API
  const fetchData = async () => {
    if (!symbol) return alert("Please select a company!");
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/scrape?symbol=${symbol}&reportType=${reportType}`,
      );
      if (res.data.success && res.data.financialData.length > 0) {
        setData(res.data.financialData);
      } else {
        alert(`No data found for ${symbol}`);
        setData(null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data. Please check the API or network connection.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 p-8">
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-gray-200">
        {/* 📚 Company Dropdown */}
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel>Select a Company</InputLabel>
          <Select
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            displayEmpty
            sx={{ backgroundColor: "#fff", borderRadius: 2 }}
          >
            {companies.map((company) => (
              <MenuItem key={company.ticker} value={company.ticker}>
                {company.name} ({company.ticker})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* 📊 Report Type Dropdown */}
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel>Select Report Type</InputLabel>
          <Select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            sx={{ backgroundColor: "#fff", borderRadius: 2 }}
          >
            {reportTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* 🚀 Fetch Button */}
        <button
          onClick={fetchData}
          disabled={loading}
          className={`w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white p-3 rounded-lg ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          } transition-all duration-300`}
        >
          {loading ? "Fetching Data..." : "Scrape Data"}
        </button>
      </div>

      {/* 📊 Financial Data Display */}
      <FinancialDataDisplay financialData={data} />
    </div>
  );
}



// 🎯 Updated Grouping Logic
const groupReportsByType = (data) => {
  const groupedData = data.reduce((acc, item) => {
    const year = item.year;
    if (!acc[year]) {
      acc[year] = {
        annual: [],
        quarterly: {},
      };
    }

    // Group 10-K as annual reports
    if (item.formType === "10-K") {
      acc[year].annual.push(item);
    }

    // Group 10-Q as quarterly reports
    if (item.formType === "10-Q" && item.data?.length > 0) {
      item.data.forEach((report) => {
        const quarter = report.quarter || "N/A";
        if (!acc[year].quarterly[quarter]) {
          acc[year].quarterly[quarter] = [];
        }
        acc[year].quarterly[quarter].push(report);
      });
    }

    return acc;
  }, {});

  return groupedData;
};

// ✅ Updated Financial Data Display
const FinancialDataDisplay = ({ financialData }) => {
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedQuarter, setSelectedQuarter] = useState(0);

  // ✅ Group Reports by Year and Type
  const groupedData = groupReportsByType(financialData || []);
  const years = Object.keys(groupedData).sort((a, b) => b - a);

  // 🛑 Handle Missing or Empty Data
  if (!financialData || financialData.length === 0) {
    return (
      <div className="mt-8 text-center text-gray-300">
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          ❌ No financial data available. Please select a company.
        </Typography>
      </div>
    );
  }

  // ✅ Handle Year Tab Change
  const handleYearChange = (event, newValue) => {
    setSelectedYear(newValue);
    setSelectedTab(0);
    setSelectedQuarter(0);
  };

  // ✅ Handle Annual/Quarterly Tab Change
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // ✅ Handle Quarterly Tab Change
  const handleQuarterChange = (event, newValue) => {
    setSelectedQuarter(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: 6,
        padding: 4,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: 4,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
      }}
    >
      {/* 📊 Title */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#6B46C1",
          textAlign: "center",
          letterSpacing: 1,
        }}
      >
        📊 Financial Reports for {financialData?.[0]?.symbol || "N/A"}
      </Typography>

      {/* 📅 Year Selection */}
      <Tabs
        value={selectedYear}
        onChange={handleYearChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          marginBottom: 3,
          backgroundColor: "#E9D8FD",
          borderRadius: 2,
          "& .MuiTabs-indicator": {
            backgroundColor: "#6B46C1",
          },
        }}
      >
        {years.map((year, index) => (
          <Tab
            key={index}
            label={`Year: ${year}`}
            sx={{
              fontWeight: selectedYear === index ? "bold" : "normal",
              color: selectedYear === index ? "#6B46C1" : "#4A5568",
              transition: "0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#D6BCFA",
                borderRadius: 2,
              },
            }}
          />
        ))}
      </Tabs>

      {/* 📚 Annual vs Quarterly Tabs */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          marginBottom: 3,
          backgroundColor: "#EDF2F7",
          borderRadius: 2,
          "& .MuiTabs-indicator": {
            backgroundColor: "#9F7AEA",
          },
        }}
      >
        <Tab label="📅 Annual Reports (10-K)" />
        <Tab label="📅 Quarterly Reports (10-Q)" />
      </Tabs>

      {/* 🎯 Annual Reports Display */}
      {selectedTab === 0 &&
        groupedData[years[selectedYear]]?.annual.map((report, index) => (
          <div key={index}>
            {report.data.map((reportItem, i) => (
              <ReportTable key={`${index}-${i}`} report={reportItem} />
            ))}
          </div>
        ))}

      {/* 📚 Quarterly Reports with Quarter Tabs */}
      {selectedTab === 1 &&
        Object.keys(groupedData[years[selectedYear]]?.quarterly || {}).length >
          0 && (
          <Box>
            <Tabs
              value={selectedQuarter}
              onChange={handleQuarterChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                marginBottom: 3,
                backgroundColor: "#E9D8FD",
                borderRadius: 2,
                "& .MuiTabs-indicator": {
                  backgroundColor: "#6B46C1",
                },
              }}
            >
              {Object.keys(
                groupedData[years[selectedYear]].quarterly || {}
              ).map((quarter, index) => (
                <Tab
                  key={index}
                  label={`📅 ${quarter}`}
                  sx={{
                    fontWeight: selectedQuarter === index ? "bold" : "normal",
                    color: selectedQuarter === index ? "#6B46C1" : "#4A5568",
                    transition: "0.3s ease-in-out",
                    "&:hover": {
                      backgroundColor: "#D6BCFA",
                      borderRadius: 2,
                    },
                  }}
                />
              ))}
            </Tabs>

            {/* Display Quarterly Reports */}
            {groupedData[years[selectedYear]]?.quarterly &&
              Object.keys(groupedData[years[selectedYear]].quarterly).map(
                (quarter, index) =>
                  selectedQuarter === index &&
                  groupedData[years[selectedYear]].quarterly[quarter].map(
                    (report, i) => <ReportTable key={i} report={report} />
                  )
              )}
          </Box>
        )}
    </Box>
  );
};


// 📄 Updated Report Table Component
const ReportTable = ({ report }) => (
  <Box
    sx={{
      marginTop: 3,
      borderRadius: 3,
      backgroundColor: "#fff",
      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
      padding: 4,
    }}
  >
    {/* 📚 Report Name */}
    <Typography
      variant="h6"
      gutterBottom
      sx={{
        fontWeight: "bold",
        color: "#6B46C1",
        textAlign: "center",
        marginBottom: 2,
      }}
    >
      📄 {report.reportName || "Report"}
    </Typography>

    {/* 📝 Report Metadata */}
    <Typography
      variant="body1"
      sx={{
        textAlign: "center",
        fontStyle: "italic",
        color: "#4A5568",
        marginBottom: 2,
      }}
    >
      {report.data?.header || "N/A"} <br />
      📅 {report.data?.period || "N/A"}
    </Typography>

    {/* 📊 Financial Data Table */}
    {report.data?.data && Object.keys(report.data.data).length > 0 ? (
      <TableContainer
        component={Paper}
        sx={{
          marginTop: 2,
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          maxHeight: 400,
          overflowY: "auto",
        }}
      >
        <Table
          stickyHeader
          sx={{
            minWidth: 650,
            "& .MuiTableCell-head": {
              backgroundColor: "#6B46C1",
              color: "#fff",
              fontWeight: "bold",
            },
            "& .MuiTableRow-root:hover": {
              backgroundColor: "#f5f7fa",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>📈 Metric</TableCell>
              <TableCell align="right">💸 Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(report.data.data || {}).map(([key, value], i) => (
              <TableRow
                key={i}
                sx={{
                  "&:nth-of-type(even)": {
                    backgroundColor: "#F3F4F6",
                  },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    fontWeight: "500",
                    color: "#4A5568",
                  }}
                >
                  {key}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: "bold",
                    color: "#2D3748",
                  }}
                >
                  {typeof value === "number"
                    ? `${value.toLocaleString()}`
                    : value || "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      <Typography
        variant="body2"
        color="textSecondary"
        mt={2}
        sx={{
          textAlign: "center",
          fontStyle: "italic",
          color: "#4A5568",
        }}
      >
        🚫 No data available for this section.
      </Typography>
    )}
  </Box>
);



  
  