
module.exports = (options) => {
    
    const config = { timeout: 72000 }
    if(options) Object.assign(config, options)
    const http = require('axios').create(config)

    http.interceptors.request.use(config => {
        config.url = encodeURI(config.url)
        return config
    }, error =>{
        console.log({'@request:': error})
        return Promise.reject(error)
    })
    
    http.interceptors.response.use(response => {
        if(response.data.isCargo) return response.data ? 
            response.data.payload : null
        return response
    }, error =>{
        console.log({'@response:': error.response})
        return Promise.reject(error)
    })
    
    return http
}