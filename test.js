const moment = require("moment");

moment.locale("vi");

const date = moment("2017-03");
console.log("date.format", date.format("MMM"));
