import React from "react";

function ImageAnalysis({ insights }) {
  if (!insights) return null;

  return (
    <div className="analysis-box" style={{
      padding: "16px",
      background: "#fff",
      border: "1px solid #ddd",
      borderRadius: "12px",
      maxWidth: "400px",
      marginTop: "12px"
    }}>
      <h3>📸 Image Insights</h3>

      <p><b>Width:</b> {insights.width}px</p>
      <p><b>Height:</b> {insights.height}px</p>
      <p><b>Brightness:</b> {insights.brightness}</p>
      <p><b>Blur Score:</b> {insights.blurScore}</p>

      {insights.rawOutput && (
        <>
          <p><b>YOLO Output:</b></p>
          <pre style={{
            whiteSpace: "pre-wrap",
            background: "#f7f7f7",
            padding: "10px",
            borderRadius: "6px",
            fontSize: "12px"
          }}>
            {insights.rawOutput}
          </pre>
        </>
      )}
    </div>
  );
}

export default ImageAnalysis;
