# meta-agent
### Getting Started

```js
const meta = require('./meta')({
    baseURL: 'http://hostname:8000',
})

const someAsyncFunction = async () => {
    /* MOVIES */
    const allCachedMovies = await meta.movies().all()
    const searchMoviesOnTMDB = await meta.tmdb().movies().search('some-movie-name', {year:2007})
    const searchMoviesOnCache = await meta.movies().search('some-movie-name', {year:2007})
    const importMovieFromTMDB = await meta.tmdb().movies().import('some-movie-id')
    const getMovieById = await meta.movies().withId('some-movie-id')
    const deleteMovieById = await meta.movies().delete('some-movie-id')

    /* SHOWS */
    const allCachedShows = await meta.shows().all()
    const searchShowsOnTMDB = await meta.tmdb().shows().search('some-show-name', {year:2007})
    const searchShowsOnCache = await meta.shows().search('some-show-name', {year:2007})
    const importShowFromTMDB = await meta.tmdb().shows().import('some-show-id')
    const getShowById = await meta.shows().withId('some-show-id')
    const updateShowSeasonById = await meta.shows().update('some-show-id', 'some-season-number')
    const deleteShowById = await meta.shows().delete('some-show-id')

    /* TRENDING */
    const allTrendingMovies = await meta.moives().trending({window:'day'})
    const allTrendingShows = await meta.shows().trending({window:'day'})
    const allTrendingPeople = await meta.people().trending({window:'week'})

    /* GENRES */
    const allMovieGenres = await meta.moives().genres()
    const allShowGenres = await meta.shows().genres()
    const allGenres = await meta.genres({type: 'all'})
}
```