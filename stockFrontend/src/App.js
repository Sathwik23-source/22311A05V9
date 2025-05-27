import React from 'react';
import { BrowserRouter, Routes, Route, Link as RouterLink } from 'react-router-dom';
import StockPage from './components/stockdetail';
import CorrelationHeatmap from './components/corelation';
import { AppBar, Toolbar, Button } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={RouterLink} to="/">Stock Page</Button>
          <Button color="inherit" component={RouterLink} to="/heatmap">Correlation Heatmap</Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<StockPage />} />
        <Route path="/heatmap" element={<CorrelationHeatmap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
