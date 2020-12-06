export const dateStringTime = (t) =>
  new Date(new Date(t).toDateString()).getTime();
