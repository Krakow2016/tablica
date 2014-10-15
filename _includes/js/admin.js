var auth
var view = "https://krakow2016.cloudant.com/jobs/_design/users/_view/all?descending=false&include_docs=false&reduce=true&group_level=1&callback=?"
$.getJSON(view, function(json) {
    var table = $('#users tbody')
    _.each(json.rows, function(row){
        var user = row.value.doc
        var tr = $('<tr/>')
        if(user.verified) { tr.addClass('success') }
        tr.append($('<td><img src="http://graph.facebook.com/'+ user.profile.id +'/picture?width=50&height=50"></td>'))
        tr.append($('<td>'+ user.profile.displayName +'</td>'))
        tr.append($('<td>'+ row.value.score +'</td>'))
        tr.click(function(e) {
            user.verified = !user.verified
            $.ajax({
                url: 'https://krakow2016.cloudant.com/jobs/'+ user._id,
                method: 'PUT',
                contentType: 'application/json',
                crossDomain: true,
                headers: { 'Authorization': auth },
                data: JSON.stringify(user),
                dataType: 'json',
                success: function(json) {
                    if(json.ok) {
                        user._rev = json.rev
                        tr[user.verified ? 'addClass' : 'removeClass']('success')
                    }
                }
            })
        })
        table.append(tr)
    })
})

$('#myModal').modal({})

$('#admin-submit').click(function(e) {
    e.preventDefault()

    var login = 'ttedderangthentanctsaine'
    var pass = $('#pass').val()

    var tok = login + ':' + pass;
    var hash = btoa(tok);
    auth = "Basic " + hash;

    $.ajax({
        url: 'https://krakow2016.cloudant.com/_session',
        method: 'GET',
        crossDomain: true,
        headers: { 'Authorization': auth },
        success: function(session) {
            //if(_.contains(session.userCtx.roles, '_writer')) { // Success
                $('#admin-alert').addClass('hidden')
                $('#admin-info').removeClass('hidden')
                $('#myModal').modal('hide')
            //}
        },
        error: function(err) {
            $('#pass').val('')
        }
    })
})
