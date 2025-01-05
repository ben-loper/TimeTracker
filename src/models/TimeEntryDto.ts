export class TimeEntryDto {
    id: string | null;
    hours: number;
    minutes: number;
    date: Date;

    constructor(id: string | null, hours: number, minutes: number, date: Date){
        this.id = id;
        this.hours = hours;
        this.minutes = minutes;
        this.date = date;
    }
}