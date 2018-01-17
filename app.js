class App {
    constructor() {
        Object.keys(sessionStorage).forEach(key => {
            this[key] = sessionStorage[key]
        })
        // log(this)
    }
    static new() {
        return new this()
    }

    get(key) {
        return this[key]
    }
    set(key, val) {
        this[key] = val
        return this
    }
    del(key) {
        delete sessionStorage[key]
        delete db[key]
        return this
    }

}
const db = App.new()
