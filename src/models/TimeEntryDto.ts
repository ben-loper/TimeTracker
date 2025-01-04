export class TimeEntryDto {
    id: string | null;
    hours: number;
    minutes: number;

    constructor(id: string | null, hours: number, minutes: number){
        this.id = id;
        this.hours = hours;
        this.minutes = minutes;
    }
}