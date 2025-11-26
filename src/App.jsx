import { useState } from "react";
import axios from "axios";
import DropZone from "./DropZone";
import SuggestionsBox from "./components/SuggestionsBox";
import ObjectsDetected from "./components/ObjectsDetected";
import ImageAnalysis from "./analysis/imageAnalysis";

import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // ⚠ Backend URL yaha daalo (Render ka)
  const BACKEND_URL = "https://your-backend.onrender.com/analyze";

  const uploadFile = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      // Convert file → raw bytes
      const imgBytes = await file.arrayBuffer();

      const res = await axios.post(
        BACKEND_URL,
        imgBytes,
        {
          headers: { "Content-Type": "application/octet-stream" }
        }
      );

      setResult(res.data);
    } catch (err) {
      setError(err?.response?.data?.detail || "Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      {/* Professional Header */}
      <header className="app-header">
        <div className="header-content">
          <h1>Social Media Content Analyzer</h1>
          <p>Upload an Image → Detect Objects + Extract Text using AI</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        
        {/* Upload section */}
        <div className="upload-section">
          <div className="upload-card">

            <DropZone onFileSelect={setFile} />

            {file && (
              <div className="file-info">
                <span className="file-icon">📄</span>
                <div className="file-details">
                  <p className="file-name">{file.name}</p>
                  <p className="file-size">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
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
                  Analyzing your file...
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
                    onClick={() =>
                      navigator.clipboard.writeText(
                        result?.results?.map(r => r.text).join(" ")
                      )
                    }
                  >
                    📋 Copy Text
                  </button>
                </div>

                <div className="text-preview">
                  {result?.results?.map(r => r.text).join(" ") || "No text found"}
                </div>
              </div>

              {/* Objects Detected */}
              {result?.results?.length > 0 && (
                <ObjectsDetected data={result.results} />
              )}

              {/* Image Insights (optional UI section) */}
              {result?.imageInsights && (
                <ImageAnalysis insights={result.imageInsights} />
              )}
            </div>
          )}

          {!result && !loading && (
            <div className="empty-state">
              <div className="empty-icon">📊</div>
              <h3>No Analysis Yet</h3>
              <p>Upload an image to start AI analysis</p>
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
