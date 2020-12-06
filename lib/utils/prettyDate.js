// JavaScript Pretty Date
// Copyright (c) 2011 John Resig (ejohn.org)
// Licensed under the MIT and GPL licenses.
//
// Takes an ISO time and returns a string representing how long ago the date represents.
//
// https://johnresig.com/files/pretty.js

export function prettyDate(time) {
  let date = new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " "));

  let diff = (new Date().getTime() - date.getTime()) / 1000;

  let day_diff = Math.floor(diff / 86400);

  if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) return;

  return (
    (day_diff === 0 &&
      ((diff < 60 && "just now") ||
        (diff < 120 && "1 minute ago") ||
        (diff < 3600 && Math.floor(diff / 60) + " minutes ago") ||
        (diff < 7200 && "1 hour ago") ||
        (diff < 86400 && Math.floor(diff / 3600) + " hours ago"))) ||
    (day_diff == 1 && "Yesterday") ||
    (day_diff < 7 && day_diff + " days ago") ||
    Math.ceil(day_diff / 7) +
      (Math.ceil(day_diff / 7) === 1 ? " week ago" : " weeks ago")
  );
}
