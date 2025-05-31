import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FinancialData {
  success: boolean;
  ticker: string;
  data: {
    incomeStatement?: {
      annual: FinancialStatement;
      quarterly: FinancialStatement;
    };
    balanceSheet?: {
      annual: FinancialStatement;
      quarterly: FinancialStatement;
    };
    cashFlow?: {
      annual: FinancialStatement;
      quarterly: FinancialStatement;
    };
  };
}

interface FinancialStatement {
  headers: string[];
  rows: {
    metric: string;
    values: (string | number)[];
  }[];
}

interface MetricResult {
  description: string;
  [key: string]: any;
}

interface FinancialMetrics {
  [key: string]: MetricResult;
}

export function calculateFinancialMetrics(
  companyData: FinancialData,
  periodType: "annual" | "quarterly" = "annual",
): FinancialMetrics {
  // Helper function to get the appropriate statement based on report type
  const getStatement = (
    statement:
      | {
          annual: FinancialStatement;
          quarterly: FinancialStatement;
        }
      | undefined,
  ): FinancialStatement | undefined => {
    if (!statement) return undefined;
    return statement[periodType];
  };

  const incomeStatement = getStatement(companyData.data?.incomeStatement);
  const balanceSheet = getStatement(companyData.data?.balanceSheet);
  const cashFlow = getStatement(companyData.data?.cashFlow);

  const getMetricValues = (
    statement: FinancialStatement | undefined,
    metricName: string,
  ): number[] | null => {
    if (!statement?.rows) return null;

    const metric = statement.rows.find(
      (row) => row.metric.trim().toLowerCase() === metricName.toLowerCase(),
    );

    if (!metric) return null;

    return metric.values.map((val) => {
      if (typeof val === "number") return val;
      if (val === "--" || val === "") return 0;
      return parseFloat(val) || 0;
    });
  };

  const getLatestValue = (values: number[] | null): number | null => {
    if (!values || values.length < 2) return null;
    return values[1]; // TTM is at index 0, latest year at 1
  };

  const formatValue = (value: number | null): string => {
    if (value === null) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const calculateGrowthRate = (
    current: number | null,
    previous: number | null,
  ): string => {
    if (current === null || previous === null || previous === 0) return "N/A";
    return (((current - previous) / previous) * 100).toFixed(2) + "%";
  };

  const revenueValues = getMetricValues(incomeStatement, "Total Revenue") || [];
  const netIncomeValues =
    getMetricValues(incomeStatement, "Net Income Common Stockholders") || [];
  const totalAssets =
    getLatestValue(getMetricValues(balanceSheet, "Total Assets")) || 0;
  const cash =
    getLatestValue(
      getMetricValues(
        balanceSheet,
        "Cash, Cash Equivalents & Federal Funds Sold",
      ),
    ) || 0;
  const loans = getLatestValue(getMetricValues(balanceSheet, "Net Loan")) || 0;
  const securities =
    getLatestValue(
      getMetricValues(balanceSheet, "Securities and Investments"),
    ) || 0;
  const ppe = getLatestValue(getMetricValues(balanceSheet, "Net PPE")) || 0;
  const totalDebt =
    getLatestValue(getMetricValues(balanceSheet, "Total Debt")) || 0;
  const totalEquity =
    getLatestValue(
      getMetricValues(balanceSheet, "Total Equity Gross Minority Interest"),
    ) || 0;
  const loanValues = getMetricValues(balanceSheet, "Gross Loan") || [];
  const interestIncome =
    getLatestValue(getMetricValues(incomeStatement, "Interest Income")) || 0;
  const interestExpense =
    getLatestValue(getMetricValues(incomeStatement, "Interest Expense")) || 0;
  const operatingCashFlowValues =
    getMetricValues(cashFlow, "Operating Cash Flow") || [];
  const basicEPSValues = getMetricValues(incomeStatement, "Basic EPS") || [];
  const dilutedEPSValues =
    getMetricValues(incomeStatement, "Diluted EPS") || [];
  const nonInterestExpense =
    getLatestValue(getMetricValues(incomeStatement, "Non Interest Expense")) ||
    0;
  const totalRevenue =
    getLatestValue(getMetricValues(incomeStatement, "Total Revenue")) || 0;
  const depositValues = getMetricValues(balanceSheet, "Total Deposits") || [];

  const formattedResults: Partial<FinancialMetrics> = {
    ...(revenueValues.length > 0 && {
      "Revenue Trend": {
        description: "Total revenue over time",
        data: revenueValues.map((val, i) => ({
          period: incomeStatement?.headers?.[i + 1] || `Period ${i + 1}`,
          value: formatValue(val),
          rawValue: val,
        })),
      },
    }),

    ...(netIncomeValues.length > 0 && {
      "Net Income Comparison": {
        description: "Net income performance",
        latestValue: formatValue(getLatestValue(netIncomeValues)),
        rawValue: getLatestValue(netIncomeValues),
        data: netIncomeValues.map((val, i) => ({
          period: incomeStatement?.headers?.[i + 1] || `Period ${i + 1}`,
          value: formatValue(val),
          rawValue: val,
        })),
      },
    }),

    ...(balanceSheet && {
      "Asset Composition": {
        description: "Breakdown of total assets",
        cash: formatValue(cash),
        rawCash: cash,
        loans: formatValue(loans),
        rawLoans: loans,
        securities: formatValue(securities),
        rawSecurities: securities,
        property: formatValue(ppe),
        rawProperty: ppe,
        other: formatValue(totalAssets - (cash + loans + securities + ppe)),
        rawOther: totalAssets - (cash + loans + securities + ppe),
        total: formatValue(totalAssets),
        rawTotal: totalAssets,
      },

      "Debt-to-Equity Ratio": {
        description: "Financial leverage ratio",
        ratio: totalEquity ? (totalDebt / totalEquity).toFixed(2) : "N/A",
        rawRatio: totalEquity ? totalDebt / totalEquity : null,
        interpretation: totalEquity
          ? totalDebt / totalEquity > 1
            ? "High leverage"
            : "Conservative leverage"
          : "N/A",
        debt: formatValue(totalDebt),
        rawDebt: totalDebt,
        equity: formatValue(totalEquity),
        rawEquity: totalEquity,
      },
    }),

    ...(loanValues.length > 0 && {
      "Loan Portfolio Growth": {
        description: "Growth of loan portfolio",
        latestValue: formatValue(loanValues[0]),
        rawValue: loanValues[0],
        growthRate:
          loanValues.length > 1
            ? calculateGrowthRate(loanValues[0], loanValues[1])
            : "N/A",
        data: loanValues.map((val, i) => ({
          period: balanceSheet?.headers?.[i + 1] || `Period ${i + 1}`,
          value: formatValue(val),
          rawValue: val,
        })),
      },
    }),

    ...(interestIncome || interestExpense
      ? {
          "Interest Income vs Expense": {
            description: "Interest income and expense comparison",
            income: formatValue(interestIncome),
            rawIncome: interestIncome,
            expense: formatValue(interestExpense),
            rawExpense: interestExpense,
            net: formatValue(interestIncome - interestExpense),
            rawNet: interestIncome - interestExpense,
            margin: interestIncome
              ? (
                  ((interestIncome - interestExpense) / interestIncome) *
                  100
                ).toFixed(2) + "%"
              : "N/A",
            rawMargin: interestIncome
              ? (interestIncome - interestExpense) / interestIncome
              : null,
          },
        }
      : {}),

    ...(operatingCashFlowValues.length > 0 && {
      "Operating Cash Flow": {
        description: "Cash generated from operations",
        latestValue: formatValue(getLatestValue(operatingCashFlowValues)),
        rawValue: getLatestValue(operatingCashFlowValues),
        data: operatingCashFlowValues.map((val) => ({
          value: formatValue(val),
          rawValue: val,
        })),
      },
    }),

    ...(basicEPSValues.length > 0 &&
      dilutedEPSValues.length > 0 && {
        "EPS Comparison": {
          description: "Earnings per share comparison",
          basic: basicEPSValues[1]?.toFixed(2) || "N/A",
          rawBasic: basicEPSValues[1],
          diluted: dilutedEPSValues[1]?.toFixed(2) || "N/A",
          rawDiluted: dilutedEPSValues[1],
          dilutionPercentage: basicEPSValues[1]
            ? (
                ((basicEPSValues[1] - dilutedEPSValues[1]) /
                  basicEPSValues[1]) *
                100
              ).toFixed(2) + "%"
            : "N/A",
          rawDilutionPercentage: basicEPSValues[1]
            ? (basicEPSValues[1] - dilutedEPSValues[1]) / basicEPSValues[1]
            : null,
          basicTrend: basicEPSValues.map((val) => val?.toFixed(2)),
          dilutedTrend: dilutedEPSValues.map((val) => val?.toFixed(2)),
        },
      }),

    ...(nonInterestExpense &&
      totalRevenue && {
        "Efficiency Ratio": {
          description: "Non-interest expenses as percentage of revenue",
          ratio: totalRevenue
            ? ((nonInterestExpense / totalRevenue) * 100).toFixed(2) + "%"
            : "N/A",
          rawRatio: totalRevenue ? nonInterestExpense / totalRevenue : null,
          interpretation: totalRevenue
            ? nonInterestExpense / totalRevenue < 0.6
              ? "Efficient"
              : "Inefficient"
            : "N/A",
          expense: formatValue(nonInterestExpense),
          rawExpense: nonInterestExpense,
          revenue: formatValue(totalRevenue),
          rawRevenue: totalRevenue,
        },
      }),

    ...(depositValues.length > 0 && {
      "Deposit Growth": {
        description: "Growth of customer deposits",
        latestValue: formatValue(depositValues[0]),
        rawValue: depositValues[0],
        growthRate:
          depositValues.length > 1
            ? calculateGrowthRate(depositValues[0], depositValues[1])
            : "N/A",
        data: depositValues.map((val, i) => ({
          period: balanceSheet?.headers?.[i + 1] || `Period ${i + 1}`,
          value: formatValue(val),
          rawValue: val,
        })),
      },
    }),
  };

  // Remove undefined blocks
  return Object.fromEntries(
    Object.entries(formattedResults).filter(([, value]) => value !== undefined),
  );
}

export function calculateFinancialMetricsFromRaw(
  rawData: Record<string, Partial<FinancialData["data"]>>,
  periodType: "annual" | "quarterly" = "annual",
): Record<string, FinancialMetrics> {
  const result: Record<string, FinancialMetrics> = {};

  for (const [ticker, data] of Object.entries(rawData)) {
    result[ticker] = calculateFinancialMetrics(
      {
        ticker,
        success: true,
        data: {
          incomeStatement: data.incomeStatement,
          balanceSheet: data.balanceSheet,
          cashFlow: data.cashFlow,
        },
      },
      periodType,
    );
  }

  return result;
}

type TrendPoint = {
  period: string;
  value: string;
  rawValue: number;
};

type MetricData = {
  description: string;
  data: TrendPoint[];
};

type CompanyData = {
  [ticker: string]: {
    [metricName: string]: MetricData;
  };
};

export function generateChartJsFromTrendData(
  companyData: CompanyData,
  normalizeInMillions = false,
) {
  const allPeriods = new Set<string>();
  let inferredMetricName: string | null = null;

  // Infer the metric name and collect all periods
  for (const company of Object.values(companyData)) {
    const metricNames = Object.keys(company);
    if (metricNames.length === 0) continue;

    inferredMetricName = inferredMetricName || metricNames[0];
    const metric = company[inferredMetricName];
    //if (!metric || !metric.data) continue;

    for (const point of metric.data) {
      allPeriods.add(point.period);
    }
  }

  if (!inferredMetricName) {
    return {
      data: { labels: [], datasets: [] },
      options: {},
      analysis: "No valid metric data available",
    };
  }

  // Sort periods chronologically, keeping "TTM" at the end
  const sortedLabels = Array.from(allPeriods).sort((a, b) => {
    if (a === "TTM") return 1;
    if (b === "TTM") return -1;
    return new Date(a).getTime() - new Date(b).getTime();
  });

  // Build datasets
  const datasets = Object.entries(companyData).map(([ticker, metrics]) => {
    const metric = metrics[inferredMetricName!];
    const periodToValue: Record<string, number> = {};

    for (const point of metric.data) {
      periodToValue[point.period] = point.rawValue;
    }

    const data = sortedLabels.map((period) =>
      normalizeInMillions && periodToValue[period] !== undefined
        ? periodToValue[period] / 1_000_000
        : periodToValue[period] ?? null,
    );

    return {
      label: ticker,
      data,
      fill: false,
      tension: 0.2,
      borderWidth: 2,
      pointRadius: 3,
    };
  });

  return {
    data: {
      labels: sortedLabels,
      datasets,
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const value = context.raw;
              const formatted = normalizeInMillions
                ? `$${value?.toLocaleString()}M`
                : `$${value?.toLocaleString()}`;
              return `${context.dataset.label}: ${formatted}`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (val: number) =>
              normalizeInMillions
                ? `$${val.toLocaleString()}M`
                : `$${val.toLocaleString()}`,
          },
        },
      },
    },
    analysis: `Showing trend for ${inferredMetricName}`,
  };
}
