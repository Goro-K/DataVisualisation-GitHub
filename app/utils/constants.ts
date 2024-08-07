export const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
export const colors = {
  zeroCommits: "#000000",
  getGreenIntensity: (count: number) => {
    const intensity = Math.min(255, Math.floor((count / 3) * 255));
    return `rgb(0, ${intensity}, 0)`;
  }
};
