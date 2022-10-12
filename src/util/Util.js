/**
 * These functions have been found on stackoverflow See https://stackoverflow.com/a/57332970 and 
 * https://medium.com/react-native-training/build-responsive-react-native-views-for-any-device-and-support-orientation-change-1c8beba5bc23 for more.
 */
import {Dimensions, PixelRatio} from 'react-native';

/**
 * calculates the DP that is associated with the percentage
 * @param {*} widthPercent the percentage you want the dp for
 * @returns dp
 */
 export const widthPercentageToDP = (widthPercent) => {
  const screenWidth = Dimensions.get('window').width;
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

/**
 * calculates the DP that is associated with the percentage
 * 
 * @param {*} heightPercent the percentage you want the dp for
 * @returns dp
 */
 export const heightPercentageToDP = (heightPercent) => {
  const screenHeight = Dimensions.get('window').height;
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

/**
 * 
 * @param {*} text the text you want to know the maximum font of
 * @param {*} width the width of the component you are putting the text in. Needs to be a string, with %. E.g. '30%'
 */
export const selectMaximumFontSize = (text, width) =>{
    return Math.round(widthPercentageToDP(width) / (text.length / 2));
}

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