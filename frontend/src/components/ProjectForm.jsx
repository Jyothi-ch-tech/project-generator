import { useState } from "react";
import axios from "axios";
import "../styles/ProjectGenerator.css";

export default function ProjectForm() {
  const [topic, setTopic] = useState("");
  const [domain, setDomain] = useState("Web Development");
  const [level, setLevel] = useState("Beginner");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await axios.post("http://localhost:5000/api/project/generate", {
        topic,
        domain,
        level
      });
      setResult(res.data.result);
    } catch {
      setError("Failed to generate project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="generator-container">
      <div className="generator-card">
        <div className="generator-title">Student Project Generator</div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Project Topic</label>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Progress Tracker"
              required
            />
          </div>

          <div className="form-group">
            <label>Domain</label>
            <select value={domain} onChange={(e) => setDomain(e.target.value)}>
              <option>Web Development</option>
              <option>AI / ML</option>
              <option>Data Science</option>
              <option>Cyber Security</option>
            </select>
          </div>

          <div className="form-group">
            <label>Level</label>
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <button className="generate-btn" type="submit">
            Generate Project
          </button>
        </form>

        {loading && <div className="loading">Generating project...</div>}
        {error && <div className="error">{error}</div>}
        {result && <div className="output-box">{result}</div>}
      </div>
    </div>
  );
}
