## Running app:
requirements:
NodeJS, globally installed Typescript and Jest
`npm install -g jest typescript`
```
# clone repos, enter directory
npm install
npm run serve
```
### routes:
#### GET  `/movie`
returns list of movies <br>
accepts query params:
```
{
    filters: {
        genre: []
        runtime
    }
}
```
#### POST `/movie`
allows to add new movie to database
```
{
    "genres": ["Genre", "Genre 2"]
    "title": ""
    "year": ""
    "runtime": ""
    "director": ""
    "actors": ""
    "plot": ""
    "posterUrl": ""
}
```
#### GET  `/genres`
return list of available genres

# Original task:

## The Software House - Node.js Developer recruitment task

Hey there!

Not so long ago we decided create a catalogue of our favourite movies (data/db.json) as json. It is hard to update, so we would like to build an API
for it, however we don't need a database, we still need it as a file.

### TODOS

1. We need to be able to add a new movie. Each movie should contain information about:

- a list of genres (only predefined ones from db file) (required, array of predefined strings)
- title (required, string, max 255 characters)
- year (required, number)
- runtime (required, number)
- director (required, string, max 255 characters)
- actors (optional, string)
- plot (optional, string)
- posterUrl (optional, string)

Each field should be properly validated and meaningful error message should be return in case of invalid value.

2. We also need an endpoint to return a random matching movie for us. What we want to do is to send a list of genres (this parameter is optional) and a duration of a movie we are looking for.

The special algorithm should first find all the movies that have all genres of our choice and runtime between <duration - 10> and <duration + 10>. Then it should repeat this algorithm for each genres combination. For example:

If we send a request with genres [Comedy, Fantasy, Crime] then the top hits should be movies that have all three of them, then there should be movies that have one of [Comedy, Fantasy], [comedy, crime], [Fantasy, Crime] and then those with Comedy only, Fantasy only and Crime only.

Of course we dont want to have duplicates.

If we dont provide genres parameter then we get a single random movie with a runtime between <duration - 10> and <duration + 10>.

If we dont provide duration parameter then we should get all of the movie with specific genres.

If we dont provide any parameter, then we should get a single random movie.

### Rules

**Use express.js**

**Keep code clean**

**The algorithm should be unit tested**

**Remember about proper error handling**

**We require code in git repository**
