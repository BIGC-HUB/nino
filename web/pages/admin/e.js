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
        log(res)
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

// 创建系列课
// Sea.Ajax({
//     url: config.server + '/web/series/create',
//     header: {authorization: 'ninoart' + db.token},
//     data: {
//         // 系列课名称
//         seriesname: 'test4',
//         // 系列课大纲
//         syllabus: 'test',
//         // 系列课价格
//         price: 200,
//         // 系列课封面图片
//         icon: 'https://i8.mifile.cn/b2c-mimall-media/0147b093d6c05ca0aeef15b35526532d.jpg',
//         // 系列课下正课列表
//         course: [
//             {
//                 // 课程名称
//                 courName: 'test',
//                 // 老师 id
//                 teacher: "5a9797fc718445d775e53418",
//                 // 老师简介
//                 introduction: 'test',
//                 // 是否有点频课
//                 hasReview: true,
//             },
//         ],
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
//     log('查看系列课 列表', data)
// })

// 查看系列课 课程
// Sea.Ajax({
//     url: config.server + '/course/find',
//     header: {authorization: 'ninoart' + db.token},
//     data: {
//         // 课程
//         // courid: "5a7bb35f12fc3b5a14c2f0d4",
//         // 系列课 必填
//         seriesid: "5a7ac78d89d1d33a3165a4ed",
//     },
// }).then(res => {
//     let data = JSON.parse(res)
//     log('查看系列课 课程', data)
// })

// 课程、系列课、点评课 - 增加 删除
// let op = {
//     创建课程: 1,
//     删除课程: 3,
//     //
//     创建点评课: 2,
//     删除点评课: 4,
//     //
//     删除系列课: 5,
//     删除期: 6,
//     删除班级: 7,
// }
// Sea.Ajax({
//     url: config.server + '/course/operation',
//     header: {authorization: 'ninoart' + db.token},
//     data: {
//         type: op.创建课程,
//         // 系列课id 必填
//         id: "5a7ac78d89d1d33a3165a4ed",
//         // 老师id [1,2,3,4] 必填
//         teacher: "5a659e4048172f523ff7abf4",
//         // 课程名称 [1] 必填
//         courName: "测试的课",
//         // 课程id [2,3,4] 必填
//         courid: "",
//         // 期 [6] 必填
//         termNumber: "",
//         // 班级 [7] 必填
//         classNumber: "",
//     },
// }).then(res => {
//     let data = JSON.parse(res)
//     log(data)
// })

// 课程、系列课 - 审核
// Sea.Ajax({
//     url: config.server + '/web/course/verify',
//     header: {authorization: 'ninoart' + db.token},
//     data: {
//         // 1系列课 2课程
//         type: 1,
//         // id
//         id: "5a7ac78d89d1d33a3165a4ed",
//         // 审核状态 1审核中 2上架 3下架
//         status: 3,
//     },
// }).then(res => {
//     let data = JSON.parse(res)
//     log(data)
// })

// 课程、系列课、点评课 - 修改
// Sea.Ajax({
//     url: config.server + '/course/modify',
//     header: {authorization: 'ninoart' + db.token},
//     data: {
//         // 1系列课 2 3点评课
//         type: 2,
//         // id
//         id: "5a7bb35f12fc3b5a14c2f0d4",
//         // 价格
//         price: 999,
//         // 开始时间 [1] 必填
//         starttime: 1518058000762,
//     },
// }).then(res => {
//     let data = JSON.parse(res)
//     log(data)
// })

// 系列课班级 - 创建
// Sea.Ajax({
//     url: config.server + '/web/course/newtc',
//     header: {authorization: 'ninoart' + db.token},
//     data: {
//         // 系列课id
//         id: "5a7ac78d89d1d33a3165a4ed",
//         // 新建班级数 默认1
//         class: 4,
//     },
// }).then(res => {
//     let data = JSON.parse(res)
//     log(data)
// })

// 获取 News 类别
// Sea.Ajax({
//     url: config.server + '/news/home',
//     header: {authorization: 'ninoart' + db.token},
// }).then(res => {
//     let data = JSON.parse(res)
//     log('获取 News 类别', data)
// })

// 获取 News 列表
// Sea.Ajax({
//     url: config.server + '/news/list',
//     header: {authorization: 'ninoart' + db.token},
//     data: {
//         topic: "艺术分享",
//     },
// }).then(res => {
//     let data = JSON.parse(res)
//     log('获取 News 列表', data)
// })

// 增加 News 类别标签
// Sea.Ajax({
//     url: config.server + '/web/news/tag',
//     header: {authorization: 'ninoart' + db.token},
//     data: {
//         topic: "测试标签",
//         img: "",
//     },
// }).then(res => {
//     let data = JSON.parse(res)
//     log(data)
// })

// 增加 News 内容
// Sea.Ajax({
//     url: config.server + '/web/news/add',
//     header: {authorization: 'ninoart' + db.token},
//     data: {
//         topic: "测试标签",
//         data: JSON.stringify({
//             // 展示模板类型 1 2
//             type: 2,
//             // 类型
//             category: "优秀作业",
//             // 文章标题
//             title: "秋玉老师带你进入国画之旅，慢慢听她讲说创作笔下的故事",
//             // 文章头图片
//             picture: "http://p2bg3pq6o.bkt.clouddn.com/news/testMask2.jpg",
//             // 文章头视频路径 有视频数据时必填
//             vedio: "http://p2bg3pq6o.bkt.clouddn.com/news/testwebwxgetvideo",
//             // 文章体内容
//             content: [{
//                 // 0小标题 1文本内容 2未知 3用户数据 4课程数据
//                 type: 0,
//                 // 文本数据
//                 content: "如何开始绘画"
//
//                 // data: JSON.stringify({}),
//             }, {
//                 type: 3,
//                 // 用户、课程需要的数据体 [3,4] 必填
//                 data: {
//                     id: "5a659e4048172f523ff7abf4",
//                     nickname: "秋玉",
//                     headPortrait: "http://p2bg3pq6o.bkt.clouddn.com/news/testMask3.jpg"
//                 }
//             }],
//         }),
//     },
// }).then(res => {
//     let data = JSON.parse(res)
//     log(data)
// })

// 获取 News 单条内容
// Sea.Ajax({
//     url: config.server + '/news/find',
//     header: {authorization: 'ninoart' + db.token},
//     data: {
//         // 文章id
//         id: "5a7bfdae2558d7d82f5fc247",
//     },
// }).then(res => {
//     let data = JSON.parse(res)
//     log(data)
// })

// 修改 News 类别标签数据
// Sea.Ajax({
//     url: config.server + '/web/news/tag/change',
//     header: {authorization: 'ninoart' + db.token},
//     data: {
//         // 旧 类别名称 必填
//         name: "测试标签",
//         topic: "测试标签2",
//         img: "",
//     },
// }).then(res => {
//     let data = JSON.parse(res)
//     log(data)
// })

// 删除 News 类别标签 或 数据
// Sea.Ajax({
//     url: config.server + '/web/news/delete',
//     header: {authorization: 'ninoart' + db.token},
//     data: {
//         // 类别名称 必填
//         name: "测试标签",
//         // 文章id 删除
//         // newsid: "5a791b8de9f174061de58e63",
//     },
// }).then(res => {
//     let data = JSON.parse(res)
//     log(data)
// })
