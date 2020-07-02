import fs             from 'fs';
import { injectable } from 'inversify';
import { moviesMock } from '../Models/Movie/Movie.mock';
import { IMovie }     from '../Models/Movie/Movie.model';
import { IDatabase }  from './Database';

@injectable()
export class DatabaseMock {

    public data: IDatabase;

    constructor() {
        this.data = this.load();
    }

    public load(): IDatabase {
        this.data = {
            movies: moviesMock,
            genres: [
                "Drama",
                "Horror",
                "Comedy",
                "Fantasy",
            ]
        };

        return this.data;
    }
    public save(): void {
        return;
    }
}
