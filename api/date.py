from datetime import datetime, timedelta
from fastapi import APIRouter

router = APIRouter()

@router.get("/dates")
async def get_dates_past_year():
    today = datetime.now()
    dates_past_year = [today - timedelta(days=i) for i in range(365)]
    days_past_year_str = [date.strftime("%Y-%m-%dT%H:%M:%S") for date in dates_past_year]
    return {
        "numbers_of_days": len(dates_past_year),
        "current_date": today.strftime("%d-%m-%yT%H:%M:%S"),
        "days_past_year": days_past_year_str
    }