import { injectable } from 'inversify';
import { genreMock }  from '../Models/Genre/Genre.mock';
import { moviesMock } from '../Models/Movie/Movie.mock';
import { IDatabase }  from '../Services/Database';

@injectable()
export class DatabaseMock {

    public data: IDatabase;

    constructor() {
        this.data = this.load();
    }

    public load(): IDatabase {
        this.data = {
            movies: moviesMock,
            genres: genreMock
        };

        return this.data;
    }
    public save(): void {
        return;
    }
}
