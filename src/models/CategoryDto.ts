import { TimeEntryDto } from './TimeEntryDto';

export class CategoryDto {
    name: string;
    id: string | null;
    timeEntries: TimeEntryDto[];

    constructor(name: string, id: string | null = null, timeEntries: TimeEntryDto[] | null = null){
        this.id = id;
        this.name = name;

        if (timeEntries) this.timeEntries = timeEntries
        else this.timeEntries = [];
    }
}