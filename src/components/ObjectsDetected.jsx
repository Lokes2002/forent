import React from "react";

function ObjectsDetected({ data }) {
  if (!data || data.length === 0) return (
    <div style={{
      background: "#fff",
      padding: "16px",
      borderRadius: "12px",
      border: "1px solid #ddd",
      marginTop: "12px"
    }}>
      <h3>🎯 Objects Detected (0)</h3>
      <p>No objects detected.</p>
    </div>
  );

  return (
    <div style={{
      background: "#fff",
      padding: "16px",
      borderRadius: "12px",
      border: "1px solid #ddd",
      marginTop: "12px"
    }}>
      <h3>🎯 Objects Detected ({data.length})</h3>

      {data.map((o, i) => (
        <div
          key={i}
          style={{
            padding: "8px",
            background: "#f1f1f1",
            borderRadius: "8px",
            marginBottom: "8px"
          }}
        >
          <b>{o.label}</b> — {(o.confidence * 100).toFixed(1)}%
          {o.text && (
            <p style={{ margin: "4px 0 0", fontSize: "14px" }}>
              📝 Text: {o.text}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default ObjectsDetected;
