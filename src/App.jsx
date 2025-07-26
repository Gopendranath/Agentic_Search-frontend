import { useState } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [summary, setSummary] = useState('');
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setSummary('');
    setLinks([]);

    try {
      const response = await axios.post('http://localhost:9000/search', {
        query: query,
      });

      setSummary(response.data.summary);
      setLinks(response.data.links);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h1>Internet Search Summarizer</h1>
      <input
        type="text"
        placeholder="Enter your search query..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <button
        onClick={handleSearch}
        disabled={loading || !query.trim()}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {summary && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Summary</h2>
          <p style={{ whiteSpace: 'pre-wrap' }}>{summary}</p>
        </div>
      )}

      {links.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Sources:</h3>
          <ul>
            {links.map((link, index) => (
              <li key={index}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
