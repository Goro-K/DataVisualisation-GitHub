import React from "react";
import "../styles/dashboard.css";
// import Bar from "./Bar";

interface DashboardProps {
  userData: {
    name: string;
    login: string;
    public_repos: number;
    followers: number;
    following: number;
  };
  commits: Record<string, number>;
}

const Dashboard: React.FC<DashboardProps> = ({ userData, commits }) => {
  const totalCommits = Object.values(commits).reduce(
    (sum, count) => sum + count,
    0
  );
  const mostActiveDay = Object.entries(commits).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[0];

  return (
    <div className="dashboard show">
      <h2 className="show-dashboard-title">GitHub Dashboard</h2>
      <div className="dashboard-content">
        <div className="user-info">
          <h3>User Information</h3>
          <p>Name: {userData.name}</p>
          <p>Username: {userData.login}</p>
          <p>Public Repos: {userData.public_repos}</p>
          <p>Followers: {userData.followers}</p>
          <p>Following: {userData.following}</p>
        </div>
        <div className="commit-stats">
          <h3>Commit Statistics</h3>
          <p>Total Commits: {totalCommits}</p>
          <p>Most Active Day: {mostActiveDay}</p>
          {/* <p>
            Average Commits per Day:{" "}
            {(totalCommits / Object.keys(commits).length).toFixed(2)}
          </p> */}
        </div>
        {/* <div className="commit-chart">
          <h3>Commit Chart</h3>
          <div className="chart-container">
            <Bar />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
