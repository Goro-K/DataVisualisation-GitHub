"use client";

import React, { useState } from "react";
import Calendar from "../components/Calendar";
import Stats from "../components/Stats";
import { CommitsData } from "../apiService/fetchCommits";
import FormGithub from "../components/FormGitHub";
import GitHubTitleAnimated from "../components/GitHubTitleAnimate";

const Home: React.FC = () => {
  const [commits, setCommits] = useState<Record<string, number>>({});
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const handleDataFetch = (data: CommitsData) => {
    setCommits(data.commits_by_date);
    setYear(data.year);
  };

  return (
    <div>
      <GitHubTitleAnimated />
      <FormGithub onDataFetch={handleDataFetch} />
      <Calendar year={year} commits={commits} />
      <Stats commits={commits} />
    </div>
  );
};

export default Home;
