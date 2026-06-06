export function getUserIds() {
  return ["1", "2", "3", "4", "5"];
}

function padNumber(number) {
  return String(number).padStart(2, "0");
}

function dateToString(date) {
  const year = date.getUTCFullYear();
  const month = padNumber(date.getUTCMonth() + 1);
  const day = padNumber(date.getUTCDate());

  return `${year}-${month}-${day}`;
}

function stringToDate(dateString) {
  const parts = dateString.split("-");
  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);

  return new Date(Date.UTC(year, month - 1, day));
}

function addDays(dateString, daysToAdd) {
  const date = stringToDate(dateString);
  date.setUTCDate(date.getUTCDate() + daysToAdd);

  return dateToString(date);
}

function addMonths(dateString, monthsToAdd) {
  const date = stringToDate(dateString);
  date.setUTCMonth(date.getUTCMonth() + monthsToAdd);

  return dateToString(date);
}

function addYears(dateString, yearsToAdd) {
  const date = stringToDate(dateString);
  date.setUTCFullYear(date.getUTCFullYear() + yearsToAdd);

  return dateToString(date);
}

export function getRevisionDates(startDate) {
  return [
    {
      label: "1 week",
      date: addDays(startDate, 7),
    },
    {
      label: "1 month",
      date: addMonths(startDate, 1),
    },
    {
      label: "3 months",
      date: addMonths(startDate, 3),
    },
    {
      label: "6 months",
      date: addMonths(startDate, 6),
    },
    {
      label: "1 year",
      date: addYears(startDate, 1),
    },
  ];
}
