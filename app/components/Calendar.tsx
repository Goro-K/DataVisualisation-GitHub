import React from "react";
import "./calendar.css";

interface CalendarProps {
  commits: Record<string, number>;
}

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Calendar: React.FC<CalendarProps> = ({ commits }) => {
  const currentYear = new Date().getFullYear();

  const generateCalendar = () => {
    const firstDayOfYear = new Date(currentYear, 0, 1); // January 1st

    // Number of days in the year (365 or 366) + 1 for the last day of the year (December 31st)
    const daysInYear =
      (Number(new Date(currentYear, 11, 31)) - Number(firstDayOfYear)) /
        (1000 * 60 * 60 * 24) +
      1;

    // Create an array of dates for the whole year starting from January 1st to December 31st
    const daysArray = Array.from(
      { length: daysInYear },
      (_, i) => new Date(currentYear, 0, i + 1)
    );

    return daysArray;
  };

  const calendarDays = generateCalendar();

  const getColor = (count: number) => {
    if (count === 0) return "#000000"; // Black for 0 commits
    const greenIntensity = Math.min(255, Math.floor((count / 3) * 255));
    return `rgb(0, ${greenIntensity}, 0)`;
  };

  const renderMonthHeaders = () => {
    let headers: React.ReactNode[] = [];
    let currentMonth = -1; // January is -1 (don't know why)

    // Loop through the calendar days and create a header for each month

    calendarDays.forEach((date, index) => {
      const month = date.getMonth();
      if (month !== currentMonth) {
        currentMonth = month;
        headers.push(
          <th
            key={currentMonth}
            colSpan={2.35 * (31 / months.length)} // 2.35 is the average number of days in a month
          >
            <span>{months[currentMonth]}</span>
          </th>
        );
      }
    });

    return headers;
  };

  const renderDays = (weekIndex: number) => {
    const days: React.ReactNode[] = [];
    let currentDay = 0;
    const firstDayOfYear = new Date(currentYear, 0, 1).getDay(); // Day of the week for January 1st

    // Add empty cells for days before the first day of the year
    for (let i = 0; i < firstDayOfYear; i++) {
      days.push(<td key={`empty-${i}`} className="empty-cell"></td>);
    }

    calendarDays
      .filter((_, dayIndex) => (dayIndex + weekIndex) % 7 === 0)
      .map((date, index) => {
        const formattedDate = date.toLocaleDateString("fr-FR");
        days.push(
          <td
            key={index}
            className="day-cell"
            title={`${commits[formattedDate] || 0} contributions on ${
              months[date.getMonth()]
            } ${date.getDate()}`}
            style={{ backgroundColor: getColor(commits[formattedDate] || 0) }}
          ></td>
        );
        currentDay++;
      });

    return days;
  };
  return (
    <div className="calendar-wrapper">
      <table className="calendar" role="grid">
        <thead>
          <tr className="month-header">
            <th></th>
            {renderMonthHeaders()}
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map((day, weekIndex) => (
            <tr className="day-line" key={weekIndex}>
              <td className="day-header">{day}</td>
              {renderDays(weekIndex)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
