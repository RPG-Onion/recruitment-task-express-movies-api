import 'reflect-metadata'

import { Container }       from 'inversify';
import { GenreController } from './Controllers/Genre.controller';
import { MovieController } from './Controllers/Movie.controller';
import { GenreModel }      from './Models/Genre.model';
import { MovieModel }      from './Models/Movie/Movie.model';
import { Database }        from './Services/Database';

let container = new Container();

container.bind(MovieController).to(MovieController);
container.bind(GenreController).to(GenreController);

container.bind<Database>(Database).to(Database);
container.bind<MovieModel>(MovieModel).to(MovieModel);
container.bind<GenreModel>(GenreModel).to(GenreModel);

export { container };
