let range = function(callback) {
    let a = 0
    let b = 101
    let that = Sea('#welcome .speed')
    let time = 0.5

    let fps = 60
    let s = time || 1
    let t = s * 1000 / fps
    let step = b / t
    let animate = setInterval(function() {
        if (a > b) {
            that.css("width", String(b) + '%')
            clearInterval(animate)
            if (typeof callback == 'function') {
                callback()
            }
        } else {
            that.css("width", String(a) + '%')
        }
        a += step
    }, fps)
}
range(function() {
    location = '/pages/admin'
})
