let tags = Sea('#nav tag')
tags.on('click', function() {
    tags.removeClass("active")
    let e = Sea(this)
    Sea('#main').dom.src = `/pages/${this.dataset.url}/`
    e.addClass("active")
    e.css({
        color: "",
        background: "",
    })
    Sea('.active-triangle').remove()
    e.append('<span class="active-triangle"></span>')
})
tags.dom.click()
tags.on('mouseover', function() {
    let e = Sea(this)
    if (e.hasClass('active')) {
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
//     header: {authorization: 'ninoart' + db.token},
//     data: {
//         phone: db.phone,
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
//     header: {authorization: 'ninoart' + db.token},
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
//     header: {authorization: 'ninoart' + db.token},
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
//     header: {authorization: 'ninoart' + db.token},
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
//     header: {authorization: 'ninoart' + db.token},
//     data: {
//         id: "5a796976cbd2b30c1c588971",
//     },
// }).then(res => {
//     let data = JSON.parse(res)
//     log(data)
// })

// 用户列表
// Sea.Ajax({
//     url: config.server + '/user/list',
//     header: {authorization: 'ninoart' + db.token},
//     data: {
//         // name: "admin",
//     },
// }).then(res => {
//     let data = JSON.parse(res)
//     log(data)
// })

// 修改用户信息
// Sea.Ajax({
//     url: config.server + '/user/modify/info',
//     header: {authorization: 'ninoart' + db.token},
//     data: {
//         userid: db.user.id,
//         phone: "13010010010",
//         nickname: "大海",
//         password: "admin",
//     },
// }).then(res => {
//     let data = JSON.parse(res)
//     log(data)
// })

// 修改用户权限
// Sea.Ajax({
//     url: config.server + '/web/user/modify/role',
//     header: {authorization: 'ninoart' + db.token},
//     data: {
//         userid: db.user.id,
//         role: 0,
//     },
// }).then(res => {
//     let data = JSON.parse(res)
//     log(data)
// })


// 查看系列课 列表
// Sea.Ajax({
//     url: config.server + '/course/list',
//     header: {authorization: 'ninoart' + db.token},
// }).then(res => {
//     let data = JSON.parse(res)
//     log(data)
// })
// 查看系列课 课程
// Sea.Ajax({
//     url: config.server + '/course/find',
//     header: {authorization: 'ninoart' + db.token},
//     data: {
//         // 课程
//         courid: "5a74163f355cec562b414c08",
//         // 系列课 必填
//         seriesid: "5a74163f355cec562b414c05",
//     },
// }).then(res => {
//     let data = JSON.parse(res)
//     log(data)
// })
// 课程、系列课、点评课 - 增加 删除
let op = {
    创建课程: 1,
    删除课程: 3,
    //
    创建点评课: 2,
    删除点评课: 4,
    //
    删除系列课: 5,
    删除期: 6,
    删除班级: 7,
}
Sea.Ajax({
    url: config.server + '/course/operation',
    header: {authorization: 'ninoart' + db.token},
    data: {
        type: op.创建课程,
        // 系列课id 必填
        id: "5a7ac78d89d1d33a3165a4ed",
        // 老师id [1,2,3,4] 必填
        teacher: "5a659e4048172f523ff7abf4",
        // 课程名称 [1] 必填
        courName: "测试的课",
        // 课程id [2,3,4] 必填
        // courid: "",
        // 期 [6] 必填
        // termNumber: "",
        // 班级 [7] 必填
        // classNumber: "",
    },
}).then(res => {
    let data = JSON.parse(res)
    log(data)
})

// "POST /course/modify":{ controller: "CourseController", action: "modifyCourse"},
// "POST /course/operation":{ controller: "CourseController", action: "deletCourse"},
