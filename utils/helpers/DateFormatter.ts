import { Timestamp } from "firebase/firestore";
import { formatInTimeZone } from 'date-fns-tz';

/**
 * Converts a given timestamp or date to the user's local time zone and formats it.
 * @param date - A Date or Firebase Timestamp.
 * @param isTime - Whether to include time in the formatted output.
 * @returns Formatted date string in the user's local time zone.
 */

export const formatFirebaseDate = (date: Date | Timestamp, isTime?:boolean) => {

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    const jsDate = date instanceof Timestamp ? date.toDate() : date;

    const formatString = isTime 
        ? 'MMMM dd, yyyy hh:mm a'
        : 'MMMM dd, yyyy';

    return formatInTimeZone(jsDate, userTimeZone, formatString);
};