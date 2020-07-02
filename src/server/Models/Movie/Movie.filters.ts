import { IMovie } from './Movie.model';

export const randomFilter = (movies: IMovie[]): IMovie[] => {
    const index = Math.round(Math.random() * movies.length) - 1;
    return [ movies[index] ];
};

export const runtimeFilter = (movies: IMovie[], runtime: number, margin: number = 10): IMovie[] => {
    return movies.filter(m => {
        const time = parseInt(m.runtime, 10);
        return time <= runtime + margin && time >= runtime - margin;
    });
};

export const genresFilter = (movies: IMovie[], genres: string[], fullMatchOnly: boolean = false): IMovie[] => {
    let results = movies
        .map(movie => {
            let score = movie.genres.filter(g => genres.includes(g)).length;
            return { movie, score };
        })

    if(fullMatchOnly) {
        // return only 100% genre coverage
        results = results.filter(e => e.score === genres.length);
    } else {
        // return all movies with at least i genre matched
        results = results.filter(e => e.score >= 1);
    }

    return results
        .sort((a, b) => b.score - a.score)
        .map(e => e.movie);
};

export const MovieFilters = {
    randomFilter,
    runtimeFilter,
    genresFilter,
}
