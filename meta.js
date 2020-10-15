const dd = (val) => console.log(val)

class Meta {

    constructor(options = {}){
        this.http = require('./http')(options)
        this.state = {}
    }

    tmdb(){
        this.state.qt = '/tmdb-'
        return this
    }

    import(){
        this.state.qt = '/import-'
        return this
    }

    movies(){
        if(!this.state.qt) this.state.qt = '/movies'
        if(this.state.qt === '/tmdb-') this.state.qt += 'movies'
        if(this.state.qt === '/import-') this.state.qt += 'movies'
        return this
    }

    movie(){
        if(!this.state.qt) this.state.qt = '/movie'
        if(this.state.qt === '/tmdb-') this.state.qt += 'movies'
        if(this.state.qt === '/import-') this.state.qt += 'movie'
        return this
    }

    shows(){
        if(!this.state.qt) this.state.qt = '/shows'
        if(this.state.qt === '/tmdb-') this.state.qt += 'shows'
        if(this.state.qt === '/import-') this.state.qt += 'shows'
        return this
    }

    show(){
        if(!this.state.qt) this.state.qt = '/show'
        if(this.state.qt === '/tmdb-') this.state.qt += 'shows'
        if(this.state.qt === '/import-') this.state.qt += 'show'
        return this
    }

    people(){
        this.state.qt = '/person'
        return this
    }

    async genres(params = {}){
        if(!this.state.qt) throw('genres can not be called directly!')
        let url = 'genre'.concat(this.state.qt,'/list?', this.buildQueryString(params))
        const { data:{ genres } } = await this.http.get(url)
        return genres
    }

    async trending(window = null, params = {}){
        if(!this.state.qt) throw('trending can not be called directly!')
        let url = 'trending'.concat(this.state.qt,'/', window == "week" ? "week" : "day",'?', this.buildQueryString(params))
        const { data } = await http.get(url)
        return data.results.length > 0 ? data.results : []
    }

    async search(keyphrase, params = {}){
        'tmdb-movies?search=nemo&year=2017'
        if(!this.state.qt) throw('search can not be called directly!')
        params.search = keyphrase
        let url = ''.concat(this.state.qt, '?', this.buildQueryString(params))
        return await this.http.get(url)
    }

    async withId(id, params = {}){
        if(id == null) throw(`id is required but ${id} was given!`)
        let url = ''.concat(this.state.qt,'/', id, this.buildQueryString(params))
        dd({url})
        const x = await this.http.get(url)
        return x
    }

    async loadData(id, params = {}){
        const url = ''.concat(this.state.qt,'/', id, '?', this.buildQueryString(params))
        const { data } = await http.get(url)
        return data
    }

    formatAppend(array = []){
        return array.map(e => `season/${e}`).join(',')
    }

    buildQueryString(params = {}){
        return Object.keys(Object.assign(params, this.params))
            .map(key => key + '=' + params[key]).join('&');
    }

    chunk(array, chunk){
        let chunks = [], i = 0, n = array.length
        while (i < n) chunks.push(array.slice(i, i += chunk))
        return chunks
    }
}

exports = module.exports = (options = {}) => {
    if(!options.baseURL) throw('baseURL required!')
    return new Meta(options)
}

exports.meta = (options = {}) => async (ctx, next) => {
    if(!options.baseURL) throw('baseURL required!')
    ctx.meta = new Meta(options) 
    await next()
}

exports.Meta = Meta