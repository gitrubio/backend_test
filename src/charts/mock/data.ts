
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
    closePrices: [195.8, 200.2, 205.7, 210.3, 215.6, 220.9, 225.4, 230.0, 235.1, 240.8, 245.2, 250.5],
    monthlyGrowth: calculateGrowth(250.5, 245.2),
    yearlyGrowth: calculateGrowth(250.5, 195.8),
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    lastUpdated: "2025-02-25",
    months: monthsArray,
    closePrices: [1185, 1200, 1215, 1230, 1250, 1275, 1290, 1305, 1320, 1340, 1360, 1385],
    monthlyGrowth: calculateGrowth(1385, 1360),
    yearlyGrowth: calculateGrowth(1385, 1185),
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    lastUpdated: "2025-02-25",
    months: monthsArray,
    closePrices: [300, 310, 320, 330, 340, 350, 360, 370, 380, 390, 400, 410],
    monthlyGrowth: calculateGrowth(410, 400),
    yearlyGrowth: calculateGrowth(410, 300),
  }
];
