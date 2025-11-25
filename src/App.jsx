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

  const uploadFile = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/extract",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResult(res.data);

    } catch (err) {
      setError(err?.response?.data?.error || "Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      {/* Professional Header */}
      <header className="app-header">
        <div className="header-content">
          <h1>Social Media Content Analyzer</h1>
          <p>Upload PDF or Image → Extract Text → Get AI-Powered Engagement Tips</p>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="main-content">
        {/* Left Column - Upload Section */}
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
              className={`upload-btn ${!file || loading ? 'disabled' : ''}`}
              disabled={!file || loading} 
              onClick={uploadFile}
            >
              {loading ? (
                <>
                  <div className="btn-spinner"></div>
                  Analyzing Content...
                </>
              ) : (
                '🚀 Analyze Now'
              )}
            </button>

            {error && (
              <div className="error-message">
                ⚠️ {error}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Results Section */}
        <div className="results-section">
          {loading && (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <h3> Analyzing your content</h3>
              <p>This may take a few seconds...</p>
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
                    onClick={() => navigator.clipboard.writeText(result.text)}
                  >
                    📋 Copy Text
                  </button>
                </div>
                <div className="text-preview">
                  {result.text || "No text found"}
                </div>
              </div>

              {/* Image Analysis */}
              {result.imageInsights && (
                <ImageAnalysis insights={result.imageInsights} />
              )}

              {/* Objects Detected */}
              {result.objectsDetected && result.objectsDetected.length > 0 && (
                <ObjectsDetected data={result.objectsDetected} />
              )}

              {/* AI Suggestions */}
             
            </div>
          )}

          {!result && !loading && (
            <div className="empty-state">
              <div className="empty-icon">📊</div>
              <h3>No Analysis Yet</h3>
              <p>Upload a file to see AI-powered insights and engagement tips</p>
            </div>
          )}

          
        </div>
</div>

{result?.suggestions?.length > 0 && (
    <SuggestionsBox suggestions={result.suggestions} />
)}

</div>

  );
}

export default App;