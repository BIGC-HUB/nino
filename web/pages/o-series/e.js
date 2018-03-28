Sea('sea.table.series').on('mousedown', '.up', function(event, i) {
    let id = series.tbody[i][5].split('data-id=')[1]
    Sea.Ajax({
        url: config.server + '/web/course/verify',
        header: {authorization: 'ninoart' + db.token},
        data: {
            // 1系列课 2课程
            type: 1,
            // id
            id: id,
            // 审核状态 1审核中 2上架 3下架
            status: 2,
        },
    }).then(res => {
        let data = JSON.parse(res)
        log(data)
        Sea.alert(data.msg)
        render()
    })
})
Sea('sea.table.series').on('mousedown', '.down', function(event, i) {
    let id = series.tbody[i][5].split('data-id=')[1]
    Sea.Ajax({
        url: config.server + '/web/course/verify',
        header: {authorization: 'ninoart' + db.token},
        data: {
            // 1系列课 2课程
            type: 1,
            // id
            id: id,
            // 审核状态 1审核中 2上架 3下架
            status: 3,
        },
    }).then(res => {
        let data = JSON.parse(res)
        // log(data)
        Sea.alert(data.msg)
        render()
    })
})
let series = {
    thead: ['课程名称', '老师', '课数', '当前状态','操作'],
    tbody: [],
}
// 渲染
let render = function() {
    Sea.Ajax({
        url: config.server + '/course/list',
        header: {authorization: 'ninoart' + db.token},
    }).then(res => {
    let data = JSON.parse(res)
    if (data.code !== 1000) {
        return;
    }
    let seriesEdit = `
    <sea class="group">
        <sea class="btn up">上架</sea>
        <sea class="btn down">下架</sea>
    </sea>
    `
    let dict = {
        '1': '审核中',
        '2': '上架',
        '3': '下架',
    }
    let arr = []
    for (let e of data.data) {
        let status =
        arr.push([
            e.series.seriesName,
            e.series.teacher.map(function(e) {
                return e.nickname
            })[0],
            e.class.length,
            dict[e.series.status],
            seriesEdit,
            'data-id=' + e.series.id,
        ])
    }
    series.tbody = arr
    // 渲染
    Sea('sea.table.series').table(series)
})
}
render()
