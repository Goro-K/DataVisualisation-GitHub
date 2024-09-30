import React from "react";
import Calendar from "./Calendar";
import Stats from "./Stats";
import Button from "./Button";
import Dashboard from "./Dashboard";

interface MainContentProps {
  submit: boolean;
  year: number;
  commits: Record<string, number>;
  userData: any;
  showDashboard: boolean;
  setShowDashboard: (value: boolean) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  submit,
  year,
  commits,
  userData,
  showDashboard,
  setShowDashboard,
}) => {
  const handleButtonClick = () => {
    setShowDashboard(!showDashboard);
  };

  return (
    <>
      <div className={`main-content ${showDashboard ? "hidden" : ""}`}>
        <div
          className={`calendar-form-container ${
            showDashboard ? "hide-calendar" : ""
          }`}
        >
          {submit && <Calendar year={year} commits={commits} />}
          <Stats commits={commits} />
        </div>
      </div>
      <div className={`dashboard-container ${showDashboard ? "show" : "hidden"}`}>
        {showDashboard && <Dashboard userData={userData} commits={commits} />}
      </div>
      <div className="button-container">
        <Button onClick={handleButtonClick}>
          {showDashboard ? "Hide Dashboard" : "Show Dashboard"}
        </Button>
      </div>
    </>
  );
};

export default MainContent;
