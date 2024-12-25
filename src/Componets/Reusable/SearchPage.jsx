import React, { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import "./SearchPage.css";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const fetchData = async () => {
    if (!query.trim()) {
      setError("Please enter a search query.");
      setResults([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const combinedResults = [];

      // Wikipedia API (No API key required)
      const wikiResponse = await axios.get(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json`
      );
      if (wikiResponse.data.query.search) {
        wikiResponse.data.query.search.forEach((result) => {
          combinedResults.push({
            source: "Wikipedia",
            title: result.title,
            snippet: result.snippet,
            url: `https://en.wikipedia.org/?curid=${result.pageid}`,
          });
        });
      }

      if (combinedResults.length === 0) {
        setResults([{ source: "None", text: "No relevant results found." }]);
      } else {
        setResults(combinedResults);
        toast.success("Results found!");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(`Error fetching results: ${err.message || err}`);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce(fetchData, 1000);

  useEffect(() => {
    if (query) {
      debouncedSearch();
    }
  }, [query]);

  useEffect(() => {
    setResults([]);
  }, [query]);

  return (
    <div className="search-container">
      <h1>Public Search</h1>
      <div className="search-box">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search anything..."
          className="search-input"
        />
      </div>

      {loading && <div className="loading-spinner">Loading...</div>}

      {error && <p className="error-message">{error}</p>}

      {results && (
        <div className="result-box">
          <h2>Results:</h2>
          <ul>
            {results.map((result, index) => (
              <li key={index} className="result-item">
                <h3>{result.source}</h3>
                <p>{result.text || result.title}</p>
                {result.snippet && <p>{result.snippet}</p>}
                {result.description && <p>{result.description}</p>}
                {result.url && (
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read more
                  </a>
                )}
                {result.image && (
                  <img src={result.image} alt={result.description} />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
