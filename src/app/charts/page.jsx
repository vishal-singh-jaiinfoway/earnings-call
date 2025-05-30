// pages/sofi.js
"use client" ;

import FinancialDashboard from "../components/financials/financialDashboard";
import FinancialAnalysisDashboard from "../components/financials/FinancialAnalysisDashboard";

// Your provided data
const sofiData = {
    "success": true,
    "ticker": "SOFI",
    "data": {
        "incomeStatement": {
            "headers": [
                "Breakdown",
                "TTM",
                "12/31/2024",
                "12/31/2023",
                "12/31/2022",
                "12/31/2021"
            ],
            "rows": [
                {
                    "metric": "Total Revenue",
                    "values": [
                        "2798300",
                        "2612342",
                        "2108215",
                        "1573535",
                        "984872"
                    ]
                },
                {
                    "metric": "  Net Interest Income",
                    "values": [
                        "1812489",
                        "1716481",
                        "1261740",
                        "584096",
                        "252244"
                    ]
                },
                {
                    "metric": "    Interest Income",
                    "values": [
                        "2905718",
                        "2807817",
                        "2051067",
                        "773371",
                        "355020"
                    ]
                },
                {
                    "metric": "      Interest Income from Loans And Lease",
                    "values": [
                        "2694636",
                        "2601988",
                        "1944128",
                        "759504",
                        "351971"
                    ]
                },
                {
                    "metric": "        Interest Income from Loans",
                    "values": [
                        "2694636",
                        "2601988",
                        "1944128",
                        "759504",
                        "351971"
                    ]
                },
                {
                    "metric": "      Interest Income from Securities",
                    "values": [
                        "--",
                        "--",
                        "--",
                        "10433",
                        "14109"
                    ]
                },
                {
                    "metric": "      Other Interest Income",
                    "values": [
                        "211082",
                        "205829",
                        "106939",
                        "13867",
                        "3049"
                    ]
                },
                {
                    "metric": "    Interest Expense",
                    "values": [
                        "1093229",
                        "1091336",
                        "789327",
                        "189275",
                        "102776"
                    ]
                },
                {
                    "metric": "      Interest Expense for Deposit",
                    "values": [
                        "944102",
                        "930154",
                        "507820",
                        "59793",
                        "0"
                    ]
                },
                {
                    "metric": "      Interest Expense for Long Term Debt And Capital Securities",
                    "values": [
                        "148684",
                        "160744",
                        "281053",
                        "128565",
                        "100830"
                    ]
                },
                {
                    "metric": "      Other Interest Expense",
                    "values": [
                        "443",
                        "438",
                        "454",
                        "917",
                        "1946"
                    ]
                },
                {
                    "metric": "  Non Interest Income",
                    "values": [
                        "985811",
                        "895861",
                        "846475",
                        "989439",
                        "732628"
                    ]
                },
                {
                    "metric": "    Fees And Commissions",
                    "values": [
                        "842164",
                        "770532",
                        "766714",
                        "945360",
                        "672330"
                    ]
                },
                {
                    "metric": "      Fees & Commission Income",
                    "values": [
                        "842164",
                        "770532",
                        "766714",
                        "945360",
                        "672330"
                    ]
                },
                {
                    "metric": "        Service Charge on Depositor Accounts",
                    "values": [
                        "842164",
                        "770532",
                        "766714",
                        "945360",
                        "672330"
                    ]
                },
                {
                    "metric": "        Other Customer Services",
                    "values": [
                        "--",
                        "--",
                        "--",
                        "--",
                        "191847"
                    ]
                },
                {
                    "metric": "    Gain Losson Saleof Assets",
                    "values": [
                        "--",
                        "--",
                        "--",
                        "-40031",
                        "-14862"
                    ]
                },
                {
                    "metric": "      Gain on Sale of Security",
                    "values": [
                        "--",
                        "--",
                        "--",
                        "-40031",
                        "-14862"
                    ]
                },
                {
                    "metric": "    Other Non Interest Income",
                    "values": [
                        "143647",
                        "125329",
                        "79761",
                        "44079",
                        "60298"
                    ]
                },
                {
                    "metric": "Credit Losses Provision",
                    "values": [
                        "-30208",
                        "-31712",
                        "-54945",
                        "-54332",
                        "-7573"
                    ]
                },
                {
                    "metric": "Non Interest Expense",
                    "values": [
                        "2547733",
                        "2405974",
                        "2096723",
                        "1818606",
                        "1431143"
                    ]
                },
                {
                    "metric": "  Selling General and Administrative",
                    "values": [
                        "1478349",
                        "1396382",
                        "1230411",
                        "1119441",
                        "925409"
                    ]
                },
                {
                    "metric": "    General & Administrative Expense",
                    "values": [
                        "611246",
                        "600089",
                        "511011",
                        "501618",
                        "498534"
                    ]
                },
                {
                    "metric": "      Other G and A",
                    "values": [
                        "611246",
                        "600089",
                        "511011",
                        "501618",
                        "498534"
                    ]
                },
                {
                    "metric": "    Selling & Marketing Expense",
                    "values": [
                        "867103",
                        "796293",
                        "719400",
                        "617823",
                        "426875"
                    ]
                },
                {
                    "metric": "  Other Non Interest Expense",
                    "values": [
                        "1069384",
                        "1009592",
                        "866312",
                        "699165",
                        "505734"
                    ]
                },
                {
                    "metric": "Special Income Charges",
                    "values": [
                        "-1458",
                        "58689",
                        "-257705",
                        "-19318",
                        "-27333"
                    ]
                },
                {
                    "metric": "  Restructuring & Mergers Acquisition",
                    "values": [
                        "4781",
                        "3828",
                        "23862",
                        "19318",
                        "27333"
                    ]
                },
                {
                    "metric": "  Impairment of Capital Assets",
                    "values": [
                        "--",
                        "0",
                        "248417",
                        "0",
                        "0"
                    ]
                },
                {
                    "metric": "  Loss on Extinguishment of Debt",
                    "values": [
                        "-3323",
                        "-62517",
                        "-14574",
                        "0",
                        "0"
                    ]
                },
                {
                    "metric": "  Other Special Charges",
                    "values": [
                        "--",
                        "--",
                        "10971",
                        "--",
                        "--"
                    ]
                },
                {
                    "metric": "Pretax Income",
                    "values": [
                        "218901",
                        "233345",
                        "-301158",
                        "-318721",
                        "-481177"
                    ]
                },
                {
                    "metric": "Tax Provision",
                    "values": [
                        "-262837",
                        "-265320",
                        "-416",
                        "1686",
                        "2760"
                    ]
                },
                {
                    "metric": "Net Income Common Stockholders",
                    "values": [
                        "472288",
                        "479136",
                        "-341167",
                        "-360832",
                        "-524363"
                    ]
                },
                {
                    "metric": "  Net Income",
                    "values": [
                        "481738",
                        "498665",
                        "-300742",
                        "-320407",
                        "-483937"
                    ]
                },
                {
                    "metric": "    Net Income Including Non-Controlling Interests",
                    "values": [
                        "481738",
                        "498665",
                        "-300742",
                        "-320407",
                        "-483937"
                    ]
                },
                {
                    "metric": "      Net Income Continuous Operations",
                    "values": [
                        "481738",
                        "498665",
                        "-300742",
                        "-320407",
                        "-483937"
                    ]
                },
                {
                    "metric": "  Preferred Stock Dividends",
                    "values": [
                        "--",
                        "16503",
                        "40425",
                        "40425",
                        "40426"
                    ]
                },
                {
                    "metric": "Average Dilution Earnings",
                    "values": [
                        "11420",
                        "-44360",
                        "0",
                        "0",
                        "--"
                    ]
                },
                {
                    "metric": "Diluted NI Available to Com Stockholders",
                    "values": [
                        "483708",
                        "434776",
                        "-341167",
                        "-360832",
                        "-524363"
                    ]
                },
                {
                    "metric": "Basic EPS",
                    "values": [
                        "0.44",
                        "0.46",
                        "-0.36",
                        "-0.40",
                        "-1.00"
                    ]
                },
                {
                    "metric": "Diluted EPS",
                    "values": [
                        "0.43",
                        "0.39",
                        "-0.36",
                        "-0.40",
                        "-1.00"
                    ]
                },
                {
                    "metric": "Basic Average Shares",
                    "values": [
                        "1079063.25",
                        "1050219",
                        "945024.16",
                        "900886.11",
                        "526730.26"
                    ]
                },
                {
                    "metric": "Diluted Average Shares",
                    "values": [
                        "1137137.25",
                        "1101390",
                        "945024.16",
                        "900886.11",
                        "526730.26"
                    ]
                },
                {
                    "metric": "Interest Income after Provision for Loan Loss",
                    "values": [
                        "1782281",
                        "1684769",
                        "1206795",
                        "529764",
                        "244671"
                    ]
                },
                {
                    "metric": "Net Income from Continuing & Discontinued Operation",
                    "values": [
                        "481738",
                        "498665",
                        "-300742",
                        "-320407",
                        "-483937"
                    ]
                },
                {
                    "metric": "Normalized Income",
                    "values": [
                        "482612.80",
                        "452300.69",
                        "-43397.79",
                        "-305145.78",
                        "-463983.91"
                    ]
                },
                {
                    "metric": "Reconciled Depreciation",
                    "values": [
                        "210242",
                        "203498",
                        "201416",
                        "151360",
                        "101568"
                    ]
                },
                {
                    "metric": "Net Income from Continuing Operation Net Minority Interest",
                    "values": [
                        "481738",
                        "498665",
                        "-300742",
                        "-320407",
                        "-483937"
                    ]
                },
                {
                    "metric": "Total Unusual Items Excluding Goodwill",
                    "values": [
                        "-1458",
                        "58689",
                        "-257705",
                        "-19318",
                        "-27333"
                    ]
                },
                {
                    "metric": "Total Unusual Items",
                    "values": [
                        "-1458",
                        "58689",
                        "-257705",
                        "-19318",
                        "-27333"
                    ]
                },
                {
                    "metric": "Tax Rate for Calcs",
                    "values": [
                        "0",
                        "0",
                        "0",
                        "0",
                        "0"
                    ]
                },
                {
                    "metric": "Tax Effect of Unusual Items",
                    "values": [
                        "-583.20",
                        "12324.69",
                        "-360.79",
                        "-4056.78",
                        "-7379.91"
                    ]
                }
            ]
        },
        "balanceSheet": {
            "headers": [
                "Breakdown",
                "12/31/2024",
                "12/31/2023",
                "12/31/2022",
                "12/31/2021"
            ],
            "rows": [
                {
                    "metric": "Total Assets",
                    "values": [
                        "36250951",
                        "30074858",
                        "19007675",
                        "9176326"
                    ]
                },
                {
                    "metric": "  Cash, Cash Equivalents & Federal Funds Sold",
                    "values": [
                        "2818777",
                        "3699129",
                        "1874953",
                        "768437"
                    ]
                },
                {
                    "metric": "    Cash And Cash Equivalents",
                    "values": [
                        "2538293",
                        "3085020",
                        "1421907",
                        "494711"
                    ]
                },
                {
                    "metric": "      Cash And Due from Banks",
                    "values": [
                        "2538293",
                        "3085020",
                        "1421907",
                        "494711"
                    ]
                },
                {
                    "metric": "    Restricted Cash And Investments",
                    "values": [
                        "280484",
                        "614109",
                        "453046",
                        "273726"
                    ]
                },
                {
                    "metric": "      Restricted Cash & Cash Equivalents",
                    "values": [
                        "171067",
                        "530558",
                        "424395",
                        "273726"
                    ]
                },
                {
                    "metric": "      Restricted Investments",
                    "values": [
                        "109417",
                        "83551",
                        "28651",
                        "0"
                    ]
                },
                {
                    "metric": "  Securities and Investments",
                    "values": [
                        "1895689",
                        "701935",
                        "396769",
                        "569595"
                    ]
                },
                {
                    "metric": "    Available for Sale Securities",
                    "values": [
                        "91646",
                        "200993",
                        "357337",
                        "374688"
                    ]
                },
                {
                    "metric": "    Other Short Term Investments",
                    "values": [
                        "1804043",
                        "500942",
                        "39432",
                        "194907"
                    ]
                },
                {
                    "metric": "  Long Term Equity Investment",
                    "values": [
                        "29500",
                        "22920",
                        "22825",
                        "25793"
                    ]
                },
                {
                    "metric": "  Derivative Assets",
                    "values": [
                        "381920",
                        "110120",
                        "34610",
                        "15337"
                    ]
                },
                {
                    "metric": "  Net Loan",
                    "values": [
                        "27528718",
                        "22958414",
                        "13865031",
                        "6068884"
                    ]
                },
                {
                    "metric": "    Gross Loan",
                    "values": [
                        "27575402",
                        "23013109",
                        "13905819",
                        "6075921"
                    ]
                },
                {
                    "metric": "      Loans Held for Sale",
                    "values": [
                        "17684892",
                        "15396771",
                        "13557074",
                        "5952972"
                    ]
                },
                {
                    "metric": "      Commercial Loan",
                    "values": [
                        "4986",
                        "6075",
                        "7179",
                        "0"
                    ]
                },
                {
                    "metric": "      Consumer Loan",
                    "values": [
                        "8886527",
                        "6998112",
                        "209164",
                        "115912"
                    ]
                },
                {
                    "metric": "      Mortgage Loan",
                    "values": [
                        "145872",
                        "110993",
                        "91614",
                        "0"
                    ]
                },
                {
                    "metric": "      Other Loan Assets",
                    "values": [
                        "853125",
                        "501158",
                        "40788",
                        "7037"
                    ]
                },
                {
                    "metric": "    Allowance for Loans And Lease Losses",
                    "values": [
                        "46684",
                        "54695",
                        "40788",
                        "7037"
                    ]
                },
                {
                    "metric": "  Receivables",
                    "values": [
                        "587496",
                        "169852",
                        "127050",
                        "85523"
                    ]
                },
                {
                    "metric": "    Accounts receivable",
                    "values": [
                        "587496",
                        "169852",
                        "127050",
                        "85523"
                    ]
                },
                {
                    "metric": "    Notes Receivable",
                    "values": [
                        "--",
                        "--",
                        "--",
                        "0"
                    ]
                },
                {
                    "metric": "    Other Receivables",
                    "values": [
                        "--",
                        "--",
                        "--",
                        "462"
                    ]
                },
                {
                    "metric": "  Prepaid Assets",
                    "values": [
                        "276931",
                        "112748",
                        "73429",
                        "57903"
                    ]
                },
                {
                    "metric": "  Net PPE",
                    "values": [
                        "369088",
                        "306543",
                        "267239",
                        "227064"
                    ]
                },
                {
                    "metric": "    Gross PPE",
                    "values": [
                        "585993",
                        "481142",
                        "367858",
                        "281500"
                    ]
                },
                {
                    "metric": "      Buildings And Improvements",
                    "values": [
                        "3199",
                        "3192",
                        "3192",
                        "--"
                    ]
                },
                {
                    "metric": "      Machinery Furniture Equipment",
                    "values": [
                        "446972",
                        "334169",
                        "212174",
                        "110822"
                    ]
                },
                {
                    "metric": "      Construction in Progress",
                    "values": [
                        "--",
                        "--",
                        "--",
                        "661"
                    ]
                },
                {
                    "metric": "      Leases",
                    "values": [
                        "38625",
                        "39046",
                        "40257",
                        "39726"
                    ]
                },
                {
                    "metric": "      Other Properties",
                    "values": [
                        "97197",
                        "104735",
                        "112235",
                        "130291"
                    ]
                },
                {
                    "metric": "    Accumulated Depreciation",
                    "values": [
                        "-216905",
                        "-174599",
                        "-100619",
                        "-54436"
                    ]
                },
                {
                    "metric": "  Goodwill And Other Intangible Assets",
                    "values": [
                        "2033427",
                        "1938022",
                        "2215000",
                        "1351365"
                    ]
                },
                {
                    "metric": "    Goodwill",
                    "values": [
                        "1393505",
                        "1393505",
                        "1622991",
                        "898527"
                    ]
                },
                {
                    "metric": "    Other Intangible Assets",
                    "values": [
                        "639922",
                        "544517",
                        "592009",
                        "452838"
                    ]
                },
                {
                    "metric": "  Deferred Assets",
                    "values": [
                        "267220",
                        "0",
                        "--",
                        "3422"
                    ]
                },
                {
                    "metric": "    Deferred Tax Assets",
                    "values": [
                        "267220",
                        "0",
                        "--",
                        "--"
                    ]
                },
                {
                    "metric": "  Other Assets",
                    "values": [
                        "62185",
                        "55175",
                        "130769",
                        "6425"
                    ]
                },
                {
                    "metric": "Total Liabilities Net Minority Interest",
                    "values": [
                        "29725817",
                        "24519872",
                        "13479199",
                        "4478623"
                    ]
                },
                {
                    "metric": "  Total Deposits",
                    "values": [
                        "25978204",
                        "18620663",
                        "7342296",
                        "0"
                    ]
                },
                {
                    "metric": "    Interest Bearing Deposits Liabilities",
                    "values": [
                        "25861400",
                        "18568993",
                        "7265792",
                        "--"
                    ]
                },
                {
                    "metric": "      Customer Accounts",
                    "values": [
                        "25861400",
                        "18568993",
                        "7265792",
                        "0"
                    ]
                },
                {
                    "metric": "    Non Interest Bearing Deposits",
                    "values": [
                        "116804",
                        "51670",
                        "76504",
                        "0"
                    ]
                },
                {
                    "metric": "  Payables And Accrued Expenses",
                    "values": [
                        "398100",
                        "362174",
                        "290546",
                        "252262"
                    ]
                },
                {
                    "metric": "    Payables",
                    "values": [
                        "132784",
                        "159915",
                        "144575",
                        "158063"
                    ]
                },
                {
                    "metric": "      Accounts Payable",
                    "values": [
                        "132784",
                        "159915",
                        "144575",
                        "158063"
                    ]
                },
                {
                    "metric": "    Current Accrued Expenses",
                    "values": [
                        "265316",
                        "202259",
                        "145971",
                        "94199"
                    ]
                },
                {
                    "metric": "  Current Debt And Capital Lease Obligation",
                    "values": [
                        "486000",
                        "486000",
                        "486000",
                        "497810"
                    ]
                },
                {
                    "metric": "    Current Debt",
                    "values": [
                        "486000",
                        "486000",
                        "486000",
                        "497810"
                    ]
                },
                {
                    "metric": "      Line of Credit",
                    "values": [
                        "486000",
                        "486000",
                        "486000",
                        "497810"
                    ]
                },
                {
                    "metric": "  Derivative Product Liabilities",
                    "values": [
                        "91206",
                        "107808",
                        "9251",
                        "864"
                    ]
                },
                {
                    "metric": "  Long Term Debt And Capital Lease Obligation",
                    "values": [
                        "2718210",
                        "4876633",
                        "5148371",
                        "3696823"
                    ]
                },
                {
                    "metric": "    Long Term Debt",
                    "values": [
                        "2607301",
                        "4754812",
                        "5016930",
                        "3543855"
                    ]
                },
                {
                    "metric": "    Long Term Capital Lease Obligation",
                    "values": [
                        "110909",
                        "121821",
                        "131441",
                        "152968"
                    ]
                },
                {
                    "metric": "  Non Current Deferred Liabilities",
                    "values": [
                        "27638",
                        "45947",
                        "66510",
                        "4340"
                    ]
                },
                {
                    "metric": "    Non Current Deferred Taxes Liabilities",
                    "values": [
                        "20164",
                        "40229",
                        "56482",
                        "1787"
                    ]
                },
                {
                    "metric": "    Non Current Deferred Revenue",
                    "values": [
                        "7474",
                        "5718",
                        "10028",
                        "2553"
                    ]
                },
                {
                    "metric": "  Preferred Securities Outside Stock Equity",
                    "values": [
                        "--",
                        "--",
                        "--",
                        "320374"
                    ]
                },
                {
                    "metric": "  Other Liabilities",
                    "values": [
                        "26459",
                        "20647",
                        "136225",
                        "26524"
                    ]
                },
                {
                    "metric": "Total Equity Gross Minority Interest",
                    "values": [
                        "6525134",
                        "5554986",
                        "5528476",
                        "4697703"
                    ]
                },
                {
                    "metric": "  Stockholders' Equity",
                    "values": [
                        "6525134",
                        "5554986",
                        "5528476",
                        "4697703"
                    ]
                },
                {
                    "metric": "    Capital Stock",
                    "values": [
                        "109",
                        "320471",
                        "320467",
                        "320457"
                    ]
                },
                {
                    "metric": "      Preferred Stock",
                    "values": [
                        "0",
                        "320374",
                        "320374",
                        "320374"
                    ]
                },
                {
                    "metric": "      Common Stock",
                    "values": [
                        "109",
                        "97",
                        "93",
                        "83"
                    ]
                },
                {
                    "metric": "    Retained Earnings",
                    "values": [
                        "-1305598",
                        "-1804263",
                        "-1503521",
                        "-1183114"
                    ]
                },
                {
                    "metric": "    Additional Paid in Capital",
                    "values": [
                        "7838988",
                        "7039987",
                        "6719826",
                        "5561831"
                    ]
                },
                {
                    "metric": "    Gains Losses Not Affecting Retained Earnings",
                    "values": [
                        "-8365",
                        "-1209",
                        "-8296",
                        "-1471"
                    ]
                },
                {
                    "metric": "Total Capitalization",
                    "values": [
                        "9132435",
                        "10309798",
                        "10545406",
                        "8241558"
                    ]
                },
                {
                    "metric": "Preferred Stock Equity",
                    "values": [
                        "--",
                        "320374",
                        "320374",
                        "320374"
                    ]
                },
                {
                    "metric": "Common Stock Equity",
                    "values": [
                        "6525134",
                        "5234612",
                        "5208102",
                        "4377329"
                    ]
                },
                {
                    "metric": "Capital Lease Obligations",
                    "values": [
                        "110909",
                        "121821",
                        "131441",
                        "152968"
                    ]
                },
                {
                    "metric": "Net Tangible Assets",
                    "values": [
                        "4491707",
                        "3616964",
                        "3313476",
                        "3346338"
                    ]
                },
                {
                    "metric": "Invested Capital",
                    "values": [
                        "9618435",
                        "10475424",
                        "10711032",
                        "8418994"
                    ]
                },
                {
                    "metric": "Tangible Book Value",
                    "values": [
                        "4491707",
                        "3296590",
                        "2993102",
                        "3025964"
                    ]
                },
                {
                    "metric": "Total Debt",
                    "values": [
                        "3204210",
                        "5362633",
                        "5634371",
                        "4194633"
                    ]
                },
                {
                    "metric": "Net Debt",
                    "values": [
                        "555008",
                        "2155792",
                        "4081023",
                        "3546954"
                    ]
                },
                {
                    "metric": "Share Issued",
                    "values": [
                        "1095357.78",
                        "975861.79",
                        "933896.12",
                        "828154.46"
                    ]
                },
                {
                    "metric": "Ordinary Shares Number",
                    "values": [
                        "1095357.78",
                        "975861.79",
                        "933896.12",
                        "828154.46"
                    ]
                },
                {
                    "metric": "Preferred Shares Number",
                    "values": [
                        "3234",
                        "3234",
                        "3234",
                        "3234"
                    ]
                },
                {
                    "metric": "Treasury Shares Number",
                    "values": [
                        "--",
                        "0",
                        "--",
                        "--"
                    ]
                }
            ]
        },
        "cashFlow": {
            "headers": [
                "Breakdown",
                "TTM",
                "12/31/2024",
                "12/31/2023",
                "12/31/2022",
                "12/31/2021"
            ],
            "rows": [
                {
                    "metric": "Operating Cash Flow",
                    "values": [
                        "-1836553",
                        "-1119807",
                        "-7227139",
                        "-7255858",
                        "-1350217"
                    ]
                },
                {
                    "metric": "  Cash Flow from Continuing Operating Activities",
                    "values": [
                        "-1836553",
                        "-1119807",
                        "-7227139",
                        "-7255858",
                        "-1350217"
                    ]
                },
                {
                    "metric": "    Net Income from Continuing Operations",
                    "values": [
                        "481738",
                        "498665",
                        "-300742",
                        "-320407",
                        "-483937"
                    ]
                },
                {
                    "metric": "    Operating Gains Losses",
                    "values": [
                        "-2496",
                        "-62517",
                        "-14574",
                        "--",
                        "107589"
                    ]
                },
                {
                    "metric": "      Earnings Losses from Equity Investments",
                    "values": [
                        "--",
                        "--",
                        "0",
                        "0",
                        "261"
                    ]
                },
                {
                    "metric": "    Depreciation Amortization Depletion",
                    "values": [
                        "210242",
                        "203498",
                        "201416",
                        "151360",
                        "101568"
                    ]
                },
                {
                    "metric": "      Depreciation & amortization",
                    "values": [
                        "210242",
                        "203498",
                        "201416",
                        "151360",
                        "101568"
                    ]
                },
                {
                    "metric": "    Deferred Tax",
                    "values": [
                        "-277156",
                        "-286917",
                        "-15828",
                        "-3498",
                        "1204"
                    ]
                },
                {
                    "metric": "      Deferred Income Tax",
                    "values": [
                        "-277156",
                        "-286917",
                        "-15828",
                        "-3498",
                        "1204"
                    ]
                },
                {
                    "metric": "    Other non-cash items",
                    "values": [
                        "-189121",
                        "-134698",
                        "-37524",
                        "38326",
                        "28627"
                    ]
                },
                {
                    "metric": "    Asset Impairment Charge",
                    "values": [
                        "--",
                        "0",
                        "247174",
                        "0",
                        "0"
                    ]
                },
                {
                    "metric": "    Stock based compensation",
                    "values": [
                        "254826",
                        "246152",
                        "271216",
                        "305994",
                        "239011"
                    ]
                },
                {
                    "metric": "    Provision for Loan Lease And Other Losses",
                    "values": [
                        "30208",
                        "31712",
                        "54945",
                        "54332",
                        "7573"
                    ]
                },
                {
                    "metric": "    Unrealized Gain Loss On Investment Securities",
                    "values": [
                        "--",
                        "-2842",
                        "-48",
                        "13600",
                        "-6538"
                    ]
                },
                {
                    "metric": "    Change in working capital",
                    "values": [
                        "-2341952",
                        "-1612860",
                        "-7633174",
                        "-7495565",
                        "-1345314"
                    ]
                },
                {
                    "metric": "      Change in Receivables",
                    "values": [
                        "--",
                        "--",
                        "0",
                        "0",
                        "1399"
                    ]
                },
                {
                    "metric": "        Changes in Account Receivables",
                    "values": [
                        "--",
                        "--",
                        "0",
                        "0",
                        "1399"
                    ]
                },
                {
                    "metric": "      Change in Payables And Accrued Expense",
                    "values": [
                        "131982",
                        "23552",
                        "42088",
                        "6365",
                        "-9022"
                    ]
                },
                {
                    "metric": "        Change in Payable",
                    "values": [
                        "131982",
                        "23552",
                        "42088",
                        "6365",
                        "-9022"
                    ]
                },
                {
                    "metric": "          Change in Account Payable",
                    "values": [
                        "131982",
                        "23552",
                        "42088",
                        "6365",
                        "-9022"
                    ]
                },
                {
                    "metric": "      Change in Loans",
                    "values": [
                        "-2109278",
                        "-1016303",
                        "-7638152",
                        "-7463474",
                        "-1308329"
                    ]
                },
                {
                    "metric": "      Change in Other Current Assets",
                    "values": [
                        "-364656",
                        "-620109",
                        "-37110",
                        "-38456",
                        "-29362"
                    ]
                },
                {
                    "metric": "Investing Cash Flow",
                    "values": [
                        "-5000026",
                        "-4820990",
                        "-1889864",
                        "-106333",
                        "110193"
                    ]
                },
                {
                    "metric": "  Cash Flow from Continuing Investing Activities",
                    "values": [
                        "-5000026",
                        "-4820990",
                        "-1889864",
                        "-106333",
                        "110193"
                    ]
                },
                {
                    "metric": "    Capital Expenditure Reported",
                    "values": [
                        "-8868",
                        "-9352",
                        "-9783",
                        "-10532",
                        "0"
                    ]
                },
                {
                    "metric": "    Net Investment Purchase And Sale",
                    "values": [
                        "-1139629",
                        "-1151581",
                        "-333953",
                        "112588",
                        "145761"
                    ]
                },
                {
                    "metric": "      Purchase of Investment",
                    "values": [
                        "-2206970",
                        "-2228297",
                        "-867060",
                        "-44974",
                        "-268372"
                    ]
                },
                {
                    "metric": "      Sale of Investment",
                    "values": [
                        "1067341",
                        "1076716",
                        "533107",
                        "157562",
                        "414133"
                    ]
                },
                {
                    "metric": "    Net Proceeds Payment for Loan",
                    "values": [
                        "-3676644",
                        "-3505792",
                        "-1362418",
                        "-173728",
                        "0"
                    ]
                },
                {
                    "metric": "      Proceeds from Loans",
                    "values": [
                        "--",
                        "677587",
                        "0",
                        "0",
                        "16693"
                    ]
                },
                {
                    "metric": "      Payment for Loans",
                    "values": [
                        "--",
                        "-4183379",
                        "-1362418",
                        "-173728",
                        "0"
                    ]
                },
                {
                    "metric": "    Net PPE Purchase And Sale",
                    "values": [
                        "-174885",
                        "-154265",
                        "-111409",
                        "-93201",
                        "-52261"
                    ]
                },
                {
                    "metric": "      Purchase of PPE",
                    "values": [
                        "-174885",
                        "-154265",
                        "-111409",
                        "-93201",
                        "-52261"
                    ]
                },
                {
                    "metric": "    Net Business Purchase And Sale",
                    "values": [
                        "--",
                        "0",
                        "-72301",
                        "58540",
                        "0"
                    ]
                },
                {
                    "metric": "      Purchase of Business",
                    "values": [
                        "--",
                        "0",
                        "-72301",
                        "--",
                        "0"
                    ]
                },
                {
                    "metric": "      Sale of Business",
                    "values": [
                        "--",
                        "--",
                        "--",
                        "58540",
                        "--"
                    ]
                },
                {
                    "metric": "    Net Other Investing Changes",
                    "values": [
                        "--",
                        "--",
                        "--",
                        "--",
                        "16693"
                    ]
                },
                {
                    "metric": "Financing Cash Flow",
                    "values": [
                        "5404895",
                        "5034577",
                        "10885602",
                        "8439485",
                        "684987"
                    ]
                },
                {
                    "metric": "  Cash Flow from Continuing Financing Activities",
                    "values": [
                        "5404895",
                        "5034577",
                        "10885602",
                        "8439485",
                        "684987"
                    ]
                },
                {
                    "metric": "    Net Issuance Payments of Debt",
                    "values": [
                        "212831",
                        "-1490721",
                        "-279819",
                        "1341595",
                        "-908378"
                    ]
                },
                {
                    "metric": "      Net Long Term Debt Issuance",
                    "values": [
                        "212831",
                        "-1490721",
                        "-279819",
                        "1341595",
                        "-908378"
                    ]
                },
                {
                    "metric": "        Long Term Debt Issuance",
                    "values": [
                        "0",
                        "845250",
                        "520549",
                        "1858446",
                        "1191908"
                    ]
                },
                {
                    "metric": "        Long Term Debt Payments",
                    "values": [
                        "212831",
                        "-2335971",
                        "-800368",
                        "-516851",
                        "-2100286"
                    ]
                },
                {
                    "metric": "    Net Common Stock Issuance",
                    "values": [
                        "--",
                        "--",
                        "0",
                        "0",
                        "-283385"
                    ]
                },
                {
                    "metric": "      Common Stock Issuance",
                    "values": [
                        "--",
                        "--",
                        "--",
                        "0",
                        "0"
                    ]
                },
                {
                    "metric": "      Common Stock Payments",
                    "values": [
                        "--",
                        "--",
                        "0",
                        "0",
                        "-283385"
                    ]
                },
                {
                    "metric": "    Net Preferred Stock Issuance",
                    "values": [
                        "--",
                        "-323400",
                        "0",
                        "0",
                        "0"
                    ]
                },
                {
                    "metric": "      Preferred Stock Issuance",
                    "values": [
                        "--",
                        "--",
                        "--",
                        "--",
                        "0"
                    ]
                },
                {
                    "metric": "      Preferred Stock Payments",
                    "values": [
                        "--",
                        "-323400",
                        "0",
                        "0",
                        "-40426"
                    ]
                },
                {
                    "metric": "    Cash Dividends Paid",
                    "values": [
                        "--",
                        "-16503",
                        "-40425",
                        "-40425",
                        "-40426"
                    ]
                },
                {
                    "metric": "      Preferred Stock Dividend Paid",
                    "values": [
                        "--",
                        "-16503",
                        "-40425",
                        "-40425",
                        "-40426"
                    ]
                },
                {
                    "metric": "    Proceeds from Stock Option Exercised",
                    "values": [
                        "21136",
                        "-59062",
                        "1145",
                        "2610",
                        "6441"
                    ]
                },
                {
                    "metric": "    Net Other Financing Charges",
                    "values": [
                        "-27333",
                        "-30221",
                        "-27203",
                        "-17270",
                        "1910735"
                    ]
                },
                {
                    "metric": "End Cash Position",
                    "values": [
                        "2716224",
                        "2709360",
                        "3615578",
                        "1846302",
                        "768437"
                    ]
                },
                {
                    "metric": "  Changes in Cash",
                    "values": [
                        "-1431684",
                        "-906220",
                        "1768599",
                        "1077294",
                        "-555037"
                    ]
                },
                {
                    "metric": "  Effect of Exchange Rate Changes",
                    "values": [
                        "-88",
                        "2",
                        "677",
                        "571",
                        "46"
                    ]
                },
                {
                    "metric": "  Beginning Cash Position",
                    "values": [
                        "4147908",
                        "3615578",
                        "1846302",
                        "768437",
                        "1323428"
                    ]
                },
                {
                    "metric": "Income Tax Paid Supplemental Data",
                    "values": [
                        "--",
                        "26910",
                        "14326",
                        "2567",
                        "1759"
                    ]
                },
                {
                    "metric": "Interest Paid Supplemental Data",
                    "values": [
                        "--",
                        "1118032",
                        "720163",
                        "150866",
                        "94795"
                    ]
                },
                {
                    "metric": "Capital Expenditure",
                    "values": [
                        "-183753",
                        "-163617",
                        "-121192",
                        "-103733",
                        "-52261"
                    ]
                },
                {
                    "metric": "Issuance of Capital Stock",
                    "values": [
                        "--",
                        "--",
                        "--",
                        "0",
                        "0"
                    ]
                },
                {
                    "metric": "Issuance of Debt",
                    "values": [
                        "0",
                        "845250",
                        "520549",
                        "1858446",
                        "1191908"
                    ]
                },
                {
                    "metric": "Repayment of Debt",
                    "values": [
                        "212831",
                        "-2335971",
                        "-800368",
                        "-516851",
                        "-2100286"
                    ]
                },
                {
                    "metric": "Repurchase of Capital Stock",
                    "values": [
                        "--",
                        "-323400",
                        "0",
                        "0",
                        "-283385"
                    ]
                },
                {
                    "metric": "Free Cash Flow",
                    "values": [
                        "-2020306",
                        "-1283424",
                        "-7348331",
                        "-7359591",
                        "-1402478"
                    ]
                }
            ]
        }
    }
}

export default function FinancialChartsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* <FinancialDashboard data={sofiData} /> */}
      <FinancialAnalysisDashboard></FinancialAnalysisDashboard>
    </div>
  );
}
