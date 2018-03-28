let courseDel = `<sea  class="btn danger del">删除</sea>`
let course = {
    thead: ['课程名称','老师id', '老师简介', '是否有点频课', '操作'],
    tbody: [
        // ["水彩风景课", "鼠帝", "40", '是', courseDel],
        // ["创作思维课", "大宝,虫虫", "20", '否', courseDel],
    ],
}
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
            break
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

Sea('sea.table.course').table(course)

let test = function() {
    Sea.Ajax({
        url: config.server + '/web/series/create',
        header: {authorization: 'ninoart' + db.token},
        data: {
            // 系列课名称
            seriesname: 'test4',
            // 系列课大纲
            syllabus: 'test',
            // 系列课价格
            price: 200,
            // 系列课封面图片
            icon: 'https://i8.mifile.cn/b2c-mimall-media/0147b093d6c05ca0aeef15b35526532d.jpg',
            // 系列课下正课列表
            course: [
                {
                    // 课程名称
                    courName: 'test',
                    // 老师 id
                    teacher: "5a9797fc718445d775e53418",
                    // 老师简介
                    introduction: 'test',
                    // 是否有点频课
                    hasReview: true,
                },
            ],
        },
    }).then(res => {
        let data = JSON.parse(res)
        log(data)
    })
}
