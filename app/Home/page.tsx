"use client";

import React, { useState } from "react";
import Calendar from "../components/Calendar";
import Stats from "../components/Stats";
import { CommitsData } from "../apiService/fetchCommits";
import FormGithub from "../components/FormGitHub";

const Home: React.FC = () => {
  const [commits, setCommits] = useState<Record<string, number>>({});

  const handleDataFetch = (data: CommitsData) => {
    setCommits(data.commits_by_date);
  };

  return (
    <div>
      <h1>GitHub Activity Dashboard</h1>
      <FormGithub onDataFetch={handleDataFetch} />
      <Calendar commits={commits} />
      <Stats commits={commits} />
    </div>
  );
};

export default Home;
