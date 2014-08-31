var hashchange = function(e) {
    var hash = encodeURI(decodeURI(window.location.hash))
    if(hash === "") {
        $('#no_category, .category').removeClass('hidden')
    } else {
        $('#no_category, .category').addClass('hidden')
        $('.category[data-category="'+hash+'"]').removeClass('hidden')
        $('#category_name').text(decodeURI(hash.substr(1)))
    }
    document.cookie = 'hash='+hash // Remember last viewd category
}
window.onhashchange = hashchange

if(!window.location.hash) { // Read last category from cookie
    var redirect = document.cookie.replace(/(?:(?:^|.*;\s*)hash\s*\=\s*([^;]*).*$)|^.*$/, "$1")
    window.location.hash = redirect
} else {
    hashchange()
}
