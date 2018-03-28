bigsea.prototype.table = function(data) {
    //
    let thead = '<thead><tr>'
    data.thead.forEach(e => {
        thead += `<th>${e}</th>`
    })
    thead += '</tr></thead>'
    //
    let tbody = '<tbody>'
    data.tbody.forEach(arr => {
        tbody += '<tr>'
        for (let e of arr) {
            let t = String(e)
            if( t.slice(0, 5) === 'data-') {
                break
            } else {
                tbody += `<td>${t}</td>`
            }
        }
        tbody += '</tr>'
    })
    tbody += '</thead>'
    //
    this.find('table').html(thead + tbody)
}
