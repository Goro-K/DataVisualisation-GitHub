import React from "react";

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
    const firstDayOfYear = new Date(currentYear, 0, 1);
    const daysInYear =
      (Number(new Date(currentYear, 11, 31)) - Number(firstDayOfYear)) /
        (1000 * 60 * 60 * 24) +
      1;
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
    let headers = [];
    let currentMonth = 0;

    for (let i = 0; i < 365; i++) {
      const date = new Date(currentYear, 0, i + 1);
      if (date.getMonth() !== currentMonth) {
        currentMonth = date.getMonth();
        headers.push(
          <th
            key={currentMonth}
            colSpan={2.35 * (31 / months.length)} // Adjust the colSpan for better alignment
            className="month-header"
          >
            <span>{months[currentMonth]}</span>
          </th>
        );
      }
    }

    return headers;
  };

  return (
    <div className="calendar-wrapper">
      <table className="calendar" role="grid">
        <thead>
          <tr>
            <th></th>
            {renderMonthHeaders()}
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map((day, weekIndex) => (
            <tr key={weekIndex}>
              <td className="day-header">{day}</td>
              {calendarDays
                .filter((_, dayIndex) => (dayIndex + weekIndex) % 7 === 0)
                .map((date, index) =>
                  date ? (
                    <td
                      key={index}
                      className="day-cell"
                      style={{
                        backgroundColor: getColor(
                          commits[date.toLocaleDateString("fr-FR")] || 0
                        ),
                      }}
                    ></td>
                  ) : (
                    <td key={index} className="empty-cell"></td>
                  )
                )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
