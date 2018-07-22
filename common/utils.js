// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export function getDisplayDay(day) {
  const strDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return strDays[day];
}

export function getDisplayMonth(month) {
  const strMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return strMonth[month];
}

export function calculateDistance(distance, unitType) {
  if (unitType === 'us') {
    return `${round((distance * 0.00062137), 2)}`
  } else {
    return `${round(distance/1000, 2)}`
  }
}