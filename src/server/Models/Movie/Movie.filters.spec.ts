import { MovieFilters } from './Movie.filters';
import { moviesMock }   from './Movie.mock';



describe('Movie filters', () => {
    it('should return random movie', () => {
        const res = MovieFilters.randomFilter(moviesMock);
        expect(res.length).toEqual(1);
    });

    it('should sort movies depending on genres occurrences number', () => {
        const res = MovieFilters.genresFilter(moviesMock ,['Comedy', 'Fantasy']);

        expect(res.length).toEqual(3);
        expect(res[0].id).toEqual(3); // Best match 2/2 genres
        expect(res[1].id).toEqual(2); // 50% match
        expect(res[2].id).toEqual(4); // 50% match
    })

    it('should return sorted movies depending on genres occurrences number with only full genre match', () => {
        const res = MovieFilters.genresFilter(moviesMock ,['Comedy', 'Fantasy'], true);

        expect(res.length).toEqual(1);
        // Only possible match with Both Comedy and Fantasy
        expect(res[0].id).toEqual(3);
    })

    it('should find movies with runtime close to given number', () => {
        const desiredRuntime = 35;
        const runtimeMargin = 10;
        const res = MovieFilters.runtimeFilter(moviesMock, desiredRuntime, runtimeMargin);

        expect(res.length).toEqual(3);
        const lengths: number[] = res.map(m => parseInt(m.runtime, 10));

        lengths.forEach(l => {
            expect(l).toBeGreaterThanOrEqual(desiredRuntime - runtimeMargin)
            expect(l).toBeLessThanOrEqual(desiredRuntime + runtimeMargin)
        })
    })
});
