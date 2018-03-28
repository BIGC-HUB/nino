// Html css 间隙
String.prototype.html = function() {
    let html = this.slice(this.indexOf('<'))
    return html.replace(/>(\s+)</img, '><')
}
String.prototype.css = function() {
    let css = this.slice(this.indexOf('<style>') + 7, this.indexOf('</style>'))
    let arr = css.split('\n').map(function(e) {
        let i = e.search(/\S/)
        if (i >= 0) {
            return e.slice(i)
        } else {
            return ''
        }
    })
    return this.replace(css, arr.join(''))
}

// 定制方法
const log = console.log.bind(console, '>>>')
const ensure = function(a, b, message) {
    if (JSON.stringify(a) !== JSON.stringify(b)) {
        log('//', message)
        log(`×　`, a)
        log(`√　`, b)
    }
}
const cut = function(n) {
    if (cut.count) {
        cut.count --
        if (cut.count == 1) {
            throw "断点"
        }
    } else {
        if (n > 1) {
            cut.count = n
        } else {
            throw "断点"
        }
    }
}
// bigsea.js
class bigsea {
    constructor(select) {
        if (typeof select == 'string') {
            this.arr = Array.from(document.querySelectorAll(select))
        } else if (select && select.addEventListener) {
            this.arr = [select]
        } else {
            this.arr = []
        }
        this.dom = this.arr[0]
    }
    // 观察者
    ob(options, callback) {
        // www.cnblogs.com/jscode/p/3600060.html
        let _callback = (e) => {
            callback.bind(this.dom)(e[0])
        }
        let listen = new MutationObserver(_callback)
        for (let dom of this.arr) {
            listen.observe(dom, options)
        }
    }

    // 事件 (绑定/委托)
    on(names, select, callback, one) {
        let off = function(e, arr) {
            if (Array.isArray(e.sea_event)) {
                e.sea_event.push(arr)
            } else {
                e.sea_event = [arr]
            }
        }
        // 多个事件
        for (let name of names.split(' ')) {
            // 参数转换
            if (callback === undefined) {
                callback = select
                // 绑定
                for (let e of this.arr) {
                    let _callback = function(event) {
                        callback.call(e, event)
                        if (one === true) {
                            e.removeEventListener(name, _callback)
                        }
                    }
                    e.addEventListener(name, _callback, false)
                    off(e, [name, select, _callback])
                }
            } else {
                // 委托
                for (let e of this.arr) {
                    let _callback = function(event) {
                        let parent = Sea(event.target).parent(select).dom
                        this.querySelectorAll(select).forEach(function(dom, index) {
                            if (dom.isSameNode(parent)) {
                                // callback.bind(dom)(event, index)
                                callback.call(dom, event, index)
                                if (one === true) {
                                    e.removeEventListener(name, _callback)
                                }
                            }
                        })
                    }
                    if (['blur', 'focus'].includes(name)) {
                        e.addEventListener(name, _callback, true)
                    } else {
                        e.addEventListener(name, _callback, false)
                    }
                    off(e, [name, select, _callback])
                }
            }
        }
    }
    // 一次性事件 (绑定/委托)
    one(name, select, callback) {
        this.on(name, select, callback, true)
    }
    // 移除事件
    off() {
        for (let e of this.arr) {
            if (Array.isArray(e.sea_event)) {
                for (let arr of e.sea_event) {
                    let [name, select, callback] = arr
                    e.removeEventListener(name, callback)
                }
                e.sea_event = undefined
            }
        }
        return this
    }
    // 触发自定义事件
    iEvent(name, obj, bubble) {
        let e = new Event(name, {bubbles: bubble || true})
        e.data = obj || {}
        for (let dom of this.arr) {
            dom.dispatchEvent(e)
        }
    }

