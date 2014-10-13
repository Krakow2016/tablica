var view = "https://krakow2016.cloudant.com/jobs/_design/users/_view/all?descending=false&include_docs=false&reduce=true&group_level=2&callback=?"
$.getJSON(view, function(json) {
    var users = {}
    json.rows.forEach(function(row){
        if(_.isEmpty(row.key[1])) {
            users[row.key[0]].applications = row.value
        } else {
            users[row.key[0]] = {name: row.key[1], applications: 0}
        }
    })

    var table = $('#users tbody')
    _.each(users, function(user, id){
        var tr = $('<tr/>')
        tr.append($('<td><img src="http://graph.facebook.com/'+ id.match(/[0-9]+/) +'/picture?width=50&height=50"></td>'))
        tr.append($('<td>'+ user.name +'</td>'))
        //tr.append($('<td/>'))
        tr.append($('<td>'+ user.applications +'</td>'))
        table.append(tr)
    })
})
