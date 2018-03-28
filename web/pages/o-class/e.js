let courseDel = `<sea  class="btn danger del">删除</sea>`
let course = {
    thead: ['课程名称','老师id', '老师简介', '是否有点频课', '操作'],
    tbody: [
        // ["水彩风景课", "鼠帝", "40", '是', courseDel],
        // ["创作思维课", "大宝,虫虫", "20", '否', courseDel],
    ],
}
// 渲染
Sea('sea.table.course').table(course)
// 添加
Sea('page').on('mousedown', '.add', function() {
    let that = Sea(this)
    let e = Sea('page')
    let arr = [
        e.find('.courName'),
        e.find('.teacher'),
        e.find('.introduction'),
        e.find('.hasReview'),
    ]
    for(var i = 0; i < arr.length; i++) {
        let one = arr[i]
        if (one.val() === '') {
            one.tooltip('不能为空', 'topLeft')
            return;
        } else {
            arr[i] = one.val()
        }
    }
    if (arr[3] !== '是') {
        arr[3] = '否'
    }
    arr.push(courseDel)
    course.tbody.push(arr)
    Sea('sea.table.course').table(course)
})
// 删除
Sea('sea.table.course').on('mousedown', '.del', function(e, i) {
    course.tbody.splice(i, 1)
    Sea('sea.table.course').table(course)
})
// 提交
Sea('page').on('mousedown', '.submit', function() {
    let e = Sea('page')
    let seriesname = e.find('.seriesname')
    let syllabus = e.find('.syllabus')
    let price = e.find('.price')
    for (let one of [seriesname, syllabus, price]) {
        if (one.val() === '') {
            one.tooltip('不能为空', 'topLeft')
            return;
        }
    }
    let icon = 'https://bigc.cc/mer/img/note.png'
    let data = {
        url: config.server + '/web/series/create',
        header: {authorization: 'ninoart' + db.token},
        data: {
            // 系列课名称
            seriesname: seriesname.val(),
            // 系列课大纲
            syllabus: syllabus.val(),
            // 系列课价格
            price: price.val(),
            // 系列课封面图片
            icon: icon,
            // 系列课下正课列表
            course: [],
        },
    }
    for (let cor of course.tbody) {
        data.data.course.push({
            // 课程名称
            courName: cor[0],
            // 老师 id
            teacher: cor[1],
            // 老师简介
            introduction: cor[2],
            // 是否有点频课
            hasReview: cor[3] === '是' ? true : false,
        })
    }
    Sea.Ajax(data).then(res => {
        let data = JSON.parse(res)
        Sea.alert(data.msg)
    })
})
