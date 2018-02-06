let tags = Sea('#nav tag')
tags.on('click', function() {
    tags.removeClass("active")
    let e = Sea(this)
    Sea('#main').dom.src = `/pages/${this.dataset.url}/`
    e.addClass("active")
    Sea('.active-triangle').remove()
    e.append('<span class="active-triangle"></span>')
})
tags.dom.click()
tags.on('mouseover', function() {
    let e = Sea(this)
    if (e.hasClass('active')) {
        //
    } else {
        tags.css({
            color: "",
            background: "",
        })
        e.css({
            color: "white",
            background: "#358693",
        })
    }
})

Sea('.info .exit').on('click', function() {
    Sea.Ajax({
        url: config.server + '/web/user/logout',
        header: {
            "authorization": 'ninoart' + db.token,
        },
    }).then(res => {
        log(res)
    })
    // Sea.Ajax({
    //     url: config.server + '/web/user/token',
    //     headers: {
    //         authorization: 'ninoart' + db.token,
    //     },
    // }).then(res => {
    //     log(res)
    // })
})
// Sea('.info .exit').click()
