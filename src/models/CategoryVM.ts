export class CategoryVM {
    name: string;
    id: string | null;
    hours: number;
    minutes: number;

    constructor(name: string, id: string | null, hours: number, minutes: number){
        this.id = id;
        this.name = name;
        this.hours = hours;
        this.minutes = minutes;
    }
}