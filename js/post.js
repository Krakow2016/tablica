var job_id = window.location.pathname
var startkey = escape(JSON.stringify([job_id])),
    endkey = escape(JSON.stringify([job_id, {}]))

$.getJSON('https://krakow2016.cloudant.com/jobs/_design/applications/_view/all?startkey='+startkey+'&endkey='+endkey+'&include_docs=true&callback=?', function(applications) {

    console.log('Zgłoszeń: ', applications.rows.length)
    console.log('Wszystkich miejsc: ', $('#team_count').val())

    var available = $('#team_count').val() - applications.rows.length
    console.log('Wolnych miejsc: ', available)

    // Displaying submitted application
    var List = Backbone.View.extend({
        el: '#list',
        initialize: function() {
            this.render()
        },
        render: function() {
            var that = this
            this.collection.forEach(function(row) {
                that.addOne(row)
            })
        },
        addOne: function(row) {
            this.$el.append('<li>'+ row.doc.username +'</li>')
        }
    })

    var list = new List({ collection: applications.rows })

    $.ajax({ // Ask server whether we are authenticated
        type: "GET",
        url: "http://localhost:3000/me",
        cache: false,
        crossDomain: true,
        xhrFields: { withCredentials: true  }, // sends our cookie
        success: function(user) {
            if(user.ok) { // We are logged in

                var button,
                    checksum = md5([user.result._id, job_id])

                var application = _.find(applications.rows, function(x){ return x.id === checksum })
                if(application) { // We already have applied
                    console.log('Already applied!')
                    button = new Buttons.Cancel({application: application})
                } else { // Show "apply for a job" button
                    if(available > 0) {
                        console.log('Apply!')
                        button = new Buttons.Apply({
                            username: user.result.profile.displayName,
                            list: list
                        })
                    } else { // There is no more applications to apply for
                        console.log('Application closed')
                        button = new Buttons.Closed()
                    }
                }
            } else if(available > 0) { // Show login button
                console.log('Log in')
                button = new Buttons.Login()
            } else { // There is no more applications to apply for
                console.log('Application closed')
                button = new Buttons.Closed()
            }
            $('#list').before(button.render().el)
        }
    })
})

var Button = Backbone.View.extend({
    tagName: 'p',
    className: 'action',
    initialize: function() {
    },
    render: function() {
        this.$el.html('<button>'+this.name+'</button>')
        return this
    },
    events: {
        'click': 'click'
    },
    click: function() {}
})

var Buttons = {
    Cancel: Button.extend({
        initialize: function(options) {
            this.application_id = options.application.id
            this.application_rev = options.application.doc._rev
        },
        name: "Zrezygnuj",
        click: function() {
            alert('not implemented')
            debugger
        }
    }),
    Apply: Button.extend({
        initialize: function(options) {
            this.list = options.list
            this.username = options.username
        },
        name: "Zgłoś się!",
        click: function() {
            var $el = this.$el,
                that = this

            $.ajax({
                type: "POST",
                url: "http://localhost:3000/jobs",
                cache: false,
                crossDomain: true,
                contentType: "application/json",
                data: JSON.stringify({ url: job_id, username: this.username }),
                dataType: 'json',
                xhrFields: { withCredentials: true },
                success: function(data) {
                    var opts = { application: data.doc }
                    $el.replaceWith(new Buttons.Cancel(opts).render().el)
                    that.list.addOne({doc: {username: that.username }})
                }
            })
        }
    }),
    Closed: Button.extend({
        name: "Wszystkie miejsca zajęte",
    }),
    Login: Button.extend({
        name: "Zaloguj się",
        click: function() {
            window.location = "http://localhost:3000/auth/facebook/"
        }
    })
}
