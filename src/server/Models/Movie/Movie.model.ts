import { inject, injectable } from 'inversify';
import { Voidable }           from '../../Lib/interfaces';
import { Database }           from '../../Services/Database';
import { MovieFilters }       from './Movie.filters';

export interface IMovie {
    id: number,
    title: string,
    year: string,
    runtime: string,
    genres: string[],
    director: string,
    actors: string,
    plot: string,
    posterUrl: string;
}

export interface IMovieFilters {
    genres?: string[];
    runtime?: string;
}

@injectable()
export class MovieModel {

    constructor(
        @inject(Database) private db: Database
    ) {
    }

    public findById(id: number): Voidable<IMovie> {
        return this.db.data.movies.find(m => m.id === id);
    }

    public getAll(filters?: IMovieFilters): IMovie[] {
        return this.db.data.movies;
    }

    public addMovie(data: Partial<IMovie>): IMovie {
        const movie = {
            actors: '',
            plot: '',
            posterUrl: '',
            ...data,
            id: this.db.data.movies.length,
        };
        this.db.data.movies.push(movie as IMovie);
        this.db.save();

        return movie as IMovie;
    }
}