    // 样式
    css(obj, val) {
        let set = (k, v) => {
            for (let e of this.arr) {
                e.style[k] = String(v)
            }
        }
        if (typeof obj === 'string') {
            if (val === undefined) {
                return window.getComputedStyle(this.dom)[obj]
            } else {
                set(obj, val)
            }
        } else {
            for(let key in obj) {
                set(key, obj[key])
            }
        }
        return this
    }
    // 显示
    show(str) {
        for (let e of this.arr) {
            e.style.display = str || e.sea_display || "flex"
        }
        return this
    }
    // 隐藏
    hide() {
        for (let e of this.arr) {
            let display = window.getComputedStyle(e).display
            if (display !== 'none') {
                e.sea_display = display
            }
            e.style.display = "none"
        }
        return this
    }

    // 查找子元素
    find(select) {
        let sea = Sea()
        let arr = []
        if (this.dom) {
            for (let e of this.arr) {
                Array.from(e.querySelectorAll(select)).forEach(e => {
                    arr.push(e)
                })
            }
            sea.arr = arr
            sea.dom = arr[0]
        }
        return sea
    }
    // 查找父元素
    parent(select) {
        let sea = Sea()
        let arr = []
        if (this.dom) {
            if (select) {
                arr.push(this.dom.closest(select))
            } else {
                arr.push(this.dom.parentElement)
            }
            sea.arr = arr
            sea.dom = arr[0]
        }
        return sea
    }
    // 查找上一个元素
    prev() {
        if (this.dom) {
            return Sea(this.dom.previousSibling)
        }
    }
    // 查找下一个元素
    next() {
        if (this.dom) {
            return Sea(this.dom.nextSibling)
        }
    }
    // 子元素
    child() {
        let sea = Sea()
        let arr = []
        for (let e of this.dom.childNodes) {
            arr.push(e)
        }
        sea.arr = arr
        sea.dom = arr[0]
        return sea
    }
    // 选择
    eq(i) {
        let sea = Sea()
        if (typeof i === 'number') {
            let end = i + 1 === 0 ? undefined : i + 1
            let arr = this.arr.slice(i, end)
            sea.arr = arr
            sea.dom = arr[0]
        }
        return sea
    }
    // 循环
    each(callback) {
        for(let i = 0; i < this.arr.length; i++) {
            let e = new bigsea(this.arr[i])
            if (callback(e, i) === null) {
                break
            }
        }
    }

    // 添加类
    addClass(str) {
        for (let e of this.arr) {
            for (let cls of str.split(' ')) {
                e.classList.add(cls)
            }
        }
        return this
    }
    // 删除类
    removeClass(str) {
        for (let e of this.arr) {
            for (let cls of str.split(' ')) {
                e.classList.remove(cls)
            }
        }
        return this
    }
    // 判断包含类
    hasClass(str) {
        return this.dom.classList.contains(str)
    }
    // 开关类
    toggleClass(str) {
        for (let e of this.arr) {
            return e.classList.toggle(str)
        }
    }

    // 获取或设置 文本
    text(text) {
        if (typeof text == "string") {
            for (let e of this.arr) {
                e.innerText = text
            }
        } else {
            if (this.dom) {
                return this.dom.innerText
            }
        }
    }
    // 获取或设置 HTML
    html(html) {
        if (typeof html == "string") {
            for (let e of this.arr) {
                e.innerHTML = html
            }
        } else {
            if (this.dom) {
                return this.dom.innerHTML
            }
        }
    }
    // value
    val(str) {
        if (this.dom) {
            if (str !== undefined) {
                for (let e of this.arr) {
                    e.value = str
                }
                return this
            } else {
                return this.dom.value
            }
        } else {
            return ''
        }
    }
    // dataset
    data(key, val) {
        if (this.dom) {
            if (val !== undefined) {
                for (let e of this.arr) {
                    e.dataset[key] = val
                }
            } else {
                return this.dom.dataset[key]
            }
        }
    }

