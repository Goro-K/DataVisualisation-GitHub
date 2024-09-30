import React, { useState, FormEvent } from "react";
import { fetchCommits, CommitsData } from "../apiService/fetchCommits";
import "../styles/form-container.css";

interface FormGithubKeyProps {
  onDataFetch: (data: CommitsData) => void;
  submit: boolean;
  setFadingOut: (value: boolean) => void;
  setFadingIn: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  setIsHidden: (value: boolean) => void;
  user: {
    name: string;
    login: string;
    public_repos: number;
    followers: number;
    following: number;
  };
}

const FormGithub: React.FC<FormGithubKeyProps> = ({
  onDataFetch,
  submit,
  setFadingIn,
  setFadingOut,
  setIsLoading,
  setIsHidden,
  user,
}) => {
  const [apiKey, setApiKey] = useState<string>("");
  const [githubUsername, setGithubUsername] = useState<string>("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setFadingOut(true); // Déclenche la disparition de la page
    setIsLoading(true); // Indique que le chargement commence
    setIsHidden(true); // Cache la page pendant le chargement

    try {
      const data = await fetchCommits(user, apiKey, githubUsername, year);
      onDataFetch(data);
      setError(null);
      setIsHidden(false); // Affiche la page
      setFadingOut(false); // Fin de la disparition
      setFadingIn(true); // Déclenche la réapparition
    } catch (err: any) {
      setError(err.message);
      setFadingOut(false); // Annule la disparition en cas d'erreur
      setIsHidden(true); // Cache la page en cas d'erreur
    } finally {
      setIsLoading(false); // Fin du chargement
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={`form`}>
        <label className={submit ? "label_submit" : ""}>
          API Key:
          <input
            type="text"
            id="apiKey"
            name="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            required={!submit}
          />
        </label>
        <label className={submit ? "label_submit" : ""}>
          GitHub Username:
          <input
            type="text"
            id="githubUsername"
            name="githubUsername"
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
            required={!submit}
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
