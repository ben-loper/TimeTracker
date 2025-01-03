import {v4 as uuidv4} from 'uuid';

export class TimeEntryDto {
    id: string;
    hours: number;
    minutes: number;

    constructor(id: string | null, hours: number, minutes: number){
        if (!id) this.id = uuidv4();
        else this.id = id;

        this.hours = hours;
        this.minutes = minutes;
    }
}