// Stats.tsx
import React from 'react';

interface StatsProps {
  commits: Record<string, number>;
}

const Stats: React.FC<StatsProps> = ({ commits }) => {
  const totalCommits = Object.values(commits).reduce((total, count) => total + count, 0);

  return (
    <div className="stats">
      <h2>Total Commits: {totalCommits}</h2>
    </div>
  );
};

export default Stats;
