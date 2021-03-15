
export function timeDifference(curr, prev) {
    var ms_Min = 60 * 1000;
    var ms_Hour = ms_Min * 60;
    var ms_Day = ms_Hour * 24;
    var ms_Mon = ms_Day * 30;
    var ms_Yr = ms_Day * 365;
    var diff = curr - prev;

    if (diff < ms_Min) {
        return Math.round(diff / 1000) + ' seconds ago';
    } else if (diff < ms_Hour) {
        return Math.round(diff / ms_Min) + ' minutes ago';
    } else if (diff < ms_Day) {
        return Math.round(diff / ms_Hour) + ' hours ago';
    } else if (diff < ms_Mon) {
        return Math.round(diff / ms_Day) + ' days ago';
    } else if (diff < ms_Yr) {
        return Math.round(diff / ms_Mon) + ' months ago';
    } else {
        return Math.round(diff / ms_Yr) + ' years ago';
    }
}