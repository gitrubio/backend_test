
export  interface StockResponse {
  symbol: string;
  name: string;
  lastUpdated: string;
  months: string[]; // Last 12 months in English
  closePrices: number[]; // Last 12 months closing prices
  monthlyGrowth: number; // Monthly growth percentage
  yearlyGrowth: number; // Yearly growth percentage
}

// Function to calculate percentage growth
const calculateGrowth = (newPrice: number, oldPrice: number): number => {
  return ((newPrice - oldPrice) / oldPrice) * 100;
};

// Function to get the last 12 months in English
const getLast12Months = (): string[] => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const date = new Date();
  return Array.from({ length: 12 }, (_, i) => {
    const index = (date.getMonth() - i + 12) % 12;
    return months[index];
  }).reverse();
};

// Get current months array
const monthsArray = getLast12Months();

// Mock stock data
export const stockMockData: StockResponse[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    lastUpdated: "2025-02-25",
    months: monthsArray,
    closePrices: [250.5, 245.2, 240.8, 235.1, 230.0, 225.4, 220.9, 215.6, 210.3, 205.7, 200.2, 195.8],
    monthlyGrowth: calculateGrowth(250.5, 245.2),
    yearlyGrowth: calculateGrowth(250.5, 195.8),
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    lastUpdated: "2025-02-25",
    months: monthsArray,
    closePrices: [1385, 1360, 1340, 1320, 1305, 1290, 1275, 1250, 1230, 1215, 1200, 1185],
    monthlyGrowth: calculateGrowth(1385, 1360),
    yearlyGrowth: calculateGrowth(1385, 1185),
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    lastUpdated: "2025-02-25",
    months: monthsArray,
    closePrices: [410, 400, 390, 380, 370, 360, 350, 340, 330, 320, 310, 300],
    monthlyGrowth: calculateGrowth(410, 400),
    yearlyGrowth: calculateGrowth(410, 300),
  }
];
