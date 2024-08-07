import React, { useState, FormEvent } from "react";
import { fetchCommits, CommitsData } from "../apiService/fetchCommits";

interface FormGithubKeyProps {
  onDataFetch: (data: CommitsData) => void;
}

const FormGithub: React.FC<FormGithubKeyProps> = ({ onDataFetch }) => {
  const [apiKey, setApiKey] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [githubUsername, setGithubUsername] = useState<string>("");
  const [year, setYear] = useState(new Date().getFullYear());

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const data = await fetchCommits(apiKey, githubUsername, year);
      onDataFetch(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          API Key:
          <input
            type="text"
            id="apiKey"
            name="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            required
          />
        </label>
        <label>
          GitHub Username:
          <input
            type="text"
            id="githubUsername"
            name="githubUsername"
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Year:
          <input
            type="number"
            id="year"
            name="year"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};

export default FormGithub;
