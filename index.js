
class Meta {
    constructor(options){
        this.http = require('./http')(options)
        this.state = {bits:[], params:{}}
    }

    clearState(){
        this.state = {bits:[], params:{}}
    }

    url(){
        const {source, bits, params} = this.state
        let url = bits.filter(e => e).join('/')
        if(source) url = [source, url].join('-')
        const qString = this.toQueryString(params)
        if(qString) url = [url, qString].join('?')
        this.clearState()
        return '/' + url
    }

    tmdb(){
        this.state.source = 'tmdb'
        return this
    }

    movies(){
        this.state.bits.push('movies')
        return this
    }

    shows(){
        this.state.bits.push('shows')
        return this
    }

    people(){
        this.state.bits.push('people')
        return this
    }

    season(id){
        this.state.bits.push('season')
        this.state.bits.push(id)
        return this
    }

    withId(id){
        this.state.bits.push(id)
        return this
    }

    async genres(params = {}){
        params.type = this.state.bits.pop()
        this.state.bits.push('genres')
        Object.assign(this.state.params, params)
        return await this.get()
    }

    async trending(params = {}){
        params.type = this.state.bits.pop()
        this.state.bits.push('trending')
        Object.assign(this.state.params, params)
        return await this.get()
    }

    async search(name, params = {}){
        params.name = name
        Object.assign(this.state.params, params)
        return await this.get()
    }

    fixdata(params = {}){
        this.state.bits.push('fix-metadata')
        Object.assign(this.state.params, params)
        return await this.get()
    }

    async get(){
        return await this.http.get(this.url())
    }

    async update(){
        return await this.http.patch(this.url())
    }

    async delete(){
        return await this.http.delete(this.url())
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