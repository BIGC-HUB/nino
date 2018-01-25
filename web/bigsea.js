// Html css 间隙
String.prototype.html = function() {
    let html = this.slice(this.indexOf('<'))
    return html.replace(/>(\s+)</img, '><')
}
String.prototype.css = function() {
    let css = this.slice(this.indexOf('<style>') + 7, this.indexOf('</style>'))
    let arr = css.split('\n').map(function(e) {
        let i = e.search(/[^ ]/)
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
const cut = (n) => {
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
        } else {
            this.arr = []
        }
        this.dom = this.arr[0]
    }
    // 样式
    css(obj, val) {
        let arr = this.arr
        let set = function(k, v) {
            for (let e of arr) {
                e.style[k] = v
            }
        }
        if (val && typeof obj === 'string') {
            set(obj, val)
        } else {
            for(let key in obj) {
                set(key, obj[key])
            }
        }
        return this
    }
    // 事件
    on(event, callback) {
        for (let e of this.arr) {
            e.addEventListener(event, callback, false)
        }
        return this
    }
    // 显示
    show() {
        for (let e of this.arr) {
            e.hidden = false
        }
        return this
    }
    // 隐藏
    hide() {
        for (let e of this.arr) {
            e.hidden = true
        }
        return this
    }
    // 查找子元素
    find(select) {
        let sea = Sea()
        let arr = []
        for (let e of this.arr) {
            Array.from(e.querySelectorAll(select)).forEach(e => {
                arr.push(e)
            })
        }
        sea.arr = arr
        sea.dom = arr[0]
        return sea
    }
    // 选择父元素
    parent() {
        let sea = Sea()
        let arr = [this.dom.parentElement]
        sea.arr = arr
        sea.dom = arr[0]
        return sea
    }
    // 查找祖先元素
    parents(select) {
        let sea = Sea()
        let arr = [this.dom.closest(select)]
        sea.arr = arr
        sea.dom = arr[0]
        return sea
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
        this.dom.classList.contains(str)
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
    // 删除属性
    removeAttr(str) {
        for (let e of this.arr) {
            e.removeAttribute(str)
        }
        return this
    }

    // 判断隐藏
    isHidden() {
        let e = this.dom
        if (e.hidden || e.style.opacity === "0" || e.style.display === "none") {
            return true
        } else {
            return false
        }
    }

    // 动画
    animate(obj, time, callback) {
        let that = this
        let fps = 60
        let s = time || 1
        let t = s * 1000 / fps
        let parseValue = function(val) {
            let res = {
                value: null,
                unit: '',
            }
            for(var i = 0; i < val.length; i++) {
                let e = val[i]
                if (!/\d|\./.test(e)) {
                    res.value = Number(val.slice(0, i))
                    res.unit = val.slice(i)
                    break
                }
            }
            if (res.value == null) {
                res.value = Number(val)
            }
            return res
        }
        let dict = {
            "opacity": 1,
            "width": {
                "%": 100,
                "px": this.dom.offsetWidth,
            }
        }
        for (let css in obj) {
            let o = parseValue(obj[css])
            let max = dict[css]
            if (o.unit) {
                max = dict[css][o.unit]
            }
            let a = 0
            let b = o.value
            if (b <= a) {
                a = max
            }
            // 终止
            if (this.dom.style[css] == String(b)) { break }
            let op = a > b ? false : true
            let step = b > 0 ? b / t : a / t
            let animate = setInterval(function() {
                let stop = function() {
                    that.css(css, String(b) + o.unit)
                    clearInterval(animate)
                    if (typeof callback == 'function') { callback() }
                }
                let next = function() {
                    that.css(css, String(a) + o.unit)
                }
                if (op) {
                    if (a > b) {
                        stop()
                    } else {
                        next()
                    }
                    a += step
                } else {
                    if (a < b) {
                        stop()
                    } else {
                        next()
                    }
                    a -= step
                }
            }, fps)
        }
    }
    // 淡出
    fadeOut(time, callback, box) {
        if (this.isHidden() === false) {
            this.animate({
                "opacity": 0,
            }, time, () => {
                if (box === undefined) { this.hide() }
                if (typeof callback === 'function') { callback() }
            })
        }
    }
    // 淡入
    fadeIn(time, callback) {
        if (this.isHidden()) {
            this.show()
            this.animate({
                "opacity": 1,
            }, time, callback)
        }
    }
}
const Sea = function(select) {
    return new bigsea(select)
}
// 静态方法
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
        let query = function(obj) {
            let arr = []
            for(let key in obj) {
                let val = obj[key]
                arr.push([key, val].join('='))
            }
            return '?' + arr.join('&')
        }
        // search
        if (Object.keys(req.search).length) {
            req.url += query(req.search)
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
    // 弹窗
    confirm(msg, callback) {
        let e = Sea('seaConfirm')
        e.show('flex')
        e.find('btn').removeAttr('style')
        e.find('.msg').dom.innerText = msg
        Sea.confirm.callback = callback
    },
    // 提示
    alert(msg) {
        let e = Sea('seaConfirm')
        e.show('flex')
        e.find('.no').hide()
        e.find('.msg').dom.innerText = msg
    },
}
Object.keys(Sea.static).forEach(k => {
    Sea[k] = Sea.static[k]
})
// 构建 HTML CSS
Sea.init = {
    // 弹窗
    confirm() {
        // CSS
        Sea.innerHTML = `<style>
            seaConfirm {
                display: none;
                justify-content: center;
                align-items: center;
                position:  fixed;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                z-index: 100;
                background: rgba(0,0,0,0.76);
            }
            seaConfirm .cont {
                position: relative;
                pointer-events: auto;

                display: flex;
                justify-content: center;
                align-items: center;

                flex-direction: column;
                border-radius: .4rem;
                max-width:  80%;
                max-height: 80%;
                color: #FFF;
                background: rgba(98, 98, 98, 0.98);
            }
            seaConfirm .msg {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.23rem;
                font-weight: lighter;
                padding: 1rem;
                text-align: center;
                overflow-y: auto;
            }
            seaConfirm .btns {
                box-shadow: 0 4px 7px rgba(0,0,0,0.8) inset;
                box-sizing: border-box;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                padding: 1rem;
                border-bottom-left-radius: .4rem;
                border-bottom-right-radius: .4rem;
                color: rgba(98, 98, 98, 0.98);
                background: rgba(255,255,255,0.71);
            }
            seaConfirm btn {
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: .5rem;
                border: 1.5px solid #C8C8C8;
                border-radius: .25rem;
                width: 8rem;
                height: 3rem;
                background: rgb(249,249,249);
            }
            seaConfirm btn:hover {
                background: rgb(251,251,251);
            }
            seaConfirm .ok {
                background: rgb(90, 151, 255);
                color: #FFF;
                font-weight: bold;
            }
            seaConfirm .ok:hover {
                background: rgb(98, 156, 255);
            }
            </style>`.css()
        Sea('head').append(Sea.innerHTML)
        // HTML
        Sea.innerHTML = `<seaConfirm>
            <div class="cont">
                <text class="msg"></text>
                <div class="btns">
                    <btn class="ok">确定</btn>
                    <btn class="no">取消</btn>
                </div>
            </div>
            </seaConfirm>`.html()
        Sea('body').append(Sea.innerHTML)
        // Event
        let e = Sea('seaConfirm')
        let callback = function(bool) {
            e.hide()
            let f = Sea.confirm.callback
            if (f && typeof f == 'function') {
                f(bool)
                Sea.confirm.callback = undefined
            } else {
                // log("not callback")
            }
        }
        e.find('.ok').on('click', function() {
            callback(true)
        })
        e.find('.no').on('click', function() {
            callback(false)
        })
    },
}
Object.keys(Sea.init).forEach(k => {
    Sea.init[k]()
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
window.eval = undefined
