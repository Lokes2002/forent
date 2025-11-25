import React from "react";

export default function SuggestionsBox({ suggestions }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
      padding: "24px",
      borderRadius: "20px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)",
      width: "100%",
      marginTop: "24px",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      border: "1px solid rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(10px)",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Decorative elements */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        background: "linear-gradient(90deg, #667eea, #764ba2, #f093fb)",
        borderRadius: "20px 20px 0 0"
      }} />
      
      <h3 style={{
        fontSize: "22px",
        fontWeight: "700",
        marginBottom: "20px",
        color: "#2c3e50",
        textAlign: "left",
        background: "linear-gradient(135deg, #2c3e50, #3498db)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline-block",
        padding: "4px 0"
      }}>
        💡 Suggestions to Improve Engagement
      </h3>

      <ul style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: "12px"
      }}>
        {suggestions.map((suggestion, index) => (
          <li 
            key={index}
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)",
              padding: "16px 20px",
              borderRadius: "12px",
              border: "1px solid #e3f2fd",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              fontSize: "15px",
              color: "#2c3e50",
              lineHeight: "1.5",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(33, 150, 243, 0.15)";
              e.currentTarget.style.borderColor = "#90caf9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
              e.currentTarget.style.borderColor = "#e3f2fd";
            }}
          >
            {/* Number indicator */}
            <div style={{
              position: "absolute",
              left: "0",
              top: "0",
              bottom: "0",
              width: "4px",
              background: "linear-gradient(180deg, #667eea, #764ba2)",
              borderRadius: "4px 0 0 4px"
            }} />
            
            {/* Suggestion content */}
            <div style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px"
            }}>
              <div style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: "1px",
                fontSize: "12px",
                fontWeight: "bold",
                color: "white",
                boxShadow: "0 2px 8px rgba(102, 126, 234, 0.3)"
              }}>
                {index + 1}
              </div>
              
              <span style={{
                flex: 1,
                fontWeight: "500"
              }}>
                {suggestion}
              </span>
              
              {/* Hover arrow */}
              <div style={{
                opacity: 0,
                transition: "all 0.3s ease",
                transform: "translateX(-5px)"
              }}>
                →
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Footer note */}
      {suggestions.length > 0 && (
        <div style={{
          marginTop: "20px",
          padding: "12px 16px",
          background: "linear-gradient(135deg, #e8f5e8, #c8e6c9)",
          borderRadius: "10px",
          border: "1px solid #a5d6a7",
          fontSize: "14px",
          color: "#2e7d32",
          textAlign: "center",
          fontWeight: "500",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px"
        }}>
          <span style={{ fontSize: "16px" }}>✨</span>
          AI-powered suggestions to boost your content performance
        </div>
      )}

      {/* Empty state */}
      {suggestions.length === 0 && (
        <div style={{
          textAlign: "center",
          padding: "40px 20px",
          color: "#7f8c8d"
        }}>
          <div style={{
            fontSize: "48px",
            marginBottom: "16px",
            opacity: 0.5
          }}>
            💡
          </div>
          <h4 style={{
            fontSize: "18px",
            fontWeight: "600",
            marginBottom: "8px",
            color: "#95a5a6"
          }}>
            No Suggestions Yet
          </h4>
          <p style={{
            fontSize: "14px",
            opacity: 0.8
          }}>
            Upload an image to get AI-powered engagement suggestions
          </p>
        </div>
      )}
    </div>
  );
}