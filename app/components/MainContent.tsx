// components/MainContent.tsx
import React, { useState } from "react";
import Calendar from "./Calendar";
import Stats from "./Stats";
// import Button from "./Button";
// import Dashboard from "./Dashboard"; // We'll create this component next

interface MainContentProps {
  submit: boolean;
  year: number;
  commits: Record<string, number>;
}

const MainContent: React.FC<MainContentProps> = ({ submit, year, commits }) => {
  // const [showDashboard, setShowDashboard] = useState(false);

  // const handleButtonClick = () => {
  //   setShowDashboard(!showDashboard);
  // };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {submit && <Calendar year={year} commits={commits} />}
      <Stats commits={commits} />
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
        }}
      >
        {/* <Button onClick={handleButtonClick}>
          {showDashboard ? "Hide Dashboard" : "Show Dashboard"}
        </Button> */}
      </div>
      {/* {showDashboard && <Dashboard commits={commits} />} */}
    </div>
  );
};

export default MainContent;
