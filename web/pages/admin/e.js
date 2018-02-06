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
            authorization: 'ninoart' + db.token,
        },
    }).then(res => {
        let data = JSON.parse(res)
        if (Number(data.code) == 1000) {
            db.$clear()
            location.replace('/')
        }
    })
})
// 刷新 token
// Sea.Ajax({
//     url: config.server + '/user/token',
//     data: {
//         phone: db.phone,
//     },
//     header: {
//         authorization: 'ninoart' + db.token,
//     },
// }).then(res => {
//     let data = JSON.parse(res)
//     if (Number(data.code) == 1000) {
//         db.$set('token', data.token)
//         log(db.token)
//     }
// })

// QA 创建
// Sea.Ajax({
//     url: config.server + '/web/qa/release',
//     header: {
//         authorization: 'ninoart' + db.token,
//     },
//     data: {
//         question: '问题' + String(Date.now()).slice(-4),
//         answer: '回答' + String(Date.now()).slice(-4),
//     },
// }).then(res => {
//     let data = JSON.parse(res)
//     log(data)
// })

// QA 列表
// Sea.Ajax({
//     url: config.server + '/qa/list',
//     header: {
//         authorization: 'ninoart' + db.token,
//     },
//     data: {
//         page: 0,
//     },
// }).then(res => {
//     let data = JSON.parse(res)
//     log(data)
// })

// QA 修改
// Sea.Ajax({
//     url: config.server + '/web/qa/modify',
//     header: {
//         authorization: 'ninoart' + db.token,
//     },
//     data: {
//         id: "5a796932cbd2b30c1c58896f",
//         question: '修改问题' + String(Date.now()).slice(-4),
//         answer: '修改回答' + String(Date.now()).slice(-4),
//     },
// }).then(res => {
//     let data = JSON.parse(res)
//     log(data)
// })

// QA 删除
// Sea.Ajax({
//     url: config.server + '/web/qa/delete',
//     header: {
//         authorization: 'ninoart' + db.token,
//     },
//     data: {
//         id: "5a796976cbd2b30c1c588971",
//     },
// }).then(res => {
//     let data = JSON.parse(res)
//     log(data)
// })

// 修改用户权限
// Sea.Ajax({
//     url: config.server + '/web/user/modify/role',
//     header: {
//         authorization: 'ninoart' + db.token,
//     },
//     data: {
//         userid: "5a65501d74da1bb7231843fc",
//         role: 0,
//     },
// }).then(res => {
//     let data = JSON.parse(res)
//     log(data)
// })
// 用户列表
// Sea.Ajax({
//     url: config.server + '/user/list',
//     header: {
//         authorization: 'ninoart' + db.token,
//     },
//     data: {
//         // name: "admin",
//     },
// }).then(res) => {
//     let data = JSON.parse(res)
//     log(data)
// })
