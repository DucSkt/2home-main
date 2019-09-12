const MMM = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Decr'
];

function MMMToNum(monthname) {
  const month = MMM.indexOf(monthname);
  return month ? month + 1 : 0;
}

export { MMMToNum };
