import { useState } from "react";
import axios from "axios";
import DropZone from "./DropZone";
import SuggestionsBox from "./components/SuggestionsBox";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // ⚠ Backend URL yaha daalo
  const BACKEND_URL = "https://your-backend.onrender.com/api/extract";

  const uploadFile = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const imgBytes = await file.arrayBuffer();

      const res = await axios.post(BACKEND_URL, imgBytes, {
        headers: { "Content-Type": "application/octet-stream" }
      });

      setResult(res.data);
    } catch (err) {
      setError(err?.response?.data?.error || "Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="app-container">

      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1>Social Media Content Analyzer</h1>
          <p>Upload any Image → Extract Text → Get AI Suggestions 🚀</p>
        </div>
      </header>

      <div className="main-content">

        {/* Upload Section */}
        <div className="upload-section">
          <div className="upload-card">

            <DropZone onFileSelect={setFile} />

            {file && (
              <div className="file-info">
                <span className="file-icon">📄</span>
                <div className="file-details">
                  <p className="file-name">{file.name}</p>
                  <p className="file-size">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
            )}

            <button
              className={`upload-btn ${!file || loading ? "disabled" : ""}`}
              disabled={!file || loading}
              onClick={uploadFile}
            >
              {loading ? (
                <>
                  <div className="btn-spinner"></div>
                  Analyzing your content...
                </>
              ) : (
                "🚀 Analyze Now"
              )}
            </button>

            {error && <div className="error-message">⚠ {error}</div>}
          </div>
        </div>

        {/* Results Section */}
        <div className="results-section">
          {loading && (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <h3>Analyzing image...</h3>
              <p>Please wait a few seconds...</p>
            </div>
          )}

          {result && !loading && (
            <div className="results-container">

              {/* Extracted Text */}
              <div className="result-card">
                <div className="card-header">
                  <h3>📝 Extracted Text</h3>
                  <button
                    className="copy-btn"
                    onClick={() => navigator.clipboard.writeText(result?.text)}
                  >
                    📋 Copy Text
                  </button>
                </div>

                <div className="text-preview">
                  {result?.text || "No text found"}
                </div>
              </div>
            </div>
          )}

          {!result && !loading && (
            <div className="empty-state">
              <div className="empty-icon">📊</div>
              <h3>No Analysis Yet</h3>
              <p>Upload an image to start text extraction</p>
            </div>
          )}
        </div>
      </div>

      {/* AI Suggestions */}
      {result?.suggestions?.length > 0 && (
        <SuggestionsBox suggestions={result.suggestions} />
      )}
    </div>
  );
}

export default App;
