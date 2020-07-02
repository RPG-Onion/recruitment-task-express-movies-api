import 'reflect-metadata'

import { Container }       from 'inversify';
import { GenreController } from '../Controllers/Genre.controller';
import { MovieController } from '../Controllers/Movie.controller';
import { GenreModel }      from '../Models/Genre/Genre.model';
import { MovieModel }      from '../Models/Movie/Movie.model';
import { Database }     from '../Services/Database';
import { DatabaseMock } from './Database.mock';

const createMockContainer = () => {
    let MockContainer = new Container();

    MockContainer.bind(MovieController).to(MovieController);
    MockContainer.bind(GenreController).to(GenreController);
    MockContainer.bind(MovieModel).to(MovieModel);
    MockContainer.bind(GenreModel).to(GenreModel);
    MockContainer.bind<Database>(Database).to(DatabaseMock);

    return MockContainer;
}

export { createMockContainer };
