var moment = require("moment");
var FMT = "YYYY-MM-DD HH:mm:ss";
const GMT_TIME_ZONE = "Asia/Kolkata";
exports.GMT_TIME_ZONE = GMT_TIME_ZONE;
exports.date_format = "YYYY-MM-DD";

exports.dateFormat = function(value, format) {
  if (!isEmpty(value)) {
    if (isEmpty(format)) {
      format = "YYYY-MM-DD";
    }
    value = new Date(value);
    return moment(value).format(format);
  }
  return value;
};

exports.addDays = function(strDate, days, format) {
  if (!isEmpty(strDate)) {
    if (isEmpty(format)) {
      format = "YYYY-MM-DD";
    }
    strDate = new Date(strDate);
    strDate = strDate.setDate(strDate.getDate() + days);
    return moment(strDate).format(format);
  }
  return strDate;
};

exports.gmtDate = function(value, format) {
  if (!isEmpty(value)) {
    if (isEmpty(format)) {
      format = FMT;
    }
    return moment.tz(new Date(value), format, GMT_TIME_ZONE).format(format); // Production
  }
  return value;
};

exports.modifyDateFormat = function(value, format, timezone) {
  if (!isEmpty(value)) {
    if (isEmpty(format)) {
      format = FMT;
    }
    if (isEmpty(timezone)) {
      timezone = GMT_TIME_ZONE;
    }
    return moment.tz(new Date(value), format, timezone).format(format); // Production
  }
  return value;
};

exports.isEmpty = function(value) {
  return (
    (typeof value == "string" && !value.trim()) ||
    typeof value == "undefined" ||
    value === null
  );
};

function isEmpty(value) {
  return (
    (typeof value == "string" && !value.trim()) ||
    typeof value == "undefined" ||
    value === null
  );
}
