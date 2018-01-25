Sea('#nav tag').on('click', function() {
    Sea('#main').dom.src = `/pages/${this.dataset.url}/`
})
