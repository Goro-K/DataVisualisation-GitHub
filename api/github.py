# api/github.py
import httpx
from fastapi import APIRouter, HTTPException, Request
from collections import defaultdict
from datetime import datetime

router = APIRouter()

@router.post("/github")
async def get_github_user_and_commits(request: Request):
  data = await request.json()
  api_key = data.get("apiKey")
  github_username = data.get("githubUsername")
  year = data.get("year", datetime.now().year)  # Utiliser l'année actuelle si non spécifiée
    
  if not api_key:
    raise HTTPException(status_code=400, detail="API key is required")
  if not github_username:
    raise HTTPException(status_code=400, detail="GitHub username is required")
  if not year:
    raise HTTPException(status_code=400, detail="Year is required")
  
  headers = {
      "Authorization": f"token {api_key}"
  }
    
  try:
    async with httpx.AsyncClient() as client:
      # Fetch user data
      user_response = await client.get(f"https://api.github.com/users/{github_username}", headers=headers)

      user_data = user_response.json()

      if user_response.status_code != 200:
        raise HTTPException(status_code=user_response.status_code, detail="Failed to fetch user data")
      
      # Fetch repositories data 
      repos_response = await client.get("https://api.github.com/user/repos", headers=headers)

      if repos_response.status_code != 200:
        raise HTTPException(status_code=repos_response.status_code, detail="Failed to fetch repositories")
      
      repos_data = repos_response.json()

      if not repos_data:
        raise HTTPException(status_code=404, detail="No repositories found")

      commits_by_date = defaultdict(int)

      # Fetch commits data
      for repo in repos_data:
        repo_name = repo["name"]
        commits_response = await client.get(f"https://api.github.com/repos/{github_username}/{repo_name}/commits", headers=headers)

        if commits_response.status_code != 200:
          print(f"Failed to fetch commits for repo {repo_name}: {commits_response.status_code}")
          continue
          
        repo_commits = commits_response.json()

        if not repo_commits:
          print(f"No commits found for repo {repo_name}")
          continue

        # Count commits by date
        for commit in repo_commits:
          commit_date_str = commit["commit"]["committer"]["date"]
          commit_date = datetime.strptime(commit_date_str, "%Y-%m-%dT%H:%M:%SZ").date()
          if commit_date.year == int(year):
              formatted_date = commit_date.strftime("%d/%m/%Y")
              commits_by_date[formatted_date] += 1

    return {"year": year, "commits_by_date": commits_by_date, "user": {
      "name": user_data["name"],
      "login": user_data["login"],
      "public_repos": user_data["public_repos"],
      "followers": user_data["followers"],
      "following": user_data["following"]
    }}
  except Exception as e:
      print(f"Error: {e}")
      raise HTTPException(status_code=500, detail="Internal Server Error")
