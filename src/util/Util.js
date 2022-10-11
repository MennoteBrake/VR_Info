/**
 * Convert seconds to HH:MM
 * @param {*} seconds 
 * @returns 
 */
export const convertSecondsToHrsMins = (seconds) => {
  let mins = seconds / 60;
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  h = h < 10 ? '0' + h : h;
  m = Math.floor(m);
  m = m < 10 ? '0' + m : m;
  return `${h}:${m}`;
};

/**
 * Convert to correct time notation, e.g. 12:1 should be 12:01
 * @param {*} date Date object
 * @returns 
 */
export const dateToString = (date) => {
  return `${(date.getHours() < 10 ? '0' : '') + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`;
};
