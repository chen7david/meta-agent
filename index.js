

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

    people(){
        this.state.url += this.state.url.length > 0 ? 'people' : '/people'
        return this
    }

    async import(id){
        if(!id) throw(`id should be an integer ${id} was given`)
        this.state.url += '/' + id
        let url = this.state.url
        this.resetState()
        return await this.http.get(url)
    }

    async update(id, season){
        if(!id || !season) throw(`invalid parameter value(s)`)
        this.state.url += `/${id}/season/${season}`
        let url = this.state.url
        this.resetState()
        return await this.http.patch(url)
    }

    async search(name, params = {}){
        params.search = name
        let url = ''.concat(this.state.url, '?', this.toQueryString(params))
        this.resetState()
        return await this.http.get(url)
    }

    async trending(params = {}){
        params.type = this.state.url.split('/')[1]
        let url = '/trending'.concat('?', this.toQueryString(params))
        this.resetState()
        return await this.http.get(url)
    }

    async genres(params = {}){
        params.type = params.type ? '' : this.state.url.split('/')[1] 
        let url = '/genres'.concat('?', this.toQueryString(params))
        this.resetState()
        return await this.http.get(url)
    }

    async withId(id, params = {}){
        if(id == null) throw(`id is required but ${id} was given!`)
        let url = ''.concat(this.state.url,'/', id, this.toQueryString(params))
        this.resetState()
        return await this.http.get(url)
    }

    async delete(id){
        if(id == null) throw(`id is required but ${id} was given!`)
        let url = ''.concat(this.state.url,'/', id)
        this.resetState()
        return await this.http.delete(url)
    }

    async all(){
        return await this.http.get(this.state.url)
    }

    toQueryString(params = {}){
        return Object.keys(Object.assign(params, this.state.params))
            .map(key => key + '=' + params[key]).join('&')
    }

    resetState(){
        this.state = { url: '', params: {}}
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