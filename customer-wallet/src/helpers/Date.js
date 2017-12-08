const month = [
  {
    "name": "January",
    "short": "Jan",
    "number": 1,
    "days": 31
  },
  {
    "name": "February",
    "short": "Feb",
    "number": 2,
    "days": 28
  },
  {
    "name": "March",
    "short": "Mar",
    "number": 3,
    "days": 31
  },
  {
    "name": "April",
    "short": "Apr",
    "number": 4,
    "days": 30
  },
  {
    "name": "May",
    "short": "May",
    "number": 5,
    "days": 31
  },
  {
    "name": "June",
    "short": "Jun",
    "number": 6,
    "days": 30
  },
  {
    "name": "July",
    "short": "Jul",
    "number": 7,
    "days": 31
  },
  {
    "name": "August",
    "short": "Aug",
    "number": 8,
    "days": 31
  },
  {
    "name": "September",
    "short": "Sep",
    "number": 9,
    "days": 30
  },
  {
    "name": "October",
    "short": "Oct",
    "number": 10,
    "days": 31
  },
  {
    "name": "November",
    "short": "Nov",
    "number": 11,
    "days": 30
  },
  {
    "name": "December",
    "short": "Dec",
    "number": 12,
    "days": 31
  }
]

function getMonthYear(string) {
  const date = new Date(string)

  return `${month[date.getMonth()].name} ${date.getFullYear()}`
}

function getMonthDateYear(string) {
  const date = new Date(string)

  return `${month[date.getMonth()].short} ${date.getDate()}, ${date.getFullYear()}`
}

export { getMonthYear, getMonthDateYear }
