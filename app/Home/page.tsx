"use client";

import React, { useState } from "react";
import FormGithub from "../components/FormGitHub";
import GitHubTitleAnimated from "../components/GitHubTitleAnimated";
import Calendar from "../components/Calendar";
import Stats from "../components/Stats";
import { CommitsData } from "../apiService/fetchCommits";
import "../globals.css";

const Home: React.FC = () => {
  const [commits, setCommits] = useState<Record<string, number>>({});
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [submit, setSubmit] = useState<boolean>(false);
  const [fadingOut, setFadingOut] = useState<boolean>(false);
  const [fadingIn, setFadingIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDataFetch = (data: CommitsData) => {
    setCommits(data.commits_by_date);
    setYear(data.year);
    setSubmit(true);
  };

  return (
    <section
      className={`home ${fadingOut ? "fading-out" : ""} ${
        fadingIn ? "fading-in" : ""
      } ${isLoading ? "is-loading" : ""}
      ${submit ? "submitted" : ""}`}
    >
      <header className={`${submit ? "header-grid" : "header-flex"}`}>
        <GitHubTitleAnimated />
        <div className={`${submit ? "form-header" : ""}`}>
          <FormGithub
            onDataFetch={handleDataFetch}
            submit={submit}
            setFadingOut={setFadingOut}
            setFadingIn={setFadingIn}
            setIsLoading={setIsLoading}
          />
        </div>
      </header>

      {submit && <Calendar year={year} commits={commits} />}
      <Stats commits={commits} />
    </section>
  );
};

export default Home;
