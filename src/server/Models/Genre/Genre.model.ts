import { inject, injectable } from 'inversify';
import { Database }           from '../../Services/Database';

@injectable()
export class GenreModel {

    constructor(
        @inject(Database) private db: Database
    ) {
    }

    public contains(genre: string): boolean {
        return this.getAll().includes(genre);
    }

    public getAll(): string[] {
        return this.db.data.genres;
    }
}
