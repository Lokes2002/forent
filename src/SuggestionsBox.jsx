export default function SuggestionsBox({ suggestions }) {
  return (
    <div className="suggestions-box">
      <h3>Suggestions to Improve Engagement</h3>
      <ul>
        {suggestions.map((s, index) => (
          <li key={index} style={{ marginBottom: 6 }}>
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
