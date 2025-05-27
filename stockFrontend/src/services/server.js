import axios from 'axios';

const API_BASE = 'http://localhost:5000';

export function getTickers() {
  return axios.get(`${API_BASE}/tickers`).then(res => res.data);
}

export function getStockData(ticker, minutes) {
  return axios.get(`${API_BASE}/stock/${ticker}?minutes=${minutes}`).then(res => res.data);
}

// Add this function:
export function getCorrelation() {
  return axios.get(`${API_BASE}/correlation`).then(res => res.data);
}