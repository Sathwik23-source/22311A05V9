import React, { useState, useEffect } from 'react';
import { getStockData, getTickers } from '../services/server';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';
import { Box, Typography, Select, MenuItem } from '@mui/material';

const timeOptions = [5, 15, 30, 60];

function StockPage() {
  const [ticker, setTicker] = useState('AAPL');
  const [minutes, setMinutes] = useState(30);
  const [data, setData] = useState(null);
  const [tickers, setTickers] = useState([]);

  useEffect(() => {
    getTickers().then(setTickers);
  }, []);

  useEffect(() => {
    getStockData(ticker, minutes).then(setData);
  }, [ticker, minutes]);

  return (
    <Box>
      <Typography variant="h4">Stock Page</Typography>
      <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
        <Select value={ticker} onChange={e => setTicker(e.target.value)}>
          {tickers.map(t => <MenuItem value={t} key={t}>{t}</MenuItem>)}
        </Select>
        <Select value={minutes} onChange={e => setMinutes(e.target.value)}>
          {timeOptions.map(m => <MenuItem value={m} key={m}>{m} min</MenuItem>)}
        </Select>
      </Box>
      {data && (
        <>
          <Typography>Average Price: ${data.averageStockPrice.toFixed(2)}</Typography>
          <LineChart width={600} height={300} data={data.priceHistory}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="lastUpdatedAt" tickFormatter={t => new Date(t).toLocaleTimeString()} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#3f51b5" />
            <ReferenceLine y={data.averageStockPrice} label="Avg" stroke="red" strokeDasharray="3 3" />
          </LineChart>
        </>
      )}
    </Box>
  );
}

export default StockPage;
