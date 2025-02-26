
export interface StockResponse {
  symbol: string;
  name: string;
  lastUpdated: string;
  closePrices: number[]; // Últimos 12 meses de precios de cierre
  monthlyGrowth: number; // Crecimiento mensual (%)
  yearlyGrowth: number; // Crecimiento anual (%)
}

// Función para calcular el porcentaje de crecimiento
const calculateGrowth = (newPrice: number, oldPrice: number): number => {
  return ((newPrice - oldPrice) / oldPrice) * 100;
};

// Datos mockeados de compañías (últimos 12 meses de cierre)
export const stockMockData: StockResponse[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    lastUpdated: "2025-02-25",
    closePrices: [250.5, 245.2, 240.8, 235.1, 230.0, 225.4, 220.9, 215.6, 210.3, 205.7, 200.2, 195.8],
    monthlyGrowth: calculateGrowth(250.5, 245.2),
    yearlyGrowth: calculateGrowth(250.5, 195.8),
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    lastUpdated: "2025-02-25",
    closePrices: [1385, 1360, 1340, 1320, 1305, 1290, 1275, 1250, 1230, 1215, 1200, 1185],
    monthlyGrowth: calculateGrowth(1385, 1360),
    yearlyGrowth: calculateGrowth(1385, 1185),
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    lastUpdated: "2025-02-25",
    closePrices: [320, 310, 305, 295, 290, 285, 275, 270, 260, 255, 250, 245],
    monthlyGrowth: calculateGrowth(320, 310),
    yearlyGrowth: calculateGrowth(320, 245),
  }
];

export const getDataMock = () => {
    return stockMockData;
}