# meta-agent
### Getting Started

```js
const meta = require('./meta')({
    baseURL: 'http://hostname:8000',
})

const someAsyncFunction = async () => {
    /* MOVIES */
    const allCachedMovies = await meta.movies().get()
    const searchMoviesOnTMDB = await meta.tmdb().movies().search('some-movie-name', {year:2007})
    const searchMoviesOnCache = await meta.movies().search('some-movie-name', {year:2007})
    const importMovieFromTMDB = await meta.tmdb().movies().withId('some-movie-id').get()
    const getMovieById = await meta.movies().withId('some-movie-id').get()
    const deleteMovieById = await meta.movies().withId('some-movie-id').delete('some-movie-id')

    /* SHOWS */
    const allCachedShows = await meta.shows().get()
    const searchShowsOnTMDB = await meta.tmdb().shows().search('some-show-name', {year:2007})
    const searchShowsOnCache = await meta.shows().search('some-show-name', {year:2007})
    const importShowFromTMDB = await meta.tmdb().shows().withId('some-show-id').get()
    const getShowById = await meta.shows().withId('some-show-id').get()
    const updateShowSeasonById = await meta.shows().withId('some-show-id').season('some-season-number').update()
    const deleteShowById = await meta.shows().withId('some-show-id').delete()

    /* TRENDING */
    const allTrendingMovies = await meta.movies().trending({window:'day'})
    const allTrendingShows = await meta.shows().trending({window:'day'})
    const allTrendingPeople = await meta.people().trending({window:'week'})

    /* GENRES */
    const allMovieGenres = await meta.movies().genres()
    const allShowGenres = await meta.shows().genres()
    const allGenres = await meta.genres({type: 'all'})

    const cacheAllMissingCoverArt = await meta.fixdata({type: 'all'})
}
```