    // 末尾 添加
    append(html, where) {
        let s = where || 'beforeend'
        for (let e of this.arr) {
            e.insertAdjacentHTML(s, html)
        }
        return this
    }
    // 首部 添加
    prepend(html) {
        return this.append(html, 'afterbegin')
    }
    // 之前 添加 现有元素外
    before(html) {
        return this.append(html, 'beforebegin')
    }
    // 之后 添加 现有元素外
    after(html) {
        return this.append(html, 'afterend')
    }
    // 删除
    remove() {
        for (let e of this.arr) {
            e.remove()
        }
    }
    // 获取或设置属性
    attr(key, val) {
        if (this.dom) {
            if (typeof val === 'string') {
                for (let e of this.arr) {
                    e.setAttribute(key, val)
                }
            } else {
                return this.dom.getAttribute(key)
            }
        }
    }
    // 删除属性
    removeAttr(key) {
        for (let e of this.arr) {
            e.removeAttribute(key)
        }
        return this
    }
    // 开关属性
    toggleAttr(key, val) {
        if (this.dom) {
            if (this.attr(key) === null) {
                this.attr(key, val || "")
            } else {
                this.removeAttr(key)
            }
        }
    }

    // 判断隐藏
    isHidden() {
        let e = this.dom
        let style = window.getComputedStyle(e)
        if (e.hidden || style.opacity === "0" || style.display === "none") {
            return true
        } else {
            return false
        }
    }

    // 点击
    click() {
        this.dom.click()
        return this
    }
    // 获得焦点
    focus() {
        this.dom.focus()
        return this
    }
    // 失去焦点
    blur() {
        this.dom.blur()
        return this
    }
    // 全选
    select() {
        this.dom.select()
        return this
    }

    // 动画
    animate() {
        // 清空
        this.arr.forEach(e => {
            for (let cls of e.classList) {
                if (cls.includes('animate-')) {
                    e.classList.remove(cls)
                }
            }
        })
    }
    // 淡入
    fadeIn(display, time, callback) {
        // 参数转换
        if (typeof display === 'number' && callback === undefined) {
            callback = time
            time = display
            display = undefined
        }
        if (this.isHidden() === true) {
            this.animate()
            this.show()
            this.arr.forEach(e => {
                e.sea_animate = [display, time, callback]
                if (typeof time == 'number') {
                    e.style.animationDuration = String(time) + 's'
                }
                e.classList.add('animate-fadeIn')
            })
        }
    }
    // 淡出
    fadeOut(time, callback, show) {
        if (this.isHidden() === false) {
            this.animate()
            this.arr.forEach(e => {
                e.sea_animate = [time, callback, show]
                if (typeof time == 'number') {
                    e.style.animationDuration = String(time) + 's'
                }
                e.classList.add('animate-fadeOut')
            })
        }
    }

    // UI 配合

