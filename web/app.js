class App {
    constructor() {
        Object.keys(sessionStorage).forEach(key => {
            this[key] = JSON.parse(sessionStorage[key])
        })
    }
    static new() {
        return new this()
    }

    $get(key) {
        let v = sessionStorage[key]
        if (v) {
            return JSON.parse(v)
        } else {
            return v
        }
    }
    $set(key, val) {
        if (val) {
            sessionStorage[key] = JSON.stringify(val)
            this[key] = val
        } else {
            throw "value 错误"
        }
        return this
    }
    $del(key) {
        delete sessionStorage[key]
        delete this[key]
        return this
    }
    $clear() {
        for (var key in this) {
            this.$del(key)
        }
        return this
    }

}
const db = App.new()
const config = {
    server: 'http://192.168.5.130:1337',
}
// 验证登陆
Sea.Ajax({
    url: config.server + '/qa/list',
    header: {
        authorization: 'ninoart' + db.token,
    },
    data: {
        page: 0,
    },
}).then(res => {
    let data = JSON.parse(res)
    if (Number(data.code) == 403 && location.pathname !== '/') {
        location.replace('/')
    }
})
