const dd = (val) => console.log(val)
const meta = require('./meta')({
    baseURL: 'http://192.168.50.251:8000',
})

// sonic  454626
// Wild Kratts 35094

const run = async () => {
    const x = await meta
    // .tmdb()
    .import()
    // .movie()
    .show()
    // .search('Wild Kratts')
    // .withId(454626)
    .withId(35094)
    dd(x)
}

run()

