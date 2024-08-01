// apiService.ts
export interface CommitsData {
  user: any;
  commits_by_date: Record<string, number>;
}

export const fetchCommits = async (apiKey: string, githubUsername: string): Promise<CommitsData> => {
  const response = await fetch("/api/github", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ apiKey, githubUsername }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch commits");
  }

  const data = await response.json();
  return data;
};
