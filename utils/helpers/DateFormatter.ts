import { Timestamp } from "firebase/firestore";

export const formatFirebaseDate = (date: Date | Timestamp, isTime?:boolean) => {
    const jsDate = date instanceof Timestamp ? date.toDate() : date;
    
    if(isTime){
        return jsDate.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric', 
        });
    }

    return jsDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true 
    });
};