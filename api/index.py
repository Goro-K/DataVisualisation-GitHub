from fastapi import FastAPI
from api.github import router as github_router
from api.date import router as date_router

app = FastAPI()

app.include_router(github_router, prefix="/api")
app.include_router(date_router, prefix="/api")

@app.get("/api/python")
def hello_world():
  return {"message": "Hello World"}