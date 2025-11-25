import React from "react";

function ObjectsDetected({ data }) {
  if (!data) return <p>Loading...</p>;

  return (
    <div style={{
      background: "#fff",
      padding: "16px",
      borderRadius: "12px",
      border: "1px solid #ddd",
      marginTop: "12px"
    }}>
      <h3>🎯 Objects Detected ({data.objects?.length || 0})</h3>

      {data.objects && data.objects.length > 0 ? (
        data.objects.map((o, i) => (
          <div key={i}
            style={{
              padding: "8px",
              background: "#f1f1f1",
              borderRadius: "8px",
              marginBottom: "8px"
            }}
          >
            <b>{o.label}</b> — {(o.confidence * 100).toFixed(1)}%
          </div>
        ))
      ) : (
        <p>No objects detected.</p>
      )}
    </div>
  );
}

export default ObjectsDetected;
