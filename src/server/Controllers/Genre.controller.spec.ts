import 'reflect-metadata';
import * as express            from 'express';
import { Container }           from 'inversify';
import request                 from 'supertest';
import { createApp }           from '../App';
import { genreMock }           from '../Models/Genre/Genre.mock';
import { createMockContainer } from '../Testing/container.mock';
import { GenreController }     from './Genre.controller';

describe('GenreController', () => {
    let App: express.Application
    let container: Container;

    beforeEach(() => {
        container = createMockContainer();
        App = createApp(container);
    });

    it('should instantiate', () => {
        const controller = createMockContainer().get(GenreController);
        expect(controller).not.toBeNull();
    });

    it('should return list of genres', async () => {
        const response = await request(App).get('/genres')

        const json: string[] = response.body;

        expect(response.status).toEqual(200);
        expect(json.length).toEqual(genreMock.length);
    })
})
