import * as express                                  from 'express';
import { inject }                                    from 'inversify';
import { controller, httpGet, interfaces, response } from 'inversify-express-utils';
import { GenreModel }                                from '../Models/Genre/Genre.model';

@controller('/genres')
export class GenreController implements interfaces.Controller {

    constructor(
        @inject(GenreModel) private genreModel: GenreModel
    ) {
    }

    @httpGet('/')
    public async getGenres(@response() res: express.Response){
        const genres = this.genreModel.getAll();
        if(genres && genres.length > 0) {
            return res.status(200).json(genres);
        }

        return res.status(404);
    }

}
