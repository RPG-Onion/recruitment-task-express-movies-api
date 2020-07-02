import 'reflect-metadata';
import * as express            from 'express';
import { Container }           from 'inversify';
import { createApp }           from '../App';
import { createMockContainer } from '../Testing/container.mock';
import { IMovie }              from '../Models/Movie/Movie.model';
import { Database }            from '../Services/Database';
import { MovieController }     from './Movie.controller';
import request                 from 'supertest';

describe('MovieController', () => {
    let App: express.Application
    let container: Container;

    beforeEach(() => {
        container = createMockContainer();
        App = createApp(container);
    });

    it('should instantiate', () => {
        const controller = createMockContainer().get(MovieController);
        expect(controller).not.toBeNull();
    });

    it(`Should return single random movie with a runtime between given value +/- 10`, async () => {
        // - No genres provided
        // - runtime value provided
        // - returns *Single* random movie

        const response = await request(App)
            .get('/movie')
            .query({
                filters: {
                    runtime: '30'
                }
            })

        const json: IMovie[] = response.body;

        expect(response.status).toEqual(200);
        expect(json).not.toEqual(null);
        expect(json.length).toEqual(1);
    });

    it('Should return list of movies with runtime around X with given genres (at least one), sorted by amount of matches', async () => {
        // provides genres
        // provides runtime
        // return all movies withing runtime range
        // sorted by genres match accuracy

        const response = await request(App)
            .get('/movie')
            .query({
                filters: {
                    genres: [ 'Comedy', 'Fantasy' ],
                    runtime: '30',
                }
            })

        const json: IMovie[] = response.body;

        expect(response.status).toEqual(200);
        expect(json).not.toEqual(null);

        // only 3 movies from mock are in range of 20 - 40 runtime
        // but only 2 of them contain one or more of given genre
        expect(json.length).toEqual(2);

        // first movie with id of 3 contains both genres
        expect(json[0].id).toEqual(3);
        expect(json[0].genres).toContain('Comedy');
        expect(json[0].genres).toContain('Fantasy');

        // second movie with id of 2 contains only Comedy
        expect(json[1].id).toEqual(2);
        expect(json[1].genres).toContain('Comedy');
        expect(json[1].genres).not.toContain('Fantasy');


    });

    it(`Should return movies with specific genres (100% match)`, async () => {
        // - Provided X genres
        // - Returns all movies *with* matched specific X *genres*

        const response = await request(App)
            .get('/movie')
            .query({
                filters: {
                    genres: [ 'Horror', 'Drama' ]
                }
            })

        const json: IMovie[] = response.body;

        expect(response.status).toEqual(200);
        expect(json).not.toEqual(null);
        // Only 2 movies from mock contain exactly those 2 genres
        expect(json.length).toEqual(2);
    });

    it(`Should return random movie`, async () => {
        // - No filters provided
        // - One random movie returned

        const response = await request(App)
            .get('/movie')
            .query({
                filters: {}
            })

        const json: IMovie[] = response.body;

        expect(response.status).toEqual(200);
        expect(json).not.toEqual(null);
        expect(json.length).toEqual(1);
    });

    it(`Should Validate attempt to add new Movie and return errors`, async done => {
        const errorResponse = await request(App).post('/movie').send({});

        expect(errorResponse.status).toEqual(422);
        expect(Array.isArray(errorResponse.body.errors)).toBeTruthy()

        done();
    });

    it(`Should create new Movie`, async done => {

        const response = await request(App)
            .post('/movie')
            .send({
                genres: ['Drama'],
                title: 'The Room',
                year: '2003',
                runtime: '109',
                director: 'Tommy Wiseau',
                actors: 'Tommy Wiseau',
                plot: '<Best plot ever here>',
                posterUrl: null
            })

        expect(response.status).toEqual(201);

        const json: IMovie = response.body;

        const database: Database = container.get(Database);
        expect(database.data.movies.find(m => m.id = json.id)).not.toBeNull()

        done();
    });
});
