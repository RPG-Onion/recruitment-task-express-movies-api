import fs             from 'fs';
import { injectable } from 'inversify';
import { IMovie }     from '../Models/Movie/Movie.model';

export interface IDatabase {
    genres: string[],
    movies: IMovie[]
}

@injectable()
export class Database {

    public data: IDatabase;

    constructor() {
        this.data = this.load();
    }

    public load(): IDatabase {
        const data = fs.readFileSync('./data/db.json');
        return JSON.parse(data.toString()) as IDatabase;
    }
    public save(): void {
        const data = JSON.stringify(this.data);
        fs.writeFileSync('./data/db.json', data);
    }
}
