import * as express                                                                               from 'express';
import { body, validationResult }                                                                 from 'express-validator';
import { interfaces, controller, httpGet, request, response, httpPost, queryParam, requestParam } from 'inversify-express-utils';
import { inject }                                                                                 from 'inversify';
import { AppContainer }                                                                           from '../App';
import { GenreModel }                                                                             from '../Models/Genre.model';
import { MovieFilters }                                                                           from '../Models/Movie/Movie.filters';
import { IMovie, IMovieFilters, MovieModel }                                                      from '../Models/Movie/Movie.model';

const MovieValidatorMiddleware = [
    body('genres').isArray().exists().withMessage('At least one genre is required'),
    body('title').isLength({ max: 255 }).exists().withMessage('Movie title is required'),
    body('year').isNumeric().exists().withMessage('Year of production is required'),
    body('runtime').isNumeric().exists().withMessage('Runtime (in minutes) is required'),
    body('director').isLength({ max: 255 }).exists().withMessage('Director name is required'),
    body('actors').optional(),
    body('plot').optional(),
    body('posterUrl').optional(),
    body('genres.*').custom((val) => {
        const genreModel = AppContainer.get(GenreModel);
        return genreModel.contains(val);
    }).withMessage('Illegal genre')
];

@controller('/movie')
export class MovieController implements interfaces.Controller {

    constructor(
        @inject(MovieModel) private movieModel: MovieModel,
        @inject(GenreModel) private genreModel: GenreModel
    ) {
    }

    @httpGet('/:id')
    public async getMovie(
        @requestParam('id') id: number,
        @response() res: express.Response
    ) {
        const movie = this.movieModel.findById(id);
        if(movie) {
            return res.status(200).json(movie);
        }

        return res.status(404);
    }

    @httpGet('/')
    public async getMovies(
        @queryParam('filters') filters: IMovieFilters,
        @response() res: express.Response
    ) {
        let movies = this.movieModel.getAll(filters);

        if (filters && Object.keys(filters).length > 0) {
            if (filters.runtime && filters.genres) {
                movies = MovieFilters.runtimeFilter(movies, parseInt(filters.runtime, 10));
                movies = MovieFilters.genresFilter(movies, filters.genres);
            } else if (filters.runtime) {
                movies = MovieFilters.runtimeFilter(movies, parseInt(filters.runtime, 10));
                movies = MovieFilters.randomFilter(movies);
            } else if (filters.genres) {
                movies = MovieFilters.genresFilter(movies, filters.genres, true);
            }
        } else {
            movies = MovieFilters.randomFilter(movies);
        }

        return res.status(200).json({movies, filters});
    }

    @httpPost('/', ...MovieValidatorMiddleware)
    public async addNewMovie(@request() req: express.Request, @response() res: express.Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const movie = this.movieModel.addMovie(req.body as IMovie);

        return res.status(201).json(movie);
    }
}
