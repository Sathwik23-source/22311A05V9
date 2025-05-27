const express = require('express');
const cors = require('cors');

const app = express();


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));


const tickers = ['AAPL', 'GOOG', 'MSFT', 'AMZN'];

function generatePriceHistory(minutes) {
  const now = Date.now();
  return Array.from({ length: minutes }, (_, i) => ({
    lastUpdatedAt: now - (minutes - i) * 60000,
    price: (100 + Math.random() * 20).toFixed(2),
  }));
}

// GET /tickers
app.get('/tickers', (req, res) => {
  res.json(tickers);
});

// GET /stock/:ticker?minutes=30
app.get('/stock/:ticker', (req, res) => {
  const { ticker } = req.params;
  const minutes = parseInt(req.query.minutes) || 30;

  const priceHistory = generatePriceHistory(minutes).map(p => ({
    ...p,
    price: Number(p.price),
  }));

  const averageStockPrice =
    priceHistory.reduce((sum, p) => sum + p.price, 0) / priceHistory.length;

  res.json({ ticker, priceHistory, averageStockPrice });
});

// GET /correlation?ticker1=AAPL&ticker2=GOOG&minutes=30
app.get('/correlation', (req, res) => {
  const { ticker1, ticker2, minutes } = req.query;

  let correlation = 1;
  if (ticker1 !== ticker2) {
    correlation = (Math.random() * 2 - 1).toFixed(2); // -1 to 1
  }

  res.json({ correlation: Number(correlation) });
});

// Start server on port 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