    // 文字提示
    tooltip() {}
    // 表格渲染
    table() {}
}
// Sea
const Sea = function(select) {
    return new bigsea(select)
}
// 静态方法 Sea
Sea.static = {
    find(...args) {
        return new this(...args)
    },
    // Ajax
    Ajax(request) {
        let req = {
            url: request.url,
            // data 传对象
            data: request.data || {},
            method: (request.method || 'POST').toUpperCase(),
            header: request.header || {},
            search: request.search || {},
            callback: request.callback,
            cors: request.cors,
            hash: request.hash,
        }
        // search
        if (Object.keys(req.search).length) {
            req.url += this.query(req.search)
        }
        // hash
        if (req.hash) {
            req.url += req.hash
        }
        // cors
        if (req.cors) {
            req.data.CORS = {
                // 服务器请求地址
                url: req.url,
                // 服务器请求方法
                method: req.method,
            }
            req.url = req.cors
            req.method = 'POST'
        }
        // promise
        let promise = new Promise(function(success, fail) {
            let r = new XMLHttpRequest()
            r.open(req.method, req.url, true)
            for (let key in req.header) {
                r.setRequestHeader(key, req.header[key])
            }
            if (!req.header['Content-Type']) {
                r.setRequestHeader('Content-Type', 'application/json')
            }
            r.onreadystatechange = function() {
                if (r.readyState === 4) {
                    if (r.status === 403) {
                        Sea.Ajax({
                            url: config.server + '/user/token',
                            header: {authorization: 'ninoart' + db.token},
                            data: {
                                phone: db.phone
                            },
                        }).then(res => {
                            let data = JSON.parse(res)
                            log(data)
                            db.$set('token', data.token)
                        })
                    }
                    let res = r.response
                    // 回调函数
                    if (typeof req.callback === 'function') {
                        req.callback(res)
                    }
                    // Promise 成功
                    success(res)
                }
            }
            r.onerror = function(err) {
                fail(err)
            }
            if (req.method === 'GET') {
                r.send()
            } else {
                // POST
                r.send(JSON.stringify(req.data))
            }
        })
        return promise
    },
    // 生成样式 String
    css(css, obj) {
        // Sea.css('top:hover', {'display':'block', 'cursor':'zoom-in'})
        let s = ''
        for (let key in obj) {
            let val = obj[key]
            s += `${key}:${val};`
        }
        if (css) {
            s = `${css}{${s}}`
        }
        return s
    },
    // 生成 query
    query(obj) {
        if (typeof obj === 'string') {
            let result = {}
            let i = obj.indexOf('?')
            if (i === -1) {
                return result
            } else {
                obj = obj.slice(i + 1)
            }
            for(let e of obj.split('&')) {
                let a = e.split('=')
                result[a[0]] = a[1]
            }
            return result
        } else {
            let arr = []
            for(let key in obj) {
                let val = obj[key]
                arr.push([key, val].join('='))
            }
            return '?' + arr.join('&')
        }
    },
    // 检查 Object
    has(obj, path) {
        if (obj && path) {
            // Sea.has(obj, 'a.b.c')
            let arr = path.split('.')
            if (arr[0] === 'window') {
                arr = arr.slice(1)
            }
            for (let k of arr) {
                if (k in obj) {
                    obj = obj[k]
                } else {
                    return false
                }
            }
            return true
        } else {
            throw "参数错误 Sea.has(obj, 'a.b.c')"
        }
    },

    // UI 配合

    // 事件
    UIEvent: {},
    // 弹窗提示
    alert: null,
    // 弹窗确认
    confirm: null,
}
Object.keys(Sea.static).forEach(function(k) {
    Sea[k] = Sea.static[k]
})

// 动画
bigsea.animate = {
    fadeIn(event) {
        let dom = event.target
        let [display, time, callback] = dom.sea_animate || []
        if (typeof time == 'number') {
            dom.style.animationDuration = ''
        }
        if (typeof callback === 'function') {
            callback()
        }
        delete dom.sea_animate
    },
    fadeOut(event) {
        let dom = event.target
        let [time, callbak, show] = dom.sea_animate || []
        if (typeof time == 'number') {
            dom.style.animationDuration = ''
        }
        if (typeof callback === 'function') {
            callback()
        }
        if (show !== true) {
            Sea(dom).hide()
        }
        delete dom.sea_animate
    },
}
Sea(document).on('animationend', function(event) {
    let name = event.animationName.split('animate-')[1] || ""
    if (bigsea.animate.hasOwnProperty(name)) {
        bigsea.animate[name](event)
    }
})

// Sea.Ajax.help
Sea.Ajax.help = `// 示例
Sea.Ajax({
    method: 方法 String 默认"POST"
    url:    地址 String 必填
    data:   数据 Object 必填
}).then(res => {
    log(res)
})
// 其它
search: 查询 Object
header: 请求头部 Object
header['Content-Type'] = 'application/json'
callback: 回调函数 Function

// 跨域请求
cors: 跨域地址 String (url 填自己服务器接口)`

// 其它
// window.eval = undefined
window.$ = window.jQuery ? $ : Sea
;
