const dd = (val) => console.log(val)

class Meta {
    constructor(options){
        this.http = require('./http')(options)
        this.state = { url: '', params: {}}
    }

    tmdb(){
        if(this.state.url.length > 0) throw(`tmdb() should be called first in the chain`)
        this.state.url = '/tmdb-'
        return this
    }

    movies(){
        this.state.url += this.state.url.length > 0 ? 'movies' : '/movies'
        return this
    }

    shows(){
        this.state.url += this.state.url.length > 0 ? 'shows' : '/shows'
        return this
    }

    cache(id){
        if(!id) throw(`id should be an integer ${id} was given`)
        this.state.url += '/' + id
        return this
    }

    async update(id, season){
        if(!id || !season) throw(`invalid parameter value(s)`)
        this.state.url += `/${id}/season/${season}`
        return await this.http.patch(this.state.url)
    }

    async search(name, params = {}){
        params.search = name
        let url = ''.concat(this.state.url, '?', this.toQueryString(params))
        return await this.http.get(url)
    }

    async withId(id, params = {}){
        if(id == null) throw(`id is required but ${id} was given!`)
        let url = ''.concat(this.state.url,'/', id, this.toQueryString(params))
        return await this.http.get(url)
    }

    async delete(id){
        if(id == null) throw(`id is required but ${id} was given!`)
        let url = ''.concat(this.state.url,'/', id)
        return await this.http.delete(url)
    }

    toQueryString(params = {}){
        return Object.keys(Object.assign(params, this.state.params))
            .map(key => key + '=' + params[key]).join('&')
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





// class Meta {

    //     constructor(options = {}){
    //         this.http = require('./http')(options)
    //         this.state = { qt: ''}
    //     }
    
    //     tmdb(){
    //         this.state.qt = '/tmdb-'
    //         return this
    //     }
    
    //     import(id){
    //         this.state.qt += `/${id}`
    //         return this
    //     }
    
    //     movies(){
    //         this.state.qt += this.state.qt.length > 0 ? 'movies' : '/movies'
    //         return this
    //     }
    
    //     shows(){
    //         this.state.qt += this.state.qt.length > 0 ? 'shows' : '/shows'
    //         return this
    //     }
    
    //     people(){
    //         this.state.qt = '/people'
    //         return this
    //     }
    
    //     async genres(params = {}){
    //         if(!this.state.qt) throw('genres can not be called directly!')
    //         let url = 'genre'.concat(this.state.qt,'/list?', this.buildQueryString(params))
    //         const { data:{ genres } } = await this.http.get(url)
    //         return genres
    //     }
    
    //     async trending(window = null, params = {}){
    //         if(!this.state.qt) throw('trending can not be called directly!')
    //         let url = 'trending'.concat(this.state.qt,'/', window == "week" ? "week" : "day",'?', this.buildQueryString(params))
    //         const { data } = await http.get(url)
    //         return data.results.length > 0 ? data.results : []
    //     }
    
    //     async search(keyphrase, params = {}){
    //         'tmdb-movies?search=nemo&year=2017'
    //         if(!this.state.qt) throw('search can not be called directly!')
    //         params.search = keyphrase
    //         let url = ''.concat(this.state.qt, '?', this.buildQueryString(params))
    //         return await this.http.get(url)
    //     }
    
    //     async withId(id, params = {}){
    //         if(id == null) throw(`id is required but ${id} was given!`)
    //         let url = ''.concat(this.state.qt,'/', id, this.buildQueryString(params))
    //         dd({url})
    //         const x = await this.http.get(url)
    //         return x
    //     }
    
    //     async loadData(id, params = {}){
    //         const url = ''.concat(this.state.qt,'/', id, '?', this.buildQueryString(params))
    //         const { data } = await http.get(url)
    //         return data
    //     }
    
    //     formatAppend(array = []){
    //         return array.map(e => `season/${e}`).join(',')
    //     }
    
    //     buildQueryString(params = {}){
    //         return Object.keys(Object.assign(params, this.params))
    //             .map(key => key + '=' + params[key]).join('&');
    //     }
    
    //     chunk(array, chunk){
    //         let chunks = [], i = 0, n = array.length
    //         while (i < n) chunks.push(array.slice(i, i += chunk))
    //         return chunks
    //     }
    // }