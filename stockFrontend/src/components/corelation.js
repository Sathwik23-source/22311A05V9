import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Correlation() {
  const [ticker1, setTicker1] = useState('AAPL');
  const [ticker2, setTicker2] = useState('GOOG');
  const [minutes, setMinutes] = useState(30);
  const [correlation, setCorrelation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const fetchCorrelation = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3000/correlation', {
        params: {
          ticker1,
          ticker2,
          minutes,
        },
      });
      setCorrelation(response.data.correlation);
    } catch (err) {
      setError('');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchCorrelation();
  }, [ticker1, ticker2, minutes]);

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Stock Correlation</h2>

      <div style={{ marginBottom: '10px' }}>
        <label>
          Ticker 1:
          <input
            type="text"
            value={ticker1}
            onChange={(e) => setTicker1(e.target.value.toUpperCase())}
            style={{ marginLeft: '10px', width: '100px' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>
          Ticker 2:
          <input
            type="text"
            value={ticker2}
            onChange={(e) => setTicker2(e.target.value.toUpperCase())}
            style={{ marginLeft: '10px', width: '100px' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>
          Minutes:
          <input
            type="number"
            min="1"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            style={{ marginLeft: '10px', width: '80px' }}
          />
        </label>
      </div>

      <button onClick={fetchCorrelation} disabled={loading}>
        {loading ? 'Loading...' : 'Get Correlation'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {correlation !== null && !loading && !error && (
        <p>
          Correlation between <b>{ticker1}</b> and <b>{ticker2}</b> over last{' '}
          <b>{minutes}</b> minutes is: <b>{correlation.toFixed(2)}</b>
        </p>
      )}
    </div>
  );
}

export default Correlation;
