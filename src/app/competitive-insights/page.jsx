'use client';

import { useState } from 'react';
import EarningsCalendar from "./EarningsCalendar";
import FinancialPerformance from "./FinancialPerformance";
import FinancialReports from "./FinancialReports";
import CompetitiveInsights from "./CompetitiveInsights";
import Commentary from "./Commentary";
import Guidance from "./Guidance";
import FinancialAnalysisDashboard from "@/components/financials/FinancialAnalysisDashboard";

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [userPrompts, setUserPrompts] = useState([]);
  const TABS = [
    {
      id: "earnings-calendar",
      label: "Earnings Calendar",
      component: <EarningsCalendar />,
    },
    {
      id: "financial-analysis",
      label: "Financial Analysis",
      component: (
        // <FinancialPerformance
        //   chartData={chartData}
        //   setChartData={setChartData}
        //   userPrompts={userPrompts}
        //   setUserPrompts={setUserPrompts}
        // />
        <FinancialAnalysisDashboard></FinancialAnalysisDashboard>
      ),
    },
    {
      id: "financial-reports",
      label: "Financial Reports",
      component: <FinancialReports />,
    },
    // {
    //   id: "competitive-insights",
    //   label: "Competitive Strategy Insights",
    //   component: <CompetitiveInsights />,
    // },
    // {
    //   id: "commentary",
    //   label: "Management Commentary & Market Sentiment",
    //   component: <Commentary />,
    // },
    // {
    //   id: "guidance",
    //   label: "Forward-Looking Guidance & Risk Factors",
    //   component: <Guidance />,
    // },
  ];
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  return (
    <div className="w-full min-h-screen bg-purple-50 text-gray-800 p-6">
      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-300 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === tab.id
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-500 hover:text-purple-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className="mx-[auto]">
        {TABS.map(
          (tab) =>
            activeTab === tab.id && <div key={tab.id}>{tab.component}</div>,
        )}
      </div>
    </div>
  );
};

export default Dashboard;
