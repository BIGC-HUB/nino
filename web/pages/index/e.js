let sign = Sea('#sign')
let Mer = {
    signing: false,
}
sign.find('.sign-in').on('click', function() {
    let phone = sign.find('.phone').dom
    let password = sign.find('.password').dom
    let options = {
        url: config.server + '/web/user/login',
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
                db.$set('token', data.token)
                window.location = '/pages/welcome'
            } else {
                Mer.signing = false
                sign.find('.tips').text("用户名或密码错误！")
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
                Sea.Ajax(options)
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
    sign.find('.tips').fadeOut(null, null, true)
})

let options = {
    "particles": {
        "number": {
            "value": 120,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 10
            },
            // "image": {
            //     "src": "img/github.svg",
            //     "width": 100,
            //     "height": 100
            // }
        },
        "opacity": {
            "value": 0.5,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 6,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 20,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 200,
            "color": "#ffffff",
            "opacity": 0.6,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 1,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": ["grab", "bubble"]
            },
            "onclick": {
                "enable": true,
                "mode": "repulse"
            },
            "resize": true
        },
        "modes": {
            // "grab": {
            //     "distance": 400,
            //     "line_linked": {
            //         "opacity": 1
            //     }
            // },
            "bubble": {
                "distance": 200,
                "size": 5,
                "duration": 2,
                "opacity": .8,
                "speed": 3
            },
            "repulse": {
                "distance": 200
            },
            // "push": {
            //     "particles_nb": 4
            // },
            // "remove": {
            //     "particles_nb": 2
            // }
        }
    },
    "retina_detect": true,
}
particlesJS('particles-js', options)
