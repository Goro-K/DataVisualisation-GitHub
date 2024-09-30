"use client";

import React, { useState } from "react";
import LoadingGrid from "../components/LoadingGrid";
import FormContainer from "../components/FormContainer";
import MainContent from "../components/MainContent";
import { CommitsData } from "../apiService/fetchCommits";
import "../globals.css";

const Home: React.FC = () => {
  const [commits, setCommits] = useState<Record<string, number>>({});
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [submit, setSubmit] = useState<boolean>(false);
  const [fadingOut, setFadingOut] = useState<boolean>(false);
  const [fadingIn, setFadingIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);
  const [showDashboard, setShowDashboard] = useState<boolean>(false);

  const handleDataFetch = (data: CommitsData) => {
    setCommits(data.commits_by_date);
    setYear(data.year);
    setSubmit(true);
    setUserData(data.user);
  };

  return (
    <>
      <div
        className={`home ${fadingOut ? "fading-out" : ""} ${
          fadingIn ? "fading-in" : ""
        }`}
        style={{ display: isHidden ? "none" : "block" }}
      >
        <FormContainer
          showDashboard={showDashboard}
          onDataFetch={handleDataFetch}
          submit={submit}
          setFadingOut={setFadingOut}
          setFadingIn={setFadingIn}
          setIsLoading={setIsLoading}
          setIsHidden={setIsHidden}
          user={userData}
        />
        {submit && (
          <MainContent
            submit={submit}
            year={year}
            commits={commits}
            userData={userData}
            showDashboard={showDashboard}
            setShowDashboard={setShowDashboard}
          />
        )}
      </div>
      {isLoading && (
        <div className="loading-grid-container">
          <LoadingGrid />
        </div>
      )}
    </>
  );
};

export default Home;
