import {v4 as uuidv4} from 'uuid';
import { TimeEntryDto } from './TimeEntryDto';

export class CategoryDto {
    name: string;
    id: string;
    timeEntries: TimeEntryDto[];

    constructor(name: string, id: string | null = null){
        if (!id) this.id = uuidv4();
        else this.id = id;

        this.name = name;

        this.timeEntries = [];
    }
}