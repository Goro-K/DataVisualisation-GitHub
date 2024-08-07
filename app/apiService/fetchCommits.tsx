// apiService.ts
export interface CommitsData {
  user: any;
  commits_by_date: Record<string, number>;
  year: number;
}

export const fetchCommits = async (
  apiKey: string,
  githubUsername: string,
  year: number
): Promise<CommitsData> => {
  const response = await fetch("/api/github", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ apiKey, githubUsername, year }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch commits");
  }

  const data = await response.json();
  return data;
};
