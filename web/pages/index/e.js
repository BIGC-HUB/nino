let sign = Sea.find('#sign')
let Mer = {
    signing: false,
}
sign.find('.sign-in').on('click', function() {
    let phone = sign.find('.phone').dom
    let password = sign.find('.password').dom
    let options = {
        url: 'http://192.168.5.130:1337/web/user/login',
        data: {
            phone: phone.value,
            password: password.value,
        },
        header: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        callback(res) {
            let data = JSON.parse(res)
            if (data.code == 1000) {
                log(data)
            } else {
                Mer.signing = false
                sign.find('.tips').text("用户名或密码错误")
                sign.find('.tips').fadeIn()
            }
        },
    }
    if (phone.value) {
        if (password.value) {
            if (Mer.signing) {
                sign.find('.tips').text("正在登陆")
            } else {
                Mer.signing = true
                // Sea.Ajax(options)
            }
        } else {
            password.focus()
        }
    } else {
        phone.focus()
    }
})
sign.find('.password').on('keydown', function(e) {
    if (e.keyCode === 13) {
        sign.find('.sign-in').dom.click()
    }
})
sign.find('input').on('focus', function(e) {
    sign.find('.tips').addClass('fadeOut')
    sign.find('.tips').fadeOut()
})
