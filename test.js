const dd = (val) => console.log(val)
const meta = require('./meta')({
    baseURL: 'http://192.168.50.251:8000',
    // baseURL: 'http://aox.hopto.org:8000',
})

// sonic  454626
// Wild Kratts 35094

const run = async () => {
    const x = await meta
    // .tmdb()
    // .movies()
    .shows()
    .delete(94951)
    // .cache(500)
    // .update(655,1)
    // .exec()
    // .tmdb()
    // .movies()
    // .withId(33827)
    // .import(5)
    
    // .search('finding')
    // .withId(454626)
    // .withId(35094)
    dd(x)
}

run()

