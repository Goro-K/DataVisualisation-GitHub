import React, { useMemo } from "react";
import "../styles/calendar.css";
import { daysOfWeek, months, colors } from "../utils/constants";
import { generateCalendar } from "../utils/utils";

interface CalendarProps {
  year: number;
  commits: Record<string, number>;
}

const Calendar: React.FC<CalendarProps> = ({ year, commits }) => {
  const calendarDays = useMemo(() => generateCalendar(year), [year]);

  const renderMonthHeaders = () => {
    let headers: React.ReactNode[] = [];
    let currentMonth = -1;

    calendarDays.forEach((date) => {
      const month = date.getMonth();
      if (month !== currentMonth) {
        currentMonth = month;
        headers.push(
          // 4.3 is the average number of weeks in a month
          <th key={currentMonth} colSpan={Math.ceil(4.3)}>
            <span>{months[currentMonth]}</span>
          </th>
        );
      }
    });

    return headers;
  };

  const renderDays = () => {
    let days: React.ReactNode[][] = Array.from({ length: 7 }, () => []);
    const firstDayOfWeek = new Date(year, 0, 1).getDay();

    for (let i = 0; i < firstDayOfWeek; i++) {
      days[i].push(<td key={`empty-${i}`} className="empty-cell"></td>);
    }

    calendarDays.forEach((date, index) => {
      const formattedDate = date.toLocaleDateString("fr-FR");
      const dayOfWeek = date.getDay();
      days[dayOfWeek].push(
        <td
          key={index}
          className="day-cell"
          title={`${commits[formattedDate] || 0} contributions on ${
            months[date.getMonth()]
          } ${date.getDate()}`}
          style={
            {
              backgroundColor: colors.getGreenIntensity(
                commits[formattedDate] || 0
              ),
              // Set animation delay using a custom CSS variable
              "--animation-delay": `${index + 1}`,
            } as React.CSSProperties
          }
        ></td>
      );
    });

    const lastDayOfWeek = new Date(year, 11, 31).getDay();
    for (let i = lastDayOfWeek + 1; i < 7; i++) {
      days[i].push(<td key={`empty-end-${i}`} className="empty-cell"></td>);
    }

    return days;
  };

  const renderedDays = renderDays();

  return (
    <div className="calendar-wrapper">
      <table className="calendar" role="grid">
        <thead>
          <tr className="month-header">
            <th className="first_month"></th>
            {renderMonthHeaders()}
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map((day, weekIndex) => (
            <tr className="day-line" key={weekIndex}>
              <td className="day-header">{day}</td>
              {renderedDays[weekIndex]}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
